# 🏥 HealthSync — Smart Hospital Management Platform

> A production-quality, premium React frontend for hospital management — built to launch-ready standards with Tailwind CSS, Framer Motion, and a clean modular architecture.

---

## ✨ Features

### Portals
| Portal | Role | Pages |
|---|---|---|
| 🧑‍💼 Patient | `patient` | Overview, Find Doctors, Book Appointments, Medical Records, Billing |
| 👨‍⚕️ Doctor | `doctor` | Clinical Dashboard, Appointment Schedule, Add Medical Records |
| 🔐 Admin | `admin` | Executive Dashboard (live stats), Audit Logs |

### Design Highlights
- **Premium design system** — Deep medical blue `#0F4C81`, vibrant accent `#00C9A7`
- **Glassmorphism** on hero and login panels
- **Framer Motion** page transitions and micro-animations
- **Skeleton loaders** on every data-fetching page
- **Empty states** with contextual messaging
- **Responsive** — mobile sidebar drawer + desktop persistent nav
- **Role-based routing** — auto-redirects by user role after login
- **Protected routes** — unauthenticated users redirected to login

---

## 🗂 Project Structure

```
healthsync/
├── public/
│   └── index.html
├── src/
│   ├── App.js                        # Root router + auth provider
│   ├── index.js                      # React entry point
│   ├── index.css                     # Tailwind + global styles + Google Fonts
│   │
│   ├── components/
│   │   ├── common/
│   │   │   └── UIComponents.js       # Skeleton, Modal, Badge, EmptyState, Spinner
│   │   └── layouts/
│   │       └── DashboardLayout.js    # Sidebar + topnav shell (shared by all dashboards)
│   │
│   ├── pages/
│   │   ├── LandingPage.js            # Marketing homepage
│   │   ├── LoginPage.js              # Split-layout login with demo credentials
│   │   │
│   │   ├── patient/
│   │   │   ├── PatientDashboard.js   # Router + nav config
│   │   │   ├── PatientOverview.js    # Welcome card + stat cards + recent data
│   │   │   ├── DoctorsPage.js        # Doctor listing + booking modal
│   │   │   ├── AppointmentsPage.js   # Appointment history with filters
│   │   │   ├── MedicalRecordsPage.js # Health records list
│   │   │   └── BillingPage.js        # Invoice history + summary stats
│   │   │
│   │   ├── doctor/
│   │   │   ├── DoctorDashboard.js    # Router + nav config
│   │   │   ├── DoctorOverview.js     # Stat cards + today's schedule
│   │   │   └── DoctorAppointments.js # Appointment table + complete + add record
│   │   │
│   │   └── admin/
│   │       ├── AdminDashboard.js     # Router + nav config
│   │       ├── AdminOverview.js      # KPI cards + system health + quick actions
│   │       └── AuditLogsPage.js      # Searchable audit log table
│   │
│   ├── services/
│   │   └── api.js                    # Axios instance + all API functions
│   │
│   └── utils/
│       └── AuthContext.js            # React context for auth state (login/logout)
│
├── tailwind.config.js                # Design tokens, custom colors, shadows, fonts
├── postcss.config.js
├── package.json
└── .env.example
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm 9+ or yarn
- Your HealthSync backend running at `http://localhost:5000`

### Installation

```bash
# 1. Navigate to project folder
cd healthsync

# 2. Install dependencies
npm install

# 3. (Optional) Copy env file
cp .env.example .env

# 4. Start development server
npm start
```

The app opens at **http://localhost:3000**

---

## 🔐 Demo Login Credentials

Use the quick-access buttons on the login page, or enter manually:

| Role | Email | Password |
|---|---|---|
| Patient | `patient1@healthsync.com` | `hashed_password_1` |
| Doctor | `doctor1@healthsync.com` | `hashed_password_1` |
| Admin | `admin@healthsync.com` | `hashed_password_1` |

> Role-based routing is automatic — patients go to `/patient`, doctors to `/doctor`, admins to `/admin`.

---

## 🎨 Design System

### Color Palette
```
Primary:    #0F4C81  (Deep medical blue)
Secondary:  #1E88E5  (Vibrant healthcare blue)
Accent:     #00C9A7  (Premium teal)
Background: #F8FBFF
Dark text:  #0F172A
Muted:      #64748B
Success:    #10B981
Warning:    #F59E0B
Danger:     #EF4444
Border:     #E2E8F0
```

### Typography
- **Display / Headings:** Sora (Google Fonts)
- **Body / UI:** Plus Jakarta Sans (Google Fonts)
- **Code / IDs:** JetBrains Mono

### Utility Classes (in `index.css`)
```css
.btn-primary        /* Gradient CTA button */
.btn-secondary      /* Outlined ghost button */
.btn-accent         /* Teal gradient button */
.input-field        /* Styled form input */
.stat-card          /* Dashboard metric card */
.nav-item           /* Sidebar nav link */
.nav-item-active    /* Active sidebar nav link */
.badge-success/warning/danger/info/muted
.glass-card         /* Glassmorphism card */
.section-title      /* Display heading */
.table-row          /* Hoverable table row */
```

---

## 🔌 API Integration

All API calls are in `src/services/api.js`. The Axios base URL is `http://localhost:5000`.

| Function | Method | Endpoint |
|---|---|---|
| `loginUser` | POST | `/api/auth/login` |
| `getDoctors` | GET | `/api/doctors` |
| `getDoctorAppointments` | GET | `/api/doctors/:id/appointments` |
| `bookAppointment` | POST | `/api/appointments` |
| `getPatientAppointments` | GET | `/api/appointments/patient/:id` |
| `updateAppointmentStatus` | PUT | `/api/appointments/:id/status` |
| `getPatientMedicalRecords` | GET | `/api/medical-records/patient/:id` |
| `createMedicalRecord` | POST | `/api/medical-records` |
| `getPatientBilling` | GET | `/api/billing/patient/:id` |
| `getAdminDashboard` | GET | `/api/admin/dashboard` |
| `getAuditLogs` | GET | `/api/admin/audit-logs` |

---

## 📦 Dependencies

| Package | Version | Purpose |
|---|---|---|
| `react` | 18 | Core UI library |
| `react-router-dom` | 6 | Client-side routing |
| `axios` | 1.6 | HTTP client |
| `framer-motion` | 11 | Animations & transitions |
| `react-hot-toast` | 2.4 | Toast notifications |
| `lucide-react` | 0.344 | Icon system |
| `tailwindcss` | 3 | Utility-first CSS |

---

## 🏗 Production Build

```bash
npm run build
```

Output goes to `/build` — ready to deploy to Vercel, Netlify, or any static host.

---

## 📋 Extending the Project

### Add a new patient page
1. Create `src/pages/patient/NewPage.js`
2. Add a route in `PatientDashboard.js`
3. Add a nav item with icon to the `navItems` array

### Add a new API call
1. Add the function to `src/services/api.js`
2. Import and use it in your page component

### Modify the design system
- Colors → `tailwind.config.js` → `theme.extend.colors`
- Fonts → `tailwind.config.js` + `src/index.css` Google Fonts import
- Component styles → `src/index.css` `@layer components`

---

*Built with ❤️ for the HealthSync DBMS Mini-Project*
