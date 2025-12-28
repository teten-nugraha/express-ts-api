# 🚀 Express + TypeScript + Prisma + Clean Architecture Auth API

Production-ready **REST API** built with:

- **Express.js**
- **TypeScript (strict)**
- **Prisma + PostgreSQL**
- **Clean Architecture**
- **Passport.js (JWT)**
- **Refresh Token (DB-backed & revocable)**
- **Zod Validation**
- **Dependency Injection (tsyringe)**

---

## ✨ Features

- ✅ Clean Architecture (Domain / Application / Infrastructure / Interface)
- 🔐 Authentication (Login, Register, Refresh Token, Logout)
- 🧾 JWT Access Token + Refresh Token (rotation & revoke)
- 👤 Role-based Authorization (`ADMIN`, `USER`)
- 🔒 Password hashing with bcrypt
- 📦 Prisma ORM + PostgreSQL
- 🧪 Zod request validation
- 📐 Common API response format
- 🧩 Dependency Injection
- 🔄 Nodemon for development

---

## 🧱 Architecture Overview

```text
src
├── domain           # Entities & repository interfaces
├── application      # Use cases & business logic
├── infrastructure   # Prisma, Passport, DB adapters
├── interfaces       # HTTP controllers, routes, middlewares
├── config           # DI container, env config
├── types            # Global typings (Express, Auth)
├── app.ts
└── server.ts
```
