---

# Student Management System (MVP)

This is a quick MVP of a **Student Management System** built using **Next.js**. The app allows basic student and payment management, with a dashboard for an overview of fee and student data.

**Live App** [Student Management System](https://student-management-system-42m1.onrender.com)

## Features

- **Student Management**
  - Create, Read, Update, Delete (CRUD) operations for students.

- **Payment Management**
  - Add and delete payments for each student.

- **Dashboard**
  - Overview of student count and fees collected.
  - Pie chart for visual analytics (currently mock data).

## Technologies Used

- **Frontend**: Next.js (v14), React (v18), TypeScript
- **Styling**: Tailwind CSS, Heroicons
- **State Management**: Recoil
- **Form Validation**: Zod
- **Charts**: Recharts
- **Notifications**: React Toastify
- **API Calls**: Axios
- **Database**: Prisma ORM with PostgreSQL (assumed)

## Scripts

```bash
pnpm dev       # Start development server
pnpm build     # Generate Prisma client and build Next.js app
pnpm start     # Start production server
```

## Notes

- This is an MVP version, so some features like live data on the dashboard are not fully implemented yet.
- The project is deployed on [Render.com](https://render.com).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
