package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"

	_ "github.com/mattn/go-sqlite3"
	"golang.org/x/crypto/bcrypt"
)

var db *sql.DB
var secretKey = "supersecretkey" // Change this in production

// User struct
type User struct {
	ID       int    `json:"id"`
	Username string `json:"username"`
	Password string `json:"password"`
}

// Initialize the Database
func initDB() {
	var err error
	db, err = sql.Open("sqlite3", "health_info.db")
	if err != nil {
		log.Fatal(err)
	}

	// Create tables if they don't exist
	_, err = db.Exec(`
		CREATE TABLE IF NOT EXISTS users (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			username TEXT UNIQUE,
			password TEXT
		);
		CREATE TABLE IF NOT EXISTS appointments (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			date TEXT,
			time TEXT,
			user_id INTEGER,
			FOREIGN KEY(user_id) REFERENCES users(id)
		);
		CREATE TABLE IF NOT EXISTS prescriptions (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			filename TEXT,
			user_id INTEGER,
			FOREIGN KEY(user_id) REFERENCES users(id)
		);
	`)
	if err != nil {
		log.Fatal(err)
	}
}

// Hash Password before saving to DB
func hashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

// Compare hashed password with user input
func checkPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

// ✅ Generate JWT Token
func generateToken(username string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"username": username,
		"exp":      time.Now().Add(time.Hour * 24).Unix(), // Token expires in 24 hours
	})
	return token.SignedString([]byte(secretKey))
}

// ✅ Middleware to Verify JWT Token
func authMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenString := c.GetHeader("Authorization")
		if tokenString == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Missing token"})
			c.Abort()
			return
		}

		claims := jwt.MapClaims{}
		_, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
			return []byte(secretKey), nil
		})

		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
			c.Abort()
			return
		}

		c.Set("username", claims["username"])
		c.Next()
	}
}

// ✅ Register User (Signup)
func registerUser(c *gin.Context) {
	var user User
	if err := c.BindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	hashedPassword, err := hashPassword(user.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
		return
	}

	_, err = db.Exec("INSERT INTO users (username, password) VALUES (?, ?)", user.Username, hashedPassword)
	if err != nil {
		c.JSON(http.StatusConflict, gin.H{"error": "Username already exists"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "User registered successfully"})
}

// ✅ Login User

func loginUser(c *gin.Context) {
	var user User
	var storedUser User

	if err := c.BindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	row := db.QueryRow("SELECT id, username, password FROM users WHERE username=?", user.Username)
	err := row.Scan(&storedUser.ID, &storedUser.Username, &storedUser.Password)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	if !checkPasswordHash(user.Password, storedUser.Password) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	token, err := generateToken(storedUser.Username)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Login successful", "token": token})
}

// ✅ Save Appointment API (Protected)
func bookAppointment(c *gin.Context) {
	username, _ := c.Get("username")
	userID := getUserID(username.(string))

	var appointment struct {
		Date string `json:"date"`
		Time string `json:"time"`
	}

	if err := c.BindJSON(&appointment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	_, err := db.Exec("INSERT INTO appointments (date, time, user_id) VALUES (?, ?, ?)", appointment.Date, appointment.Time, userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Appointment booked successfully"})
}

// ✅ Get User ID from username
func getUserID(username string) int {
	var id int
	row := db.QueryRow("SELECT id FROM users WHERE username=?", username)
	row.Scan(&id)
	return id
}

// ✅ Get All Appointments API (Protected)
func getAppointments(c *gin.Context) {
	username, _ := c.Get("username")
	userID := getUserID(username.(string))

	rows, err := db.Query("SELECT id, date, time FROM appointments WHERE user_id=?", userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
		return
	}
	defer rows.Close()

	var appointments []map[string]interface{}
	for rows.Next() {
		var id int
		var date, time string
		rows.Scan(&id, &date, &time)
		appointments = append(appointments, map[string]interface{}{"id": id, "date": date, "time": time})
	}

	c.JSON(http.StatusOK, appointments)
}

// ✅ File Upload API (Protected)
func uploadPrescription(c *gin.Context) {
	username, _ := c.Get("username")
	userID := getUserID(username.(string))

	file, err := c.FormFile("file")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "File upload failed"})
		return
	}

	filePath := "./uploads/" + file.Filename
	if err := c.SaveUploadedFile(file, filePath); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "File save error"})
		return
	}

	_, err = db.Exec("INSERT INTO prescriptions (filename, user_id) VALUES (?, ?)", file.Filename, userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "File uploaded successfully", "filename": file.Filename})
}

func main() {

	initDB()
	r := gin.Default()
	r.Static("/uploads", "./uploads")

	// Enable CORS
	r.Use(cors.Default())

	// Auth routes
	r.POST("/register", registerUser)
	r.POST("/login", loginUser)

	// Protected routes
	auth := r.Group("/")
	auth.Use(authMiddleware())
	auth.POST("/book-appointment", bookAppointment)
	auth.GET("/appointments", getAppointments)
	auth.POST("/upload-prescription", uploadPrescription)

	fmt.Println("Backend running on port 8080")
	r.Run(":8080")
}
