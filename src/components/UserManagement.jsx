import React, { useState } from 'react';

const mockUsers = [
  { id: 'USR-01', name: 'Ananya Kulkarni', email: 'ananya.k@veridian.com', role: 'Administrator', status: 'Active', branch: 'Mumbai HQ', lastLogin: 'Online Now' },
  { id: 'USR-02', name: 'Karthik Rao', email: 'karthik.r@veridian.com', role: 'Underwriter Officer', status: 'Active', branch: 'Mumbai HQ', lastLogin: '28 May, 11:32 AM' },
  { id: 'USR-03', name: 'Siddharth Sen', email: 'siddharth.s@veridian.com', role: 'Collections Lead', status: 'Active', branch: 'Bengaluru Office', lastLogin: '28 May, 10:14 AM' },
  { id: 'USR-04', name: 'Pooja Hegde', email: 'pooja.h@veridian.com', role: 'General Accountant', status: 'Inactive', branch: 'Mumbai HQ', lastLogin: '24 May, 04:30 PM' },
  { id: 'USR-05', name: 'Vikram Singh', email: 'vikram.s@veridian.com', role: 'Credit risk manager', status: 'Active', branch: 'Delhi NCR', lastLogin: '28 May, 09:05 AM' }
];

export default function UserManagement() {
  const [users, setUsers] = useState(mockUsers);
  const [isAdding, setIsAdding] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState('Underwriter Officer');

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail) return;

    const newUser = {
      id: `USR-0${users.length + 1}`,
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      status: 'Active',
      branch: 'Mumbai HQ',
      lastLogin: 'Never logged in'
    };

    setUsers([...users, newUser]);
    setNewUserName('');
    setNewUserEmail('');
    setIsAdding(false);
  };

  return (
    <div className="users-container">
      <div className="users-header">
        <div>
          <h2 className="section-title">User Management</h2>
          <p className="section-subtitle">Manage core banking access credentials, administrative permissions, and security groups</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsAdding(!isAdding)}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
          </svg>
          Add Team Member
        </button>
      </div>

      {/* Add User Drawer Overlay */}
      {isAdding && (
        <form onSubmit={handleAddUser} className="add-user-card animate-slide">
          <h4>Invite New Team Member</h4>
          <div className="add-user-row">
            <input 
              type="text" 
              placeholder="Full Name" 
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              required
              className="add-input"
            />
            <input 
              type="email" 
              placeholder="Email Address" 
              value={newUserEmail}
              onChange={(e) => setNewUserEmail(e.target.value)}
              required
              className="add-input"
            />
            <select 
              value={newUserRole}
              onChange={(e) => setNewUserRole(e.target.value)}
              className="add-select"
            >
              <option>Underwriter Officer</option>
              <option>Collections Lead</option>
              <option>General Accountant</option>
              <option>Credit Risk Manager</option>
            </select>
            <div className="add-actions">
              <button type="submit" className="btn btn-primary">Invite</button>
              <button type="button" className="btn btn-secondary" onClick={() => setIsAdding(false)}>Cancel</button>
            </div>
          </div>
        </form>
      )}

      {/* Users table */}
      <div className="users-card">
        <table className="users-table">
          <thead>
            <tr>
              <th>USER ID</th>
              <th>NAME</th>
              <th>SECURITY GROUP / ROLE</th>
              <th>STATUS</th>
              <th>BRANCH ACCESS</th>
              <th>LAST ACTIVITY</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} className="user-row">
                <td className="u-id">{u.id}</td>
                <td>
                  <div className="u-details">
                    <span className="u-name">{u.name}</span>
                    <span className="u-email">{u.email}</span>
                  </div>
                </td>
                <td className="u-role-cell">{u.role}</td>
                <td>
                  <span className={`u-status ${u.status.toLowerCase()}`}>
                    {u.status}
                  </span>
                </td>
                <td className="u-branch">{u.branch}</td>
                <td className="u-login">{u.lastLogin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style>{`
        .users-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .users-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }

        .add-user-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 20px;
          box-shadow: var(--shadow-sm);
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .add-user-card h4 {
          font-size: 0.95rem;
          color: var(--text-main);
          font-weight: 600;
        }

        .add-user-row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .add-input, .add-select {
          border: 1px solid var(--border);
          background-color: var(--bg-card);
          padding: 8px 12px;
          border-radius: var(--radius-sm);
          font-size: 0.86rem;
          outline: none;
          color: var(--text-main);
          flex: 1;
          min-width: 150px;
        }

        .add-input:focus, .add-select:focus {
          border-color: var(--border-focus);
        }

        .add-actions {
          display: flex;
          gap: 8px;
        }

        .users-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
        }

        .users-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .users-table th {
          background-color: var(--bg-app);
          color: var(--text-muted);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.8px;
          padding: 14px 20px;
          border-bottom: 1px solid var(--border);
        }

        .user-row {
          border-bottom: 1px solid var(--border);
          transition: background-color 0.2s;
        }

        .user-row:hover {
          background-color: rgba(6, 64, 43, 0.015);
        }

        .user-row td {
          padding: 14px 20px;
          font-size: 0.86rem;
          color: var(--text-main);
          vertical-align: middle;
        }

        .u-id {
          font-weight: 700;
          color: var(--primary-light);
        }

        .u-details {
          display: flex;
          flex-direction: column;
        }

        .u-name {
          font-weight: 600;
        }

        .u-email {
          font-size: 0.72rem;
          color: var(--text-muted);
          margin-top: 1px;
        }

        .u-role-cell {
          font-weight: 500;
        }

        .u-status {
          font-size: 0.72rem;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 4px;
        }

        .u-status.active {
          background-color: var(--success-bg);
          color: var(--success);
        }

        .u-status.inactive {
          background-color: var(--border);
          color: var(--text-muted);
        }

        .u-branch, .u-login {
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
}
