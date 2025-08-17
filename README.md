# Its-Friday: Monday-style Dashboard

A modern, collaborative project dashboard inspired by Monday.com, built with Next.js, Prisma, and MySQL. Designed for easy onboarding and contribution, especially for new git users.

---

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd its-friday
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure the Database
- Create a `.env` file in the project root:
  ```
  DATABASE_URL="mysql://root:123456@localhost:3306/portal_db"
  ```
- Make sure MySQL is running and accessible.

### 4. Set Up the Database Schema
```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 5. Seed the Database (Optional, but recommended)
```bash
node prisma/seed.js
```
- This creates a default developer account:
  - **Username:** `develop123`
  - **Password:** `Test123`

### 6. Start the Development Server
```bash
npm run dev
```
- Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📝 Features
- Kanban-style board with groups and tasks
- User authentication and roles (Developer, Admin, User)
- User management (add, delete, impersonate, change password)
- Real-time updates via server actions and revalidation
- Responsive UI with chat widget

---

## 👤 User Management & Roles

### Roles
- **DEVELOPER:** Full access (manage users, groups, tasks, roles, impersonate)
- **ADMIN:** Manage groups, tasks, and users (can only assign USER role)
- **USER:** Can view and update their own tasks

### Default Accounts
- After seeding, log in as:
  - **Username:** `develop123`
  - **Password:** `Test123`

### Creating Users
- Go to `/users` or `/signup` to add new users.
- You can set the role (USER, ADMIN, DEVELOPER) during signup.

### Managing Users
- **Impersonate:** Use the "Use" button on the Users page to switch to another user (DEVELOPER only).
- **Change Role:** Select a new role and click "Save" (DEVELOPER can assign any role, ADMIN can only assign USER).
- **Change Password:** Enter a new password and click "Set" (self, ADMIN, or DEVELOPER).
- **Delete:** Click "Delete" (ADMIN or DEVELOPER only).

---

## 🛠️ Project Structure
- `prisma/schema.prisma` — Database models
- `prisma/seed.js` — Seeds default users, groups, and tasks
- `src/app/` — Next.js app directory (pages, components, actions)
- `src/lib/` — Prisma client and authentication helpers

---

## 🧑‍💻 Git & Contribution Guide

### Git Basics for New Users
- **Clone:** `git clone <repo-url>`
- **Check Status:** `git status`
- **Add Changes:** `git add <file>`
- **Commit:** `git commit -m "Your message"`
- **Push:** `git push`
- **Pull:** `git pull`

### Contributing Workflow
1. **Fork** this repo and clone your fork.
2. **Create a new branch** for your feature or fix:
   ```bash
   git checkout -b my-feature
   ```
3. **Make your changes** and commit them.
4. **Push** your branch:
   ```bash
   git push origin my-feature
   ```
5. **Open a Pull Request** on GitHub.

### Tips
- Keep commits small and focused.
- Write clear commit messages.
- Ask for help if you get stuck!

---

## 🏗️ Architecture & Data Flow

- Next.js App Router (server components)
- Prisma ORM for MySQL
- UI: TopNav, Sidebar, ProjectHeader, ActionBar, GroupsBoard, ChatWidget
- Server actions for all mutations (create/update/delete)
- Automatic UI refresh via `revalidatePath`

---

## 🗃️ Database Schema (Simplified)
- **Group:** id, name, order, createdAt, updatedAt
- **Task:** id, title, owner, ownerId, status, dueDate, groupId, createdAt, updatedAt
- **User:** id, name, email, passwordHash, role, createdAt, updatedAt
- **TaskAssignee:** taskId, userId
- **TaskMessage:** id, taskId, userId, body, createdAt

---

## 💡 FAQ

**Q: I can't log in after seeding!**
- Use the default developer account: `develop123` / `Test123`

**Q: How do I reset the database?**
- Run `npx prisma migrate reset` and then `node prisma/seed.js`

**Q: How do I add more users?**
- Use the Users page (`/users`) or the Signup page (`/signup`).

**Q: How do I contribute if I'm new to git?**
- See the Git Basics and Contributing Workflow above.

---

## 📚 Learn More
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [GitHub Docs: Getting Started with Git](https://docs.github.com/en/get-started/quickstart)

---

## 🛡️ License
MIT
