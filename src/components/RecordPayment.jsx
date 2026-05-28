import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RecordPayment({ emiLedger = [], onPostPayment }) {
  const navigate = useNavigate();

  // Find first scheduled or overdue EMI as default, else default to first item
  const defaultSelection = emiLedger.find(item => item.status !== 'Paid') || emiLedger[0] || {};
  const [loanId, setLoanId] = useState(defaultSelection.id || '');
  const [mode, setMode] = useState('UPI');
  
  // Format today's date as YYYY-MM-DD for standard html date picker
  const [date, setDate] = useState('2026-05-28');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loanId) return;

    // Convert date YYYY-MM-DD to DD MMM YYYY for transaction settlement dates
    const dateObj = new Date(date);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const formattedDate = `${dateObj.getDate().toString().padStart(2, '0')} ${months[dateObj.getMonth()]} ${dateObj.getFullYear()}`;

    onPostPayment({
      loanId,
      mode,
      date: formattedDate
    });
  };

  return (
    <div className="record-pay-container">
      <div className="record-pay-card">
        {/* Header */}
        <div className="record-pay-header">
          <div>
            <h2 className="record-pay-title">Record Payment</h2>
            <p className="record-pay-subtitle">Post an EMI collection against a loan</p>
          </div>
          <button 
            type="button" 
            className="close-btn" 
            onClick={() => navigate('/repayments')}
            aria-label="Close page"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="record-pay-form">
          <div className="form-group">
            <label className="form-label required">Loan account</label>
            <select
              value={loanId}
              onChange={(e) => setLoanId(e.target.value)}
              required
              className="form-select"
            >
              <option value="" disabled>Select a loan account</option>
              {emiLedger.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.id} — {item.name} ({item.amount}) {item.status === 'Paid' ? '• Paid' : ''}
                </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Mode</label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className="form-select"
              >
                <option value="UPI">UPI</option>
                <option value="NACH Auto-Debit">NACH Auto-Debit</option>
                <option value="Net Banking">Net Banking</option>
                <option value="NEFT Transfer">NEFT Transfer</option>
                <option value="Cash">Cash</option>
              </select>
            </div>
            
            <div className="form-group">
              <label className="form-label">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          {/* Footer Controls */}
          <div className="form-footer">
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={() => navigate('/repayments')}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-post-payment">
              Post payment
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .record-pay-container {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          width: 100%;
          min-height: calc(100vh - 120px);
        }

        .record-pay-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          width: 100%;
          max-width: 580px;
          box-shadow: var(--shadow-lg);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .record-pay-header {
          padding: 24px;
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }

        .record-pay-title {
          font-family: var(--font-serif);
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--text-main);
        }

        .record-pay-subtitle {
          font-size: 0.88rem;
          color: var(--text-muted);
          margin-top: 2px;
        }

        .close-btn {
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 4px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .close-btn:hover {
          background-color: var(--bg-app);
          color: var(--text-main);
        }

        .record-pay-form {
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .form-label {
          font-size: 0.84rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .form-label.required::after {
          content: ' *';
          color: var(--danger);
        }

        .form-input, .form-select {
          border: 1px solid var(--border);
          background-color: var(--bg-card);
          padding: 10px 14px;
          border-radius: var(--radius-md);
          font-size: 0.9rem;
          outline: none;
          color: var(--text-main);
          transition: border-color 0.2s;
        }

        .form-input:focus, .form-select:focus {
          border-color: var(--border-focus);
          box-shadow: 0 0 0 3px rgba(var(--primary-rgb), 0.08);
        }

        .btn-post-payment {
          background-color: #06402B !important;
          color: var(--text-white) !important;
        }

        .btn-post-payment:hover {
          background-color: #032116 !important;
        }

        .form-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--border);
          padding-top: 20px;
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
}
