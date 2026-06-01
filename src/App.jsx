import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MetricsGrid from './components/MetricsGrid';
import DisbursementChart from './components/DisbursementChart';
import RiskGradeChart from './components/RiskGradeChart';
import NewApplication from './components/NewApplication';
import LoanOrigination from './components/LoanOrigination';
import Customer360 from './components/Customer360';
import Repayments from './components/Repayments';
import Collections from './components/Collections';
import Accounting from './components/Accounting';
import UserManagement from './components/UserManagement';
import Settings from './components/Settings';
import RecentApplications from './components/RecentApplications';
import AddCustomer from './components/AddCustomer';
import RecordPayment from './components/RecordPayment';
import AddCollection from './components/AddCollection';
import './App.css';

// Default customers database
const defaultCustomers = [
  {
    id: 'CUST-9821',
    name: 'Rohan Deshmukh',
    email: 'rohan.d@deshmukhindustries.in',
    phone: '+91 98112 34567',
    city: 'Mumbai',
    loanProduct: 'Business Loan',
    outstanding: 38.5,
    creditScore: 790,
    kycStatus: 'Verified',
    riskGrade: 'Grade B',
    customerType: 'Business',
    schedule: [
      { emiNo: 12, dueDate: '10 Jun 2026', amount: '₹1,45,000', status: 'Paid' },
      { emiNo: 13, dueDate: '10 Jul 2026', amount: '₹1,45,000', status: 'Pending' },
      { emiNo: 14, dueDate: '10 Aug 2026', amount: '₹1,45,000', status: 'Pending' }
    ]
  },
  {
    id: 'CUST-4122',
    name: 'Meera Iyer',
    email: 'meera.iyer@gmail.com',
    phone: '+91 99201 88776',
    city: 'Bengaluru',
    loanProduct: 'Home Loan',
    outstanding: 74.0,
    creditScore: 815,
    kycStatus: 'Verified',
    riskGrade: 'Grade A',
    customerType: 'Individual',
    schedule: [
      { emiNo: 48, dueDate: '05 Jun 2026', amount: '₹82,000', status: 'Paid' },
      { emiNo: 49, dueDate: '05 Jul 2026', amount: '₹82,000', status: 'Pending' },
      { emiNo: 50, dueDate: '05 Aug 2026', amount: '₹82,000', status: 'Pending' }
    ]
  },
  {
    id: 'CUST-1049',
    name: 'Vikram Malhotra',
    email: 'v.malhotra@rediffmail.com',
    phone: '+91 98450 12121',
    city: 'New Delhi',
    loanProduct: 'Personal Loan',
    outstanding: 8.2,
    creditScore: 680,
    kycStatus: 'Verified',
    riskGrade: 'Grade C',
    customerType: 'Individual',
    schedule: [
      { emiNo: 6, dueDate: '15 Jun 2026', amount: '₹28,500', status: 'Paid' },
      { emiNo: 7, dueDate: '15 Jul 2026', amount: '₹28,500', status: 'Pending' },
      { emiNo: 8, dueDate: '15 Aug 2026', amount: '₹28,500', status: 'Pending' }
    ]
  },
  {
    id: 'CUST-3902',
    name: 'Sunita Rao',
    email: 'srao.consultancy@outlook.com',
    phone: '+91 88866 54321',
    city: 'Hyderabad',
    loanProduct: 'LAP (Loan Against Property)',
    outstanding: 95.0,
    creditScore: 740,
    kycStatus: 'Verified',
    riskGrade: 'Grade B',
    customerType: 'Business',
    schedule: [
      { emiNo: 24, dueDate: '12 Jun 2026', amount: '₹1,10,000', status: 'Paid' },
      { emiNo: 25, dueDate: '12 Jul 2026', amount: '₹1,10,000', status: 'Pending' },
      { emiNo: 26, dueDate: '12 Aug 2026', amount: '₹1,10,000', status: 'Pending' }
    ]
  },
  {
    id: 'CUST-5832',
    name: 'Rajesh Nair',
    email: 'rajesh.nair@nairfoods.com',
    phone: '+91 97440 99887',
    city: 'Chennai',
    loanProduct: 'Business Loan',
    outstanding: 12.5,
    creditScore: 610,
    kycStatus: 'Pending',
    riskGrade: 'Grade D',
    customerType: 'Corporate',
    schedule: [
      { emiNo: 1, dueDate: '25 Jun 2026', amount: '₹48,000', status: 'Pending' },
      { emiNo: 2, dueDate: '25 Jul 2026', amount: '₹48,000', status: 'Pending' }
    ]
  }
];

// Default EMI Ledger database
const defaultEmiLedger = [
  { id: 'LN-887412', name: 'Sunita Rao', amount: '₹48,200', dueDate: '01 Jun 2026', status: 'Scheduled' },
  { id: 'LN-887301', name: 'Rajesh Menon', amount: '₹62,500', dueDate: '02 Jun 2026', status: 'Scheduled' },
  { id: 'LN-886990', name: 'Lakshmi Pillai', amount: '₹11,800', dueDate: '24 May 2026', status: 'Overdue 4d' },
  { id: 'LN-886774', name: 'Arjun Reddy', amount: '₹7,400', dueDate: '27 May 2026', status: 'Processing' }
];

// Default Repayments Transactions
const defaultRepayments = [
  { id: 'TXN-9021', name: 'Rohan Deshmukh', product: 'Business Loan', amount: '₹1,45,000', mode: 'NACH Auto-Debit', date: '28 May 2026', status: 'Success' },
  { id: 'TXN-7341', name: 'Meera Iyer', product: 'Home Loan', amount: '₹82,000', mode: 'Net Banking', date: '27 May 2026', status: 'Success' },
  { id: 'TXN-4190', name: 'Vikram Malhotra', product: 'Personal Loan', amount: '₹28,500', mode: 'UPI (GPay)', date: '26 May 2026', status: 'Success' },
  { id: 'TXN-8812', name: 'Sunita Rao', product: 'LAP', amount: '₹1,10,000', mode: 'NACH Auto-Debit', date: '25 May 2026', status: 'Success' },
  { id: 'TXN-3210', name: 'Kunal Sen', product: 'Business Loan', amount: '₹55,000', mode: 'UPI (PhonePe)', date: '25 May 2026', status: 'Success' },
  { id: 'TXN-1102', name: 'Aditi Verma', product: 'Personal Loan', amount: '₹14,200', mode: 'UPI (GPay)', date: '24 May 2026', status: 'Failed' },
  { id: 'TXN-9941', name: 'Sanjay Dutt', product: 'Home Loan', amount: '₹95,000', mode: 'NEFT Transfer', date: '24 May 2026', status: 'Processing' }
];

// Default Collections List
const defaultCollections = [
  { id: 'COLL-3104', name: 'Rajesh Nair', amount: '₹48,000', dpd: 3, phone: '+91 97440 99887', product: 'Business Loan', lastContact: '24 May 2026' },
  { id: 'COLL-1192', name: 'Kunal Sen', amount: '₹55,000', dpd: 18, phone: '+91 99110 22334', product: 'Business Loan', lastContact: '22 May 2026' },
  { id: 'COLL-5840', name: 'Vikram Malhotra', amount: '₹28,500', dpd: 13, phone: '+91 98450 12121', product: 'Personal Loan', lastContact: '15 May 2026' },
  { id: 'COLL-9002', name: 'Sohan Chawla', amount: '₹1,24,000', dpd: 42, phone: '+91 98112 00998', product: 'LAP', lastContact: '27 May 2026' },
  { id: 'COLL-4101', name: 'Ayesha Begum', amount: '₹62,000', dpd: 74, phone: '+91 97441 55667', product: 'Personal Loan', lastContact: '19 May 2026' },
  { id: 'COLL-2009', name: 'Ramesh Sawant', amount: '₹3,45,000', dpd: 95, phone: '+91 88812 33445', product: 'Home Loan', lastContact: '10 May 2026' }
];

// Default Loan Applications Database (4 pending as in sidebar badge count '4')
const defaultApplications = [
  {
    id: 'LN-5192',
    name: 'Priya Sharma',
    email: 'priya.sharma@sharmatech.in',
    phone: '+91 98111 22233',
    employment: 'Business Owner',
    income: '24',
    loanProduct: 'Business Loan',
    amount: '45.0',
    amountCr: 0.45,
    tenure: '36',
    creditScore: '780',
    riskGrade: 'Grade B',
    date: '28 May 2026',
    status: 'Pending Verification'
  },
  {
    id: 'LN-7104',
    name: 'Amit Patel',
    email: 'amit.patel@patelbuilders.co',
    phone: '+91 99222 33344',
    employment: 'Self-Employed',
    income: '48',
    loanProduct: 'LAP (Loan Against Property)',
    amount: '120.0',
    amountCr: 1.20,
    tenure: '60',
    creditScore: '820',
    riskGrade: 'Grade A',
    date: '27 May 2026',
    status: 'Pending Verification'
  },
  {
    id: 'LN-3910',
    name: 'Sandeep Singh',
    email: 'sandeep.singh@gmail.com',
    phone: '+91 98333 44455',
    employment: 'Salaried',
    income: '15',
    loanProduct: 'Home Loan',
    amount: '85.0',
    amountCr: 0.85,
    tenure: '120',
    creditScore: '710',
    riskGrade: 'Grade C',
    date: '26 May 2026',
    status: 'Pending Verification'
  },
  {
    id: 'LN-6023',
    name: 'Kavita Reddy',
    email: 'kavita.reddy@reddyinfra.com',
    phone: '+91 97444 55566',
    employment: 'Salaried',
    income: '9',
    loanProduct: 'Personal Loan',
    amount: '15.0',
    amountCr: 0.15,
    tenure: '24',
    creditScore: '630',
    riskGrade: 'Grade D',
    date: '25 May 2026',
    status: 'Pending Verification'
  }
];

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [darkMode, setDarkMode] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [customerFilter, setCustomerFilter] = useState('');
  const [customers, setCustomers] = useState(defaultCustomers);
  const [emiLedger, setEmiLedger] = useState(defaultEmiLedger);
  const [repayments, setRepayments] = useState(defaultRepayments);
  const [collectionsList, setCollectionsList] = useState(defaultCollections);

  // Extract path and fall back to dashboard
  const rawPath = location.pathname.substring(1);
  const activeScreen = rawPath.startsWith('new-application') 
    ? 'new-application' 
    : (rawPath === '' ? 'dashboard' : rawPath);

  // Core metrics state
  const [metrics, setMetrics] = useState({
    aum: 248.6,
    disbursed: 31.2,
    activeLoans: 4182,
    npa: 2.71
  });

  const [applications, setApplications] = useState(defaultApplications);

  // Badge count of pending items
  const pendingCount = applications.filter(app => app.status === 'Pending Verification').length;

  // Dark Mode class toggle
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [darkMode]);

  // Keyboard shortcut listener (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handler to submit a new loan application from Modal
  const handleNewApplicationSubmit = (newApp) => {
    setApplications(prev => [newApp, ...prev]);
    // Navigate to origination screen to show the newly added loan
    navigate('/origination');
  };

  // Handler to approve a loan application
  const handleApproveLoan = (id) => {
    setApplications(prev => prev.map(app => {
      if (app.id === id) {
        // Update metrics dynamically
        setMetrics(m => ({
          ...m,
          aum: m.aum + app.amountCr,
          disbursed: m.disbursed + app.amountCr,
          activeLoans: m.activeLoans + 1
        }));
        return { ...app, status: 'Approved & Disbursed' };
      }
      return app;
    }));
  };

  // Handler to reject a loan application
  const handleRejectLoan = (id) => {
    setApplications(prev => prev.map(app => {
      if (app.id === id) {
        return { ...app, status: 'Rejected' };
      }
      return app;
    }));
  };

  // Handle click on search suggestion
  const handleSearchSelect = (name) => {
    setCustomerFilter(name);
    setIsSearchOpen(false);
    navigate('/customers');
  };

  const handleSetActiveScreen = (screen) => {
    navigate('/' + screen);
    setCustomerFilter(''); // Clear filter when standard navigating
  };

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <Sidebar 
        activeScreen={activeScreen} 
        setActiveScreen={handleSetActiveScreen} 
        loanBadgeCount={pendingCount} 
      />

      {/* Main Page Area */}
      <main className="main-content">
        <Header 
          activeScreen={activeScreen}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onSearchClick={() => setIsSearchOpen(true)}
        />

        {/* Content Pane switcher */}
        <div className="content-pane">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            <Route path="/dashboard" element={
              <div className="dashboard-view">
                {/* Dashboard Hero Title */}
                <div className="dashboard-title-row">
                  <div className="dashboard-title-group">
                    <h1 className="dashboard-title">Portfolio Dashboard</h1>
                    <p className="dashboard-subtitle">
                      Live view of your lending book · as of 28 May 2026
                    </p>
                  </div>
                  {/* Visual Timeframe filter indicator from screenshot */}
                  <div className="dashboard-filter-indicator">
                    <span className="pill">Week</span>
                    <span className="pill active">Month</span>
                    <span className="pill">Quarter</span>
                    <span className="pill">YTD</span>
                  </div>
                </div>

                {/* KPI Cards Grid */}
                <MetricsGrid metrics={metrics} />

                {/* Graphical Layout Row */}
                <div className="dashboard-visuals-row">
                  <DisbursementChart />
                  <RiskGradeChart />
                </div>

                {/* Recent Loan Applications Widget */}
                <RecentApplications />
              </div>
            } />

            <Route path="/customers" element={
              <Customer360 customers={customers} globalSearchTerm={customerFilter} />
            } />

            <Route path="/add-customer" element={
              <AddCustomer onAdd={(newCust) => {
                setCustomers(prev => [...prev, newCust]);
                navigate('/customers');
              }} />
            } />

            <Route path="/origination" element={
              <LoanOrigination 
                applications={applications}
                onApprove={handleApproveLoan}
                onReject={handleRejectLoan}
                onNewApplication={() => navigate('/new-application')}
              />
            } />

            <Route path="/repayments" element={
              <Repayments 
                emiLedger={emiLedger} 
                setEmiLedger={setEmiLedger} 
                repayments={repayments} 
                setRepayments={setRepayments} 
              />
            } />

            <Route path="/record-payment" element={
              <RecordPayment 
                emiLedger={emiLedger} 
                onPostPayment={(paymentData) => {
                  setEmiLedger(prev => prev.map(item => {
                    if (item.id === paymentData.loanId) {
                      return { ...item, status: 'Paid' };
                    }
                    return item;
                  }));

                  const targetEmi = emiLedger.find(item => item.id === paymentData.loanId) || {};
                  const newTxn = {
                    id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
                    name: targetEmi.name || 'Unknown Borrower',
                    product: 'Business Loan',
                    amount: targetEmi.amount || '₹0',
                    mode: paymentData.mode,
                    date: paymentData.date,
                    status: 'Success'
                  };
                  setRepayments(prev => [newTxn, ...prev]);
                  navigate('/repayments');
                }}
              />
            } />
            <Route path="/collections" element={<Collections collectionsList={collectionsList} />} />

            <Route path="/add-collection" element={
              <AddCollection onAddCase={(newCase) => {
                setCollectionsList(prev => [newCase, ...prev]);
                navigate('/collections');
              }} />
            } />
            <Route path="/accounting" element={<Accounting />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/new-application" element={<Navigate to="/new-application/step-1" replace />} />
            <Route path="/new-application/:stepId" element={<NewApplication onSubmit={handleNewApplicationSubmit} />} />

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </main>

      {/* Global Cmd+K Search Command-Palette Modal Overlay */}
      {isSearchOpen && (
        <div className="search-overlay-modal" onClick={() => setIsSearchOpen(false)}>
          <div className="search-dialog" onClick={e => e.stopPropagation()}>
            <div className="search-dialog-header">
              <svg width="20" height="20" className="text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Type customer name, loan ID, or credit grade..."
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="dialog-search-input"
              />
              <kbd className="close-kbd">ESC</kbd>
            </div>
            
            <div className="search-results-section">
              <span className="results-group-title">QUICK CORRESPONDENCE / DIRECT ACTIONS</span>
              <ul className="search-results-list">
                <li onClick={() => { setIsSearchOpen(false); navigate('/new-application'); }}>
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Launch New Loan Application Wizard</span>
                </li>
                <li onClick={() => { setIsSearchOpen(false); navigate('/origination'); }}>
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>View Pending Origination Queue ({pendingCount} applications)</span>
                </li>
              </ul>

              <span className="results-group-title spacing-top">MATCHING CUSTOMER RECORDS</span>
              <ul className="search-results-list">
                {customers
                  .map(c => c.name)
                  .filter(name => name.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map(name => (
                    <li key={name} onClick={() => handleSearchSelect(name)}>
                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>Search & Inspect Profile: {name}</span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* App styling overrides for main dashboard layout */}
      <style>{`
        .dashboard-title-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 28px;
          flex-wrap: wrap;
          gap: 16px;
        }

        .dashboard-title-group {
          display: flex;
          flex-direction: column;
        }

        .dashboard-title {
          font-family: var(--font-serif);
          font-size: 2.1rem;
          font-weight: 700;
          color: var(--text-main);
          letter-spacing: -0.5px;
          margin: 0;
        }

        .dashboard-subtitle {
          font-size: 0.95rem;
          color: var(--text-muted);
          margin-top: 4px;
        }

        .dashboard-filter-indicator {
          display: flex;
          background-color: var(--bg-card);
          padding: 4px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border);
          box-shadow: var(--shadow-sm);
        }

        .dashboard-filter-indicator .pill {
          padding: 6px 14px;
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-muted);
          border-radius: var(--radius-sm);
          cursor: not-allowed;
          transition: all 0.2s;
        }

        .dashboard-filter-indicator .pill.active {
          background-color: var(--primary);
          color: var(--bg-card);
          cursor: default;
        }
        .dark-theme .dashboard-filter-indicator .pill.active {
          color: #032116;
          background-color: var(--primary);
        }

        .dashboard-visuals-row {
          display: flex;
          gap: 20px;
          align-items: stretch;
          flex-wrap: wrap;
        }

        .placeholder-view {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          background-color: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 80px 40px;
          text-align: center;
          max-width: 600px;
          margin: 40px auto;
          box-shadow: var(--shadow-sm);
          animation: fadeIn 0.4s ease-out;
        }

        .placeholder-view h2 {
          font-family: var(--font-serif);
          font-size: 1.45rem;
          color: var(--text-main);
        }

        .placeholder-view p {
          font-size: 0.92rem;
          color: var(--text-muted);
          max-width: 440px;
          line-height: 1.5;
        }

        /* Search Overlay Modal */
        .search-overlay-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(3, 33, 22, 0.45);
          backdrop-filter: blur(4px);
          display: flex;
          justify-content: center;
          padding-top: 100px;
          z-index: 1000;
          animation: fadeIn 0.2s ease-out;
        }

        .search-dialog {
          background-color: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          width: 600px;
          max-width: 90vw;
          box-shadow: var(--shadow-lg);
          height: fit-content;
          overflow: hidden;
          animation: scaleIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .search-dialog-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 20px;
          border-bottom: 1px solid var(--border);
        }

        .dialog-search-input {
          flex: 1;
          background: none;
          border: none;
          font-size: 1rem;
          outline: none;
          color: var(--text-main);
        }

        .close-kbd {
          background-color: var(--bg-app);
          color: var(--text-muted);
          border: 1px solid var(--border);
          border-radius: 4px;
          padding: 2px 6px;
          font-size: 0.7rem;
          font-weight: 600;
        }

        .search-results-section {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          max-height: 320px;
          overflow-y: auto;
        }

        .results-group-title {
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--text-muted);
          letter-spacing: 0.8px;
        }

        .results-group-title.spacing-top {
          margin-top: 12px;
        }

        .search-results-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .search-results-list li {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          border-radius: var(--radius-md);
          font-size: 0.88rem;
          color: var(--text-main);
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .search-results-list li:hover {
          background-color: var(--bg-app);
          color: var(--primary);
        }
      `}</style>
    </div>
  );
}
