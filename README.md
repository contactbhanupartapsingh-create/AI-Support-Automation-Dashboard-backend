Project Title
Ticket Management System API (NestJS)

Description

A role-based ticket management backend system built using NestJS and TypeORM with PostgreSQL.
Implements authentication, authorization (RBAC), soft delete lifecycle, and admin-level control over system data.

Features
JWT Authentication
Role-based Access Control (Admin / User)
Ticket CRUD
Soft Delete & Restore
Hard Delete (Admin Only)
Custom Decorators
Guards Implementation
Exception Handling
DTO Validation
Tech Stack
NestJS
TypeORM
PostgreSQL
JWT
bcrypt

API Endpoints
Brief list:
POST /auth/register
POST /auth/login
GET /tickets
POST /tickets
PATCH /tickets/:id
DELETE /tickets/:id
PATCH /tickets/:id/restore (Admin only)

How to Run
npm install
npm run start:dev