import React from 'react';
import { 
  LayoutDashboard, 
  MessageSquare, 
  CheckSquare, 
  Users, 
  Settings, 
  PlusSquare,
  MoreHorizontal,
  Lightbulb,
  ChevronsLeft
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Home' },
    { icon: <MessageSquare size={20} />, label: 'Messages' },
    { icon: <CheckSquare size={20} />, label: 'Tasks' },
    { icon: <Users size={20} />, label: 'Members' },
    { icon: <Settings size={20} />, label: 'Settings' },
  ];

  const projects = [
    { name: 'Mobile App', color: '#7AC555', active: true },
    { name: 'Website Redesign', color: '#FFA500' },
    { name: 'Design System', color: '#E4CCFD' },
    { name: 'Wireframes', color: '#76A5EA' },
  ];

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo-container">
            <img src="/assets/colorfilter.png" alt="logo" className="logo-icon" />
            <span className="logo-text">Project M.</span>
          </div>
          <button className="sidebar-toggle" onClick={onClose}>
            <ChevronsLeft size={20} color="#787486" />
          </button>
        </div>

      <div className="sidebar-content">
        <nav className="sidebar-nav">
          <ul>
            {menuItems.map((item, index) => (
              <li key={index} className={item.label === 'Home' ? 'active' : ''}>
                {item.icon}
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-projects">
          <div className="projects-header">
            <span>MY PROJECTS</span>
            <PlusSquare size={16} color="#787486" />
          </div>
          <ul>
            {projects.map((proj, index) => (
              <li key={index} className={proj.active ? 'active-proj' : ''}>
                <div className="project-dot" style={{ backgroundColor: proj.color }} />
                <span>{proj.name}</span>
                {proj.active && <MoreHorizontal size={16} />}
              </li>
            ))}
          </ul>
        </div>

        <div className="sidebar-footer">
          <div className="thoughts-box">
            <div className="thought-icon">
              <Lightbulb size={24} color="#FBCB18" fill="#FBCB18" />
            </div>
            <h3>Thoughts Time</h3>
            <p>We don't have any notice for today, pill after tomorrow you can write it.</p>
            <button className="write-button">Write a message</button>
          </div>
        </div>
      </div>
      </aside>
    </>
  );
};

export default Sidebar;
