# Udyam Digital Form – Steps 1 & 2

This project replicates the first two steps of the official [Udyam Registration](https://udyamregistration.gov.in/UdyamRegistration.aspx) form, including Aadhaar + OTP verification and PAN validation.  
It is built with **React (TypeScript)** and **Tailwind CSS** for a fully responsive UI, with backend integration using **Node.js, Express, and Prisma**.

---

##  Features
- **Step 1: Aadhaar + OTP Validation** – Real-time field validation.
- **Step 2: PAN Validation** – Regex-based checks.
- **Responsive UI** – Mobile-first design using Tailwind CSS.
- **Dynamic Form Rendering** – Based on JSON schema scraped from the official Udyam portal.
- **Backend API** – For form validation and PostgreSQL storage.
- **Unit Tests** – Ensuring form logic and API endpoints work correctly.

---

##  Tech Stack
### Frontend
- React + TypeScript
- Tailwind CSS
- Vite

### Backend
- Node.js + Express
- Prisma ORM
- PostgreSQL

### Web Scraping
- Puppeteer (JavaScript) – extracts field names, labels, validation patterns.

### Testing
- Jest + Supertest

---

##  Project Structure
udyam-digital-form-main/
├─ src/ # React frontend
├─ public/ # Static assets
├─ backend/ # API + DB
│ ├─ prisma/ # Prisma schema
│ ├─ src/ # Express server code
├─ scripts/ # Web scraping scripts
├─ package.json # Frontend dependencies
└─ README.md 


---

##  Getting Started

### 1 Clone the Repository
```bash
git clone <repo-url>
cd udyam-digital-form-main
