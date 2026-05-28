import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddCollection({ onAddCase }) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loanType, setLoanType] = useState('Business Loan');
  const [amount, setAmount] = useState('');
  const [dpd, setDpd] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone || !amount || !dpd) return;

    // Sanitize amount to currency representation
    const numericAmount = parseFloat(amount.replace(/[^0-9.]/g, '')) || 0;
    const formattedAmount = '₹' + numericAmount.toLocaleString('en-IN');

    const newCase = {
      id: `COLL-${Math.floor(1000 + Math.random() * 9000)}`,
      name,
      phone,
      product: loanType,
      amount: formattedAmount,
      dpd: parseInt(dpd, 10) || 0,
      lastContact: '28 May 2026' // current date
    };

    onAddCase(newCase);
  };

  return (
    <div className="add-coll-container">
      <div className="add-coll-card">
        {/* Header */}
        <div className="add-coll-header">
          <div>
            <h2 className="add-coll-title">Add Delinquency Case</h2>
            <p className="add-coll-subtitle">Allocate a delinquent account for collection recovery</p>
          </div>
          <button 
            type="button" 
            className="close-btn" 
            onClick={() => navigate('/collections')}
            aria-label="Close page"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="add-coll-form">
          <div className="form-group">
            <label className="form-label required">Borrower name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Borrower name"
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label required">Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 99000 00000"
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Loan Type</label>
            <select
              value={loanType}
              onChange={(e) => setLoanType(e.target.value)}
              className="form-select"
            >
              <option value="Business Loan">Business Loan</option>
              <option value="Home Loan">Home Loan</option>
              <option value="Personal Loan">Personal Loan</option>
              <option value="LAP">LAP (Loan Against Property)</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label required">Overdue Amount</label>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="₹ 0"
                required
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label required">Days Past Due (DPD)</label>
              <input
                type="number"
                value={dpd}
                onChange={(e) => setDpd(e.target.value)}
                placeholder="0"
                required
                min="0"
                className="form-input"
              />
            </div>
          </div>

          {/* Footer Controls */}
          <div className="form-footer">
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={() => navigate('/collections')}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-post-case">
              Post Case
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .add-coll-container {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          width: 100%;
          min-height: calc(100vh - 120px);
        }

        .add-coll-card {
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

        .add-coll-header {
          padding: 24px;
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }

        .add-coll-title {
          font-family: var(--font-serif);
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--text-main);
        }

        .add-coll-subtitle {
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

        .add-coll-form {
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

        .btn-post-case {
          background-color: #06402B !important;
          color: var(--text-white) !important;
        }

        .btn-post-case:hover {
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
