# BI-IN Facturación V2 (Demo)

Invoicing web app for a logistics company: staff generate invoices from the weight of a package, export them as images and share them by WhatsApp from any device.

**Live demo:** 
[Click here to see my live demo](https://biin-facturacion-demo.vercel.app/login)

| | |
|---|---|
| Email | `demo@ejemplo.com` |
| Password | `DemoBiin2026` |

> This is a demo with sample data only. The payment number shown on invoices is a placeholder.

## Features

- Login with JWT sessions stored in HTTP-only cookies
- Protected routes and API endpoints through Next.js middleware
- Invoice generator with automatic total based on weight
- Invoices saved to a MySQL database
- Export invoice as PNG and share it by WhatsApp using the Web Share API
- User management: create, edit (including password change) and delete users
- Responsive design

## Tech stack

Next.js (App Router, Server Actions), React, TypeScript, Prisma ORM, MySQL, bcrypt, jose (JWT), html2canvas.

Deployed on Vercel, with the database hosted on Railway.

## Run locally

```bash
git clone https://github.com/olracnaej/biin-facturacion-demo.git
cd biin-facturacion-demo
npm install
```

Create a `.env` file in the root:

```
DATABASE_URL="mysql://user:password@host:port/database"
JWT_SECRET="a-long-random-secret"
```

Create the tables and start the app:

```bash
npx prisma migrate deploy
npm run dev
```

The app runs at `http://localhost:3000`. There is no default user, so create one directly in the database with a bcrypt-hashed password.

## Notes

- Passwords are stored hashed with bcrypt.
- Any logged-in user can manage users: the app has no roles.