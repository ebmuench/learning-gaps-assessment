import React, { useState, useEffect } from 'react';
import { gaps } from '../data/gaps';
import { motion } from 'framer-motion';

function Results({ selections }) {
  const [topGaps, setTopGaps] = useState([]);
  const [showReflection, setShowReflection] = useState(false);

  useEffect(() => {
    // Calculate scores for each gap
    const scores = Object.entries(selections).map(([gapId, responses]) => {
      const checkedCount = Object.values(responses).filter(Boolean).length;
      return { gapId, score: checkedCount };
    });

    // Find the highest score
    const maxScore = Math.max(...scores.map(s => s.score));
    
    // Get all gaps that share the highest score
    const topScoringGaps = scores
      .filter(s => s.score === maxScore && s.score > 0)
      .map(s => gaps[s.gapId]);

    setTopGaps(topScoringGaps);
    
    // Animate in reflection after a delay
    const timer = setTimeout(() => setShowReflection(true), 1000);
    return () => clearTimeout(timer);
  }, [selections]);

  const handleScheduleCall = () => {
    window.open('https://calendly.com/your-link', '_blank');
  };

  const handleDownloadGuide = () => {
    // Implement download logic
    console.log('Downloading guide...');
  };

  const handleRequestAudit = () => {
    // Implement contact form logic
    console.log('Opening audit request form...');
  };

  return (
    <motion.div 
      className="results-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {topGaps.length > 0 ? (
        <>
          <h2>Your Most Pressing Gap{topGaps.length > 1 ? 's' : ''}</h2>
          
          {topGaps.map((gap, index) => (
            <motion.div 
              key={gap.id}
              className="gap-result"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <h3>{gap.title}</h3>
              <p className="summary">{gap.summary}</p>
              
              <div className="stats-box">
                <h4>Did you know?</h4>
                <p>{gap.stats}</p>
              </div>

              {showReflection && (
                <motion.div 
                  className="reflection-section"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <h4>Reflection Points</h4>
                  <ul>
                    {gap.reflectionPrompts.map((prompt, i) => (
                      <li key={i}>{prompt}</li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </motion.div>
          ))}

          <motion.div 
            className="cta-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <h3>Ready to Close Your Learning Gap?</h3>
            <div className="cta-buttons">
              <button 
                className="primary-button"
                onClick={handleScheduleCall}
              >
                Schedule a FREE Discovery Call
              </button>
              <button 
                className="secondary-button"
                onClick={handleDownloadGuide}
              >
                Download Our Guide
              </button>
              <button 
                className="tertiary-button"
                onClick={handleRequestAudit}
              >
                Request Custom Audit
              </button>
            </div>
          </motion.div>
        </>
      ) : (
        <div className="no-selections">
          <h3>No Gaps Selected</h3>
          <p>Please go back and select the statements that apply to your organization.</p>
          <button 
            className="primary-button"
            onClick={() => window.location.reload()}
          >
            Start Over
          </button>
        </div>
      )}
    </motion.div>
  );
}

export default Results; 