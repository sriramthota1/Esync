describe('Dashboard Page Test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/auth');

        cy.intercept('POST', '**/login', {
            statusCode: 200, 
            body: {
                message: 'Login successful',
                token: 'fake-jwt-token'
            }
        }).as('loginRequest');

        cy.get('input[placeholder="Username"]').type('thotasriram906@gmail.com');
        cy.get('input[placeholder="Password"]').type('sriramnani1');
        cy.get('button[type="submit"]').click();

        cy.wait('@loginRequest');

        // ✅ Ensure redirection to dashboard
        cy.url().should('include', '/dashboard');
    });

    it('should display dashboard content', () => {
        // ✅ Ensure sidebar is visible
        cy.get('.sidebar', { timeout: 6000 }).should('be.visible');

        // ✅ Ensure key sidebar menu item exists
        cy.contains('Dashboard', { timeout: 6000 }).should('be.visible');

        // ✅ Look for the logout button inside the sidebar
        cy.get('.sidebar').within(() => {
            cy.get('.logout-btn', { timeout: 6000 }).should('be.visible');
        });
    });
});
