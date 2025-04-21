## Project Description
```markdown
Health-sync - Health Information Management System
This project tries to solve the problems patients face in managing their health information across multiple platforms and providers.
Fragmentation in healthcare leads to inefficiencies such as repeated testing, misunderstandings, and treatment delays, impacting health outcomes.
The project will, therefore, develop an integrated solution that will streamline communication between healthcare professionals and empower patients with a centralized system to manage appointments, prescriptions, and health metrics.
The program focuses on improving care coordination, reducing redundancies, and generally enhancing the outcome for the patient.


🚀 Features
- Book patient appointments (date & time)
- Upload and view prescriptions (PDF/image)
- View all scheduled appointments
- RESTful API with Gin (Go)
- Clean, modular frontend built with Angular


🧰 Tech Stack
- Frontend: Angular
- Backend: Go (Golang)
- Database: SQLite
- Testing: Cypress, Jasmine, Go test


⚙️ Requirements
Backend
- Go 1.16 or later
- SQLite3

Frontend
- Node.js (v14 or later)
- Angular CLI (`npm install -g @angular/cli`)


```
## 🛠️ Running the Application

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/health-info-system.git
cd health-info-system
```

### 2. Run the Backend

```bash
cd backend
go run main.go
```

This starts the API server at `http://localhost:8080`.

### 3. Run the Frontend

```bash
cd frontend
npm install
ng serve
```

The frontend will be available at `http://localhost:4200`.

---

## 🎯 API Endpoints

| Method | Endpoint               | Description                |
|--------|------------------------|----------------------------|
| POST   | `/book-appointment`    | Book a new appointment     |
| GET    | `/appointments`        | List all appointments      |
| POST   | `/upload-prescription` | Upload a prescription file |
| GET    | `/prescriptions`       | List uploaded prescriptions|

---

## 🧪 Testing

### Frontend Unit Tests

```bash
ng test
```

### Cypress E2E Tests

```bash
npx cypress open
```

### Backend Tests (Go)

```bash
go test
```

---

## 📁 Folder Structure

```
health-info-system/
├── backend/          → Golang API
│   ├── main.go
│   └── uploads/
├── frontend/         → Angular UI
│   ├── src/
│   └── package.json
├── README.md
```

---

## 🧑‍💻 Contributors

- Sriram Thota
- Nabeel Ahmed Mohammed
- Sai Teja Appani


