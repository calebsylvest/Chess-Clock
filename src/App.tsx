import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Crown } from 'lucide-react';
import TimeDisplay from './components/TimeDisplay';
import TimeSettings from './components/TimeSettings';
import Button from './components/Button';

function App() {
  const [timeLimit, setTimeLimit] = useState(600);
  const [increment, setIncrement] = useState(0);
  const [player1Time, setPlayer1Time] = useState(timeLimit);
  const [player2Time, setPlayer2Time] = useState(timeLimit);
  const [activePlayer, setActivePlayer] = useState<1 | 2 | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const toggleTimer = useCallback(() => {
    if (!isRunning && activePlayer === null) {
      setActivePlayer(1);
    }
    setIsRunning(prev => !prev);
  }, [isRunning, activePlayer]);

  const switchPlayer = useCallback(() => {
    if (!isRunning) return;
    
    if (activePlayer === 1) {
      setPlayer1Time(prev => prev + increment);
    } else if (activePlayer === 2) {
      setPlayer2Time(prev => prev + increment);
    }
    
    setActivePlayer(current => (current === 1 ? 2 : 1));
  }, [isRunning, increment, activePlayer]);

  const resetGame = useCallback(() => {
    setPlayer1Time(timeLimit);
    setPlayer2Time(timeLimit);
    setActivePlayer(null);
    setIsRunning(false);
  }, [timeLimit]);

  const handleTimeChange = useCallback((seconds: number, newIncrement: number) => {
    setTimeLimit(seconds);
    setIncrement(newIncrement);
    setPlayer1Time(seconds);
    setPlayer2Time(seconds);
    setActivePlayer(null);
    setIsRunning(false);
  }, []);

  useEffect(() => {
    let interval: number;
    if (isRunning) {
      interval = setInterval(() => {
        if (activePlayer === 1) {
          setPlayer1Time(prev => {
            if (prev <= 0) {
              setIsRunning(false);
              return 0;
            }
            return prev - 1;
          });
        } else if (activePlayer === 2) {
          setPlayer2Time(prev => {
            if (prev <= 0) {
              setIsRunning(false);
              return 0;
            }
            return prev - 1;
          });
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, activePlayer]);

  const showReset = !isRunning && activePlayer !== null;
  const gameOver = player1Time <= 0 || player2Time <= 0;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Player 2 Clock */}
      <button
        onClick={switchPlayer}
        disabled={!isRunning || player2Time <= 0}
        className={`flex-1 p-8 transition-all duration-300 ${
          activePlayer === 2
            ? 'bg-indigo-600 hover:bg-indigo-700'
            : 'bg-gray-800 hover:bg-gray-700'
        } ${!isRunning && 'cursor-not-allowed opacity-80'}`}
      >
        <div className="transform rotate-180">
          <TimeDisplay
            seconds={player2Time}
            isActive={activePlayer === 2}
            isRunning={isRunning}
            increment={increment}
          />
          {player2Time <= 0 && (
            <div className="flex items-center justify-center gap-2 text-2xl text-red-400 mt-4">
              <Crown size={32} /> Game Over
            </div>
          )}
        </div>
      </button>

      {/* Controls */}
      <div className="bg-gray-800 px-6 py-4">
        <div className="flex items-center justify-between max-w-3xl mx-auto w-full">
          <Button 
            onClick={toggleTimer} 
            variant="primary"
            disabled={gameOver}
          >
            {isRunning ? <Pause size={24} /> : <Play size={24} />}
          </Button>
          
          <TimeSettings 
            onSelectTime={handleTimeChange}
            isDisabled={isRunning || activePlayer !== null}
          />
          
          <div className={`transition-all duration-300 ${showReset ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
            <Button 
              onClick={resetGame} 
              variant="secondary"
            >
              <RotateCcw size={24} />
            </Button>
          </div>
        </div>
      </div>

      {/* Player 1 Clock */}
      <button
        onClick={switchPlayer}
        disabled={!isRunning || player1Time <= 0}
        className={`flex-1 p-8 transition-all duration-300 ${
          activePlayer === 1
            ? 'bg-indigo-600 hover:bg-indigo-700'
            : 'bg-gray-800 hover:bg-gray-700'
        } ${!isRunning && 'cursor-not-allowed opacity-80'}`}
      >
        <TimeDisplay
          seconds={player1Time}
          isActive={activePlayer === 1}
          isRunning={isRunning}
          increment={increment}
        />
        {player1Time <= 0 && (
          <div className="flex items-center justify-center gap-2 text-2xl text-red-400 mt-4">
            <Crown size={32} /> Game Over
          </div>
        )}
      </button>
    </div>
  );
}

export default App;