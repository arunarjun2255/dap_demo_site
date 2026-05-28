import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Collections({ collectionsList = [] }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleAction = (name, action) => {
    alert(`Initiating action: "${action}" for borrower: ${name}`);
  };

  const filteredRecords = collectionsList.filter(o => 
    o.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDpdSeverity = (dpd) => {
    if (dpd <= 30) return 'dpd-low';
    if (dpd <= 60) return 'dpd-medium';
    if (dpd <= 90) return 'dpd-high';
    return 'dpd-critical';
  };

  // Dynamic DPD Bucket calculations
  const sma0 = collectionsList.filter(o => o.dpd >= 0 && o.dpd <= 30);
  const sma1 = collectionsList.filter(o => o.dpd >= 31 && o.dpd <= 60);
  const sma2 = collectionsList.filter(o => o.dpd >= 61 && o.dpd <= 90);
  const npa = collectionsList.filter(o => o.dpd > 90);

  const calculatePool = (list) => {
    const sum = list.reduce((acc, item) => {
      const val = parseFloat(item.amount.replace(/[^0-9.]/g, '')) || 0;
      return acc + val;
    }, 0);
    if (sum >= 100000) {
      return `₹${(sum / 100000).toFixed(1)} Lakhs pool`;
    }
    return `₹${(sum / 1000).toFixed(1)}K pool`;
  };

  return (
    <div className="collections-container">
      <div className="collections-header">
        <div>
          <h2 className="section-title">Collections & Recovery</h2>
          <p className="section-subtitle">Delinquent account queues, DPD aging buckets, and contact audit trails</p>
        </div>
        
        <div className="collections-actions">
          <div className="search-collections">
            <input 
              type="text" 
              placeholder="Search overdue accounts..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-coll-input"
            />
          </div>
          
          <button className="btn btn-primary" onClick={() => navigate('/add-collection')}>
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ marginRight: '6px' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
            </svg>
            Add Case
          </button>
        </div>
      </div>

      {/* DPD Brackets Summary row */}
      <div className="dpd-buckets">
        <div className="bucket-card val-low">
          <div className="bucket-heading">0-30 DPD (SMA-0)</div>
          <h3>{sma0.length} {sma0.length === 1 ? 'Account' : 'Accounts'}</h3>
          <p>{calculatePool(sma0)}</p>
        </div>
        <div className="bucket-card val-medium">
          <div className="bucket-heading">31-60 DPD (SMA-1)</div>
          <h3>{sma1.length} {sma1.length === 1 ? 'Account' : 'Accounts'}</h3>
          <p>{calculatePool(sma1)}</p>
        </div>
        <div className="bucket-card val-high">
          <div className="bucket-heading">61-90 DPD (SMA-2)</div>
          <h3>{sma2.length} {sma2.length === 1 ? 'Account' : 'Accounts'}</h3>
          <p>{calculatePool(sma2)}</p>
        </div>
        <div className="bucket-card val-critical">
          <div className="bucket-heading">90+ DPD (Gross NPA)</div>
          <h3>{npa.length} {npa.length === 1 ? 'Account' : 'Accounts'}</h3>
          <p>{calculatePool(npa)}</p>
        </div>
      </div>

      {/* Overdues list */}
      <div className="collections-card">
        <div className="table-title-row">
          <h4>Delinquency Allocation Queue</h4>
        </div>
        
        <table className="collections-table">
          <thead>
            <tr>
              <th>ALLOCATION ID</th>
              <th>BORROWER</th>
              <th>LOAN TYPE</th>
              <th>OVERDUE AMOUNT</th>
              <th>AGING (DPD)</th>
              <th>LAST ATTEMPT</th>
              <th className="actions-header">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((item) => (
              <tr key={item.id} className="coll-row">
                <td className="coll-id">{item.id}</td>
                <td>
                  <div className="borrower-info">
                    <span className="borrower-name">{item.name}</span>
                    <span className="borrower-phone">{item.phone}</span>
                  </div>
                </td>
                <td>{item.product}</td>
                <td className="overdue-val">{item.amount}</td>
                <td>
                  <span className={`dpd-badge ${getDpdSeverity(item.dpd)}`}>
                    {item.dpd} Days
                  </span>
                </td>
                <td className="attempt-date">{item.lastContact}</td>
                <td className="actions-cell">
                  <div className="coll-actions">
                    <button 
                      className="btn-coll call" 
                      onClick={() => handleAction(item.name, 'Call Borrower')}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Call
                    </button>
                    <button 
                      className="btn-coll notice" 
                      onClick={() => handleAction(item.name, 'Dispatch Demand Notice')}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Notice
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style>{`
        .collections-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .collections-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }

        .collections-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .search-coll-input {
          border: 1px solid var(--border);
          background-color: var(--bg-card);
          padding: 8px 16px;
          border-radius: var(--radius-md);
          font-size: 0.88rem;
          outline: none;
          color: var(--text-main);
          width: 240px;
          transition: border-color 0.2s;
        }

        .search-coll-input:focus {
          border-color: var(--border-focus);
        }

        .dpd-buckets {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .bucket-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 16px;
          box-shadow: var(--shadow-sm);
          border-left: 4px solid var(--border);
        }

        .bucket-card.val-low { border-left-color: #34D399; }
        .bucket-card.val-medium { border-left-color: #FBBF24; }
        .bucket-card.val-high { border-left-color: #F97316; }
        .bucket-card.val-critical { border-left-color: #EF4444; }

        .bucket-heading {
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--text-muted);
          letter-spacing: 0.5px;
        }

        .bucket-card h3 {
          font-family: var(--font-serif);
          font-size: 1.35rem;
          color: var(--text-main);
          margin: 6px 0;
        }

        .bucket-card p {
          font-size: 0.76rem;
          color: var(--text-muted);
        }

        .collections-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
        }

        .table-title-row {
          padding: 16px 20px;
          border-bottom: 1px solid var(--border);
          background-color: var(--bg-app);
        }

        .table-title-row h4 {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-main);
        }

        .collections-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .collections-table th {
          background-color: var(--bg-card);
          color: var(--text-muted);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.8px;
          padding: 14px 20px;
          border-bottom: 1px solid var(--border);
        }

        .coll-row {
          border-bottom: 1px solid var(--border);
          transition: background-color 0.2s;
        }

        .coll-row:hover {
          background-color: rgba(6, 64, 43, 0.015);
        }

        .coll-row td {
          padding: 14px 20px;
          font-size: 0.86rem;
          color: var(--text-main);
          vertical-align: middle;
        }

        .coll-id {
          font-weight: 700;
          color: var(--primary-light);
        }

        .borrower-info {
          display: flex;
          flex-direction: column;
        }

        .borrower-name {
          font-weight: 600;
        }

        .borrower-phone {
          font-size: 0.72rem;
          color: var(--text-muted);
          margin-top: 1px;
        }

        .overdue-val {
          font-weight: 700;
          color: #C2410C;
        }

        .dpd-badge {
          font-size: 0.72rem;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 4px;
        }

        .dpd-badge.dpd-low { background-color: #E8F5E9; color: #0E835C; }
        .dpd-badge.dpd-medium { background-color: #FEF3C7; color: #D97706; }
        .dpd-badge.dpd-high { background-color: #FFF3E0; color: #E65100; }
        .dpd-badge.dpd-critical { background-color: #FFEBEE; color: #C62828; }

        .attempt-date {
          color: var(--text-muted);
        }

        .actions-header {
          text-align: right !important;
        }

        .actions-cell {
          text-align: right;
        }

        .coll-actions {
          display: inline-flex;
          gap: 6px;
          justify-content: flex-end;
        }

        .btn-coll {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 6px 12px;
          border-radius: var(--radius-sm);
          font-size: 0.78rem;
          font-weight: 600;
          border: 1px solid var(--border);
          cursor: pointer;
          transition: all 0.2s;
          background-color: var(--bg-card);
          color: var(--text-main);
        }

        .btn-coll:hover {
          background-color: var(--bg-app);
          border-color: var(--text-muted);
        }

        .btn-coll.call:hover {
          background-color: var(--success-bg);
          color: var(--success);
          border-color: var(--success);
        }

        .btn-coll.notice:hover {
          background-color: #FEF3C7;
          color: #D97706;
          border-color: #FEF3C7;
        }

        @media (max-width: 900px) {
          .dpd-buckets {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  );
}
