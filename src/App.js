import React, { useState } from 'react';
import Welcome from './components/Welcome';
import Assessment from './components/Assessment';
import Results from './components/Results';
import ProgressBar from './components/ProgressBar';
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [selections, setSelections] = useState({});
  const [currentGapIndex, setCurrentGapIndex] = useState(0);

  const handleStartAssessment = () => {
    setCurrentScreen('assessment');
  };

  const handleSubmitAssessment = (results) => {
    setSelections(results);
    setCurrentScreen('results');
  };

  const progress = currentScreen === 'welcome' ? 0 : 
                  currentScreen === 'assessment' ? ((currentGapIndex + 1) / 7) * 100 :
                  100;

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <Welcome onStart={handleStartAssessment} />;
      case 'assessment':
        return <Assessment 
          onSubmit={handleSubmitAssessment}
          currentGapIndex={currentGapIndex}
          setCurrentGapIndex={setCurrentGapIndex}
        />;
      case 'results':
        return <Results selections={selections} />;
      default:
        return <Welcome onStart={handleStartAssessment} />;
    }
  };

  return (
    <div className="app-wrapper">
      <ProgressBar progress={progress} />
      <div className="app">
        {currentScreen === 'assessment' && (
          <div className="assessment-header">
            <h2 className="step-counter">Step {currentGapIndex + 1} of 7</h2>
          </div>
        )}
        {renderScreen()}
      </div>
      <div className="background-gradient"></div>
    </div>
  );
}

export default App; 