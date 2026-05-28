import React, { useState } from 'react';

export default function RiskGradeChart() {
  const [hoveredSlice, setHoveredSlice] = useState(null);

  // Grade Data
  const grades = [
    { id: 'A', label: 'Grade A', value: 41, color: '#0A5F44' }, // Deep teal green
    { id: 'B', label: 'Grade B', value: 33, color: '#51B094' }, // Minty teal
    { id: 'C', label: 'Grade C', value: 19, color: '#CF9845' }, // Amber mustard
    { id: 'D', label: 'Grade D', value: 7, color: '#B03B26' }  // Rust red
  ];

  const totalValue = grades.reduce((acc, g) => acc + g.value, 0);

  // Circle geometry details
  const radius = 55;
  const strokeWidth = 18;
  const circumference = 2 * Math.PI * radius; // ~345.58
  const center = 80; // (X,Y) coordinates for center of circle

  // Calculate cumulative offsets
  let accumulatedPercent = 0;

  return (
    <div className="risk-chart-card">
      <h3 className="chart-card-title">Portfolio by Risk Grade</h3>
      
      <div className="risk-chart-body">
        {/* SVG Donut */}
        <div className="donut-container">
          <svg viewBox="0 0 160 160" className="donut-svg">
            <g transform={`rotate(-90 ${center} ${center})`}>
              {grades.map((grade, index) => {
                const percentage = grade.value;
                const dashArray = `${(percentage / 100) * circumference} ${circumference}`;
                
                const strokeOffset = circumference - (accumulatedPercent / 100) * circumference;
                accumulatedPercent += percentage;

                const isHovered = hoveredSlice === index;

                return (
                  <circle
                    key={grade.id}
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="transparent"
                    stroke={grade.color}
                    strokeWidth={isHovered ? strokeWidth + 3 : strokeWidth}
                    strokeDasharray={dashArray}
                    strokeDashoffset={strokeOffset}
                    className="donut-segment"
                    onMouseEnter={() => setHoveredSlice(index)}
                    onMouseLeave={() => setHoveredSlice(null)}
                    style={{
                      transition: 'stroke-width 0.2s ease, opacity 0.2s',
                      opacity: hoveredSlice !== null && !isHovered ? 0.7 : 1,
                      cursor: 'pointer'
                    }}
                  />
                );
              })}
            </g>

            {/* Inner Ring (White Cutout for Donut) */}
            <circle
              cx={center}
              cy={center}
              r={radius - strokeWidth / 2}
              fill="var(--bg-card)"
            />

            {/* Center Label Text */}
            <text x={center} y={center - 2} textAnchor="middle" className="center-grade-text">
              A-
            </text>
            <text x={center} y={center + 14} textAnchor="middle" className="center-sub-text">
              AVG GRADE
            </text>
          </svg>
        </div>

        {/* Legend */}
        <div className="donut-legend">
          {grades.map((grade, index) => {
            const isHovered = hoveredSlice === index;
            return (
              <div 
                key={grade.id} 
                className={`legend-row ${isHovered ? 'active' : ''}`}
                onMouseEnter={() => setHoveredSlice(index)}
                onMouseLeave={() => setHoveredSlice(null)}
              >
                <div className="legend-left">
                  <span className="legend-bullet" style={{ backgroundColor: grade.color }}></span>
                  <span className="legend-label">{grade.label}</span>
                </div>
                <span className="legend-value">{grade.value}%</span>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .risk-chart-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 24px;
          box-shadow: var(--shadow-sm);
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .risk-chart-body {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 24px;
          flex: 1;
          margin-top: 10px;
        }

        .donut-container {
          position: relative;
          width: 160px;
          height: 160px;
          flex-shrink: 0;
        }

        .donut-svg {
          width: 100%;
          height: 100%;
          overflow: visible;
        }



        .center-grade-text {
          font-family: var(--font-serif);
          font-size: 1.6rem;
          font-weight: 700;
          fill: var(--text-main);
        }

        .center-sub-text {
          font-size: 0.65rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          fill: var(--text-muted);
        }

        .donut-legend {
          display: flex;
          flex-direction: column;
          gap: 12px;
          flex: 1;
          width: 100%;
        }

        .legend-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 6px 10px;
          border-radius: var(--radius-sm);
          transition: all 0.2s;
          cursor: pointer;
        }

        .legend-row:hover, .legend-row.active {
          background-color: var(--bg-app);
        }

        .legend-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .legend-bullet {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .legend-label {
          font-size: 0.84rem;
          font-weight: 500;
          color: var(--text-muted);
        }

        .legend-row.active .legend-label {
          color: var(--text-main);
          font-weight: 600;
        }

        .legend-value {
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--text-main);
        }

        @media (max-width: 900px) {
          .risk-chart-body {
            flex-direction: column;
            gap: 16px;
          }
        }
      `}</style>
    </div>
  );
}
