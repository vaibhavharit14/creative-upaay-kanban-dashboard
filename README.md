# 🎯 Creative Upaay Dashboard Assignment (Level 1 & 2)

Welcome to my submission for the Full Stack Development Assignment. I have implemented a pixel-perfect, feature-rich Kanban Dashboard that strictly adheres to the Figma design while incorporating **all mandatory Level 1 features** and **all 6 Level 2 enhancements**.

## 🚀 Live Demo & Repository
- **Live URL**: [Replace with your Vercel/Netlify Link]
- **GitHub**: [Replace with your GitHub Link]

## ✨ Features Implemented

### ✅ Level 1 (100% Complete - Compulsory)
- **UI Accuracy**: Pixel-perfect replication of Figma (Sidebar, Header, Board).
- **Task Management**: Fully functional Add Task, Dynamic Descriptions, and Priority badges.
- **Drag and Drop**: Smooth task movement between "To Do", "On Progress", and "Done" using `@dnd-kit`.
- **Filtering**: Instant filtering by **Priority**, **Due Date**, and a **Global Search** feature.
- **State Management**: Robust state handling with **Redux Toolkit** and **LocalStorage persistence**.

### 🔥 Level 2 (100% Complete - Extra Polish)
Implemented **6 out of 6** Level 2 tasks for maximum competitive advantage:
1.  **Authentication**: Mock login/logout flow with a "Login with Demo Account" shortcut for recruiters.
2.  **Due Date & Reminders**: Visual alerts and a premium **Reminder Banner** for overdue tasks.
3.  **Subtasks**: Nested task management within the detail modal.
4.  **Real-Time Sync**: Cross-tab synchronization using the **BroadcastChannel API** (Simulating live server behavior).
5.  **Customizable Fields**: Flexible tagging system and custom priority labels.
6.  **Activity Log**: Detailed history timeline for every task, tracking all status updates and modifications.

## 🛠️ Technical Choices & Assumptions
- **Styling**: Used **Vanilla CSS** instead of Tailwind to ensure complete control over the design tokens and pixel-perfect alignment with Figma.
- **Real-time**: Implemented `BroadcastChannel` for a zero-setup "real-time" experience across tabs, perfect for a frontend-heavy recruiter review.
- **Persistence**: Hybrid persistence strategy (Redux + LocalStorage) ensures UI state (filters, search) and Task state (columns) are preserved.

## 💻 Tech Stack
- **Framework**: React.js (Vite)
- **State**: Redux Toolkit
- **Icons**: Lucide React
- **DND**: @dnd-kit/core & @dnd-kit/sortable

## 📦 Local Setup Instructions

1.  **Clone the Repo**:
    ```bash
    git clone https://github.com/your-username/creative-upaay-dashboard.git
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Run Locally**:
    ```bash
    npm run dev
    ```

---
*Created with ❤️ for the Creative Upaay recruitment process.*
