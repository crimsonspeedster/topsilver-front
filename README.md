🛒 TopSilver
Modern e-commerce frontend built with Next.js 15 (App Router), SSR + ISR, and Laravel API backend.
TopSilver is a Ukrainian online store built on a customized frontend based on a Kalles template, fully adapted and extended for production use.

🚀 Tech Stack

Frontend

* Next.js 15 (App Router)
* React 18
* TypeScript
* SCSS (Sass)
* Bootstrap 5 + React-Bootstrap
* Zustand (state management)
* Axios (API client)

Rendering Strategy

* SSR (Server-Side Rendering)
* ISR (Incremental Static Regeneration)
* Client-side rendering (for cart & UI state)

UI Libraries

* Swiper (product sliders)
* Flickity (carousels)
* AOS (animations)
* Jarallax (parallax effects)
* React Icons
* React Toastify (notifications)

Forms & Validation

* Formik
* Yup
* react-phone-number-input

Utilities

* dayjs (dates)
* js-cookie (auth/session handling)
* react-select
* react-tabs
* react-responsive
* rc-slider / nouislider

Internationalization

* next-intl (i18n)

📦 Installation
npm install or yarn install

🧪 Development
npm run dev

Application runs at:
http://localhost:3000

🏗️ Build Project
npm run build

🚀 Production Start
npm run start

🌍 Internationalization (i18n)
TopSilver uses next-intl for localization.

Supported locales:
* Ukrainian (ua)

🔐 Authentication
Authentication is handled via Laravel backend API.

Flow:
* Login via API request
* Token/session stored in cookies
* Protected routes under /dashboard
* Middleware handles access control

📡 API Layer (Laravel Backend)
All requests are handled through a centralized Axios instance.

NEXT_PUBLIC_ENV_API_V1_LINK=https://api.example.com

🛒 Features

Storefront

* Product catalog with categories
* Product detail pages (SSR/ISR)
* Shopping cart (Zustand)
* Wishlist / favorites
* Checkout flow
* Order history

User Area

* User dashboard
* Profile management
* Orders list
* Favorites management

UX / UI

* Fully responsive design (mobile-first)
* Smooth sliders (Swiper / Flickity)
* Animated UI (AOS)
* Toast notifications (React Toastify)

⚙️ Rendering Strategy

SSR (Server-Side Rendering)

Used for:

* Dashboard pages
* User-specific data
* Protected routes

ISR (Incremental Static Regeneration)

Used for:

* Product pages
* Category pages
* SEO-critical pages

CSR (Client Side Rendering)

Used for:

* Cart
* UI interactions
* Non-SEO state updates