# VadhuVar — Maharashtra Vadhu-Var Suchak Platform
### "आपल्या संस्कृतीतील विश्वास आणि आधुनिक तंत्रज्ञानाची साधी, सुंदर सांगड."

A quiet-luxury matrimonial CRM and private matchmaking portal engineered specifically for **Maharashtra Vadhu-Var Suchak institutions and private matchmaking salons**.

---

## ✨ Key Features

- **Marathi-First Public Experience (`mr`)**: Defaulted to natural, grammatically refined, respectful Marathi copy with an instant persistent `मराठी | English` switcher.
- **Configurable Brand Architecture**: Centralized in `lib/constants/brand.ts` (`BRAND_NAME`, `BRAND_NAME_MR`, `BRAND_TAGLINE`, city, contact).
- **Quiet Luxury Visual Styling**: Warm ivory (`#FAF7F2`), pure white cards, hairline borders, deep oxblood/maroon accents (`#7A1F2B`), and restrained Kesari heritage dots (`#C85A17`).
- **Devanagari & Latin Typography**: **Noto Serif Devanagari** & **Noto Sans Devanagari** paired with **Fraunces** and **Geist**.
- **6-Step Registration Wizard (`/register`)**: Progressive candidate intake with step-by-step validation and clear Marathi progress tracking ("पायरी १ पैकी ६").
- **Culturally Sensitive Maharashtra Architecture**: Optional fields for native place (मूळ गाव), birth place & time (जन्मस्थळ/जन्मवेळ), Rashi & Nakshatra (रास/नक्षत्र), Kuldaivat (कुलदैवत), Gotra (गोत्र), and caste/sub-caste. None are forced by default.
- **Comprehensive Maharashtra Location Model**: Pune, Mumbai, Nashik, Kolhapur, Satara, Sangli, Solapur, Chhatrapati Sambhajinagar, Ahilyanagar, Ratnagiri, etc.
- **Admin Matchmaker CRM (`/admin` & `/admin/profiles`)**:
  - Bilingual CRM dashboard with candidate lifecycle metrics (*नवीन*, *सक्रिय*, *जुळलेली*, *निष्क्रिय*, *बंद*).
  - Search and multi-filter criteria (location, age range, marital status, gender).
  - **Signature Profile Drawer**: Slide-out dossier with candidate facts, optional cultural details, private internal notes, and single-click sanitized **Controlled Sharing Dossier** for WhatsApp/email sharing.

---

## 🛠 Tech Stack

- **Framework**: [Next.js 16 (Turbopack, App Router)](https://nextjs.org/)
- **UI / Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with custom CSS design tokens
- **Typography**: Google Fonts (Noto Serif Devanagari, Noto Sans Devanagari, Fraunces, Geist)
- **Forms & Validation**: `react-hook-form` + `zod`
- **Icons**: `lucide-react`
- **Notifications**: `sonner`

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
npm run start
```

---

## 📂 Project Structure

```text
├── app/
│   ├── (admin)/
│   │   ├── admin/
│   │   │   ├── page.tsx               # Admin Dashboard
│   │   │   ├── profiles/              # Profiles directory & detail drawer
│   │   │   └── settings/              # Matchmaking CRM settings
│   ├── (public)/
│   │   ├── page.tsx                   # Public landing page (Hero, Process, Trust)
│   │   └── register/                  # 6-step registration flow
│   ├── globals.css                    # Design tokens & typography rules
│   └── layout.tsx                     # Root layout with LanguageProvider
├── components/
│   ├── admin/                         # CRM Table, Drawer, FilterBar, Metrics
│   ├── home/                          # Hero, HowItWorks, PrivacyPromise, etc.
│   └── register/                      # Steps 1 to 6 components
├── lib/
│   ├── constants/
│   │   ├── brand.ts                   # Centralized brand constants
│   │   └── locations.ts               # Maharashtra districts & cities
│   ├── data/                          # Mock profiles repository & mutation hooks
│   ├── i18n/                          # Marathi/English translations & LanguageContext
│   └── schemas/                       # Zod validation schemas
└── types/
    └── profile.ts                     # TypeScript profile & cultural interfaces
```

---

## 📜 License

Private and proprietary. Designed for Maharashtra Vadhu-Var Suchak institutions.
