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
        }
      ] 
    },
    'progress': { 
      id: 'progress', 
      title: 'Progress', 
      tasks: [
        { 
          id: 'task-3', 
          title: 'Brainstorming', 
          description: 'Brainstorming brings team members\' diverse backgrounds into play. ', 
          priority: 'Low',
          commentsCount: 12,
          filesCount: 0,
          activityLog: [],
        },
        { 
          id: 'task-7', 
          title: 'Brainstorming', 
          description: 'Brainstorming brings team members\' diverse backgrounds into play. ', 
          priority: 'Low',
          commentsCount: 12,
          filesCount: 0,
          activityLog: [],
        },
        { 
          id: 'task-8', 
          title: 'Brainstorming', 
          description: 'Brainstorming brings team members\' diverse backgrounds into play. ', 
          priority: 'Low',
          commentsCount: 12,
          filesCount: 0,
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
          title: 'Brainstorming', 
          description: 'Brainstorming brings team members\' diverse backgrounds into play. ', 
          priority: 'Low',
          commentsCount: 12,
          filesCount: 0,
          activityLog: [],
        },
        { 
          id: 'task-9', 
          title: 'Design System', 
          description: 'It just needs to adapt the UI from what you did before', 
          priority: 'Completed',
          commentsCount: 12,
          filesCount: 15,
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
