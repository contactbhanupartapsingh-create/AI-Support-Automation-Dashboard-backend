# 🤖 AI Support Automation Dashboard – Backend

Backend service for an AI-powered support automation dashboard built using **NestJS**, **TypeORM**, and **PostgreSQL**.

This system manages user authentication, role-based access control (RBAC), and support ticket lifecycle operations with proper data governance and administrative controls.

---

## 🚀 Core Features

- 🔐 JWT-based Authentication (Register / Login)
- 👥 Role-Based Access Control (Admin / User)
- 🎫 Ticket Management System
- ♻️ Soft Delete with Restore Capability
- ❌ Hard Delete (Admin Only)
- 🛡 Custom Guards & Decorators
- 📦 DTO Validation & Structured Responses
- ⚠️ HTTP Exception Handling
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
- `GET /tickets`
- `POST /tickets`
- `PATCH /tickets/:id`
- `DELETE /tickets/:id` (Soft Delete)
- `PATCH /tickets/:id/restore` (Admin Only)
- `DELETE /tickets/:id/hard` (Admin Only)

---

## ⚙️ Installation

```bash
git clone https://github.com/<your-username>/AI-Support-Automation-Dashboard-backend.git
cd AI-Support-Automation-Dashboard-backend
npm install