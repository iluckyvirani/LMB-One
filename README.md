# LMB Shoes — Storefront

The customer-facing store for **LMB Shoes**, a luxury footwear brand.

**Live:** https://lmbone.com

LMB Shoes is built as three apps:

| App | Repo | Stack |
|---|---|---|
| **Storefront** (this repo) | [LMB-One](https://github.com/iluckyvirani/LMB-One) | Next.js, TypeScript, Tailwind CSS, Zustand |
| **Admin panel** | [LMB-One-admin](https://github.com/iluckyvirani/LMB-One-admin) | React, Vite, TypeScript, Zustand, Recharts |
| **API server** | [LMB-one-server](https://github.com/iluckyvirani/LMB-one-server) | Express, PostgreSQL (Neon), Cloudinary, JWT |

## Storefront pages

Shop and product pages (`/shop`, `/product/[slug]`), cart, wishlist, account, orders and order detail, **track order**, size guide, FAQs, contact, and the policy pages (shipping, returns and refunds, privacy, terms).

## What the whole system does

- Product catalogue with image upload, search and reviews
- Customer **phone + OTP login**, wishlist, recently viewed, order history
- Orders with an admin **order board**, shipment and AWB assignment, delivery checks
- Admin dashboard with stats, customers (block / edit), content pages, messages and settings

## Run it locally

```bash
npm install
npm run dev        # http://localhost:3000
```

The storefront talks to the API server; set the API base URL in your env file and start
[LMB-one-server](https://github.com/iluckyvirani/LMB-one-server) first.

Built end to end: storefront, admin, API and deployment.
