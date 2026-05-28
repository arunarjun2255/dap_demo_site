import React, { useState, useRef, useEffect } from 'react';

const mockData = {
  Week: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    disbursements: [3.2, 4.5, 2.8, 5.1, 4.0, 1.5, 2.1],
    collections: [2.5, 3.8, 3.0, 4.2, 3.5, 2.0, 1.8]
  },
  Month: {
    labels: ['04 May', '08 May', '12 May', '16 May', '20 May', '24 May', '28 May'],
    disbursements: [12.4, 18.2, 15.6, 22.8, 20.1, 28.4, 31.2],
    collections: [10.2, 14.5, 13.0, 18.2, 17.5, 22.0, 26.8]
  },
  Quarter: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    disbursements: [65.4, 78.2, 85.6, 92.8, 110.1],
    collections: [55.2, 64.5, 72.0, 81.2, 95.5]
  },
  YTD: {
    labels: ['Jul 25', 'Sep 25', 'Nov 25', 'Jan 26', 'Mar 26', 'May 26'],
    disbursements: [120, 150, 180, 210, 230, 248.6],
    collections: [100, 125, 150, 175, 200, 218.4]
  }
};

export default function DisbursementChart() {
  const [timeframe, setTimeframe] = useState('Month');
  const [hoverIndex, setHoverIndex] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const currentData = mockData[timeframe];
  const { labels, disbursements, collections } = currentData;

  const handleExport = () => {
    // Generate simple CSV content
    let csvContent = "data:text/csv;charset=utf-8,Timeframe,Disbursements (Cr),Collections (Cr)\n";
    labels.forEach((label, i) => {
      csvContent += `${label},${disbursements[i]},${collections[i]}\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Veridian_${timeframe}_Disbursement_vs_Collection.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Dimensions of the SVG canvas
  const width = 600;
  const height = 240;
  const paddingLeft = 40;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 40;

  // Find max value for Y-axis scaling
  const maxVal = Math.max(...disbursements, ...collections) * 1.15;
  const minVal = 0;

  // Helpers to calculate coordinates
  const getX = (index) => {
    const totalPoints = labels.length;
    const chartWidth = width - paddingLeft - paddingRight;
    return paddingLeft + (index / (totalPoints - 1)) * chartWidth;
  };

  const getY = (val) => {
    const chartHeight = height - paddingTop - paddingBottom;
    return height - paddingBottom - ((val - minVal) / (maxVal - minVal)) * chartHeight;
  };

  // Path generators
  const generateLinePath = (data) => {
    return data.map((val, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(val)}`).join(' ');
  };

  const generateAreaPath = (data) => {
    const linePath = generateLinePath(data);
    const firstX = getX(0);
    const lastX = getX(data.length - 1);
    const zeroY = getY(0);
    return `${linePath} L ${lastX} ${zeroY} L ${firstX} ${zeroY} Z`;
  };

  // Handle SVG mouse movement to trigger custom interactive tooltips
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    
    // Convert coordinate to point index
    const chartWidth = rect.width - (paddingLeft + paddingRight) * (rect.width / width);
    const leftOffset = paddingLeft * (rect.width / width);
    const relativeX = mouseX - leftOffset;
    
    let index = Math.round((relativeX / chartWidth) * (labels.length - 1));
    index = Math.max(0, Math.min(labels.length - 1, index));
    
    // Check if within bounds of index elements
    setHoverIndex(index);
    
    // Set tooltip coordinate
    const svgX = getX(index);
    const svgY = getY(disbursements[index]);
    
    // Scale back to screen dimensions
    const screenX = (svgX / width) * rect.width;
    const screenY = (svgY / height) * rect.height;
    
    setTooltipPos({ x: screenX, y: screenY });
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  return (
    <div className="chart-card">
      <div className="chart-header">
        <div className="chart-title-area">
          <h3 className="chart-card-title">Disbursement vs Collection</h3>
        </div>
        <div className="chart-actions">
          {/* Timeframe Toggles */}
          <div className="timeframe-selector">
            {Object.keys(mockData).map((key) => (
              <button
                key={key}
                className={`timeframe-btn ${timeframe === key ? 'active' : ''}`}
                onClick={() => setTimeframe(key)}
              >
                {key}
              </button>
            ))}
          </div>

          <button className="export-link-btn" onClick={handleExport}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export CSV
          </button>
        </div>
      </div>

      <div 
        className="chart-svg-container" 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <svg viewBox={`0 0 ${width} ${height}`} className="chart-svg" width="100%" height="100%">
          <defs>
            {/* Linear gradients for area shapes */}
            <linearGradient id="colorDisbursed" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0E835C" stopOpacity={0.25}/>
              <stop offset="95%" stopColor="#0E835C" stopOpacity={0.01}/>
            </linearGradient>
            <linearGradient id="colorCollected" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#E2B25B" stopOpacity={0.25}/>
              <stop offset="95%" stopColor="#E2B25B" stopOpacity={0.01}/>
            </linearGradient>
          </defs>

          {/* Grid lines (horizontal) */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
            const val = minVal + ratio * (maxVal - minVal);
            const y = getY(val);
            return (
              <g key={i}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={width - paddingRight}
                  y2={y}
                  stroke="var(--border)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <text
                  x={paddingLeft - 8}
                  y={y + 4}
                  fill="var(--text-muted)"
                  fontSize="10"
                  textAnchor="end"
                  fontWeight="500"
                >
                  {val >= 100 ? `${Math.round(val)}` : val.toFixed(1)}
                </text>
              </g>
            );
          })}

          {/* X Axis Labels */}
          {labels.map((label, i) => {
            const x = getX(i);
            return (
              <text
                key={i}
                x={x}
                y={height - paddingBottom + 20}
                fill="var(--text-muted)"
                fontSize="10.5"
                textAnchor="middle"
                fontWeight="600"
              >
                {label}
              </text>
            );
          })}

          {/* Underlay Area Charts */}
          <path d={generateAreaPath(disbursements)} fill="url(#colorDisbursed)" />
          <path d={generateAreaPath(collections)} fill="url(#colorCollected)" />

          {/* Lines */}
          <path
            d={generateLinePath(disbursements)}
            fill="none"
            stroke="#0E835C"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={generateLinePath(collections)}
            fill="none"
            stroke="#E2B25B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="1 1"
          />

          {/* Dots on Hover */}
          {disbursements.map((val, i) => {
            const isHovered = hoverIndex === i;
            return (
              <g key={i}>
                <circle
                  cx={getX(i)}
                  cy={getY(val)}
                  r={isHovered ? 6 : 4}
                  fill="#0E835C"
                  stroke="var(--bg-card)"
                  strokeWidth="2"
                  style={{ transition: 'r 0.1s' }}
                />
                <circle
                  cx={getX(i)}
                  cy={getY(collections[i])}
                  r={isHovered ? 5 : 3.5}
                  fill="#E2B25B"
                  stroke="var(--bg-card)"
                  strokeWidth="1.5"
                  style={{ transition: 'r 0.1s' }}
                />
              </g>
            );
          })}

          {/* Vertical indicator line */}
          {hoverIndex !== null && (
            <line
              x1={getX(hoverIndex)}
              y1={paddingTop}
              x2={getX(hoverIndex)}
              y2={height - paddingBottom}
              stroke="var(--text-muted)"
              strokeWidth="1"
              strokeDasharray="2 2"
            />
          )}
        </svg>

        {/* Hover Tooltip HTML overlay */}
        {hoverIndex !== null && (
          <div 
            className="chart-tooltip"
            style={{ 
              left: `${tooltipPos.x}px`,
              top: `${tooltipPos.y - 10}px`
            }}
          >
            <div className="tooltip-date">{labels[hoverIndex]}</div>
            <div className="tooltip-value">
              <span className="dot dot-disbursed"></span>
              <span>Disbursed: ₹{disbursements[hoverIndex]} Cr</span>
            </div>
            <div className="tooltip-value">
              <span className="dot dot-collected"></span>
              <span>Collected: ₹{collections[hoverIndex]} Cr</span>
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="chart-legend">
        <div className="legend-item">
          <span className="legend-indicator" style={{ backgroundColor: '#0E835C' }}></span>
          <span className="legend-text">Disbursed</span>
        </div>
        <div className="legend-item">
          <span className="legend-indicator legend-dashed" style={{ borderColor: '#E2B25B' }}></span>
          <span className="legend-text">Collection</span>
        </div>
      </div>

      <style>{`
        .chart-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 24px;
          box-shadow: var(--shadow-sm);
          flex: 1.6;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .chart-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 12px;
        }

        .chart-card-title {
          font-size: 1.15rem;
          font-weight: 600;
          color: var(--text-main);
        }

        .chart-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .timeframe-selector {
          display: flex;
          background-color: var(--bg-app);
          padding: 4px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border);
        }

        .timeframe-btn {
          border: none;
          background: none;
          padding: 6px 12px;
          border-radius: var(--radius-sm);
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.2s;
        }

        .timeframe-btn:hover {
          color: var(--text-main);
        }

        .timeframe-btn.active {
          background-color: var(--primary);
          color: var(--text-white);
        }
        .dark-theme .timeframe-btn.active {
          color: #032116;
          background-color: var(--primary);
        }

        .export-link-btn {
          background: none;
          border: none;
          color: var(--success);
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: filter 0.2s;
        }

        .export-link-btn:hover {
          filter: brightness(1.2);
        }

        .chart-svg-container {
          position: relative;
          width: 100%;
          flex: 1;
        }

        .chart-svg {
          display: block;
          overflow: visible;
        }

        .chart-tooltip {
          position: absolute;
          transform: translate(-50%, -100%);
          background-color: rgba(17, 24, 39, 0.95);
          color: #FFFFFF;
          padding: 10px 14px;
          border-radius: var(--radius-md);
          font-size: 0.78rem;
          pointer-events: none;
          z-index: 100;
          box-shadow: var(--shadow-lg);
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(4px);
        }

        .tooltip-date {
          font-weight: 700;
          margin-bottom: 6px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding-bottom: 4px;
          color: var(--accent);
        }

        .tooltip-value {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 3px 0;
          font-weight: 500;
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          display: inline-block;
        }

        .dot-disbursed {
          background-color: #0E835C;
        }

        .dot-collected {
          background-color: #E2B25B;
        }

        .chart-legend {
          display: flex;
          gap: 16px;
          margin-top: 14px;
          padding-left: 40px;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .legend-indicator {
          width: 12px;
          height: 12px;
          border-radius: 3px;
        }

        .legend-dashed {
          width: 12px;
          height: 0;
          border-top: 2px dashed;
          border-radius: 0;
        }

        .legend-text {
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
}
