describe('Login Page Test', () => {
  beforeEach(() => {
      cy.visit('http://localhost:3000/auth'); // Ensure this URL is correct
  });

  it('should login successfully and navigate to dashboard', () => {
      // Stub the login API response
      cy.intercept('POST', '**/login', {
          statusCode: 200,
          body: {
              message: 'Login successful',
              token: 'fake-jwt-token' // Simulate token storage
          }
      }).as('loginRequest');

      // Fill login form
      cy.get('input[placeholder="Username"]').type('thotasriram906@gmail.com');
      cy.get('input[placeholder="Password"]').type('sriramnani1');
      cy.get('button[type="submit"]').click();

      // Wait for API request
      cy.wait('@loginRequest');

      // Ensure token is stored
      cy.window().then((win) => {
          expect(win.localStorage.getItem('token')).to.exist;
      });

      // Ensure redirection happens
      cy.url().should('include', '/dashboard');
  });

  it('should show an alert for incorrect credentials', () => {
    cy.intercept('POST', '**/login', {
        statusCode: 401,
        body: { message: 'Invalid credentials' }
    }).as('loginFail');

    cy.get('input[placeholder="Username"]').type('wronguser');
    cy.get('input[placeholder="Password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginFail');

    // Capture the alert instead of checking for a visible message
    cy.on('window:alert', (text) => {
        expect(text).to.contains('Something went wrong.');
    });

    // Ensure the page doesn't redirect
    cy.url().should('include', '/auth');
});

});
