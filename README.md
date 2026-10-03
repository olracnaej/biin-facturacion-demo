# BI-IN Facturación V2

Sistema web interno de facturación para **BI-IN Logistics**, que permite generar, visualizar y compartir facturas de forma rápida desde cualquier dispositivo.

##  Funcionalidades

- **Autenticación segura** con sesiones basadas en JWT (cookies HTTP-only)
- **Rutas protegidas** mediante middleware de Next.js
- **Gestión de usuarios**: crear, editar (incluyendo cambio de contraseña) y eliminar
- **Generador de facturas** con cálculo automático de totales según peso
- **Exportación de facturas como imagen** (PNG) usando `html2canvas`
- **Compartir por WhatsApp** directo desde el celular, usando la Web Share API nativa
- Diseño responsive con la identidad visual de la marca

##  Tecnologías

- [Next.js 16](https://nextjs.org/) (App Router, Server Actions)
- [React 19](https://react.dev/) + TypeScript
- [Prisma ORM](https://www.prisma.io/) + MySQL
- [bcrypt](https://www.npmjs.com/package/bcrypt) para hash de contraseñas
- [jose](https://github.com/panva/jose) para firmar y verificar JWT
- [html2canvas](https://html2canvas.hertzen.com/) para generar imágenes de las facturas

##  Infraestructura y despliegue

- **Base de datos**: MySQL alojado en [Railway](https://railway.app/), con acceso público mediante TCP proxy.
- **Hosting**: deploy automático en [Vercel](https://vercel.com/), integrado directamente con este repositorio — cada `push` a la rama `main` genera un nuevo deploy en producción.
- **Prisma** actúa como capa ORM entre la app y la base de datos, tanto en desarrollo local como en producción (usando la misma variable `DATABASE_URL`).
- El build en Vercel corre `prisma generate && next build` para asegurar que el cliente de Prisma esté siempre actualizado con el schema.

##  URLs de producción

**URL base:** https://biin-facturacion-v2.vercel.app

| Ruta | Descripción | Acceso |
|---|---|---|
| `/login` | Inicio de sesión | Público |
| `/facturas` | Generador de facturas (pantalla principal de uso diario) | Requiere sesión |
| `/gestion-usuarios` | Listado de usuarios | Requiere sesión |
| `/gestion-usuarios/nuevo-usuario` | Crear un usuario nuevo | Requiere sesión |
| `/gestion-usuarios/editar-usuario/[id]` | Editar correo y/o contraseña de un usuario | Requiere sesión |

##  API interna

| Endpoint | Método | Descripción | Protección |
|---|---|---|---|
| `/api/facturas` | `POST` | Guarda una factura nueva en la base de datos | Requiere sesión activa (middleware) |
| `/api/logout` | `POST` | Elimina la cookie de sesión (`auth_token`) | Público (por diseño, para poder cerrar sesión aunque el token ya esté vencido) |

##  Autenticación y sesiones

- El login (`/login`) valida el correo y contraseña contra la base de datos (`bcrypt.compare`) mediante un **Server Action**.
- Al autenticarse, se genera un **JWT** (firmado con `JWT_SECRET`, válido por 1 día) y se guarda en una cookie `auth_token` (`httpOnly`, `secure` en producción, duración de 7 días).
- El **middleware** (`middleware.ts`) verifica esa cookie en cada request a `/facturas`, `/gestion-usuarios` y `/api/facturas`:
  - Si no hay cookie o el token es inválido/expiró → redirige a `/login` (o devuelve `401` en JSON si es una ruta de API).
  - Si el token es válido → deja pasar la petición.

##  Instalación local

```bash
git clone <url-del-repo>
cd biinfactura-v2
npm install
```

Creá un archivo `.env` en la raíz con:
DATABASE_URL="mysql://usuario:contraseña@host:puerto/basededatos"
JWT_SECRET="una-clave-larga-y-aleatoria"


Aplicá las migraciones de la base de datos:

```bash
npx prisma migrate dev
```

Corré el servidor de desarrollo:

```bash
npm run dev
```

La app va a estar disponible en `http://localhost:3000`.

##  Ver y editar la base de datos

Dos formas de acceder a los datos sin necesidad de escribir consultas SQL a mano:

- **Railway Dashboard**: pestaña "Database" del servicio MySQL, directo desde el navegador.
- **Prisma Studio**: doble clic en `abrir-prisma-studio.bat` (incluido en este repo) para abrir automáticamente una interfaz visual completa en `http://localhost:5555`, conectada a la base de datos configurada en `.env`, sin necesidad de abrir VS Code ni escribir comandos.

##  Seguridad

- Las contraseñas se almacenan con hash `bcrypt`, nunca en texto plano.
- Las sesiones usan JWT firmados con una clave secreta guardada como variable de entorno (no incluida en el código).
- Las rutas de la aplicación y los endpoints de la API están protegidos por middleware, validando la sesión antes de servir cualquier contenido sensible.

##  Licencia

Proyecto privado de uso interno para BI-IN Logistics.





--------------------------------------------------------------
--------------------------------------------------------------
--------------------------------------------------------------





English Version

# BI-IN Facturación V2

Internal invoicing web app for **BI-IN Logistics**, allowing staff to generate, view, and share invoices quickly from any device.

##  Features 

- **Secure authentication** with JWT-based sessions (HTTP-only cookies)
- **Protected routes** via Next.js middleware
- **User management**: create, edit (including password changes), and delete users
- **Invoice generator** with automatic total calculation based on weight
- **Export invoices as images** (PNG) using `html2canvas`
- **Share via WhatsApp** directly from mobile, using the native Web Share API
- Responsive design matching the company's brand identity

##  Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router, Server Actions)
- [React 19](https://react.dev/) + TypeScript
- [Prisma ORM](https://www.prisma.io/) + MySQL
- [bcrypt](https://www.npmjs.com/package/bcrypt) for password hashing
- [jose](https://github.com/panva/jose) for signing and verifying JWTs
- [html2canvas](https://html2canvas.hertzen.com/) for generating invoice images

##  Infrastructure & Deployment

- **Database**: MySQL hosted on [Railway](https://railway.app/), with public access via TCP proxy.
- **Hosting**: automatic deployment on [Vercel](https://vercel.com/), directly integrated with this repository — every `push` to the `main` branch triggers a new production deployment.
- **Prisma** acts as the ORM layer between the app and the database, in both local development and production (using the same `DATABASE_URL` variable).
- The Vercel build runs `prisma generate && next build` to ensure the Prisma Client is always in sync with the schema.

##  Production URLs

**Base URL:** https://biin-facturacion-v2.vercel.app

| Route | Description | Access |
|---|---|---|
| `/login` | Login page | Public |
| `/facturas` | Invoice generator (main daily-use screen) | Requires session |
| `/gestion-usuarios` | User list | Requires session |
| `/gestion-usuarios/nuevo-usuario` | Create a new user | Requires session |
| `/gestion-usuarios/editar-usuario/[id]` | Edit a user's email and/or password | Requires session |

##  Internal API

| Endpoint | Method | Description | Protection |
|---|---|---|---|
| `/api/facturas` | `POST` | Saves a new invoice to the database | Requires active session (middleware) |
| `/api/logout` | `POST` | Deletes the session cookie (`auth_token`) | Public (by design, so logout works even if the token already expired) |

##  Authentication & Sessions

- Login (`/login`) validates email and password against the database (`bcrypt.compare`) via a **Server Action**.
- On successful login, a **JWT** is generated (signed with `JWT_SECRET`, valid for 1 day) and stored in an `auth_token` cookie (`httpOnly`, `secure` in production, 7-day duration).
- The **middleware** (`middleware.ts`) checks this cookie on every request to `/facturas`, `/gestion-usuarios`, and `/api/facturas`:
  - If there's no cookie or the token is invalid/expired → redirects to `/login` (or returns a JSON `401` for API routes).
  - If the token is valid → allows the request to proceed.

##  Local Setup

```bash
git clone <repo-url>
cd biinfactura-v2
npm install
```

Create a `.env` file in the root with:
DATABASE_URL="mysql://user:password@host:port/database"
JWT_SECRET="a-long-random-secret-key"


Apply database migrations:

```bash
npx prisma migrate dev
```

Run the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

##  Viewing & Editing the Database

Two ways to access the data without writing raw SQL:

- **Railway Dashboard**: the "Database" tab of the MySQL service, directly from the browser.
- **Prisma Studio**: double-click `abrir-prisma-studio.bat` (included in this repo) to automatically launch a full visual interface at `http://localhost:5555`, connected to the database configured in `.env` — no need to open VS Code or type any commands.

##  Security

- Passwords are stored using `bcrypt` hashing, never in plain text.
- Sessions use JWTs signed with a secret key stored as an environment variable (not included in the code).
- Both application routes and API endpoints are protected by middleware, validating the session before serving any sensitive content.

##  License

Private project for internal use by BI-IN Logistics.