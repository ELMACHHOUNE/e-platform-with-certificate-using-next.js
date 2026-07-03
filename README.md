<div align="center">
  <img src="public/gotodev.webp" alt="goToDev Logo" width="120" height="120" />
  <h1 align="center">E-Platform</h1>
  <p align="center">A modern e-learning management system with PDF certificate generation</p>
  <p align="center">
    <a href="https://github.com/ELMACHHOUNE/e-platform-with-certificate-using-next.js"><strong>View on GitHub »</strong></a>
  </p>
  <br />
</div>

## About

E-Platform is a full-stack e-learning management system built with Next.js. It provides an admin dashboard for managing students, courses, and instructors, along with server-side PDF certificate generation — no Python or external services required.

## Features

- **Admin Dashboard** — Manage students, courses, and instructors with a modern data table (sorting, filtering, pagination)
- **Certificate Generation** — Generate downloadable PDF certificates directly from the browser using the server API
- **Authentication** — JWT-based admin auth with httpOnly cookies
- **Responsive Design** — Fully responsive UI built with Tailwind CSS
- **Seed Script** — Pre-populate the database with sample data for testing

## Tech Stack

| Frontend | Backend | Database | PDF |
|---|---|---|---|
| Next.js 16 | Next.js API Routes | MongoDB (Mongoose) | pdf-lib |
| React 19 | JWT (jose) | — | zlib |
| Tailwind CSS v4 | bcryptjs | — | — |
| Framer Motion | TypeScript | — | — |
| TanStack Table | — | — | — |

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB instance (local or Atlas)

### Installation

```bash
git clone https://github.com/ELMACHHOUNE/e-platform-with-certificate-using-next.js.git
cd e-platform-with-certificate-using-next.js
npm install
```

### Environment Variables

Create a `.env.local` file:

```env
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/e-platform
JWT_SECRET=your-secret-key
```

### Seed the Database

```bash
npm run seed
```

This creates a default admin account:

| Email | Password |
|---|---|
| admin@e-platform.com | admin123 |

### Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/
├── (auth)/login         Login page
├── (auth)/register      Registration page
├── api/auth/*           Authentication API
├── api/certificate/*    Certificate generation API
├── api/courses          Course listing API
├── api/instructors      Instructor listing API
├── api/stats            Dashboard stats API
├── api/students         Student CRUD API
└── instructor/dashboard Admin dashboard
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/login` | Authenticate admin |
| POST | `/api/auth/register` | Create admin account |
| GET | `/api/auth/me` | Get current user |
| DELETE | `/api/auth/me` | Logout |
| GET | `/api/courses` | List courses |
| GET | `/api/instructors` | List instructors |
| GET | `/api/stats` | Dashboard statistics |
| GET | `/api/students` | List students (paginated) |
| POST | `/api/students` | Create student |
| GET | `/api/students/[id]` | Get student |
| PUT | `/api/students/[id]` | Update student |
| DELETE | `/api/students/[id]` | Delete student |
| POST | `/api/certificate/generate` | Generate PDF certificate |

## Certificate Generation

The certificate is generated server-side using `pdf-lib`. The template is stored at `public/certificates/PDF/certificate.pdf`. Placeholder text is removed from the PDF content stream via zlib decompression/inflation, and actual values are drawn at precise coordinates.

No Python, PhantomJS, or headless browser required — works entirely within Node.js and is Vercel-compatible.

## Contributing

Contributions are welcome. Feel free to open an issue or submit a pull request.

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

---

<div align="center">
  Built with ❤️ by <a href="https://github.com/ELMACHHOUNE">ELMACHHOUNE</a>
</div>
