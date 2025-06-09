# SYNDIK – Full Build Specification for Residence Syndicate SaaS App

This file serves as a complete guide and set of instructions for GitHub Copilot to build the full SaaS application **Syndik** using modern technologies and modular design.

---

## 📦 Tech Stack

| Tool               | Link                                                                 |
|--------------------|----------------------------------------------------------------------|
| **Next.js 15**      | https://nextjs.org/docs                                               |
| **Tailwind CSS 4**  | https://tailwindcss.com/docs/guides/nextjs                            |
| **shadcn/ui**       | https://ui.shadcn.com/docs/installation                               |
| **Clerk (Org Mode)**| https://clerk.com/docs/quickstarts/nextjs                             |
| **Drizzle ORM**     | https://orm.drizzle.team/docs/connect-neon                            |
| **Neon Postgres**   | https://neon.tech                                                     |
| **tRPC**            | https://trpc.io/docs/client/react/server-components                   |
| **TanStack Query**  | https://tanstack.com/query/latest/docs/react/overview                 |

---

## 🚀 Setup Instructions

### 1. Create and initialize the project:

```bash
npx create-next-app@latest syndik-app --ts --app --tailwind --src-dir --import-alias "@/*"
cd syndik-app
npm install --legacy-peer-deps
```

### 2. Install core dependencies:

```bash
npm install @clerk/nextjs drizzle-orm pg neon-db zod @tanstack/react-query @trpc/server @trpc/client @trpc/react-query next-safe-action
```

### 3. Initialize Shadcn UI with all components:

```bash
npx shadcn-ui@latest init --all
```

---

## 🧱 Project Structure

Organize the code in a modular way inside `/modules`. Each module has:

```
/modules
  /<module-name>
    /ui
      components/
      views/
    /server
      procedures.ts
    schema.ts
    types.ts
/server
  /trpc
    _app.ts  <-- merge and expose all procedures
```

> 📌 Avoid server actions. All backend logic must reside in `procedures.ts` per module and be registered inside `/server/trpc/_app.ts`.

---

## 🧩 Modules & Features

Each of the following modules should follow the directory structure above. Use **Zod** for schema validation, **Drizzle** for ORM, and **tRPC** for API routing.

### 1. Accounts
- `initAccount()` — setup a user and link to Clerk org.

### 2. Buildings
- CRUD operations using `procedures.ts`.

### 3. Units
- CRUD for apartment units under a building.

### 4. Residents
- CRUD for residents, linked to units.

### 5. Incomes & Expenses
- Create/update/delete with fields like amount, description, month, year.

### 6. Meetings
- Allow CRUD and participant management.

### 7. Dashboard
- Return aggregate metrics (e.g., `getLastMonthResidents`, `getExpensesSum`, `getIncomeSum`).

---

## 🔐 Auth with Clerk

- Enable Clerk Organizations.
- Secure routes/pages with Clerk middleware.
- Use `userId` and `orgId` to scope data.

---

## 💸 Billing Logic

- Monthly SaaS fee per organization manager.
- Allow residents to pay monthly fees online.
- Apply a % commission on each resident transaction.
- Integrate Stripe or any preferred payment processor.

---

## 🌍 UI & Styling

- Use **TailwindCSS** for layout and styling.
- Use **shadcn/ui** for all components.
- UI folder must contain:
  - `components/`: shared UI pieces
  - `views/`: page-level views that combine components

---

## 🧠 Example Instruction for Copilot

```
Copilot, continue implementing the module `residents`:
- Create schema.ts with Zod validation for Resident
- Create types.ts with Resident types
- In procedures.ts, add CRUD tRPC procedures using Drizzle ORM
- Build UI views and reusable components under `ui`
- Register module in /server/trpc/_app.ts
```

---

## ✅ Copilot Prompt

You are building a full SaaS app called "Syndik" to manage residential syndicates. Follow SYNDIK_APP_SPECS.md for complete architecture and instructions. Avoid using server actions. Use tRPC + Drizzle per module with shadcn UI. The logic for each domain (buildings, residents, etc.) is isolated in its own folder.
