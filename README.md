# 🤖 AI Support Automation Dashboard – Backend

Backend service for an AI-powered support automation dashboard built using **NestJS**, **TypeORM**, and **PostgreSQL**.

This system manages user authentication, role-based access control (RBAC), and support ticket lifecycle operations with proper data governance and administrative controls.

---

## 🚀 Core Features

- 🔐 JWT-based Authentication – Secure Register/Login flow.
- 👥 Role-Based Access Control – Granular Admin/User permissions.
- 🎫 Ticket Lifecycle Management – Full CRUD with status transitions.
- ♻️ Data Governance – Soft delete for safety, hard delete for Admin cleanup.
- 🛡 Custom Param Decorators – Specialized decorators for @GetUser(), @GetPagination(), and @Roles().
- 📦 Smart Pagination & Filtering – Unified DTO-based query handling with limit, offset, and status filters.
- 📜 Logger Middleware – Global interceptor for auditing HTTP requests and monitoring API latency.
- ⚠️ Standardized Responses – Unified HTTP Exception handling and structured JSON responses.
- 🗂 Modular and Scalable Architecture

---

## 🏗 System Design Overview

### User Capabilities
- Create tickets
- View own active tickets
- Update own tickets
- Soft delete own tickets
- View own deleted tickets (trash state)

### Admin Capabilities
- View all tickets across users
- Restore soft-deleted tickets
- Hard delete tickets permanently
- Modify ticket status
- Full system-level control

This architecture simulates real-world enterprise-level access control and data lifecycle management.

---

## 🛠 Tech Stack

- **NestJS**
- **TypeORM**
- **PostgreSQL**
- **JWT**
- **bcrypt**
- **Class Validator**
- **Custom Role Guards**

---

## 📌 API Endpoints

### Authentication
- `POST /auth/register`
- `POST /auth/login`

### Ticket Routes
- `GET /tickets` (current user tickets)
- `POST /tickets`
- `PATCH /tickets/updateStatus`
- `DELETE /tickets` (Soft Delete)

### Ticket Admin Routes
- `GET /tickets/all` (all user tickets)
- `PATCH /tickets/restore` 
- `DELETE /tickets` (soft and hard delete)

---

## 🚀 Live API Testing (Postman)

We provide a public Postman collection to help you explore and test the API endpoints without manual configuration.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://contactbhanupartapsingh-5069762.postman.co/workspace/Bhanu-Partap-Singh's-Workspace~b3de8cf4-e054-41d0-8bd7-8d81aee84061/collection/52729728-6b4a9e68-3ea1-4fdf-a1b8-fcfd3ce37d81?action=share&creator=52729728)

### 🛠 How to use:
1. **Fork the Collection:** Click the button above and select "Fork" to move it to your own Postman workspace.
2. **Set Environment Variables:** - Set `baseUrl` to `http://localhost:3000` (or your hosted URL).
3. **Authentication Flow:**
   - Use the `Register` endpoint to create a user.
   - Use `Login` to receive a **JWT Access Token**.
   - Copy the token and paste it into the **Collection Authorization** tab (Type: Bearer Token). This will automatically authorize all other requests.

---

## ⚙️ Installation

```bash
git clone https://github.com/<your-username>/AI-Support-Automation-Dashboard-backend.git
cd AI-Support-Automation-Dashboard-backend
npm install