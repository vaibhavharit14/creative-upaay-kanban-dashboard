# Creative Upaay Dashboard Assignment (Level 1 & 2)

This is my submission for the Full Stack Development Assignment. I have built a Kanban Dashboard that focuses on pixel-perfect UI and smooth user experience. It includes all mandatory features from Level 1 and all 6 enhancement tasks from Level 2.

## Live Demo & Repository
- Live URL: https://creative-upaay-kanban-dashboard.vercel.app/
- GitHub: https://github.com/vaibhavharit14/creative-upaay-kanban-dashboard

## Features Implemented

### Level 1 (Compulsory)
- UI Accuracy: Replicated the Figma design for the Sidebar, Header, and Board.
- Task Management: Implemented Add Task functionality with descriptions and priority levels.
- Drag and Drop: Integrated @dnd-kit for moving tasks between To Do, On Progress, and Done columns.
- Filtering: Added options to filter tasks by priority and due date, along with a global search.
- State Management: Used Redux Toolkit with LocalStorage persistence to keep data across sessions.

### Level 2 (Extra Enhancements)
I have implemented all 6 Level 2 tasks to demonstrate technical depth:
1. Authentication: Added a mock login/logout flow with a demo account option.
2. Due Date & Reminders: Set up visual alerts and a reminder banner for overdue tasks.
3. Subtasks: Added the ability to manage nested tasks within the task detail modal.
4. Real-Time Sync: Used the BroadcastChannel API to sync state across multiple browser tabs automatically.
5. Customizable Fields: Built a tagging system and flexible priority labels.
6. Activity Log: Created a timeline to track status updates and modifications for every task.

## Technical Details
- Styling: I chose Vanilla CSS for this project to have full control over the layout and ensure it matches the design requirements down to the pixel.
- Real-time: The use of BroadcastChannel API allows the app to feel "live" even without a backend database in this frontend-focused assignment.
- Persistence: Data is saved in LocalStorage, meaning your tasks and board state will be there even after a refresh.

## Tech Stack
- React.js (Vite)
- Redux Toolkit
- Lucide React
- @dnd-kit (Core & Sortable)

## How to Run the Project Locally

1. Clone the repository:
   git clone https://github.com/vaibhavharit14/creative-upaay-kanban-dashboard.git

2. Install the necessary dependencies:
   npm install

3. Start the development server:
   npm run dev

---
Created for the Creative Upaay recruitment process.
