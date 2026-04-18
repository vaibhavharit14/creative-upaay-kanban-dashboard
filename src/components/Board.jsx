import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
} from '@dnd-kit/core';
import { 
  SortableContext, 
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { 
  Filter, 
  Calendar, 
  Users, 
  Rows, 
  Grid,
  Plus,
  Link,
  Edit2,
  Clock
} from 'lucide-react';
import Column from './Column';
import TaskCard from './TaskCard'; 
import { moveTask, setFilter, setSelectedDate } from '../store/taskSlice';
import './Board.css';

const Board = () => {
  const { columns, filter, selectedDate } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [activeTask, setActiveTask] = useState(null);

  // Level 2: Reminder Logic
  const overdueTasks = Object.values(columns)
    .flatMap(col => col.tasks)
    .filter(task => task.dueDate && new Date(task.dueDate) < new Date() && task.priority !== 'Completed');

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event) => {
    const { active } = event;
    const task = Object.values(columns)
      .flatMap(col => col.tasks)
      .find(t => t.id === active.id);
    setActiveTask(task);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveTask(null);
    
    if (over && active.id !== over.id) {
      const sourceColId = active.data.current.columnId;
      const destColId = over.data.current?.columnId || over.id;

      if (sourceColId === destColId) {
        // Handle sorting within same column (simplified for now)
      } else {
        dispatch(moveTask({
          source: { droppableId: sourceColId },
          destination: { droppableId: destColId, index: 0 },
          draggableId: active.id
        }));
      }
    }
  };

  return (
    <main className="board-container scrollable">
      {overdueTasks.length > 0 && (
        <div className="reminder-banner">
          <Clock size={18} />
          <span>You have {overdueTasks.length} overdue tasks that need attention!</span>
          <button className="banner-close" onClick={(e) => e.target.closest('.reminder-banner').remove()}>×</button>
        </div>
      )}
      <div className="board-header">
        <div className="board-title-row">
          <div className="title-left">
            <h1>Mobile App</h1>
            <div className="title-icons">
              <button className="icon-btn edit-btn"><Edit2 size={16} /></button>
              <button className="icon-btn link-btn"><Link size={16} /></button>
            </div>
          </div>
          <div className="board-actions">
            <button className="invite-btn">
              <Plus size={16} color="#5030e5" />
              <span>Invite</span>
            </button>
            <div className="avatar-group">
              <img src="/assets/04304e971f429cc0f3282d0310257ed61402bc86.png" alt="user" />
              <img src="/assets/07f054838a4e99808eed4d84c664f26266a95f18.png" alt="user" />
              <img src="/assets/e87b8dffe89700d2a29bed7562c56b6dd1ca3c5f.png" alt="user" />
              <img src="/assets/c063e946484b5b758f13eb04105a298ceb968092.png" alt="user" />
              <div className="avatar-more">+2</div>
            </div>
          </div>
        </div>

        <div className="board-filters-row">
          <div className="filters-left">
            <div className="filter-select">
              <Filter size={16} />
              <select 
                value={filter} 
                onChange={(e) => dispatch(setFilter(e.target.value))}
              >
                <option value="all">Filter</option>
                <option value="low">Low Priority</option>
                <option value="high">High Priority</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className={`filter-select date-filter ${selectedDate ? 'active' : ''}`}>
              <Calendar size={16} />
              <input 
                type="date" 
                value={selectedDate || ''} 
                onChange={(e) => dispatch(setSelectedDate(e.target.value))}
              />
              {selectedDate && <button className="clear-date" onClick={() => dispatch(setSelectedDate(null))}>×</button>}
            </div>
          </div>
          <div className="filters-right">
            <button className="share-btn">
              <Users size={16} />
              <span>Share</span>
            </button>
            <div className="view-toggle">
              <div className="divider" />
              <button className="toggle-btn active"><Grid size={18} /></button>
              <button className="toggle-btn"><Rows size={18} /></button>
            </div>
          </div>
        </div>
      </div>

      <div className="columns-grid">
        <DndContext 
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          {Object.values(columns).map((column) => (
            <Column key={column.id} column={column} />
          ))}
          <DragOverlay dropAnimation={{
            sideEffects: defaultDropAnimationSideEffects({
              styles: {
                active: {
                  opacity: '0.5',
                },
              },
            }),
          }}>
            {activeTask ? (
              <TaskCard task={activeTask} />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </main>
  );
};

export default Board;
