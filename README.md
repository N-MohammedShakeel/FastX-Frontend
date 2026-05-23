# FastX Frontend

FastX is a role-based bus ticket booking platform built with React, enabling passengers, bus operators, and administrators to manage bookings, routes, buses, refunds, and profiles through a secure and responsive interface.

The application supports JWT authentication, Google OAuth login, seat selection, wallet-based booking flow, refund management, booking confirmation emails, PDF e-ticket generation, and role-based dashboards.

---

## Features

### Authentication & Security

- JWT Authentication
- Refresh Token Mechanism
- Google OAuth Login
- Role-Based Access Control (`PASSENGER`, `OPERATOR`, `ADMIN`)
- Protected Routes
- Profile Completion Flow for OAuth Users
- Password Update Support

### Passenger Features

- Signup & Login
- Google OAuth Authentication
- Search Available Buses
- Seat Selection
- Ticket Booking
- Booking Checkout Flow
- Booking Confirmation Modal
- Booking History Management
- Active & Past Bookings
- Wallet-Based Booking Flow (Mock)
- Profile Management
- Refund Request System
- Booking Confirmation Email
- PDF E-Ticket Generation

### Operator Features

- Dashboard Analytics
- Bus Management (CRUD)
- Route Management (CRUD)
- Booking Management
- Booking Details Modal
- Refund Approval / Rejection
- Booking Cancellation
- Profile Management
- Password Management

### Admin Features

- Dashboard Overview
- Passenger Management
- Operator Management
- Route Management
- Booking Oversight
- Delete Operations

### UI & Experience

- Fully Responsive Design
- Mobile & Desktop Support
- Toast Notifications
- Modal-Based Workflows
- Role-Based Dashboard Navigation

---

## Tech Stack

### Frontend

- React
- Redux Toolkit
- React Router DOM
- Tailwind CSS
- Axios
- React Toastify
- Vite

### Backend Integration

- Spring Boot REST APIs
- JWT Authentication
- Google OAuth2 Login
- Email Service
- PDF Generation Service

---

## Authentication Flow

FastX supports both local authentication and Google OAuth login.

### Landing Page

![Landing Page](assets/1-landing-page.png)

### Signup (Desktop)

![Signup Laptop UI](assets/2-signup-laptop-ui.png)

### Signup (Mobile)

![Signup Mobile UI](assets/3-signup-mobile-ui.png)

### Signin (Desktop)

![Signin Laptop UI](assets/4-signin-laptop-ui.png)

### Signin (Mobile)

![Signin Mobile UI](assets/5-signin-mobile-ui.png)

---

# Passenger Flow

Passengers can search buses, book seats, manage profiles, track bookings, request refunds, and receive e-ticket confirmations.

## Passenger Dashboard

![Passenger Dashboard](assets/6-passenger-dashboard.png)

## Search Available Buses

Passengers can search buses based on route and travel details.

![Passenger Find Buses](assets/7-passenger-find-busses.png)

## Booking Management

Passengers can manage and track bookings.

![Passenger Booking Management](assets/8-passenger-bookings-management.png)

## OAuth Initial Profile Completion

Google OAuth users complete profile setup after authentication.

![OAuth Initial User Profile](assets/9-oauth-initial-user-profile.png)

## Profile Management

Passengers can edit profile information and update password.

![Local User Profile](assets/10-local-user-profile-or-oauth-profile-after-setting-passwrod.png)

## Ticket Details Modal

Detailed ticket information with booking details.

![Ticket Details Modal](assets/11-ticket-details-model.png)

## Seat Selection

Passengers can choose available seats before booking.

![Seat Selection](assets/12-seat-selection-page.png)

## Checkout Page

Wallet-based booking flow for ticket confirmation.

![Checkout Page](assets/13-checkout-page.png)

## Booking Confirmation Modal

Confirmation after successful booking.

![Booking Confirmation Modal](assets/14-booking-confirmation-model.png)

## Booking Confirmation Email

Passengers receive booking confirmation through email.

![Booking Confirmation Email](assets/15-booking-confirmation-email.png)

## E-Ticket PDF

Generated PDF ticket after successful booking.

![E-Ticket PDF](assets/15-E-Ticket-pdf.png)

## Edit Profile Modal

Update passenger details.

![Edit Profile Modal](assets/16-edit-profile-modal.png)

## Refund Request Modal

Passengers can request refunds for bookings.

![Refund Request Modal](assets/17-refund-request-modal.png)

---

# Operator Flow

Bus operators manage buses, routes, bookings, refunds, and operational analytics.

## Operator Dashboard

Overview of operational data and statistics.

![Operator Dashboard](assets/18-operator-dashboard.png)

## Booking Details Modal

Detailed booking information for operators.

![Booking Details Modal](assets/20-Booking-Details-Modal.png)

## Bus Management

Operators can manage buses.

![Bus Management Page](assets/21-bus-management-page.png)

## Add / Update Bus

Modal for creating or updating bus information.

![Bus Modal](assets/22-add-bus-update-bus-modal.png)

## Route Management

Manage travel routes and schedules.

![Route Management](assets/23-operator-route-management-page.png)

## Add / Update Route

Modal for route management.

![Route Modal](assets/24-add-route-update-route-modal.png)

## Operator Booking Management

Manage booking records.

![Operator Booking Management](assets/24-operator-booking-management-page.png)

## Refund Management

Approve or reject passenger refund requests.

![Operator Refund Management](assets/25-operator-refund-management-page.png)

## Delete Confirmation Modal

Confirmation for delete actions.

![Delete Confirmation Modal](assets/26-delete-confirmation-modal.png)

## Refund Approval Modal

Approve refund requests.

![Approve Confirmation Modal](assets/27-approve-confirmation-modal.png)

---

# Admin Flow

Administrators manage platform-wide data and system operations.

## Admin Dashboard

High-level system overview.

![Admin Dashboard](assets/28-admin-dashboard.png)

## Passenger Management

Manage registered passengers.

![Passenger Management](assets/29-passenger-management.png)

## Operator Management

Manage bus operators.

![Operator Management](assets/30-operator-management.png)

## Booking Management

View and manage booking data.

![Admin Booking Management](assets/31-admin-booking-management.png)

## Route Management

Manage routes across the platform.

## ![Admin Route Management](assets/32-admin-route-management.png)

---

## Role-Based Architecture

FastX supports three user roles:

### Passenger

- Search buses
- Book tickets
- Select seats
- Manage bookings
- Request refunds
- Manage profile
- Wallet-based booking

### Operator

- Manage buses
- Manage routes
- Handle refunds
- View bookings
- Cancel bookings
- View dashboard statistics

### Admin

- Manage passengers
- Manage operators
- Manage routes
- Monitor bookings
- Platform oversight

---

## Responsive UI

The application is designed to support both desktop and mobile devices with responsive layouts for authentication, dashboards, and booking workflows.

---

## Project Setup

### Clone Repository

```bash
git clone <repository-url>
cd FastX-Frontend
```

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Application will start on:

```txt
http://localhost:5173
```

---

## Backend Requirement

This frontend requires the FastX backend server to be running for authentication, booking, routes, refunds, and dashboard operations.

---

## Future Improvements

- Online Payment Gateway Integration
- Real-Time Bus Tracking
- Push Notifications
- Seat Layout Enhancements
- Booking Analytics Improvements
- Dark Mode Support

---

## Skills Demonstrated

- React Development
- Redux Toolkit State Management
- Role-Based UI Architecture
- Authentication & Authorization Flows
- Google OAuth Integration
- Responsive UI Development
- API Integration
- State Management
- Booking Workflow Design
- Dashboard Development
- Modal-Based UI Patterns
- Tailwind CSS Styling
