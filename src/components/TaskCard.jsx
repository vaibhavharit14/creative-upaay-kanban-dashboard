import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { MessageSquare, Files, MoreHorizontal, Clock, Trash2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../store/taskSlice';
import TaskDetailModal from './TaskDetailModal';
import './TaskCard.css';

const TaskCard = ({ task, columnId }) => {
  const dispatch = useDispatch();
  const [showDetail, setShowDetail] = React.useState(false);
  const [showMenu, setShowMenu] = React.useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ 
    id: task.id,
    data: { columnId }
  });

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask({ id: task.id }));
      setShowMenu(false);
    }
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const getPriorityStyle = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'low': return 'priority-low';
      case 'high': return 'priority-high';
      case 'completed': return 'priority-done';
      default: return 'priority-low';
    }
  };

  const isLate = task.dueDate && new Date(task.dueDate) < new Date() && task.priority !== 'Completed';

  return (
    <>
      <div 
        className={`task-card ${isLate ? 'late-task' : ''}`}
        ref={setNodeRef} 
        style={style} 
        onClick={() => setShowDetail(true)}
        {...attributes} 
        {...listeners}
      >
        <div className="card-header">
          <span className={`priority-badge ${getPriorityStyle(task.priority)}`}>
            {task.priority || 'Low'}
          </span>
          <div className="card-header-right" onClick={(e) => e.stopPropagation()}>
            <button className="more-btn" onClick={() => setShowMenu(!showMenu)}>
              <MoreHorizontal size={16} />
            </button>
            {showMenu && (
              <div className="card-dropdown">
                <button className="dropdown-item delete" onClick={handleDelete}>
                  <Trash2 size={14} />
                  <span>Delete Task</span>
                </button>
              </div>
            )}
          </div>
        </div>

        <h3 className="task-title">{task.title}</h3>
        <p className="task-desc">{task.description}</p>
        
        {task.tags?.length > 0 && (
          <div className="task-tags">
            {task.tags.map((tag, idx) => (
              <span key={idx} className="tag">#{tag}</span>
            ))}
          </div>
        )}

        {task.dueDate && (
          <div className={`task-date ${isLate ? 'date-late' : ''}`}>
            <Clock size={12} />
            <span>Due: {new Date(task.dueDate).toLocaleDateString()} {isLate && '(LATE)'}</span>
          </div>
        )}

        {task.image && (
          <div className="task-image">
            <img src={task.image} alt="task preview" />
          </div>
        )}

        <div className="card-footer">
          <div className="avatar-group-small">
            <img src="/assets/04304e971f429cc0f3282d0310257ed61402bc86.png" alt="avatar" />
            <img src="/assets/07f054838a4e99808eed4d84c664f26266a95f18.png" alt="avatar" />
            <img src="/assets/e87b8dffe89700d2a29bed7562c56b6dd1ca3c5f.png" alt="avatar" />
          </div>
          
          <div className="task-stats">
            <div className="stat-item">
              <MessageSquare size={14} />
              <span>{task.commentsCount || 0} comments</span>
            </div>
            <div className="stat-item">
              <Files size={14} />
              <span>{task.filesCount || 0} files</span>
            </div>
          </div>
        </div>
      </div>
      {showDetail && <TaskDetailModal task={task} onClose={() => setShowDetail(false)} />}
    </>
  );
};

export default TaskCard;
