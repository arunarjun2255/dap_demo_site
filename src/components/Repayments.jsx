import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Repayments({ 
  emiLedger = [], 
  setEmiLedger, 
  repayments = [], 
  setRepayments 
}) {
  const navigate = useNavigate();
  const [filterMode, setFilterMode] = useState('All');
  
  const filteredTxns = filterMode === 'All' 
    ? repayments 
    : repayments.filter(t => t.mode.toLowerCase().includes(filterMode.toLowerCase()) || t.status === filterMode);

  const handleMarkPaid = (item) => {
    // Update ledger status to Paid
    setEmiLedger(prev => prev.map(ledgerItem => {
      if (ledgerItem.id === item.id) {
        return { ...ledgerItem, status: 'Paid' };
      }
      return ledgerItem;
    }));

    // Post to repaymentTransactions list
    const newTxn = {
      id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
      name: item.name,
      product: 'Business Loan',
      amount: item.amount,
      mode: 'NEFT/IMPS',
      date: '28 May 2026',
      status: 'Success'
    };
    setRepayments(prev => [newTxn, ...prev]);
  };

  return (
    <div className="repayments-container">
      <div className="repayments-header">
        <div>
          <h2 className="section-title">Repayments</h2>
          <p className="section-subtitle">EMI schedules and incoming collections</p>
        </div>

        <button className="btn btn-primary btn-record-pay" onClick={() => navigate('/record-payment')}>
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ marginRight: '6px' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
          </svg>
          Record Payment
        </button>
      </div>

      {/* EMI Ledger Table Card */}
      <div className="repayments-card">
        <div className="table-filter-bar">
          <h4>EMI Ledger · {emiLedger.length}</h4>
        </div>

        <table className="repayments-table">
          <thead>
            <tr>
              <th>LOAN A/C</th>
              <th>BORROWER</th>
              <th>EMI</th>
              <th>DUE DATE</th>
              <th>STATUS</th>
              <th style={{ textAlign: 'right' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {emiLedger.map((item) => (
              <tr key={item.id} className="repayments-row">
                <td className="txn-id">{item.id}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div className="avatar-pill">
                      {item.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="cust-name">{item.name}</span>
                  </div>
                </td>
                <td className="amount-cell">{item.amount}</td>
                <td>{item.dueDate}</td>
                <td>
                  <span className={`status-pill ${item.status.toLowerCase().replace(/\s+/g, '-')}`}>
                    {item.status}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  {item.status !== 'Paid' ? (
                    <button className="btn-mark-paid" onClick={() => handleMarkPaid(item)}>
                      Mark Paid
                    </button>
                  ) : (
                    <span className="action-done-text">Paid</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Transaction Records Table Card */}
      <div className="repayments-card">
        <div className="table-filter-bar">
          <h4>Transaction Records</h4>
          <div className="filter-pills">
            {['All', 'UPI', 'NACH', 'Success', 'Failed'].map(mode => (
              <button 
                key={mode} 
                className={`filter-pill ${filterMode === mode ? 'active' : ''}`}
                onClick={() => setFilterMode(mode)}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        <table className="repayments-table">
          <thead>
            <tr>
              <th>TXN ID</th>
              <th>CUSTOMER</th>
              <th>LOAN PRODUCT</th>
              <th>AMOUNT RECEIVED</th>
              <th>PAYMENT MODE</th>
              <th>DATE SETTLED</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {filteredTxns.map((txn) => (
              <tr key={txn.id} className="repayments-row">
                <td className="txn-id">{txn.id}</td>
                <td className="cust-name">{txn.name}</td>
                <td>{txn.product}</td>
                <td className="amount-cell">{txn.amount}</td>
                <td>{txn.mode}</td>
                <td>{txn.date}</td>
                <td>
                  <span className={`status-pill ${txn.status.toLowerCase()}`}>
                    {txn.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style>{`
        .repayments-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .repayments-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }

        .btn-record-pay {
          background-color: #06402B !important;
          color: var(--text-white) !important;
        }

        .btn-record-pay:hover {
          background-color: #032116 !important;
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

        .repayments-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
        }

        .table-filter-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          border-bottom: 1px solid var(--border);
          background-color: var(--bg-app);
          flex-wrap: wrap;
          gap: 12px;
        }

        .table-filter-bar h4 {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-main);
        }

        .filter-pills {
          display: flex;
          gap: 6px;
        }

        .filter-pill {
          background-color: var(--bg-card);
          border: 1px solid var(--border);
          padding: 4px 10px;
          border-radius: var(--radius-sm);
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.2s;
        }

        .filter-pill:hover {
          color: var(--text-main);
          border-color: var(--text-muted);
        }

        .filter-pill.active {
          background-color: var(--primary);
          color: var(--bg-card);
          border-color: var(--primary);
        }
        .dark-theme .filter-pill.active {
          color: #032116;
        }

        .repayments-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .repayments-table th {
          background-color: var(--bg-card);
          color: var(--text-muted);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.8px;
          padding: 14px 20px;
          border-bottom: 1px solid var(--border);
        }

        .repayments-row {
          border-bottom: 1px solid var(--border);
          transition: background-color 0.2s;
        }

        .repayments-row:hover {
          background-color: rgba(6, 64, 43, 0.01);
        }

        .repayments-row td {
          padding: 14px 20px;
          font-size: 0.86rem;
          color: var(--text-main);
          vertical-align: middle;
        }

        .txn-id {
          font-weight: 700;
          color: var(--primary-light);
        }

        .cust-name {
          font-weight: 600;
        }

        .amount-cell {
          font-weight: 700;
        }

        .status-pill {
          font-size: 0.72rem;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 4px;
          display: inline-block;
        }

        .status-pill.success, .status-pill.paid {
          background-color: var(--success-bg);
          color: var(--success);
        }

        .status-pill.failed {
          background-color: #FEE2E2;
          color: #EF4444;
        }

        .status-pill.processing {
          background-color: #E0F2F1;
          color: #00796B;
        }

        .status-pill.scheduled {
          background-color: #FEF3C7;
          color: #D97706;
        }

        .status-pill.overdue-4d {
          background-color: #FEE2E2;
          color: #EF4444;
        }

        .btn-mark-paid {
          background: none;
          border: 1px solid var(--border);
          padding: 6px 12px;
          border-radius: var(--radius-sm);
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-main);
          cursor: pointer;
          background-color: var(--bg-card);
          transition: all 0.2s;
        }

        .btn-mark-paid:hover {
          border-color: var(--text-muted);
          background-color: var(--bg-app);
        }

        .action-done-text {
          font-size: 0.8rem;
          color: var(--text-muted);
          font-style: italic;
        }

        .avatar-pill {
          width: 28px;
          height: 28px;
          border-radius: var(--radius-sm);
          background-color: rgba(6, 64, 43, 0.05);
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.8rem;
        }
        .dark-theme .avatar-pill {
          background-color: rgba(16, 185, 129, 0.1);
          color: var(--primary);
        }
      `}</style>
    </div>
  );
}
