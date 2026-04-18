import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Search, 
  Calendar, 
  MessageCircle, 
  Bell, 
  ChevronDown,
  Menu
} from 'lucide-react';
import './Header.css';
import { logout } from '../store/authSlice';
import { setSearchQuery } from '../store/taskSlice';

const Header = ({ onMenuClick }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [showMenu, setShowMenu] = React.useState(false);

  return (
    <header className="header">
      <div className="header-left-mobile">
        <button className="menu-toggle" onClick={onMenuClick}>
          <Menu size={24} />
        </button>
      </div>
      <div className="search-bar">
        <Search size={18} color="#787486" />
        <input 
          type="text" 
          placeholder="Search for anything..." 
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        />
      </div>

      <div className="header-right">
        <div className="header-icons">
          <Calendar size={20} color="#787486" />
          <MessageCircle size={20} color="#787486" />
          <Bell size={20} color="#787486" />
        </div>

        <div className="user-profile-container">
          <div className="user-profile" onClick={() => setShowMenu(!showMenu)}>
            <div className="user-info">
              <span className="user-name">{user?.name || 'User'}</span>
              <span className="user-location">U.P, India</span>
            </div>
            <img 
              src="/assets/ad3f99f8bef8aecd2e54d68c4d642e43a47c99ab.png" 
              alt="User" 
              className="user-avatar" 
            />
            <ChevronDown size={16} color="#0D062D" className={showMenu ? 'rotated' : ''} />
          </div>

          {showMenu && (
            <div className="user-dropdown">
              <div className="dropdown-header">
                <strong>{user?.name}</strong>
                <span>{user?.email}</span>
              </div>
              <button className="logout-btn" onClick={() => dispatch(logout())}>
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
