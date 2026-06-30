import React from 'react';

const mockGlJournal = [
  { ref: 'GL-8802', account: 'Loan Disbursal Account', type: 'Asset Debit', amount: '₹1,20,00,000', date: '27 May 2026', narration: 'Disbursal Amit Patel' },
  { ref: 'GL-8801', account: 'Escrow Settlements', type: 'Cash Debit', amount: '₹1,45,000', date: '28 May 2026', narration: 'EMI Autopay Rohan Deshmukh' },
  { ref: 'GL-8799', account: 'Interest Receivable', type: 'Revenue Credit', amount: '₹48,200', date: '28 May 2026', narration: 'Interest Accrued' },
  { ref: 'GL-8798', account: 'Escrow Settlements', type: 'Cash Debit', amount: '₹82,000', date: '27 May 2026', narration: 'EMI NetBank Meera Iyer' },
  { ref: 'GL-8795', account: 'Operations Outflow', type: 'Liability Debit', amount: '₹14,500', date: '26 May 2026', narration: 'Cloud infrastructure usage' }
];

export default function Accounting() {
  return (
    <div className="accounting-container">
      <h2 className="section-title">Accounting & GL</h2>
      <p className="section-subtitle">Horizon ledger journals, chart of accounts, and financial balance sheets</p>

      {/* Financial Health Summary cards */}
      <div className="accounting-summary">
        <div className="acc-card">
          <span>CAPITAL ADEQUACY RATIO</span>
          <h3>18.7%</h3>
          <p className="status-good">Well above RBI requirement (15%)</p>
        </div>
        <div className="acc-card">
          <span>LIQUIDITY COVERAGE RATIO</span>
          <h3>142%</h3>
          <p className="status-good">Healthy cash buffer maintained</p>
        </div>
        <div className="acc-card">
          <span>TOTAL DEBT TO EQUITY</span>
          <h3>2.84</h3>
          <p className="status-warn">Within ICC guidelines</p>
        </div>
      </div>

      {/* Balance sheets overview */}
      <div className="balance-sheet-grid">
        {/* Assets & Liabilities list */}
        <div className="fin-statement-card">
          <div className="statement-header">
            <h4>Condensed Balance Sheet</h4>
            <span>as of 28 May 2026</span>
          </div>
          <div className="statement-body">
            <div className="statement-line heading">ASSETS</div>
            <div className="statement-line indent">Loans & Advances (Net)<span className="value">₹248.60 Cr</span></div>
            <div className="statement-line indent">Cash & Cash Equivalents<span className="value">₹24.50 Cr</span></div>
            <div className="statement-line indent">Investments Portfolio<span className="value">₹18.20 Cr</span></div>
            <div className="statement-line total">Total Assets<span className="value">₹291.30 Cr</span></div>

            <div className="statement-line heading spacing-top">LIABILITIES & EQUITY</div>
            <div className="statement-line indent">Borrowings (NCDs & Banks)<span className="value">₹195.00 Cr</span></div>
            <div className="statement-line indent">Other Liabilities<span className="value">₹12.30 Cr</span></div>
            <div className="statement-line indent">Shareholders Capital<span className="value">₹84.00 Cr</span></div>
            <div className="statement-line total">Total Liabilities & Equity<span className="value">₹291.30 Cr</span></div>
          </div>
        </div>

        {/* Ledger Journal */}
        <div className="ledger-journal-card">
          <div className="statement-header">
            <h4>General Ledger Journal</h4>
            <span>Recent postings</span>
          </div>
          <div className="journal-list">
            {mockGlJournal.map(item => (
              <div key={item.ref} className="journal-item">
                <div className="item-meta">
                  <span className="gl-ref">{item.ref}</span>
                  <span className="gl-date">{item.date}</span>
                </div>
                <div className="item-details">
                  <div className="item-row">
                    <span className="gl-acc">{item.account}</span>
                    <span className="gl-amt">{item.amount}</span>
                  </div>
                  <div className="item-row">
                    <span className="gl-narr">{item.narration}</span>
                    <span className="gl-type">{item.type}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .accounting-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .accounting-summary {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .acc-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 16px 20px;
          box-shadow: var(--shadow-sm);
        }

        .acc-card span {
          font-size: 0.68rem;
          font-weight: 700;
          color: var(--text-muted);
          letter-spacing: 0.8px;
        }

        .acc-card h3 {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          color: var(--text-main);
          margin: 6px 0;
        }

        .acc-card p {
          font-size: 0.76rem;
          font-weight: 600;
        }

        .status-good { color: #0E835C; }
        .status-warn { color: #D97706; }

        .balance-sheet-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 20px;
        }

        .fin-statement-card, .ledger-journal-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 24px;
          box-shadow: var(--shadow-sm);
        }

        .statement-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          border-bottom: 1px solid var(--border);
          padding-bottom: 12px;
        }

        .statement-header h4 {
          font-size: 1.05rem;
          font-weight: 600;
          color: var(--text-main);
        }

        .statement-header span {
          font-size: 0.76rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .statement-body {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .statement-line {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
          color: var(--text-main);
        }

        .statement-line.heading {
          font-weight: 700;
          color: var(--primary-light);
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          padding-bottom: 4px;
          letter-spacing: 0.5px;
        }

        .statement-line.indent {
          padding-left: 16px;
          color: var(--text-muted);
          font-weight: 500;
        }

        .statement-line.indent .value {
          color: var(--text-main);
          font-weight: 600;
        }

        .statement-line.total {
          font-weight: 700;
          border-top: 1px solid var(--border);
          border-bottom: 2px double var(--border);
          padding: 8px 0;
          margin-top: 4px;
        }

        .spacing-top {
          margin-top: 16px;
        }

        .journal-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .journal-item {
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.03);
        }

        .journal-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .item-meta {
          display: flex;
          justify-content: space-between;
          font-size: 0.72rem;
          font-weight: 600;
        }

        .gl-ref {
          color: var(--primary-light);
        }

        .gl-date {
          color: var(--text-muted);
        }

        .item-details {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .item-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.86rem;
        }

        .gl-acc {
          font-weight: 600;
          color: var(--text-main);
        }

        .gl-amt {
          font-weight: 700;
          color: var(--text-main);
        }

        .gl-narr {
          font-size: 0.76rem;
          color: var(--text-muted);
        }

        .gl-type {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        @media (max-width: 900px) {
          .accounting-summary {
            grid-template-columns: 1fr;
          }
          .balance-sheet-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
