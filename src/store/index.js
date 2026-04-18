import { configureStore } from '@reduxjs/toolkit';
import taskReducer, { syncState } from './taskSlice';
import authReducer from './authSlice';

// Load state from local storage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('dashboard_state');
    if (serializedState === null) return undefined;
    const state = JSON.parse(serializedState);
    return state;
  } catch (err) {
    return undefined;
  }
};

// Save state to local storage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('dashboard_state', serializedState);
  } catch (err) {
    // Ignore write errors
  }
};

const store = configureStore({
  reducer: {
    tasks: taskReducer,
    auth: authReducer,
  },
  preloadedState: loadState(),
});

// Level 2: Real-time Sync (Simulating Socket.io via BroadcastChannel)
const channel = new BroadcastChannel('dashboard_sync');

store.subscribe(() => {
  const state = store.getState();
  saveState(state);
  // Only broadcast if this is the tab that made the change
  channel.postMessage({ type: 'SYNC_STATE', state: state.tasks });
});

channel.onmessage = (event) => {
  if (event.data.type === 'SYNC_STATE') {
    const currentState = store.getState().tasks;
    // Only dispatch if state is actually different to prevent infinite loops
    if (JSON.stringify(currentState) !== JSON.stringify(event.data.state)) {
      store.dispatch(syncState(event.data.state));
    }
  }
};

export default store;
