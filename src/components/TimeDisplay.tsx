import React from 'react';

interface TimeDisplayProps {
  seconds: number;
  isActive: boolean;
  isRunning: boolean;
  increment: number;
}

const TimeDisplay: React.FC<TimeDisplayProps> = ({ seconds, isActive, isRunning, increment }) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`text-7xl font-bold font-mono tracking-wider ${
          isActive && isRunning ? 'text-white' : 'text-gray-400'
        }`}
      >
        {String(minutes).padStart(2, '0')}:{String(remainingSeconds).padStart(2, '0')}
      </div>
      {increment > 0 && (
        <div className="text-sm text-gray-400 mt-2">
          +{increment}s per move
        </div>
      )}
    </div>
  );
};

export default TimeDisplay;