import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDroppable } from '@dnd-kit/core';
import { 
  SortableContext, 
  verticalListSortingStrategy 
} from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';
import TaskCard from './TaskCard';
import AddEditTaskModal from './AddEditTaskModal';
import './Column.css';

const Column = ({ column }) => {
  const { filter, selectedDate, searchQuery } = useSelector((state) => state.tasks);
  const { setNodeRef } = useDroppable({
    id: column.id,
    data: { columnId: column.id }
  });
  
  const [showModal, setShowModal] = useState(false);

  const filteredTasks = column.tasks.filter(task => {
    // Priority filter
    const matchesPriority = filter === 'all' || task.priority?.toLowerCase() === filter.toLowerCase();
    
    // Date filter
    const matchesDate = !selectedDate || (task.dueDate && task.dueDate === selectedDate);

    // Search filter
    const matchesSearch = !searchQuery || 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesPriority && matchesDate && matchesSearch;
  });

  return (
    <div className="column" ref={setNodeRef}>
      <div className="column-header">
        <div className="header-left">
          <div className={`status-dot ${column.id}`} />
          <h2>{column.title}</h2>
          <span className="task-count">{filteredTasks.length}</span>
        </div>
        <button className="add-btn" onClick={() => setShowModal(true)}>
          <Plus size={16} />
        </button>
      </div>
      
      <div className={`status-line ${column.id}`} />

      <div className="task-list">
        {filteredTasks.length > 0 ? (
          <SortableContext 
            items={filteredTasks.map(t => t.id)}
            strategy={verticalListSortingStrategy}
          >
            {filteredTasks.map((task) => (
              <TaskCard key={task.id} task={task} columnId={column.id} />
            ))}
          </SortableContext>
        ) : (
          <div className="empty-tasks">
            <p>No Task</p>
          </div>
        )}
      </div>

      {showModal && (
        <AddEditTaskModal 
          columnId={column.id} 
          onClose={() => setShowModal(false)} 
        />
      )}
    </div>
  );
};

export default Column;
