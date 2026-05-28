import React, { useState } from 'react';

export default function Settings() {
  const [rates, setRates] = useState({
    business: 13.5,
    home: 8.75,
    personal: 14.0,
    lap: 11.5
  });

  const [tfa, setTfa] = useState(true);
  const [timeout, setTimeout] = useState(15);

  const handleSave = () => {
    alert('System Configuration saved successfully.');
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <div>
          <h2 className="section-title">System Settings</h2>
          <p className="section-subtitle">Set up lending products, interest margins, security parameters, and regional branch mappings</p>
        </div>
        <button className="btn btn-primary" onClick={handleSave}>
          Save Settings
        </button>
      </div>

      <div className="settings-grid">
        {/* Left Column: Product pricing interest margins */}
        <div className="setting-card">
          <h4 className="setting-card-title">Product Pricing & Interest Rates</h4>
          <p className="setting-card-desc">Set benchmark annual percentage rates (APR) for new credit originations</p>

          <div className="rates-sliders">
            <div className="rate-slider-group">
              <div className="slider-label-row">
                <span className="rate-name">Business Loan</span>
                <span className="rate-value">{rates.business}%</span>
              </div>
              <input 
                type="range" 
                min="5" 
                max="25" 
                step="0.25"
                value={rates.business} 
                onChange={(e) => setRates({ ...rates, business: parseFloat(e.target.value) })}
                className="setting-range-slider"
              />
            </div>

            <div className="rate-slider-group">
              <div className="slider-label-row">
                <span className="rate-name">Home Loan</span>
                <span className="rate-value">{rates.home}%</span>
              </div>
              <input 
                type="range" 
                min="5" 
                max="20" 
                step="0.25"
                value={rates.home} 
                onChange={(e) => setRates({ ...rates, home: parseFloat(e.target.value) })}
                className="setting-range-slider"
              />
            </div>

            <div className="rate-slider-group">
              <div className="slider-label-row">
                <span className="rate-name">LAP (Loan Against Property)</span>
                <span className="rate-value">{rates.lap}%</span>
              </div>
              <input 
                type="range" 
                min="5" 
                max="22" 
                step="0.25"
                value={rates.lap} 
                onChange={(e) => setRates({ ...rates, lap: parseFloat(e.target.value) })}
                className="setting-range-slider"
              />
            </div>

            <div className="rate-slider-group">
              <div className="slider-label-row">
                <span className="rate-name">Personal Loan</span>
                <span className="rate-value">{rates.personal}%</span>
              </div>
              <input 
                type="range" 
                min="8" 
                max="28" 
                step="0.25"
                value={rates.personal} 
                onChange={(e) => setRates({ ...rates, personal: parseFloat(e.target.value) })}
                className="setting-range-slider"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Security configs & general configs */}
        <div className="setting-card">
          <h4 className="setting-card-title">Security & Session Parameters</h4>
          <p className="setting-card-desc">Control authentication requirements and console locking parameters</p>

          <div className="settings-options">
            <div className="option-row">
              <div className="option-info">
                <span className="option-title">Require 2FA Authentication</span>
                <p className="option-desc">Enforces CIBIL pulls and loan releases to verify with mobile OTP codes.</p>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={tfa} 
                  onChange={(e) => setTfa(e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="option-row spacing-top">
              <div className="option-info">
                <span className="option-title">Auto-Lock Console Timeout</span>
                <p className="option-desc">Log out console sessions automatically after a duration of inactivity.</p>
              </div>
              <select 
                value={timeout} 
                onChange={(e) => setTimeout(parseInt(e.target.value, 10))}
                className="timeout-select"
              >
                <option value="5">5 Minutes</option>
                <option value="15">15 Minutes</option>
                <option value="30">30 Minutes</option>
                <option value="60">60 Minutes</option>
              </select>
            </div>

            <div className="system-sync-status spacing-top">
              <div className="sync-title">Horizon Core Integration Sync</div>
              <div className="sync-row">
                <span className="sync-lbl">API Health status</span>
                <span className="sync-badge ok">Connected</span>
              </div>
              <div className="sync-row">
                <span className="sync-lbl">Last backup sync</span>
                <span className="sync-val">Today, 12:45 PM (Mumbai HQ Server)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .settings-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .settings-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }

        .settings-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .setting-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 24px;
          box-shadow: var(--shadow-sm);
        }

        .setting-card-title {
          font-size: 1.05rem;
          font-weight: 600;
          color: var(--text-main);
          margin-bottom: 4px;
        }

        .setting-card-desc {
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-bottom: 24px;
        }

        .rates-sliders {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .rate-slider-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .slider-label-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-main);
        }

        .rate-value {
          color: var(--primary);
          font-weight: 700;
        }

        .setting-range-slider {
          -webkit-appearance: none;
          width: 100%;
          height: 6px;
          border-radius: 3px;
          background: var(--border);
          outline: none;
        }

        .setting-range-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--primary);
          cursor: pointer;
          box-shadow: var(--shadow-sm);
        }

        .settings-options {
          display: flex;
          flex-direction: column;
        }

        .option-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
        }

        .option-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .option-title {
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-main);
        }

        .option-desc {
          font-size: 0.78rem;
          color: var(--text-muted);
          line-height: 1.4;
        }

        /* Toggle switch */
        .toggle-switch {
          position: relative;
          display: inline-block;
          width: 44px;
          height: 24px;
          flex-shrink: 0;
        }

        .toggle-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .toggle-slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: var(--border);
          transition: .4s;
          border-radius: 34px;
        }

        .toggle-slider:before {
          position: absolute;
          content: "";
          height: 16px;
          width: 16px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          transition: .4s;
          border-radius: 50%;
        }

        input:checked + .toggle-slider {
          background-color: var(--primary);
        }

        input:checked + .toggle-slider:before {
          transform: translateX(20px);
        }

        .timeout-select {
          border: 1px solid var(--border);
          background-color: var(--bg-card);
          padding: 6px 12px;
          border-radius: var(--radius-sm);
          font-size: 0.86rem;
          outline: none;
          color: var(--text-main);
        }

        .system-sync-status {
          background-color: var(--bg-app);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .sync-title {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text-muted);
        }

        .sync-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.84rem;
        }

        .sync-lbl {
          color: var(--text-muted);
          font-weight: 500;
        }

        .sync-badge.ok {
          background-color: var(--success-bg);
          color: var(--success);
          font-size: 0.72rem;
          font-weight: 700;
          padding: 1px 8px;
          border-radius: 4px;
        }

        .sync-val {
          color: var(--text-main);
          font-weight: 600;
        }

        @media (max-width: 900px) {
          .settings-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
