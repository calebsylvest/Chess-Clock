import React, { useState } from 'react';
import { Clock, Plus } from 'lucide-react';

interface TimeSettingsProps {
  onSelectTime: (seconds: number, increment: number) => void;
  isDisabled: boolean;
}

const TimeSettings: React.FC<TimeSettingsProps> = ({ onSelectTime, isDisabled }) => {
  const [customMinutes, setCustomMinutes] = useState('');
  const [customIncrement, setCustomIncrement] = useState('');

  const presetTimes = [
    { label: '3+2', baseMinutes: 3, increment: 2 },
    { label: '5+2', baseMinutes: 5, increment: 2 },
    { label: '10', baseMinutes: 10, increment: 0 },
    { label: '10+2', baseMinutes: 10, increment: 2 },
    { label: '15', baseMinutes: 15, increment: 0 },
    { label: '15+2', baseMinutes: 15, increment: 2 },
  ];

  const handleCustomTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomMinutes(value);
    
    const minutes = Number(value);
    if (minutes >= 1 && minutes <= 60) {
      onSelectTime(minutes * 60, Number(customIncrement) || 0);
    }
  };

  const handleCustomIncrement = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomIncrement(value);
    
    const increment = Number(value);
    if (increment >= 0 && increment <= 60 && customMinutes) {
      onSelectTime(Number(customMinutes) * 60, increment);
    }
  };

  return (
    <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isDisabled ? 'opacity-0 w-0' : 'opacity-100 w-auto'}`}>
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-2 text-gray-300">
          <Clock size={18} />
          <span className="text-sm font-medium">Time Control</span>
        </div>
        
        <div className="grid grid-cols-6 gap-2">
          {presetTimes.map(({ label, baseMinutes, increment }) => (
            <button
              key={label}
              onClick={() => {
                setCustomMinutes('');
                setCustomIncrement('');
                onSelectTime(baseMinutes * 60, increment);
              }}
              className="px-3 py-1.5 rounded bg-gray-700 hover:bg-gray-600 text-sm font-medium
                transition-colors duration-200 whitespace-nowrap"
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="number"
            min="1"
            max="60"
            value={customMinutes}
            placeholder="Base time (min)"
            onChange={handleCustomTime}
            className="w-28 px-3 py-1.5 rounded bg-gray-700 text-sm
              placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="relative flex items-center">
            <Plus size={16} className="absolute left-2 text-gray-400" />
            <input
              type="number"
              min="0"
              max="60"
              value={customIncrement}
              placeholder="Inc"
              onChange={handleCustomIncrement}
              className="w-16 pl-7 pr-2 py-1.5 rounded bg-gray-700 text-sm
                placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimeSettings;