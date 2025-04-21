<h1>Health-Sync Platform</h1>
<h2>Sprint 4</h2> <br>
Date: 21st April 2025
<br>

# Sprint 4 Report

## ✅ Work Completed in Sprint 4

### Backend (Go)
- Refactored existing API handlers for improved error handling and input validation.
- Added middleware to handle CORS and better organize API routes.
- Verified SQLite table structure and implemented fallback checks during server initialization.
- Cleaned up route grouping in Gin for easier testing and maintenance.
- Added unit tests using Go’s built-in `testing` package for:
  - Appointment booking
  - Fetching appointments
  - Uploading and listing prescriptions

### Frontend (Angular)
- Integrated proper HTTP error handling in service calls.
- Refined UI components for appointment and prescription modules.
- Connected Angular services more robustly with backend API responses.
- Improved the UI/UX for file upload feedback (e.g., loading spinner, success message).
- Added routing for dynamic navigation between dashboard sections.
- Cleaned up unused components and optimized change detection.

---

## 🧪 Frontend Unit Tests & Cypress Tests

### Unit Tests (Karma + Jasmine)
| Component             | Test File                         | Description                          |
|----------------------|------------------------------------|--------------------------------------|
| AppointmentForm      | `appointment-form.component.spec.ts` | Validates form input and submission |
| PrescriptionUpload   | `upload.component.spec.ts`           | Tests upload logic and API interaction |
| AppointmentList      | `appointments.component.spec.ts`     | Confirms API data rendering          |

### Cypress E2E Tests
| Test File                  | Description                                |
|---------------------------|--------------------------------------------|
| `appointment.e2e.ts`       | Simulates user booking an appointment      |
| `prescription-upload.e2e.ts` | Tests file upload and confirmation UI flow |
| `dashboard.e2e.ts`         | Checks visibility of main dashboard routes |

---

## 🧪 Backend Unit Tests

| Test File          | Description                                           |
|--------------------|-------------------------------------------------------|
| `main_test.go`     | Tests endpoint logic for `/book-appointment`, `/appointments` |
| `prescription_test.go` | Tests upload and retrieval logic for prescriptions  |

---
```json
{
  "date": "2025-04-01",
  "time": "10:30"
}

