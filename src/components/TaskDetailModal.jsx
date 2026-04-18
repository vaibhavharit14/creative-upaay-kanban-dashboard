import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { X, Plus, CheckCircle2, Circle, Clock } from 'lucide-react';
import { addSubtask, updateTask } from '../store/taskSlice';
import './Modal.css';

const TaskDetailModal = ({ task, onClose }) => {
  const dispatch = useDispatch();
  const [newSubtask, setNewSubtask] = useState('');

  const handleAddSubtask = (e) => {
    e.preventDefault();
    if (!newSubtask.trim()) return;
    dispatch(addSubtask({
      taskId: task.id,
      subtask: { title: newSubtask, completed: false }
    }));
    setNewSubtask('');
  };

  const toggleSubtask = (subId) => {
    const updatedSubtasks = task.subtasks.map(s => 
      s.id === subId ? { ...s, completed: !s.completed } : s
    );
    dispatch(updateTask({ id: task.id, updates: { subtasks: updatedSubtasks } }));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content detail-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="header-title-group">
            <span className={`priority-badge priority-${task.priority?.toLowerCase()}`}>
              {task.priority || 'Low'}
            </span>
            <h2>{task.title}</h2>
          </div>
          <button onClick={onClose}><X size={20} /></button>
        </div>

        <div className="modal-body scrollable">
          <section className="detail-section">
            <h3>Description</h3>
            <p className="description-text">{task.description || 'No description provided.'}</p>
          </section>

          <section className="detail-section">
            <div className="section-header">
              <h3>Subtasks</h3>
              <span className="count-badge">{task.subtasks?.length || 0}</span>
            </div>
            <div className="subtasks-list">
              {task.subtasks?.map(sub => (
                <div key={sub.id} className="subtask-item" onClick={() => toggleSubtask(sub.id)}>
                  {sub.completed ? <CheckCircle2 size={18} color="#68b266" /> : <Circle size={18} color="#787486" />}
                  <span className={sub.completed ? 'completed' : ''}>{sub.title}</span>
                </div>
              ))}
              <form onSubmit={handleAddSubtask} className="add-subtask-form">
                <input 
                  type="text" 
                  placeholder="Add a subtask..." 
                  value={newSubtask}
                  onChange={e => setNewSubtask(e.target.value)}
                />
                <button type="submit"><Plus size={16} /></button>
              </form>
            </div>
          </section>

          <section className="detail-section">
            <h3>Activity Log</h3>
            <div className="activity-timeline">
              {task.activityLog?.slice().reverse().map((log, idx) => (
                <div key={idx} className="log-item">
                  <div className="log-dot" />
                  <div className="log-content">
                    <span className="log-action">{log.action}</span>
                    <span className="log-time">{new Date(log.time).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailModal;
