import React from 'react';
import { useNavigate } from 'react-router-dom';

const mockRecent = [
  {
    id: 'APP-9921',
    name: 'Priya Nair',
    avatar: 'PN',
    product: 'Two-Wheeler',
    amount: '₹1,25,000',
    riskWidth: '60%',
    status: 'Credit Review',
    statusClass: 'status-credit'
  },
  {
    id: 'APP-9918',
    name: 'Imran Sheikh',
    avatar: 'IS',
    product: 'LAP',
    amount: '₹42,50,000',
    riskWidth: '40%',
    status: 'Docs Pending',
    statusClass: 'status-docs'
  },
  {
    id: 'APP-9915',
    name: 'Vikram Singh',
    avatar: 'VS',
    product: 'SME Working Cap',
    amount: '₹25,00,000',
    riskWidth: '80%',
    status: 'Final Sign-off',
    statusClass: 'status-signoff'
  },
  {
    id: 'APP-9910',
    name: 'Meera Joshi',
    avatar: 'MJ',
    product: 'Personal Loan',
    amount: '₹4,50,000',
    riskWidth: '20%',
    status: 'KYC',
    statusClass: 'status-kyc'
  }
];

export default function RecentApplications() {
  const navigate = useNavigate();

  return (
    <div className="recent-apps-card">
      <div className="recent-apps-header">
        <h3 className="recent-apps-title">Recent Loan Applications</h3>
        <button className="view-pipeline-link" onClick={() => navigate('/origination')}>
          View pipeline →
        </button>
      </div>

      <div className="table-responsive">
        <table className="recent-apps-table">
          <thead>
            <tr>
              <th>APPLICANT</th>
              <th>PRODUCT</th>
              <th>AMOUNT</th>
              <th>RISK</th>
              <th>STATUS</th>
              <th className="actions-header"></th>
            </tr>
          </thead>
          <tbody>
            {mockRecent.map((app) => (
              <tr key={app.id} className="recent-app-row">
                {/* APPLICANT */}
                <td>
                  <div className="applicant-cell">
                    <div className="applicant-avatar">
                      {app.avatar}
                    </div>
                    <div className="applicant-info">
                      <span className="applicant-name">{app.name}</span>
                      <span className="applicant-id">{app.id}</span>
                    </div>
                  </div>
                </td>
                
                {/* PRODUCT */}
                <td className="product-cell">{app.product}</td>
                
                {/* AMOUNT */}
                <td className="amount-cell">{app.amount}</td>
                
                {/* RISK */}
                <td>
                  <div className="risk-bar-container">
                    <div className="risk-bar-fill" style={{ width: app.riskWidth }}></div>
                  </div>
                </td>
                
                {/* STATUS */}
                <td>
                  <span className={`recent-status-badge ${app.statusClass}`}>
                    <span className="badge-dot"></span>
                    {app.status}
                  </span>
                </td>
                
                {/* ACTION BUTTON */}
                <td className="actions-cell">
                  <button className="btn-open-app" onClick={() => navigate('/origination')}>
                    Open
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style>{`
        .recent-apps-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 24px;
          box-shadow: var(--shadow-sm);
          margin-top: 24px;
          display: flex;
          flex-direction: column;
        }

        .recent-apps-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .recent-apps-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-main);
        }

        .view-pipeline-link {
          background: none;
          border: none;
          color: var(--success);
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          transition: filter 0.2s;
        }

        .view-pipeline-link:hover {
          filter: brightness(1.2);
        }

        .table-responsive {
          width: 100%;
          overflow-x: auto;
        }

        .recent-apps-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .recent-apps-table th {
          color: var(--text-muted);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.8px;
          padding: 12px 16px;
          border-bottom: 1px solid var(--border);
          text-transform: uppercase;
        }

        .recent-app-row {
          border-bottom: 1px solid var(--border);
          transition: background-color 0.2s;
        }

        .recent-app-row:last-child {
          border-bottom: none;
        }

        .recent-app-row:hover {
          background-color: rgba(6, 64, 43, 0.01);
        }

        .recent-app-row td {
          padding: 16px;
          font-size: 0.88rem;
          color: var(--text-main);
          vertical-align: middle;
        }

        .applicant-cell {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .applicant-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.82rem;
          color: #FFFFFF;
        }

        .recent-app-row:nth-child(1) .applicant-avatar { background-color: #1A5276; }
        .recent-app-row:nth-child(2) .applicant-avatar { background-color: #B27A23; }
        .recent-app-row:nth-child(3) .applicant-avatar { background-color: #1F618D; }
        .recent-app-row:nth-child(4) .applicant-avatar { background-color: #935116; }

        .applicant-info {
          display: flex;
          flex-direction: column;
        }

        .applicant-name {
          font-weight: 600;
          color: var(--text-main);
        }

        .applicant-id {
          font-size: 0.72rem;
          color: var(--text-muted);
          margin-top: 1px;
        }

        .product-cell {
          font-weight: 500;
          color: var(--text-main);
        }

        .amount-cell {
          font-weight: 600;
          color: var(--text-main);
        }

        .risk-bar-container {
          width: 100px;
          height: 6px;
          background-color: var(--border);
          border-radius: 3px;
          overflow: hidden;
        }

        .risk-bar-fill {
          height: 100%;
          background-color: #0E835C;
          border-radius: 3px;
        }

        .recent-status-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.76rem;
          font-weight: 600;
          padding: 4px 12px;
          border-radius: 20px;
        }

        .badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }

        .status-credit {
          background-color: #EBF5FB;
          color: #2471A3;
        }
        .status-credit .badge-dot { background-color: #2471A3; }

        .status-docs {
          background-color: #FEF9E7;
          color: #B7950B;
        }
        .status-docs .badge-dot { background-color: #B7950B; }

        .status-signoff {
          background-color: #EAF2F8;
          color: #2E86C1;
        }
        .status-signoff .badge-dot { background-color: #2E86C1; }

        .status-kyc {
          background-color: #FDF2E9;
          color: #CA6F1E;
        }
        .status-kyc .badge-dot { background-color: #CA6F1E; }

        .actions-header, .actions-cell {
          text-align: right;
        }

        .btn-open-app {
          background-color: var(--bg-card);
          border: 1px solid var(--border);
          color: var(--text-main);
          padding: 6px 16px;
          border-radius: var(--radius-sm);
          font-size: 0.8rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-open-app:hover {
          background-color: var(--bg-app);
          border-color: var(--text-muted);
        }
      `}</style>
    </div>
  );
}
