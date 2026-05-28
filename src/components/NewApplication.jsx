import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function NewApplication({ onSubmit }) {
  const navigate = useNavigate();
  const { stepId } = useParams();

  // Map route param to step number
  const step = stepId === 'step-3' ? 3 : stepId === 'step-2' ? 2 : 1;

  // Initialize form state from sessionStorage to protect data on refresh
  const [formData, setFormData] = useState(() => {
    const saved = sessionStorage.getItem('veridian_new_app');
    return saved ? JSON.parse(saved) : {
      name: '',
      email: '',
      phone: '',
      employment: 'Salaried',
      income: '',
      loanProduct: 'Business Loan',
      amount: '',
      tenure: '36',
      creditScore: '750',
      riskGrade: 'Grade B'
    };
  });

  // Sync state to sessionStorage
  useEffect(() => {
    sessionStorage.setItem('veridian_new_app', JSON.stringify(formData));
  }, [formData]);

  // Calculate Risk Grade dynamically based on credit score
  useEffect(() => {
    const score = parseInt(formData.creditScore, 10);
    let grade = 'Grade D';
    if (score >= 800) grade = 'Grade A';
    else if (score >= 720) grade = 'Grade B';
    else if (score >= 650) grade = 'Grade C';
    
    setFormData(prev => ({ ...prev, riskGrade: grade }));
  }, [formData.creditScore]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step === 1) navigate('/new-application/step-2');
    else if (step === 2) navigate('/new-application/step-3');
  };

  const handlePrev = () => {
    if (step === 3) navigate('/new-application/step-2');
    else if (step === 2) navigate('/new-application/step-1');
  };

  const handleCancel = () => {
    sessionStorage.removeItem('veridian_new_app');
    navigate('/dashboard');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.amount || !formData.income) {
      alert('Please fill out all required fields.');
      return;
    }
    
    // Compile loan information
    const result = {
      ...formData,
      id: `LN-${Math.floor(1000 + Math.random() * 9000)}`,
      amountCr: parseFloat(formData.amount) / 100, // Convert Lakhs to Crores
      status: 'Pending Verification',
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
    };

    onSubmit(result);
    // Clear session details and navigate to pipeline
    sessionStorage.removeItem('veridian_new_app');
    navigate('/origination');
  };

  return (
    <div className="new-app-container">
      <div className="new-app-card">
        {/* Header */}
        <div className="new-app-header">
          <h2 className="new-app-title">New Loan Application</h2>
          <p className="new-app-subtitle">Underwriting workflow onboarding and credit appraisal form</p>
        </div>

        {/* Steps Indicator */}
        <div className="steps-indicator">
          <div className={`step-dot ${step >= 1 ? 'active' : ''}`}>
            <span>1</span>
            <p>Borrower Details</p>
          </div>
          <div className="step-line"></div>
          <div className={`step-dot ${step >= 2 ? 'active' : ''}`}>
            <span>2</span>
            <p>Loan Parameters</p>
          </div>
          <div className="step-line"></div>
          <div className={`step-dot ${step >= 3 ? 'active' : ''}`}>
            <span>3</span>
            <p>Risk & Verification</p>
          </div>
        </div>

        {/* Form body */}
        <form onSubmit={handleSubmit} className="new-app-form">
          
          {step === 1 && (
            <div className="form-step-content animate-slide">
              <div className="form-group">
                <label className="form-label required">Applicant Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Rajesh Kumar"
                  required
                  className="form-input"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Employment Status</label>
                  <select
                    name="employment"
                    value={formData.employment}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option>Salaried</option>
                    <option>Self-Employed</option>
                    <option>Business Owner</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label required">Annual Income (₹ Lakhs)</label>
                  <input
                    type="number"
                    name="income"
                    value={formData.income}
                    onChange={handleChange}
                    placeholder="e.g. 12"
                    required
                    className="form-input"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="form-step-content animate-slide">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Loan Product</label>
                  <select
                    name="loanProduct"
                    value={formData.loanProduct}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option>Business Loan</option>
                    <option>Home Loan</option>
                    <option>Personal Loan</option>
                    <option>LAP (Loan Against Property)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label required">Loan Amount Required (₹ Lakhs)</label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="e.g. 50"
                    required
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Tenure Duration</label>
                <select
                  name="tenure"
                  value={formData.tenure}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="12">12 Months</option>
                  <option value="24">24 Months</option>
                  <option value="36">36 Months</option>
                  <option value="60">60 Months</option>
                  <option value="120">120 Months</option>
                </select>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="form-step-content animate-slide">
              <div className="form-group">
                <div className="credit-score-header">
                  <label className="form-label">Bureau Credit Score (CIBIL)</label>
                  <span className="credit-score-badge">{formData.creditScore}</span>
                </div>
                <input
                  type="range"
                  name="creditScore"
                  min="300"
                  max="900"
                  value={formData.creditScore}
                  onChange={handleChange}
                  className="credit-score-slider"
                />
                <div className="slider-labels">
                  <span>Poor (300)</span>
                  <span>Good (700)</span>
                  <span>Excellent (900)</span>
                </div>
              </div>

              {/* Dynamic Risk Rating Display */}
              <div className="risk-rating-display">
                <div className="risk-rating-title">Automated Underwriting Calculation</div>
                <div className="risk-grade-row">
                  <span className="risk-grade-label">Assigned Risk Profile</span>
                  <span className={`risk-grade-badge ${formData.riskGrade.replace(' ', '-').toLowerCase()}`}>
                    {formData.riskGrade}
                  </span>
                </div>
                <p className="risk-disclaimer">
                  This risk grade is dynamically evaluated from credit records and financial ratios.
                </p>
              </div>
            </div>
          )}

          {/* Form Footer Controls */}
          <div className="form-footer">
            {step > 1 ? (
              <button type="button" className="btn btn-secondary" onClick={handlePrev}>
                Back
              </button>
            ) : (
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/dashboard')}>
                Cancel
              </button>
            )}

            {step < 3 ? (
              <button type="button" className="btn btn-primary" onClick={handleNext}>
                Continue
              </button>
            ) : (
              <button type="submit" className="btn btn-primary">
                Submit Application
              </button>
            )}
          </div>

        </form>
      </div>

      <style>{`
        .new-app-container {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          width: 100%;
          min-height: calc(100vh - 120px);
        }

        .new-app-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          width: 100%;
          max-width: 760px;
          box-shadow: var(--shadow-sm);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .new-app-header {
          padding: 24px;
          border-bottom: 1px solid var(--border);
        }

        .new-app-title {
          font-family: var(--font-serif);
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--text-main);
        }

        .new-app-subtitle {
          font-size: 0.88rem;
          color: var(--text-muted);
          margin-top: 2px;
        }

        .steps-indicator {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px;
          background-color: var(--bg-app);
          border-bottom: 1px solid var(--border);
        }

        .step-dot {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          flex: 1;
        }

        .step-dot span {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background-color: var(--border);
          color: var(--text-muted);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.88rem;
          font-weight: 700;
          transition: all 0.3s;
        }

        .step-dot.active span {
          background-color: var(--primary);
          color: var(--bg-card);
        }

        .step-dot p {
          font-size: 0.76rem;
          font-weight: 600;
          color: var(--text-muted);
          text-align: center;
        }

        .step-dot.active p {
          color: var(--text-main);
        }

        .step-line {
          height: 2px;
          background-color: var(--border);
          flex: 1;
          margin-bottom: 22px;
        }

        .new-app-form {
          padding: 32px 24px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .form-step-content {
          display: flex;
          flex-direction: column;
          gap: 20px;
          min-height: 240px;
        }

        .animate-slide {
          animation: fadeIn 0.3s ease-out;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
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

        .credit-score-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .credit-score-badge {
          background-color: var(--primary);
          color: var(--bg-card);
          padding: 2px 10px;
          border-radius: 20px;
          font-size: 0.88rem;
          font-weight: 700;
        }
        
        .dark-theme .credit-score-badge {
          color: #032116;
        }

        .credit-score-slider {
          -webkit-appearance: none;
          width: 100%;
          height: 6px;
          border-radius: 3px;
          background: var(--border);
          outline: none;
          margin: 12px 0;
        }

        .credit-score-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: var(--primary);
          cursor: pointer;
          box-shadow: var(--shadow-sm);
        }

        .slider-labels {
          display: flex;
          justify-content: space-between;
          font-size: 0.72rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .risk-rating-display {
          background-color: var(--bg-app);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 10px;
        }

        .risk-rating-title {
          font-size: 0.76rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text-muted);
        }

        .risk-grade-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .risk-grade-label {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-main);
        }

        .risk-grade-badge {
          font-weight: 700;
          padding: 4px 12px;
          border-radius: var(--radius-sm);
          font-size: 0.84rem;
        }

        .risk-grade-badge.grade-a {
          background-color: #E8F5E9;
          color: #0E835C;
        }

        .risk-grade-badge.grade-b {
          background-color: #E0F2F1;
          color: #00796B;
        }

        .risk-grade-badge.grade-c {
          background-color: #FFF8E1;
          color: #B78103;
        }

        .risk-grade-badge.grade-d {
          background-color: #FBE9E7;
          color: #C2410C;
        }

        .risk-disclaimer {
          font-size: 0.72rem;
          color: var(--text-muted);
          line-height: 1.4;
        }

        .form-footer {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 12px;
          border-top: 1px solid var(--border);
          padding-top: 24px;
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
}
