import React from 'react';

export default function Sidebar({ activeScreen, setActiveScreen, loanBadgeCount }) {
  const menuItems = [
    {
      section: 'OVERVIEW',
      items: [
        {
          id: 'dashboard',
          label: 'Dashboard',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
            </svg>
          ),
        },
        {
          id: 'customers',
          label: 'Customer 360',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          ),
        },
      ],
    },
    {
      section: 'LENDING',
      items: [
        {
          id: 'origination',
          label: 'Loan Origination',
          badge: loanBadgeCount,
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          ),
        },
        {
          id: 'repayments',
          label: 'Repayments',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          ),
        },
        {
          id: 'collections',
          label: 'Collections',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
        },
      ],
    },
    {
      section: 'OPERATIONS',
      items: [
        {
          id: 'accounting',
          label: 'Accounting & GL',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          ),
        },
        {
          id: 'users',
          label: 'User Management',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ),
        },
        {
          id: 'settings',
          label: 'Settings',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          ),
        },
      ],
    },
  ];

  return (
    <aside className="sidebar">
      {/* Brand Header */}
      <div className="brand-header">
        <div className="brand-logo">
          <span>V</span>
        </div>
        <div className="brand-info">
          <h1>Veridian</h1>
          <p>CORE BANKING</p>
        </div>
      </div>

      {/* Navigation Groups */}
      <nav className="sidebar-nav">
        {menuItems.map((group) => (
          <div key={group.section} className="nav-group">
            <span className="nav-group-title">{group.section}</span>
            <ul className="nav-group-list">
              {group.items.map((item) => {
                const isActive = activeScreen === item.id || 
                  (item.id === 'customers' && activeScreen === 'add-customer') ||
                  (item.id === 'repayments' && activeScreen === 'record-payment') ||
                  (item.id === 'collections' && activeScreen === 'add-collection');
                return (
                  <li key={item.id} className="nav-item-wrapper">
                    <button
                      onClick={() => setActiveScreen(item.id)}
                      className={`nav-item ${isActive ? 'active' : ''}`}
                    >
                      <span className="nav-item-icon">{item.icon}</span>
                      <span className="nav-item-label">{item.label}</span>
                      {item.badge !== undefined && item.badge > 0 && (
                        <span className="nav-item-badge">{item.badge}</span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer Branch Info */}
      <div className="sidebar-footer">
        <div className="branch-info-card">
          <div className="pulsing-dot-container">
            <span className="pulsing-dot"></span>
          </div>
          <div className="branch-details">
            <h3>Horizon Finance Ltd.</h3>
            <p>RBI Reg · NBFC-ICC</p>
          </div>
        </div>
      </div>

      {/* Sidebar Specific CSS */}
      <style>{`
        .sidebar {
          width: 280px;
          background-color: var(--bg-sidebar);
          color: var(--text-white);
          display: flex;
          flex-direction: column;
          border-right: 1px solid var(--border);
          position: sticky;
          top: 0;
          height: 100vh;
          z-index: 10;
          overflow-y: auto;
          box-shadow: var(--shadow-sm);
        }

        .brand-header {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 24px 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .brand-logo {
          width: 42px;
          height: 42px;
          background: linear-gradient(135deg, var(--accent) 0%, #C99E4A 100%);
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #032116;
          font-family: var(--font-serif);
          font-weight: 700;
          font-size: 1.5rem;
          box-shadow: 0 4px 10px rgba(226, 178, 91, 0.2);
        }

        .brand-info h1 {
          font-family: var(--font-serif);
          font-size: 1.35rem;
          font-weight: 600;
          color: var(--text-white);
          line-height: 1.2;
          margin: 0;
          letter-spacing: 0.5px;
        }

        .brand-info p {
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 1.5px;
          color: var(--accent);
          text-transform: uppercase;
          margin-top: 2px;
        }

        .sidebar-nav {
          flex: 1;
          padding: 20px 14px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .nav-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .nav-group-title {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 1px;
          color: rgba(255, 255, 255, 0.4);
          padding-left: 12px;
          margin-bottom: 4px;
        }

        .nav-group-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .nav-item-wrapper {
          width: 100%;
        }

        .nav-item {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          background: none;
          border: none;
          border-radius: var(--radius-sm);
          color: rgba(255, 255, 255, 0.7);
          text-align: left;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 0.92rem;
          font-weight: 500;
        }

        .nav-item:hover {
          background-color: rgba(255, 255, 255, 0.04);
          color: var(--text-white);
        }

        .nav-item.active {
          background-color: rgba(255, 255, 255, 0.08);
          color: var(--text-white);
          font-weight: 600;
          border-left: 3px solid var(--accent);
          padding-left: 9px;
        }

        .nav-item-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.6);
          transition: color 0.2s ease;
        }

        .nav-item.active .nav-item-icon {
          color: var(--accent);
        }

        .nav-item:hover .nav-item-icon {
          color: var(--text-white);
        }

        .nav-item-badge {
          margin-left: auto;
          background-color: var(--accent);
          color: #032116;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 1px 6px;
          border-radius: 50%;
          min-width: 18px;
          text-align: center;
        }

        .sidebar-footer {
          padding: 16px 14px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .branch-info-card {
          background-color: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: var(--radius-md);
          padding: 12px 14px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .pulsing-dot-container {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .branch-details h3 {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-white);
          margin-bottom: 2px;
        }

        .branch-details p {
          font-size: 0.68rem;
          color: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </aside>
  );
}
