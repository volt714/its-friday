# 🎯 Its-Friday
### *The Monday.com-inspired dashboard that makes project management actually enjoyable*

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-13+-black?style=for-the-badge&logo=next.js)
![Prisma](https://img.shields.io/badge/Prisma-4.0+-2D3748?style=for-the-badge&logo=prisma)
![MySQL](https://img.shields.io/badge/MySQL-8.0+-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

**✨ Modern • 🚀 Fast • 🤝 Collaborative • 📱 Responsive**

[🌟 Live Demo](#) • [📖 Documentation](#) • [🐛 Report Bug](#) • [💡 Request Feature](#)

</div>

---

## 🌟 Why Choose Its-Friday?

<table>
<tr>
<td width="33%" align="center">
<h3>🎨 Beautiful UI</h3>
Clean, modern interface that your team will actually want to use
</td>
<td width="33%" align="center">
<h3>⚡ Lightning Fast</h3>
Built with Next.js 13+ and optimized for performance
</td>
<td width="33%" align="center">
<h3>🔐 Secure & Robust</h3>
Role-based access control with enterprise-grade security
</td>
</tr>
</table>

---

## 🚀 Get Started in Under 5 Minutes

### Prerequisites
- Node.js 18+ installed
- MySQL database running
- Git (for cloning)

### 🎬 Quick Setup

```bash
# 1️⃣ Clone the magic
git clone <your-repo-url>
cd its-friday

# 2️⃣ Install dependencies
npm install

# 3️⃣ Configure your database
echo 'DATABASE_URL="mysql://root:123456@localhost:3306/portal_db"' > .env

# 4️⃣ Setup database
npx prisma generate
npx prisma migrate dev --name init

# 5️⃣ Seed with sample data
node prisma/seed.js

# 6️⃣ Launch! 🚀
npm run dev
```

🎉 **That's it!** Open [http://localhost:3000](http://localhost:3000) and start managing your projects!

### 🔑 Default Login Credentials
```
Username: develop123
Password: Test123
```

---

## ✨ Features That Make You Smile

<div align="center">

| Feature | Description | Status |
|---------|-------------|--------|
| 📋 **Kanban Boards** | Drag-and-drop task management | ✅ Ready |
| 👥 **Team Management** | User roles and permissions | ✅ Ready |
| 🔄 **Real-time Updates** | See changes instantly | ✅ Ready |
| 💬 **Chat Widget** | Built-in team communication | ✅ Ready |
| 📱 **Mobile Responsive** | Works beautifully on all devices | ✅ Ready |
| 🎨 **Custom Themes** | Personalize your workspace | 🚧 Coming Soon |

</div>

---

## 🎭 User Roles & Permissions

<div align="center">

```mermaid
graph TD
    A[👑 DEVELOPER] --> B[Full System Access]
    A --> C[User Management]
    A --> D[Impersonation Powers]
    
    E[🛡️ ADMIN] --> F[Manage Groups & Tasks]
    E --> G[Create Users]
    E --> H[Assign USER Role Only]
    
    I[👤 USER] --> J[View Own Tasks]
    I --> K[Update Task Status]
    I --> L[Basic Dashboard Access]
```

</div>

### 🔐 What Each Role Can Do

| Action | DEVELOPER | ADMIN | USER |
|--------|-----------|--------|------|
| Manage all users | ✅ | ❌ | ❌ |
| Impersonate users | ✅ | ❌ | ❌ |
| Create/delete groups | ✅ | ✅ | ❌ |
| Assign any role | ✅ | ❌ | ❌ |
| View all tasks | ✅ | ✅ | Own only |
| Change passwords | ✅ | ✅ | Own only |

---

## 🏗️ Architecture Overview

<div align="center">

```mermaid
graph TB
    A[🌐 Next.js Frontend] --> B[🔧 Server Actions]
    B --> C[🗃️ Prisma ORM]
    C --> D[🐬 MySQL Database]
    
    A --> E[📱 Responsive UI]
    E --> F[📋 Kanban Board]
    E --> G[💬 Chat Widget]
    E --> H[👥 User Management]
    
    style A fill:#0070f3,stroke:#fff,color:#fff
    style D fill:#4479A1,stroke:#fff,color:#fff
```

</div>

---

## 🎯 Perfect For

<table>
<tr>
<td width="25%" align="center">
<h4>🏢 Small Teams</h4>
Perfect for startups and small businesses
</td>
<td width="25%" align="center">
<h4>🎓 Students</h4>
Great for learning modern web development
</td>
<td width="25%" align="center">
<h4>📚 Educational</h4>
Excellent teaching tool for React/Next.js
</td>
<td width="25%" align="center">
<h4>🔨 Side Projects</h4>
Manage your personal projects efficiently
</td>
</tr>
</table>

---

## 🤝 Contributing Made Easy

### 🌱 New to Git? No Problem!

We welcome first-time contributors! Here's your step-by-step guide:

<details>
<summary>🔰 <strong>Git Basics (Click to expand)</strong></summary>

```bash
# Check what's changed
git status

# Add your changes
git add .

# Save your changes with a message
git commit -m "Add awesome new feature"

# Share your changes
git push

# Get latest changes from others
git pull
```

</details>

### 🎯 How to Contribute

1. **🍴 Fork** this repository
2. **🌿 Create** your feature branch: `git checkout -b amazing-feature`
3. **✍️ Commit** your changes: `git commit -m 'Add amazing feature'`
4. **🚀 Push** to the branch: `git push origin amazing-feature`
5. **🎉 Open** a Pull Request

### 💡 Ideas for Contributions

- 🎨 New themes and color schemes
- 📊 Data visualization features
- 🔔 Notification system
- 🌍 Internationalization (i18n)
- 📱 Mobile app companion
- 🤖 AI-powered task suggestions

---

## 🎨 Screenshots

<div align="center">

### 📋 Dashboard Overview
*Clean, intuitive interface that gets out of your way*

### 👥 User Management
*Powerful user controls with role-based permissions*

### 📱 Mobile Experience
*Fully responsive design that works everywhere*

</div>

---

## 🛠️ Advanced Configuration

<details>
<summary><strong>🔧 Environment Variables</strong></summary>

```env
# Database
DATABASE_URL="mysql://user:password@localhost:3306/your_db"

# Authentication (optional)
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Email (for notifications)
EMAIL_SERVER_HOST="smtp.example.com"
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER="your-email@example.com"
EMAIL_SERVER_PASSWORD="your-password"
```

</details>

<details>
<summary><strong>🐳 Docker Support</strong></summary>

```bash
# Run with Docker
docker-compose up -d

# Or build manually
docker build -t its-friday .
docker run -p 3000:3000 its-friday
```

</details>

---

## 🆘 Troubleshooting

<details>
<summary><strong>❓ Common Issues</strong></summary>

**🔒 Can't log in after setup?**
- Use the default account: `develop123` / `Test123`
- Make sure you ran the seed script: `node prisma/seed.js`

**🗄️ Database connection issues?**
- Verify MySQL is running: `systemctl status mysql`
- Check your `.env` file has the correct DATABASE_URL
- Try: `npx prisma db push` to sync the schema

**📦 Dependencies not installing?**
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and `package-lock.json`, then run `npm install`
- Make sure you're using Node.js 18+

**🔄 Database reset needed?**
```bash
npx prisma migrate reset
node prisma/seed.js
```

</details>

---

## 📚 Learning Resources

- 📖 [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features
- 🔧 [Prisma Docs](https://www.prisma.io/docs) - Database toolkit documentation  
- 🎯 [Git Handbook](https://guides.github.com/introduction/git-handbook/) - Git basics
- 🎨 [Tailwind CSS](https://tailwindcss.com/docs) - Styling framework we use

---

## 🌟 Star History

<div align="center">

**If this project helped you, consider giving it a ⭐!**

[![Star History Chart](https://api.star-history.com/svg?repos=yourusername/its-friday&type=Date)](https://star-history.com/#yourusername/its-friday&Date)

</div>

---

## 🤝 Community & Support

<div align="center">

[![Discord](https://img.shields.io/badge/Discord-Join%20Our%20Server-5865F2?style=for-the-badge&logo=discord&logoColor=white)](#)
[![GitHub Discussions](https://img.shields.io/badge/GitHub-Discussions-181717?style=for-the-badge&logo=github&logoColor=white)](#)
[![Twitter](https://img.shields.io/badge/Twitter-Follow%20Updates-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](#)

**💝 Show Your Support**

If you find this project valuable:
- ⭐ Star the repository
- 🐦 Share on social media  
- 🐛 Report bugs and suggest features
- 🤝 Contribute code or documentation

</div>

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

<div align="center">

**Made with ❤️ for the developer community**

*Happy coding! 🚀*

</div>