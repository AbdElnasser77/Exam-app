# Exam App

A full-featured online exam platform built with Angular 20. Users can browse diplomas, take timed exams, view detailed results, and manage their account — all backed by a live REST API.

---

## Features

- **Authentication** — Register, log in, forgot password, and reset password via email token
- **Email Verification** — OTP-based email verification with resend support and a countdown timer
- **Diplomas** — Browse available diploma programs with scroll-based UI
- **Exams** — View all exams under a diploma, then launch a timed exam session
- **Exam Flow** — Question-by-question navigation with radio-button answers, a live countdown timer, and a progress bar
- **Auto-submit** — Exam submits automatically when the timer expires
- **Exit Guard** — Browser `beforeunload` warning prevents accidental tab close during an active exam
- **Results** — Donut chart breakdown of correct/incorrect answers with per-question analytics
- **Restart Exam** — Retry the same exam from within the results view
- **Profile Settings** — Update first name, last name, and phone number
- **Change Email** — 3-step OTP flow to change email address without leaving the page
- **Change Password** — Secure password update with current password confirmation
- **Delete Account** — Permanent account deletion with a confirmation modal
- **404 Page** — Catch-all not-found route

---

## Tech Stack

| Category | Library / Tool |
|---|---|
| Framework | Angular 20 (standalone components) |
| UI Components | PrimeNG 20 |
| Icons | Lucide Angular |
| Styling | Tailwind CSS 4 + SCSS |
| Charts | Chart.js 4 |
| Phone Input | ngx-intl-tel-input |
| Countdown Timer | ngx-countdown |
| SSR | @angular/ssr + Express 5 |
| Language | TypeScript 5.9 (strict mode) |

---

## Project Structure

```
exam-app/
├── projects/
│   └── auth/                        # Shared auth library
│       └── src/lib/
│           ├── services/auth.service.ts    # Login, register, password flows
│           ├── interceptors/auth.interceptor.ts  # Attaches Bearer token
│           ├── guards/auth.guard.ts
│           └── models/              # Request & response interfaces
│
└── src/app/
    ├── core/
    │   ├── guards/
    │   │   ├── auth-required.ts     # Protects user routes
    │   │   └── is-logged-in-guard.ts # Redirects logged-in users away from auth
    │   ├── services/
    │   │   ├── current-user.service.ts  # Fetch logged-in user profile
    │   │   └── exam-state.service.ts    # Exam mode signal (blocks navigation)
    │   └── models/
    │       └── user-profile.ts
    │
    ├── features/
    │   ├── auth/
    │   │   ├── pages/
    │   │   │   ├── login/
    │   │   │   ├── register/        # Multi-step registration
    │   │   │   ├── forgot-password/
    │   │   │   └── password-reset/
    │   │   └── components/
    │   │       ├── verify-otp/      # Reusable OTP input with countdown
    │   │       └── validation-error/ # Reusable form error messages
    │   │
    │   ├── user/
    │   │   ├── diplomas/
    │   │   │   ├── pages/diplomas-home/
    │   │   │   └── services/diplomas.service.ts
    │   │   ├── exams/
    │   │   │   ├── pages/
    │   │   │   │   ├── exams/       # Exam list for a diploma
    │   │   │   │   ├── questions/   # Active exam session
    │   │   │   │   └── results/     # Score + analytics view
    │   │   │   ├── services/
    │   │   │   │   ├── exam.service.ts
    │   │   │   │   └── questions.service.ts
    │   │   │   └── models/          # Exam, Question, Answers, Submission, Analytics
    │   │   └── resolvers/
    │   │       └── diploma-resolver.ts  # Pre-loads diploma data before route activates
    │   │
    │   └── settings/
    │       ├── pages/
    │       │   ├── profile/         # Edit name, phone, email, delete account
    │       │   └── change-password/
    │       └── services/
    │           ├── update-profile.ts
    │           └── changePasswordService.ts
    │
    ├── shared/
    │   └── components/ui/
    │       ├── button/              # Reusable button with preset variants
    │       ├── header/              # Page header component
    │       ├── sidebar/             # Navigation sidebar with user info
    │       ├── modal/               # Multi-purpose modal (confirm, OTP, delete)
    │       ├── countdown/           # SVG ring countdown timer
    │       └── donut-chart/         # Chart.js donut chart for results
    │
    └── layouts/
        ├── auth/auth-layout/        # Centered card layout for auth pages
        ├── user/user-layout/        # Sidebar + content layout for app pages
        └── settings/settings-layout/ # Settings-specific layout with nav tabs
```

---

## Routes

| Path | Component | Guard |
|---|---|---|
| `/auth/login` | Login | `isLoggedInGuard` (redirects if already logged in) |
| `/auth/register` | Register | `isLoggedInGuard` |
| `/auth/forgot-password` | ForgotPassword | `isLoggedInGuard` |
| `/auth/reset-password` | PasswordReset | `isLoggedInGuard` |
| `/reset-password` | PasswordReset | — (used from email links) |
| `/diplomas` | DiplomasHome | `authRequiredGuard` |
| `/diplomas/:diplomaId/exams` | Exams | `authRequiredGuard` |
| `/diplomas/:diplomaId/exams/:examId` | Questions | `authRequiredGuard` |
| `/diplomas/:diplomaId/exams/:examId/results/:submissionId` | Results | `authRequiredGuard` |
| `/settings/profile` | Profile | `authRequiredGuard` |
| `/settings/change-password` | ChangePassword | `authRequiredGuard` |
| `**` | NotFound | — |

---

## Getting Started

### Prerequisites

- Node.js 20+
- Angular CLI 20

```bash
npm install -g @angular/cli
```

### Installation

```bash
git clone <repository-url>
cd exam-app
npm install
```

### Development Server

```bash
npm start
```

Navigate to `http://localhost:4200`. The app reloads automatically on file changes.

### Build

```bash
npm run build
```

Output goes to `dist/exam-app/`.

### Server-Side Rendering (SSR)

```bash
npm run build
npm run serve:ssr:exam-app
```

### Watch Mode (incremental dev build)

```bash
npm run watch
```

---

## API

The app connects to:

```
https://exam-app.elevate-bootcamp.cloud
```

Authentication uses a **Bearer token** stored in `localStorage`. The `auth.interceptor.ts` automatically attaches it to every outgoing HTTP request.

### Auth Endpoints

| Method | Endpoint |
|---|---|
| POST | `/api/auth/login` |
| POST | `/api/auth/register` |
| POST | `/api/auth/forgot-password` |
| POST | `/api/auth/reset-password` |
| POST | `/api/auth/send-email-verification` |
| POST | `/api/auth/confirm-email-verification` |

---

## Password Requirements

All password fields across the app enforce:

- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character (`# ? ! @ $ % ^ & * -`)

---

## Key Angular Patterns Used

- **Standalone components** — no NgModules
- **Functional guards** (`CanMatchFn`) — `authRequiredGuard`, `isLoggedInGuard`
- **Functional interceptors** — `auth.interceptor.ts`
- **Route resolvers** — `diplomaResolver` pre-loads diploma data
- **Angular Signals** — `exam-state.service.ts` uses `signal()` + `asReadonly()`
- **Lazy loading** — every feature is lazy-loaded via `loadComponent` / `loadChildren`
- **Reactive Forms** — all forms use `FormBuilder` with typed validators
- **SSR-safe** — `isPlatformBrowser()` guards all `localStorage` and DOM access
- **`@angular/build`** — uses the new esbuild-based builder for faster builds
