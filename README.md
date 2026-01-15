# 🎓 EduWeave - Government Education Platform

A modern, production-grade React frontend for a government education hackathon project. EduWeave helps **teachers submit classroom needs** and **DIET officials design need-based training programs using AI insights**.

![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-blue)
![Vite](https://img.shields.io/badge/Vite-5-purple)

---

## ✨ Features

### 🏫 Teacher Experience
- **Simple, low-friction interface** designed for government schools
- **Submit classroom needs** with detailed context and constraints
- **Track submissions** through the review process
- **Access assigned training programs** designed specifically for their needs
- **Provide feedback** and evidence of training impact

### 👨‍💼 DIET Official Experience
- **Data-rich dashboard** with teacher need clustering
- **AI-powered recommendations** for training design
- **Human-in-the-loop control** - approve/reject recommendations
- **Design and publish training programs** targeting specific teacher cohorts
- **Track feedback and outcomes** with analytics

---

## 🏗️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS (utility-first, responsive)
- **Build Tool**: Vite (fast, optimized)
- **Routing**: React Router v6 (role-based)
- **Icons**: Lucide React (crisp, lightweight)
- **State Management**: React Context API
- **Auth**: Supabase (Google OAuth + JWT-ready)

---

## 📦 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui.tsx          # Button, Card, Alert, Badge, etc.
│   ├── Layout.tsx      # Header, Footer
│   └── ProtectedRoute.tsx
├── context/            # Global state (Auth)
│   └── AuthContext.tsx
├── pages/              # Route pages
│   ├── LoginPage.tsx
│   ├── TeacherDashboard.tsx
│   ├── SubmitNeedPage.tsx
│   ├── DIETDashboard.tsx
│   ├── AIRecommendationsPage.tsx
│   ├── DesignTrainingPage.tsx
│   └── TrainingPublishedPage.tsx
├── types/             # TypeScript types
│   └── index.ts
├── lib/               # Utilities & helpers
│   └── supabase.ts
├── App.tsx            # Main app with routes
├── main.tsx           # Entry point
└── index.css          # Tailwind + global styles
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will be available at `http://localhost:5173`

---

## 🔐 Authentication Flow

1. **User navigates to login** → `/login`
2. **Sign in with Google** or email/password
3. **JWT token stored** in localStorage
4. **User metadata saved** (role, districtId, etc.)
5. **Role-based redirect**:
   - `teacher` → `/teacher-dashboard`
   - `diet` → `/diet-dashboard`
6. **Protected routes** verify auth and role

### Demo Credentials
- **Teacher**: Any email without "diet" (e.g., `teacher@example.com`)
- **DIET Official**: Email containing "diet" (e.g., `diet.official@education.gov`)

---

## 📄 Key Pages

### Teacher Routes
| Route | Purpose |
|-------|---------|
| `/login` | Authentication |
| `/teacher-dashboard` | View submissions & assigned training |
| `/teacher/submit-need` | Submit classroom challenge |
| `/teacher/training/:id` | View and engage with training |

### DIET Routes
| Route | Purpose |
|-------|---------|
| `/diet-dashboard` | Cohort & program management |
| `/diet/recommendations/:cohortId` | Review AI recommendations |
| `/diet/design-training/:cohortId` | Create training program |
| `/diet/training-published` | Success & next steps |

---

## 🎨 Design Principles

✅ **Government-Grade Professionalism**
- Clean typography and spacing
- Professional color palette (primary blue, accent orange)
- Accessible contrast ratios

✅ **User-Friendly for Non-Technical Users**
- Large touch targets (48px minimum)
- Clear, jargon-free language
- Guided workflows with confirmation steps

✅ **Responsive & Mobile-First**
- Desktop-optimized layouts
- Touch-friendly on mobile
- Flexible grid system

✅ **Clear States**
- Loading spinners
- Empty states with actions
- Success/error alerts
- Form validation

---

## 🔑 Core Components

### UI Components (`ui.tsx`)
- `Button` - Primary, secondary, outline, danger variants
- `Card` - Consistent card layout
- `LoadingSpinner` - Sizes: sm, md, lg
- `Alert` - Type: success, error, warning, info
- `Badge` - Status indicators
- `FormField` - Label + validation
- `PageHeader` - Consistent page titles
- `EmptyState` - When no data

### Layout
- `Header` - Sticky top bar with user info
- `Footer` - Multi-column footer

### Auth
- `ProtectedRoute` - Guards routes, requires auth
- Role-based access control

---

## 🛠️ Development Tips

### Adding a New Page
```typescript
// 1. Create in src/pages/
// 2. Add to routes in App.tsx
// 3. Use ProtectedRoute for auth-required pages
// 4. Import Layout components for consistency

export const NewPage = () => (
  <div className="min-h-screen bg-gray-50 flex flex-col">
    <Header />
    <main className="flex-1 max-w-6xl mx-auto ...">
      {/* content */}
    </main>
    <Footer />
  </div>
);
```

### Using Tailwind Classes
```jsx
// Responsive
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

// Flexbox
<div className="flex items-center justify-between gap-4">

// Colors
<div className="bg-primary-600 text-white">

// States
<button className="hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50">
```

---

## 🚀 Deployment

### Build
```bash
npm run build
# Creates optimized bundle in dist/
```

### Supabase Integration (Production)
1. Create Supabase project
2. Add to `.env.local`:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```
3. Replace mock auth in `AuthContext.tsx` with real Supabase calls

### Deploy to Vercel
```bash
vercel deploy
```

---

## 📚 Government Documentation

### For Teachers
- Simple, supportive UX
- Clear submission guidelines
- Training program notifications
- Feedback collection with evidence upload

### For DIET Officials
- Data-driven insights
- AI-powered clustering
- Approval workflows
- Program tracking and analytics

---

## 🎓 Hackathon Readiness

✅ Production-grade code structure
✅ Clean, accessible UI
✅ Role-based workflows
✅ Responsive design
✅ Type-safe TypeScript
✅ Ready for Supabase integration
✅ Deployable to cloud platforms
✅ Comprehensive documentation

---

## 📞 Support

For issues or questions, open an issue in the repository.

---

**Built for Government Education Transformation** | EduWeave 2024

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
