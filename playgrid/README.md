# PLAYGRID 🏆

**Connecting Athletes to Opportunity.**

A modern sports platform focused on Tamil Nadu and India — tournaments, coaches and sports news
in one place.

## Tech Stack

- React 18 + TypeScript + Vite
- Tailwind CSS
- Firebase (Auth, Firestore, Storage)
- React Router v6
- Lucide Icons

## 1. Setup

```bash
npm install
cp .env.example .env
```

Fill in `.env` with your existing Firebase project's web app config
(Firebase Console → Project Settings → General → Your apps → SDK setup and configuration):

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

Optional — auto-promote specific accounts to admin on first sign-up (comma separated):

```
VITE_ADMIN_EMAILS=you@example.com,admin@example.com
```

If you skip this, sign up normally and then manually change that user's `role` field to
`"admin"` in the `users` collection in the Firestore console.

## 2. Firebase Console setup

1. **Authentication** → Sign-in method → enable **Email/Password**.
2. **Firestore Database** → create a database (production mode is fine).
3. **Storage** → make sure a default bucket exists.
4. Deploy the included security rules (or paste them into the console):
   - `firestore.rules` → Firestore → Rules
   - `storage.rules` → Storage → Rules

   With the Firebase CLI:
   ```bash
   firebase deploy --only firestore:rules,storage:rules
   ```

The app works immediately with rich sample data (`src/data/mockData.ts`) even before you add
anything to Firestore — every list page tries Firestore first and falls back to sample content,
so the UI never looks empty while you're setting things up.

### Firestore collections used

| Collection      | Purpose                                  |
|------------------|-------------------------------------------|
| `users`          | Profile + role (`user` / `admin`)         |
| `tournaments`    | Tournament listings                       |
| `news`           | News articles                             |
| `coaches`        | Coach profiles                            |
| `registrations`  | Tournament sign-ups (linked to users)     |

### Seeding real data

The easiest way to get started is to log in as an admin and use **/admin** → Add Tournament /
Add Article / Add Coach — everything (including image upload to Storage) works from the UI.

## 3. Run locally

```bash
npm run dev
```

## 4. Build

```bash
npm run build
npm run preview
```

## 5. Deploy to Vercel

1. Push this repo to GitHub.
2. Import the repo in [Vercel](https://vercel.com/new).
3. Framework preset: **Vite**.
4. Add the same environment variables from `.env` in Vercel → Project → Settings →
   Environment Variables.
5. Deploy. `vercel.json` is already configured to rewrite all routes to `index.html` so
   client-side routing works correctly.

## Project Structure

```
src/
  components/
    ui/            Reusable primitives (Button styles, Input, Select, Badge, Spinner...)
    layout/         Navbar, Footer, Layout wrapper
    home/           Hero, SportsCategories, LatestNews, TournamentSection, SearchBar
    tournaments/    TournamentCard, TournamentFilters
    news/           NewsCard
    coaches/        CoachCard
  pages/            Route-level pages (Home, Tournaments, News, Coaches, Login, Profile...)
  pages/admin/      Admin dashboard + CRUD screens
  context/          AuthContext (Firebase auth + user profile)
  routes/           ProtectedRoute, AdminRoute guards
  services/         Firestore/Storage data access (tournaments, news, coaches, registrations)
  lib/firebase.ts   Firebase app initialization
  types/            Shared TypeScript types
  data/mockData.ts  Sample data used as instant fallback content / seeding reference
  utils/format.ts   Date/currency formatting helpers
```

## Notes

- **News → API ready**: `NewsArticle` type and `services/news.ts` are structured so you can
  later swap the Firestore read for an external sports/news API call with minimal changes.
- **Admin access**: any user whose email is listed in `VITE_ADMIN_EMAILS`, or whose Firestore
  user doc has `role: "admin"`, sees the Admin link in the navbar and can access `/admin`.
- No Supabase, MongoDB or Express — Firebase is the only backend, used directly from the client
  via the Firebase JS SDK.
