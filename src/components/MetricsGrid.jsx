import React from 'react';

export default function MetricsGrid({ metrics }) {
  // Helper to format currency
  const formatCr = (num) => {
    return `₹${num.toFixed(1)} Cr`;
  };

  const formatNumber = (num) => {
    return num.toLocaleString('en-IN');
  };

  return (
    <div className="metrics-grid">
      {/* Assets Under Management */}
      <div className="metric-card">
        <div className="metric-card-content">
          <span className="metric-label">ASSETS UNDER MGMT</span>
          <h2 className="metric-value">{formatCr(metrics.aum)}</h2>
          <div className="metric-trend trend-up">
            <svg className="trend-icon w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            <span>8.4% MoM</span>
          </div>
        </div>
        <div className="metric-bg-shape"></div>
      </div>

      {/* Disbursed (MTD) */}
      <div className="metric-card">
        <div className="metric-card-content">
          <span className="metric-label">DISBURSED (MTD)</span>
          <h2 className="metric-value">{formatCr(metrics.disbursed)}</h2>
          <div className="metric-trend trend-up">
            <svg className="trend-icon w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            <span>12.1%</span>
          </div>
        </div>
        <div className="metric-bg-shape"></div>
      </div>

      {/* Active Loans */}
      <div className="metric-card">
        <div className="metric-card-content">
          <span className="metric-label">ACTIVE LOANS</span>
          <h2 className="metric-value">{formatNumber(metrics.activeLoans)}</h2>
          <div className="metric-trend trend-up">
            <svg className="trend-icon w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            <span>206 new</span>
          </div>
        </div>
        <div className="metric-bg-shape"></div>
      </div>

      {/* Gross NPA */}
      <div className="metric-card">
        <div className="metric-card-content">
          <span className="metric-label">GROSS NPA</span>
          <h2 className="metric-value">{metrics.npa.toFixed(2)}%</h2>
          <div className="metric-trend trend-down">
            <svg className="trend-icon w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            <span>0.3% rise</span>
          </div>
        </div>
        <div className="metric-bg-shape"></div>
      </div>

      {/* Metrics Styling */}
      <style>{`
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 30px;
        }

        .metric-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 24px;
          position: relative;
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .metric-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
          border-color: var(--text-muted);
        }

        .metric-card-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .metric-label {
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--text-muted);
          letter-spacing: 1px;
        }

        .metric-value {
          font-family: var(--font-serif);
          font-size: 2.1rem;
          font-weight: 700;
          color: var(--text-main);
          letter-spacing: -0.5px;
          margin: 4px 0;
        }

        .metric-trend {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.8rem;
          font-weight: 600;
          width: fit-content;
        }

        .trend-icon {
          flex-shrink: 0;
        }

        .trend-up {
          color: #0E835C;
        }

        .trend-down {
          color: #C2410C;
        }

        .metric-bg-shape {
          position: absolute;
          width: 90px;
          height: 90px;
          background: radial-gradient(circle, rgba(var(--primary-rgb), 0.03) 0%, rgba(255,255,255,0) 70%);
          border-radius: 50%;
          right: -20px;
          top: -20px;
          z-index: 1;
          transition: transform 0.5s ease;
        }

        .metric-card:hover .metric-bg-shape {
          transform: scale(1.3);
        }

        @media (max-width: 1100px) {
          .metrics-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .metrics-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
