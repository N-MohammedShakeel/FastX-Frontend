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

![Landing Page](asset/1%20landing%20page.png)

### Signup (Desktop)

![Signup Laptop UI](asset/2%20signup%20laptop%20ui.png)

### Signup (Mobile)

![Signup Mobile UI](asset/3%20signup%20mobile%20ui.png)

### Signin (Desktop)

![Signin Laptop UI](asset/4%20signin%20laptop%20ui.png)

### Signin (Mobile)

![Signin Mobile UI](asset/5%20signin%20mobile%20ui.png)

---

# Passenger Flow

Passengers can search buses, book seats, manage profiles, track bookings, request refunds, and receive e-ticket confirmations.

## Passenger Dashboard

![Passenger Dashboard](asset/6%20passenger%20dashboard.png)

## Search Available Buses

Passengers can search buses based on route and travel details.

![Passenger Find Buses](asset/7%20passenger%20find%20busses.png)

## Booking Management

Passengers can manage and track bookings.

![Passenger Booking Management](asset/8%20passenger%20bookings%20management.png)

## OAuth Initial Profile Completion

Google OAuth users complete profile setup after authentication.

![OAuth Initial User Profile](asset/9%20oauth%20initial%20user%20profile.png)

## Profile Management

Passengers can edit profile information and update password.

![Local User Profile](asset/10%20local%20user%20profile%20or%20oauth%20profile%20after%20setting%20passwrod.png)

## Ticket Details Modal

Detailed ticket information with booking details.

![Ticket Details Modal](asset/11%20ticket%20details%20model.png)

## Seat Selection

Passengers can choose available seats before booking.

![Seat Selection](asset/12%20seat%20selection%20page.png)

## Checkout Page

Wallet-based booking flow for ticket confirmation.

![Checkout Page](asset/13%20checkout%20page.png)

## Booking Confirmation Modal

Confirmation after successful booking.

![Booking Confirmation Modal](asset/14%20booking%20confirmation%20model.png)

## Booking Confirmation Email

Passengers receive booking confirmation through email.

![Booking Confirmation Email](asset/15%20booking%20confirmation%20email.png)

## E-Ticket PDF

Generated PDF ticket after successful booking.

![E-Ticket PDF](asset/15%20E-Ticket%20pdf.png)

## Edit Profile Modal

Update passenger details.

![Edit Profile Modal](asset/16%20edit%20profile%20modal.png)

## Refund Request Modal

Passengers can request refunds for bookings.

![Refund Request Modal](asset/17%20refund%20request%20modal.png)

---

# Operator Flow

Bus operators manage buses, routes, bookings, refunds, and operational analytics.

## Operator Dashboard

Overview of operational data and statistics.

![Operator Dashboard](asset/18%20operator%20dashboard.png)

## Booking Details Modal

Detailed booking information for operators.

![Booking Details Modal](asset/20%20Booking%20Details%20Modal.png)

## Bus Management

Operators can manage buses.

![Bus Management Page](asset/21%20bus%20mnagement%20page.png)

## Add / Update Bus

Modal for creating or updating bus information.

![Bus Modal](asset/22%20add%20bus%20-%20update%20bus%20modal.png)

## Route Management

Manage travel routes and schedules.

![Route Management](asset/23%20operator%20route%20management%20page.png)

## Add / Update Route

Modal for route management.

![Route Modal](asset/24%20add%20route%20-%20update%20route%20modal.png)

## Operator Booking Management

Manage booking records.

![Operator Booking Management](asset/24%20operator%20booking%20management%20page.png)

## Refund Management

Approve or reject passenger refund requests.

![Operator Refund Management](asset/25%20operator%20refund%20management%20page.png)

## Delete Confirmation Modal

Confirmation for delete actions.

![Delete Confirmation Modal](asset/26%20delete%20confirmation%20modal.png)

## Refund Approval Modal

Approve refund requests.

![Approve Confirmation Modal](asset/27%20approve%20confirmation%20modal.png)

---

# Admin Flow

Administrators manage platform-wide data and system operations.

## Admin Dashboard

High-level system overview.

![Admin Dashboard](asset/28%20admin%20dashboard.png)

## Passenger Management

Manage registered passengers.

![Passenger Management](asset/29%20passenger%20management.png)

## Operator Management

Manage bus operators.

![Operator Management](asset/30%20operator%20management.png)

## Booking Management

View and manage booking data.

![Admin Booking Management](asset/31%20admin%20booking%20management.png)

## Route Management

Manage routes across the platform.

![Admin Route Management](asset/32%20admin%20route%20management.png)

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
