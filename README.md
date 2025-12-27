This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# Server-Rendered E-commerce Product Management Dashboard

## 🚀 Overview
This is a high-performance, SEO-optimized administrative dashboard built with Next.js. It allows admins to manage product inventory, visualize sales/stock data through interactive charts, and securely onboard new administrators.

## 🛠 Tech Stack
- **Framework:** Next.js 15 (App Router, JavaScript)
- **Database:** MongoDB Atlas (Mongoose)
- **Authentication:** NextAuth.js (Role-based: Admin)
- **Validation:** Zod & React Hook Form
- **Visualization:** Recharts
- **Image Storage:** Cloudinary Cloud Storage

## ✨ Key Features
- **SSR (Server-Side Rendering):** Fast page loads and SEO compliance.
- **Product CRUD:** Complete management with image upload support.
- **Multi-step Forms:** Intuitive 3-step product creation process.
- **Data Analytics:** Bar charts showing stock levels vs. price metrics.
- **Secure Onboarding:** Admin-only route to create new admin users.

## 🔑 Dummy Credentials for Testing
- **Email:** `admin@example.com`
- **Password:** `admin123`

## ⚙️ Setup Instructions
1. Clone the repository.
2. Run `npm install`.
3. Create a `.env` file and add:
   - `MONGODB_URI`, `NEXTAUTH_SECRET`
   - `CLOUDINARY_CLOUD_NAME`, `API_KEY`, `API_SECRET`
4. Run `node seed.js` to create the initial admin account.
5. Start the server: `npm run dev`.