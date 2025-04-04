# SellSense

SellSense is a comprehensive CRM platform designed to give administrators a complete overview of their store, suppliers, inventory, customers, sales analytics, payment statuses, and AI-powered support.

## Live Link : https://sellsense-crm.vercel.app

## Check The Project :

- **Cheking Email : admin@gmail.com**
- **Cheking Password : admin123**

## Features

- **Customer Management** 👥
  - Store and manage customer profiles, order history, and interactions.
  - Categorize customers based on purchase frequency, preferences, and location.
- **Order & Purchase Tracking** 📦
  - Track customer orders, shipping status, and delivery updates in a centralized dashboard.
  - Automate order confirmations and shipping notifications.
- **Contact & Lead Management** 📞
  - Manage potential customers, inquiries, and follow-ups effectively.
  - Track leads and convert them into long-term customers.
- **Discount & Loyalty Program Management** 🎁
  - Create and manage discount codes, special promotions, and flash sales.
  - Implement loyalty points and referral programs to encourage repeat business.
- **Sales & Revenue Dashboard** 📊
  - Access daily, weekly, and monthly sales reports.
  - Analyze top-selling products and customer purchasing trends.
- **Inventory & Stock Management** 🏷️
  - Monitor product stock levels, receive restock alerts, and manage supplier details.
  - Prevent stock shortages or overstock issues with real-time tracking.

## Key Modules

- **Dashboard**
  - Provides insights into store revenue, orders, products, customers, stock levels, pricing trends, discounts, and user feedback through graphs and charts.
- **Orders**
  - Displays all customer orders along with user details, order categories, product pricing, order dates, and locations.
- **Inventory**
  - Showcases all product details, including name, price, current discount, brand, category, ratings, warranty period, and available actions.
- **Suppliers**
  - Lists supplier details such as name, email, phone number, and address.
- **Contacts**
  - Stores company contact details, including company name, key employees, phone numbers, and current business status.
- **Analytics**
  - Predicts upcoming sales for the next year with interactive graphical representations.
- **Payments**
  - Displays customer payment history, including name, email, location, paid and due amounts, order status, transaction ID, payment method, and date.
- **Loyalty**
  - Manages customer loyalty programs and currently active offers.
- **Referral Program**
  - Enables users to share the platform and earn rewards through referrals.
- **Support**
  - AI-powered customer support system for seamless issue resolution.
- **Settings**
  - Customize themes, manage accounts, and configure notification preferences.

## Dependencies

| Package                       | Version        |
| ----------------------------- | -------------- |
| @radix-ui/react-dropdown-menu | ^2.1.6         |
| @radix-ui/react-slot          | ^1.1.2         |
| class-variance-authority      | ^0.7.1         |
| date-fns                      | ^3.6.0         |
| dotenv                        | ^16.4.7        |
| lucide-react                  | ^0.484.0       |
| marked                        | ^15.0.7        |
| mongodb                       | ^6.15.0        |
| mongoose                      | ^8.13.0        |
| next                          | 14.2.26        |
| next-auth                     | ^5.0.0-beta.25 |
| react                         | ^18            |
| react-day-picker              | ^8.10.1        |
| react-dom                     | ^18            |
| react-hook-form               | ^7.54.2        |
| react-hot-toast               | ^2.5.2         |
| react-icons                   | ^5.5.0         |
| recharts                      | ^2.15.1        |
| tailwind-merge                | ^3.0.2         |
| tailwindcss-animate           | ^1.0.7         |
| uuid                          | ^11.1.0        |

## Development Dependencies

| Package            | Version  |
| ------------------ | -------- |
| @types/mongoose    | ^5.11.96 |
| @types/node        | ^20      |
| @types/react       | ^18      |
| @types/react-dom   | ^18      |
| eslint             | ^8       |
| eslint-config-next | 14.2.26  |
| mongodb            | ^6.15.0  |
| mongoose           | ^8.13.0  |
| next               | 14.2.26  |
| postcss            | ^8       |
| react              | ^18      |
| react-dom          | ^18      |
| tailwindcss        | ^3.4.1   |
| typescript         | ^5       |

# Contrubutors

| Name                             | Website                                     |
| -------------------------------- | ------------------------------------------- |
| Khaled Saifulla--- (Team Leader) | https://khaledsaifulla-cb9be.web.app        |
| Ansarul Islam                    | https://ansarul-islam-portfolio.netlify.app |
| Khairul Islam                    | https://khairulislam.vercel.app             |
| Najib Hossain                    | https://najib-hossain.web.app               |
| Hm Faisal                        | https://hmfaisal.vercel.app                 |
| Md Talath Un Nabi                | https://mdanik.vercel.app                   |
| Mubassir Ahmed Bappi             | https://mubashirbappi.netlify.app           |

## Next.js Local Project Setup

### 🚀 Getting Started

Follow these steps to set up and run your Next.js project.

### 📌 Prerequisites

Ensure you have the following installed:

- **Node.js** (Latest LTS recommended) - [Download](https://nodejs.org/)
- **Package Manager:** (Choose one)
  - npm (comes with Node.js)
  - yarn (`npm install -g yarn`)
  - bun (`curl -fsSL https://bun.sh/install | bash
`)

### 📂 Project Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```
2. Install dependencies:
   ```sh
   npm install  # or yarn install or bun install
   ```
3. Create an `.env.local` file:
   ```sh
   touch .env.local
   ```
   Example:
   ```env
   NEXT_PUBLIC_API_URL=https://api.example.com
   DATABASE_URL=mongodb+srv://your-db-connection-string
   ```

### 🏃 Running the Project

#### Development Mode

```sh
npm run dev  # or yarn dev or bun dev
```

Visit `http://localhost:3000` in your browser.

#### Production Mode

```sh
npm run build  # or yarn build or bun build
npm start  # or yarn start or bun start
```

### 🚀 Deployment

Deploy using **Vercel**:

```sh
vercel
```

Or manually:

```sh
npm run build
npm start
```

---

**Happy Coding! 🎉**
