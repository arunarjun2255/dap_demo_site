import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddCustomer({ onAdd }) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [exposure, setExposure] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;

    // Convert exposure string or number
    // Clean text like "₹ 15 L" or just a number
    const numericExposure = parseFloat(exposure.replace(/[^0-9.]/g, '')) || 0;

    const newCustomer = {
      id: `CUST-${Math.floor(1000 + Math.random() * 9000)}`,
      name: name,
      email: `${name.toLowerCase().replace(/\s+/g, '.')}@gmail.com`,
      phone: '+91 99000 ' + Math.floor(10000 + Math.random() * 90000),
      city: city,
      loanProduct: 'Business Loan',
      outstanding: numericExposure || 0.0,
      creditScore: 750, // default good score
      kycStatus: 'Verified',
      riskGrade: 'Grade B',
      schedule: [
        { emiNo: 1, dueDate: '10 Jun 2026', amount: '₹12,500', status: 'Pending' }
      ]
    };

    onAdd(newCustomer);
  };

  return (
    <div className="add-cust-container">
      <div className="add-cust-card">
        {/* Header */}
        <div className="add-cust-header">
          <h2 className="add-cust-title">Add Customer</h2>
          <p className="add-cust-subtitle">Create a borrower profile</p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="add-cust-form">
          <div className="form-group">
            <label className="form-label required">Full name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Customer name"
              required
              className="form-input"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Initial exposure</label>
              <input
                type="text"
                value={exposure}
                onChange={(e) => setExposure(e.target.value)}
                placeholder="₹ 0 L"
                className="form-input"
              />
            </div>
          </div>

          {/* Footer Controls */}
          <div className="form-footer">
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={() => navigate('/customers')}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Create customer
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .add-cust-container {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          width: 100%;
          min-height: calc(100vh - 120px);
        }

        .add-cust-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          width: 100%;
          max-width: 580px;
          box-shadow: var(--shadow-sm);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .add-cust-header {
          padding: 24px;
          border-bottom: 1px solid var(--border);
        }

        .add-cust-title {
          font-family: var(--font-serif);
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--text-main);
        }

        .add-cust-subtitle {
          font-size: 0.88rem;
          color: var(--text-muted);
          margin-top: 2px;
        }

        .add-cust-form {
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

        .form-input {
          border: 1px solid var(--border);
          background-color: var(--bg-card);
          padding: 10px 14px;
          border-radius: var(--radius-md);
          font-size: 0.9rem;
          outline: none;
          color: var(--text-main);
          transition: border-color 0.2s;
        }

        .form-input:focus {
          border-color: var(--border-focus);
          box-shadow: 0 0 0 3px rgba(var(--primary-rgb), 0.08);
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
