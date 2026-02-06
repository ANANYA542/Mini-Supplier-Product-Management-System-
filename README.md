# Mini Supplier–Product Management System

This project is a full-stack web application built as part of the technical assignment for **Elan Exports**.  
The objective is to simulate a simplified CRM + Marketplace system where suppliers and their products can be managed efficiently while also providing basic analytics insights.

I focused on building a clean and scalable backend structure first, similar to how a real-world product would be designed, before adding additional enhancements.

---

## Tech Stack

**Backend**
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

**Practices**
- RESTful APIs
- MVC Folder Structure
- Environment Variables
- Aggregation Pipelines
- Git Version Control

---

## Project Overview

The system allows:

- Managing **Suppliers**
- Managing **Products** linked to suppliers
- Filtering products by category and certification status
- Viewing **analytics summaries** such as total counts and category breakdowns

The focus was on clean architecture, proper relationships, and maintainable code rather than just feature completion.

---

## Database Schema

Before writing the models, I created an ER diagram to clearly define relationships and constraints between entities.  
The application revolves around two main entities:

- **Supplier**
- **Product**

A **one-to-many relationship** exists where one supplier can provide multiple products, but each product belongs to a single supplier.

![ER Diagram](docs/er-diagram.png)

---

## API Endpoints

### Suppliers
- `POST /api/suppliers`
- `GET /api/suppliers`
- `GET /api/suppliers/:id`

### Products
- `POST /api/products`
- `GET /api/products`
- `PUT /api/products/:id`
- `DELETE /api/products/:id`

### Analytics
- `GET /api/analytics/summary`

---

## Running the Project

```bash
git clone <repo-link>
cd backend
npm install
