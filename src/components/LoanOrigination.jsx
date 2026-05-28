import React, { useState } from 'react';

export default function LoanOrigination({ applications, onApprove, onReject, onNewApplication }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredApps = applications.filter(app => 
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.loanProduct.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusClass = (status) => {
    switch (status) {
      case 'Approved':
      case 'Approved & Disbursed':
        return 'status-approved';
      case 'Rejected':
        return 'status-rejected';
      case 'Pending Verification':
      default:
        return 'status-pending';
    }
  };

  const getRiskGradeClass = (grade) => {
    return grade.replace(' ', '-').toLowerCase();
  };

  return (
    <div className="origination-container">
      <div className="origination-header">
        <div>
          <h2 className="section-title">Loan Origination</h2>
          <p className="section-subtitle">Manage incoming loan requests and underwriting workflows</p>
        </div>

        <div className="origination-actions">
          {/* Search pipeline */}
          <div className="pipeline-search">
            <input
              type="text"
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pipeline-search-input"
            />
          </div>

          <button className="btn btn-primary" onClick={onNewApplication}>
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ marginRight: '6px' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
            </svg>
            New Application
          </button>
        </div>
      </div>

      {filteredApps.length === 0 ? (
        <div className="empty-state">
          <svg className="w-12 h-12 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3>No applications found</h3>
          <p>Try refining your search terms or create a new application above.</p>
        </div>
      ) : (
        <div className="origination-card">
          <table className="pipeline-table">
            <thead>
              <tr>
                <th>APPLICANT ID</th>
                <th>APPLICANT</th>
                <th>PRODUCT</th>
                <th>AMOUNT</th>
                <th>SCORE / RISK</th>
                <th>DATE SUBMITTED</th>
                <th>STATUS</th>
                <th className="actions-header">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredApps.map((app) => (
                <tr key={app.id} className="pipeline-row">
                  <td className="app-id-cell">{app.id}</td>
                  <td>
                    <div className="applicant-details">
                      <span className="applicant-name">{app.name}</span>
                      <span className="applicant-email">{app.email || 'no-email@veridian.com'}</span>
                    </div>
                  </td>
                  <td>
                    <div className="product-details">
                      <span className="product-name">{app.loanProduct}</span>
                      <span className="product-tenure">{app.tenure} Months</span>
                    </div>
                  </td>
                  <td className="amount-cell">₹{app.amount} Lakhs</td>
                  <td>
                    <div className="risk-score-cell">
                      <span className="score-text">CIBIL: {app.creditScore}</span>
                      <span className={`risk-tag ${getRiskGradeClass(app.riskGrade)}`}>
                        {app.riskGrade}
                      </span>
                    </div>
                  </td>
                  <td className="date-cell">{app.date}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(app.status)}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="actions-cell">
                    {app.status === 'Pending Verification' ? (
                      <div className="action-buttons">
                        <button
                          className="btn-action btn-approve"
                          onClick={() => onApprove(app.id)}
                          title="Approve Loan"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                          </svg>
                          Approve
                        </button>
                        <button
                          className="btn-action btn-reject"
                          onClick={() => onReject(app.id)}
                          title="Reject Loan"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="action-done-text">Locked</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <style>{`
        .origination-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .origination-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }

        .origination-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .section-title {
          font-family: var(--font-serif);
          font-size: 1.75rem;
          color: var(--text-main);
          font-weight: 700;
        }

        .section-subtitle {
          font-size: 0.88rem;
          color: var(--text-muted);
          margin-top: 2px;
        }

        .pipeline-search-input {
          border: 1px solid var(--border);
          background-color: var(--bg-card);
          padding: 8px 16px;
          border-radius: var(--radius-md);
          font-size: 0.88rem;
          outline: none;
          color: var(--text-main);
          width: 260px;
          transition: border-color 0.2s;
        }

        .pipeline-search-input:focus {
          border-color: var(--border-focus);
        }

        .origination-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
        }

        .pipeline-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .pipeline-table th {
          background-color: var(--bg-app);
          color: var(--text-muted);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 1px;
          padding: 14px 20px;
          border-bottom: 1px solid var(--border);
        }

        .pipeline-row {
          border-bottom: 1px solid var(--border);
          transition: background-color 0.2s;
        }

        .pipeline-row:hover {
          background-color: rgba(6, 64, 43, 0.015);
        }
        
        .dark-theme .pipeline-row:hover {
          background-color: rgba(16, 185, 129, 0.02);
        }

        .pipeline-row td {
          padding: 16px 20px;
          font-size: 0.88rem;
          color: var(--text-main);
          vertical-align: middle;
        }

        .app-id-cell {
          font-family: var(--font-sans);
          font-weight: 700;
          color: var(--primary-light);
        }

        .applicant-details {
          display: flex;
          flex-direction: column;
        }

        .applicant-name {
          font-weight: 600;
          color: var(--text-main);
        }

        .applicant-email {
          font-size: 0.72rem;
          color: var(--text-muted);
          margin-top: 1px;
        }

        .product-details {
          display: flex;
          flex-direction: column;
        }

        .product-name {
          font-weight: 600;
        }

        .product-tenure {
          font-size: 0.72rem;
          color: var(--text-muted);
        }

        .amount-cell {
          font-weight: 700;
          font-family: var(--font-sans);
        }

        .risk-score-cell {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .score-text {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .risk-tag {
          font-size: 0.7rem;
          font-weight: 700;
          padding: 1px 6px;
          border-radius: 4px;
          width: fit-content;
        }

        .risk-tag.grade-a { background-color: #E8F5E9; color: #0E835C; }
        .risk-tag.grade-b { background-color: #E0F2F1; color: #00796B; }
        .risk-tag.grade-c { background-color: #FFF8E1; color: #B78103; }
        .risk-tag.grade-d { background-color: #FBE9E7; color: #C2410C; }

        .date-cell {
          color: var(--text-muted);
          font-weight: 500;
        }

        .status-badge {
          font-size: 0.75rem;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 20px;
          display: inline-block;
        }

        .status-pending {
          background-color: #FEF3C7;
          color: #D97706;
        }

        .status-approved {
          background-color: var(--success-bg);
          color: var(--success);
        }

        .status-rejected {
          background-color: #FEE2E2;
          color: #EF4444;
        }

        .actions-header {
          text-align: right !important;
        }

        .actions-cell {
          text-align: right;
        }

        .action-buttons {
          display: inline-flex;
          gap: 8px;
          justify-content: flex-end;
        }

        .btn-action {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 6px 12px;
          border-radius: var(--radius-sm);
          font-size: 0.8rem;
          font-weight: 600;
          border: 1px solid transparent;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-approve {
          background-color: var(--success-bg);
          color: var(--success);
          border-color: var(--success);
        }

        .btn-approve:hover {
          background-color: var(--success);
          color: var(--bg-card);
        }

        .btn-reject {
          background-color: #FDF2F2;
          color: #EF4444;
          border-color: #FCA5A5;
        }

        .btn-reject:hover {
          background-color: #EF4444;
          color: var(--bg-card);
        }

        .action-done-text {
          font-size: 0.8rem;
          color: var(--text-muted);
          font-style: italic;
        }

        .empty-state {
          text-align: center;
          padding: 60px 40px;
          background-color: var(--bg-card);
          border: 1px dashed var(--border);
          border-radius: var(--radius-lg);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .empty-state h3 {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-main);
        }

        .empty-state p {
          font-size: 0.88rem;
          color: var(--text-muted);
          max-width: 320px;
        }
      `}</style>
    </div>
  );
}
