import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gaps } from '../data/gaps';

function Assessment({ onSubmit, currentGapIndex, setCurrentGapIndex }) {
  const [selections, setSelections] = useState({});
  const gapIds = Object.keys(gaps);
  const currentGap = gaps[gapIds[currentGapIndex]];

  const handleCheckboxChange = (gapId, statementIndex) => {
    setSelections(prev => ({
      ...prev,
      [gapId]: {
        ...prev[gapId],
        [statementIndex]: !prev[gapId]?.[statementIndex]
      }
    }));
  };

  const handleNext = () => {
    if (currentGapIndex < gapIds.length - 1) {
      setCurrentGapIndex(currentGapIndex + 1);
    } else {
      onSubmit(selections);
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key={currentGapIndex}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        className="assessment-container"
      >
        <div className="gap-card">
          <h2 className="gap-title">{currentGap.title}</h2>
          <div className="statements-container">
            {currentGap.statements.map((statement, index) => (
              <motion.label 
                key={index} 
                className="statement-label"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <input
                  type="checkbox"
                  checked={selections[currentGap.id]?.[index] || false}
                  onChange={() => handleCheckboxChange(currentGap.id, index)}
                />
                <span>{statement}</span>
              </motion.label>
            ))}
          </div>
          <button 
            className="next-button"
            onClick={handleNext}
          >
            {currentGapIndex < gapIds.length - 1 ? 'Next' : 'See Results'}
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default Assessment; 