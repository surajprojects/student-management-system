---

# Student Management System (Completed)

This is a **fully functional Student Management System** built using **Next.js**. The app allows student, batch, course, and payment management, with authentication and a dashboard to track everything at a glance.

**Live App**: [Student Management System](https://student-management-system-42m1.onrender.com)

## Features

- **Authentication**
  - Secure login and registration using NextAuth (credentials provider).
  - Each user sees only their own data (students, batches, courses, payments).

- **Student Management**
  - Create, Read, Update, Delete (CRUD) operations for students.

- **Batch & Course Management**
  - Full CRUD for batches and courses.
  - Assign students to specific batches and courses.

- **Payment Management**
  - Add and delete payments for each student.
  - Add payments directly from the student list or profile page.

- **Dashboard**
  - Overview of student count and fees collected.
  - Pie chart for visual analytics (now shows live data).

- **Fee Tracker**
  - View all students in a table with payment status.
  - Quickly add payments from the table.

## Technologies Used

- **Frontend**: Next.js (v14), React (v18), TypeScript
- **Styling**: Tailwind CSS, Heroicons
- **State Management**: Recoil
- **Form Validation**: Zod
- **Authentication**: NextAuth.js
- **Charts**: Recharts
- **Notifications**: React Toastify
- **API Calls**: Axios
- **Database**: Prisma ORM with PostgreSQL

## Scripts

```bash
pnpm dev       # Start development server
pnpm build     # Generate Prisma client and build Next.js app
pnpm start     # Start production server
```

## Notes

- All features are now live and user-specific.
- The project is deployed on [Render.com](https://render.com).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
