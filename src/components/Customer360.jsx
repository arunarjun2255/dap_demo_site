import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Customer360({ customers = [], globalSearchTerm }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  // Combine global header search term and local search term
  const activeSearch = globalSearchTerm || searchTerm;

  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(activeSearch.toLowerCase()) ||
    c.id.toLowerCase().includes(activeSearch.toLowerCase()) ||
    c.loanProduct.toLowerCase().includes(activeSearch.toLowerCase())
  );

  const toggleExpand = (id) => {
    if (expandedId === id) setExpandedId(null);
    else setExpandedId(id);
  };

  const getKycStatusClass = (status) => {
    return status === 'Verified' ? 'kyc-verified' : 'kyc-pending';
  };

  return (
    <div className="cust-360-container">
      <div className="cust-header">
        <div>
          <h2 className="section-title">Customer 360</h2>
          <p className="section-subtitle">Unified view of borrower relationships, credit risk, and repayment calendars</p>
        </div>

        <div className="cust-actions">
          {/* Local Search (only visible if no global search active) */}
          {!globalSearchTerm && (
            <div className="cust-search">
              <input
                type="text"
                placeholder="Search customer repository..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="cust-search-input"
              />
            </div>
          )}

          <button className="btn btn-primary" onClick={() => navigate('/add-customer')}>
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ marginRight: '6px' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
            </svg>
            Add Customer
          </button>
        </div>
      </div>

      {globalSearchTerm && (
        <div className="search-filtering-indicator">
          <span>Filtering by header search: <strong>"{globalSearchTerm}"</strong></span>
        </div>
      )}

      <div className="cust-grid">
        {filteredCustomers.length === 0 ? (
          <div className="empty-state">
            <svg className="w-12 h-12 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3>No customers match search criteria</h3>
            <p>Try searching for names like "Rohan", "Meera", "Vikram", or loan products.</p>
          </div>
        ) : (
          filteredCustomers.map(cust => {
            const isExpanded = expandedId === cust.id;
            return (
              <div key={cust.id} className={`cust-row-card ${isExpanded ? 'expanded' : ''}`}>
                <div className="cust-card-header" onClick={() => toggleExpand(cust.id)}>
                  <div className="cust-main-info">
                    <div className="cust-avatar-pill">
                      {cust.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="cust-identity">
                      <h4>{cust.name}</h4>
                      <span>ID: {cust.id}</span>
                    </div>
                  </div>

                  <div className="cust-meta-item">
                    <span className="meta-label">LOAN PRODUCT</span>
                    <span className="meta-val">{cust.loanProduct}</span>
                  </div>

                  <div className="cust-meta-item">
                    <span className="meta-label">OUTSTANDING BAL</span>
                    <span className="meta-val outstanding">₹{cust.outstanding} Lakhs</span>
                  </div>

                  <div className="cust-meta-item">
                    <span className="meta-label">CIBIL SCORE</span>
                    <span className="meta-val">{cust.creditScore}</span>
                  </div>

                  <div className="cust-meta-item">
                    <span className="meta-label">KYC STATUS</span>
                    <span className={`kyc-badge ${getKycStatusClass(cust.kycStatus)}`}>
                      {cust.kycStatus}
                    </span>
                  </div>

                  <div className="cust-expand-indicator">
                    <svg 
                      className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {isExpanded && (
                  <div className="cust-expanded-details animate-slide">
                    <div className="details-columns">
                      {/* Left Column: Contact and Credit */}
                      <div className="details-column">
                        <h5 className="details-title">Demographics & Contact</h5>
                        <div className="details-row">
                          <span className="row-lbl">Email:</span>
                          <span className="row-val">{cust.email}</span>
                        </div>
                        <div className="details-row">
                          <span className="row-lbl">Phone:</span>
                          <span className="row-val">{cust.phone}</span>
                        </div>
                        {cust.city && (
                          <div className="details-row">
                            <span className="row-lbl">City:</span>
                            <span className="row-val">{cust.city}</span>
                          </div>
                        )}
                        
                        <h5 className="details-title spacing-top">Risk Analysis</h5>
                        <div className="details-row">
                          <span className="row-lbl">Risk Rating:</span>
                          <span className={`risk-tag ${cust.riskGrade.replace(' ', '-').toLowerCase()}`}>
                            {cust.riskGrade}
                          </span>
                        </div>
                      </div>

                      {/* Right Column: Repayment Schedules */}
                      <div className="details-column flex-2">
                        <h5 className="details-title">Repayment Calendar</h5>
                        <table className="schedule-table">
                          <thead>
                            <tr>
                              <th>EMI NO.</th>
                              <th>DUE DATE</th>
                              <th>AMOUNT</th>
                              <th>STATUS</th>
                            </tr>
                          </thead>
                          <tbody>
                            {cust.schedule.map((emi, idx) => (
                              <tr key={idx}>
                                <td>#{emi.emiNo}</td>
                                <td>{emi.dueDate}</td>
                                <td className="schedule-amount">{emi.amount}</td>
                                <td>
                                  <span className={`emi-status ${emi.status === 'Paid' ? 'paid' : 'pending'}`}>
                                    {emi.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      <style>{`
        .cust-360-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .cust-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }

        .cust-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .cust-search-input {
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

        .cust-search-input:focus {
          border-color: var(--border-focus);
        }

        .search-filtering-indicator {
          background-color: var(--success-bg);
          color: var(--success);
          padding: 8px 16px;
          border-radius: var(--radius-md);
          font-size: 0.84rem;
        }

        .cust-grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .cust-row-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-sm);
          transition: all 0.2s;
        }

        .cust-row-card:hover {
          border-color: var(--text-muted);
        }

        .cust-row-card.expanded {
          border-color: var(--primary);
          box-shadow: var(--shadow-md);
        }

        .cust-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          cursor: pointer;
          flex-wrap: wrap;
          gap: 16px;
        }

        .cust-main-info {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 200px;
        }

        .cust-avatar-pill {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-sm);
          background-color: rgba(6, 64, 43, 0.05);
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.95rem;
        }
        .dark-theme .cust-avatar-pill {
          background-color: rgba(16, 185, 129, 0.1);
          color: var(--primary);
        }

        .cust-identity h4 {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-main);
          margin-bottom: 2px;
        }

        .cust-identity span {
          font-size: 0.72rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .cust-meta-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .meta-label {
          font-size: 0.68rem;
          font-weight: 700;
          color: var(--text-muted);
          letter-spacing: 0.5px;
        }

        .meta-val {
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-main);
        }

        .meta-val.outstanding {
          color: var(--primary);
          font-weight: 700;
        }

        .kyc-badge {
          font-size: 0.72rem;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 20px;
        }

        .kyc-verified {
          background-color: var(--success-bg);
          color: var(--success);
        }

        .kyc-pending {
          background-color: #FEF3C7;
          color: #D97706;
        }

        .cust-expand-indicator {
          color: var(--text-muted);
        }

        .rotate-180 {
          transform: rotate(180deg);
        }

        .cust-expanded-details {
          border-top: 1px solid var(--border);
          background-color: var(--bg-app);
          padding: 24px;
        }

        .details-columns {
          display: flex;
          gap: 32px;
          flex-wrap: wrap;
        }

        .details-column {
          flex: 1;
          min-width: 240px;
          display: flex;
          flex-direction: column;
        }

        .details-column.flex-2 {
          flex: 1.8;
        }

        .details-title {
          font-size: 0.76rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          color: var(--text-muted);
          margin-bottom: 12px;
        }

        .spacing-top {
          margin-top: 20px;
        }

        .details-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid rgba(0, 0, 0, 0.03);
          font-size: 0.88rem;
        }

        .row-lbl {
          color: var(--text-muted);
          font-weight: 500;
        }

        .row-val {
          color: var(--text-main);
          font-weight: 600;
        }

        .schedule-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.84rem;
        }

        .schedule-table th {
          text-align: left;
          color: var(--text-muted);
          font-weight: 600;
          padding: 8px;
          border-bottom: 1px solid var(--border);
        }

        .schedule-table td {
          padding: 8px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.02);
          color: var(--text-main);
        }

        .schedule-amount {
          font-weight: 700;
        }

        .emi-status {
          font-size: 0.72rem;
          font-weight: 700;
          padding: 1px 6px;
          border-radius: 4px;
        }

        .emi-status.paid {
          background-color: var(--success-bg);
          color: var(--success);
        }

        .emi-status.pending {
          background-color: #FEF3C7;
          color: #D97706;
        }

        .risk-tag {
          font-size: 0.7rem;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 4px;
        }
        .risk-tag.grade-a { background-color: #E8F5E9; color: #0E835C; }
        .risk-tag.grade-b { background-color: #E0F2F1; color: #00796B; }
        .risk-tag.grade-c { background-color: #FFF8E1; color: #B78103; }
        .risk-tag.grade-d { background-color: #FBE9E7; color: #C2410C; }

        @media (max-width: 900px) {
          .cust-card-header {
            flex-direction: column;
            align-items: flex-start;
          }
          .cust-meta-item {
            width: 100%;
            flex-direction: row;
            justify-content: space-between;
          }
        }
      `}</style>
    </div>
  );
}
