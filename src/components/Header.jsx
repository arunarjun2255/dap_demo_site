import React from 'react';

export default function Header({
  activeScreen,
  darkMode,
  setDarkMode,
  onSearchClick,
}) {
  const getScreenTitle = () => {
    switch (activeScreen) {
      case 'dashboard':
        return 'Dashboard';
      case 'customers':
        return 'Customer 360';
      case 'origination':
        return 'Loan Origination';
      case 'repayments':
        return 'Repayments Ledger';
      case 'collections':
        return 'Collections & Recovery';
      case 'accounting':
        return 'Accounting & GL';
      case 'users':
        return 'User Management';
      case 'settings':
        return 'System Settings';
      case 'new-application':
        return 'New Loan Application';
      case 'add-customer':
        return 'Customer Onboarding';
      case 'record-payment':
        return 'Record Payment';
      case 'add-collection':
        return 'Add Collection Case';
      default:
        return 'Veridian';
    }
  };

  return (
    <header className="app-header">
      {/* Breadcrumb section */}
      <div className="header-left">
        <div className="breadcrumbs">
          <span className="breadcrumb-parent">Veridian</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{getScreenTitle()}</span>
        </div>
      </div>

      {/* Action / Search / Profile section */}
      <div className="header-right">
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="header-icon-btn dark-mode-toggle"
          title="Toggle Dark Mode"
        >
          {darkMode ? (
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
            </svg>
          ) : (
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>

        {/* Notifications Icon */}
        <div className="notification-bell-container">
          <button className="header-icon-btn notification-btn">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="notification-badge"></span>
          </button>
        </div>


        {/* Profile Card */}
        <div className="user-profile">
          <div className="user-avatar">
            <span>AK</span>
          </div>
          <div className="user-info">
            <span className="user-name">Ananya Kulkarni</span>
            <span className="user-role">Administrator</span>
          </div>
        </div>
      </div>

      {/* Header CSS */}
      <style>{`
        .app-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 72px;
          padding: 0 40px;
          background-color: var(--bg-card);
          border-bottom: 1px solid var(--border);
          position: sticky;
          top: 0;
          z-index: 9;
        }

        .breadcrumbs {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.92rem;
          font-weight: 500;
        }

        .breadcrumb-parent {
          color: var(--text-muted);
        }

        .breadcrumb-separator {
          color: var(--border);
          font-size: 0.8rem;
        }

        .breadcrumb-current {
          color: var(--text-main);
          font-weight: 600;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .search-bar-container {
          display: flex;
          align-items: center;
          gap: 8px;
          background-color: var(--bg-app);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 8px 14px;
          width: 320px;
          cursor: pointer;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .search-bar-container:hover {
          border-color: var(--text-muted);
        }

        .search-icon {
          color: var(--text-muted);
        }

        .search-input {
          background: none;
          border: none;
          font-size: 0.88rem;
          color: var(--text-main);
          width: 100%;
          outline: none;
          cursor: pointer;
        }

        .search-shortcut {
          background-color: var(--bg-card);
          color: var(--text-muted);
          border: 1px solid var(--border);
          border-radius: 4px;
          padding: 2px 6px;
          font-size: 0.7rem;
          font-weight: 600;
          font-family: var(--font-sans);
          box-shadow: var(--shadow-sm);
        }

        .header-icon-btn {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border);
          background-color: var(--bg-card);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.2s;
        }

        .header-icon-btn:hover {
          color: var(--text-main);
          background-color: var(--bg-app);
          border-color: var(--text-muted);
        }

        .notification-bell-container {
          position: relative;
        }

        .notification-badge {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 8px;
          height: 8px;
          background-color: var(--accent);
          border: 2px solid var(--bg-card);
          border-radius: 50%;
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 10px;
          padding-left: 8px;
        }

        .user-avatar {
          width: 38px;
          height: 38px;
          background-color: var(--primary);
          color: var(--bg-card);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.88rem;
          font-weight: 700;
        }
        
        .dark-theme .user-avatar {
          background-color: var(--primary);
          color: #032116;
        }

        .user-info {
          display: flex;
          flex-direction: column;
        }

        .user-name {
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-main);
          line-height: 1.2;
        }

        .user-role {
          font-size: 0.72rem;
          color: var(--text-muted);
        }

        @media (max-width: 900px) {
          .search-bar-container {
            width: 200px;
          }
          .user-info {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
