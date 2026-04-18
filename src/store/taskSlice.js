import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  columns: {
    'todo': { 
      id: 'todo', 
      title: 'To Do', 
      tasks: [
        { 
          id: 'task-1', 
          title: 'Brainstorming', 
          description: 'Brainstorming brings team members\' diverse backgrounds into play. ', 
          priority: 'Low',
          commentsCount: 12,
          filesCount: 0,
          activityLog: [],
        },
        { 
          id: 'task-2', 
          title: 'Research', 
          description: 'User research helps you to create an optimal product for users.', 
          priority: 'High',
          commentsCount: 10,
          filesCount: 3,
          activityLog: [],
        },
        { 
          id: 'task-5', 
          title: 'Wireframes', 
          description: 'Low fidelity wireframes include the most basic content and visuals.', 
          priority: 'High',
          commentsCount: 2,
          filesCount: 5,
          activityLog: [],
        },
        { 
          id: 'task-6', 
          title: 'User Flows', 
          description: 'Define the path users take through the application.', 
          priority: 'Low',
          commentsCount: 5,
          filesCount: 1,
          activityLog: [],
        },
        { 
          id: 'task-10', 
          title: 'Finalize Assets', 
          description: 'Export all icons and images from Figma for production.', 
          priority: 'Low',
          commentsCount: 3,
          filesCount: 8,
          activityLog: [],
        },
        { 
          id: 'task-11', 
          title: 'Mobile Responsiveness', 
          description: 'Check layout on various screen sizes and fix breakpoints.', 
          priority: 'High',
          commentsCount: 7,
          filesCount: 2,
          activityLog: [],
        }
      ] 
    },
    'progress': { 
      id: 'progress', 
      title: 'Progress', 
      tasks: [
        { 
          id: 'task-3', 
          title: 'State Management', 
          description: 'Implementing Redux Toolkit for centralized data handling.', 
          priority: 'Low',
          commentsCount: 14,
          filesCount: 15,
          activityLog: [],
        },
        { 
          id: 'task-12', 
          title: 'API Integration', 
          description: 'Connecting the frontend with the mock backend services.', 
          priority: 'High',
          commentsCount: 12,
          filesCount: 4,
          activityLog: [],
        },
        { 
          id: 'task-13', 
          title: 'Form Validation', 
          description: 'Add client-side validation for all input fields.', 
          priority: 'Low',
          commentsCount: 6,
          filesCount: 0,
          activityLog: [],
        },
        { 
          id: 'task-14', 
          title: 'Auth Logic', 
          description: 'Refining the login persistence with LocalStorage.', 
          priority: 'High',
          commentsCount: 9,
          filesCount: 1,
          activityLog: [],
        }
      ] 
    },
    'done': { 
      id: 'done', 
      title: 'Done', 
      tasks: [
        { 
          id: 'task-4', 
          title: 'Design System', 
          description: 'Created a reusable component library for the project.', 
          priority: 'Completed',
          commentsCount: 12,
          filesCount: 15,
          activityLog: [],
        },
        { 
          id: 'task-9', 
          title: 'Deployment', 
          description: 'Successfully deployed the application to Vercel.', 
          priority: 'Completed',
          commentsCount: 5,
          filesCount: 1,
          activityLog: [],
        },
        { 
          id: 'task-15', 
          title: 'Bug Fixing', 
          description: 'Resolved all critical issues found during the QA phase.', 
          priority: 'Completed',
          commentsCount: 20,
          filesCount: 2,
          activityLog: [],
        },
        { 
          id: 'task-16', 
          title: 'UI Polish', 
          description: 'Ensured pixel-perfect alignment and smooth animations.', 
          priority: 'Completed',
          commentsCount: 4,
          filesCount: 0,
          activityLog: [],
        }
      ] 
    },
  },
  filter: 'all',
  selectedDate: null,
  searchQuery: '',
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { columnId, task } = action.payload;
      const newTask = {
        ...task,
        id: `task-${Date.now()}`,
        subtasks: [],
        activityLog: [{ action: 'Created task', time: new Date().toISOString() }],
        createdAt: new Date().toISOString(),
      };
      state.columns[columnId].tasks.unshift(newTask);
    },
    moveTask: (state, action) => {
      const { source, destination, draggableId } = action.payload;
      
      if (!destination) return;

      const sourceCol = state.columns[source.droppableId];
      const destCol = state.columns[destination.droppableId];
      
      if (source.droppableId === destination.droppableId) {
        const tasks = Array.from(sourceCol.tasks);
        const [removed] = tasks.splice(source.index, 1);
        tasks.splice(destination.index, 0, removed);
        state.columns[source.droppableId].tasks = tasks;
      } else {
        const sourceTasks = Array.from(sourceCol.tasks);
        const destTasks = Array.from(destCol.tasks);
        const taskIndex = sourceTasks.findIndex(t => t.id === draggableId);
        const [movedTask] = sourceTasks.splice(taskIndex, 1);
        
        movedTask.activityLog.push({
          action: `Moved from ${sourceCol.title} to ${destCol.title}`,
          time: new Date().toISOString()
        });

        destTasks.splice(destination.index, 0, movedTask);
        state.columns[source.droppableId].tasks = sourceTasks;
        state.columns[destination.droppableId].tasks = destTasks;
      }
    },
    updateTask: (state, action) => {
      const { id, updates } = action.payload;
      Object.keys(state.columns).forEach(colId => {
        const task = state.columns[colId].tasks.find(t => t.id === id);
        if (task) {
          Object.assign(task, updates);
          task.activityLog.push({
            action: `Updated: ${Object.keys(updates).join(', ')}`,
            time: new Date().toISOString()
          });
        }
      });
    },
    deleteTask: (state, action) => {
      const { id } = action.payload;
      Object.keys(state.columns).forEach(colId => {
        state.columns[colId].tasks = state.columns[colId].tasks.filter(t => t.id !== id);
      });
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    addSubtask: (state, action) => {
      const { taskId, subtask } = action.payload;
      Object.keys(state.columns).forEach(colId => {
        const task = state.columns[colId].tasks.find(t => t.id === taskId);
        if (task) {
          task.subtasks.push({ id: `sub-${Date.now()}`, ...subtask });
          task.activityLog.push({ action: `Added subtask: ${subtask.title}`, time: new Date().toISOString() });
        }
      });
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    syncState: (state, action) => {
      return action.payload;
    }
  },
});

export const { addTask, moveTask, updateTask, deleteTask, setFilter, setSelectedDate, setSearchQuery, addSubtask, syncState } = taskSlice.actions;
export default taskSlice.reducer;
