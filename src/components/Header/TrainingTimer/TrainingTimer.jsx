import { useState, useRef, useEffect, lazy } from 'react';
import css from './TrainingTimer.module.css';
import { Link } from 'react-router-dom';
function TrainingTimer() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const intervalRef = useRef(null);

  const startSound = new Audio('/start.mp3');
  const endSound = new Audio('/ding.mp3');
 
  const calculateTotalSeconds = () => hours * 3600 + minutes * 60 + seconds;

  useEffect(() => {
    if (isActive && totalSeconds > 0) {
      intervalRef.current = setInterval(() => {
        setTotalSeconds((prev) => prev - 1);
      }, 1000);
    } else if (totalSeconds === 0) {
      clearInterval(intervalRef.current);
      endSound.play();
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive, totalSeconds]);

  const handleStart = () => {
    if (!hasStarted) {
      const total = calculateTotalSeconds();
      setTotalSeconds(total);
      setHasStarted(true);
    }
    startSound.play();
    setIsActive(true);
  };

  const handlePause = () => {
    clearInterval(intervalRef.current);
    setIsActive(false);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setIsActive(false);
    setHasStarted(false);
    setHours(0);
    setMinutes(1);
    setSeconds(0);
    setTotalSeconds(0);
  };

  const formatTime = (secs) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className={css.container}>
      <Link to="/" className={css.backLink}>Назад</Link>
      <h2 className={css.title}>Таймер</h2>

      {!hasStarted ? (
        <div className={css.pickerContainer}>
          <select value={hours} onChange={(e) => setHours(Number(e.target.value))} className={css.picker}>
            {Array.from({ length: 24 }, (_, i) => <option key={i} value={i}>{i}</option>)}
          </select>
          <span className={css.label}>год</span>

          <select value={minutes} onChange={(e) => setMinutes(Number(e.target.value))} className={css.picker}>
            {Array.from({ length: 60 }, (_, i) => <option key={i} value={i}>{i}</option>)}
          </select>
          <span className={css.label}>хв</span>

          <select value={seconds} onChange={(e) => setSeconds(Number(e.target.value))} className={css.picker}>
            {Array.from({ length: 60 }, (_, i) => <option key={i} value={i}>{i}</option>)}
          </select>
          <span className={css.label}>сек</span>
        </div>
      ) : (
        <div className={css.timerDisplay}>{formatTime(totalSeconds)}</div>
      )}

      <div className={css.controls}>
        {!isActive ? (
          <button onClick={handleStart} className={css.buttonStart}>Старт</button>
        ) : (
          <button onClick={handlePause} className={css.buttonPause}>Пауза</button>
        )}
        <button onClick={handleReset} className={css.buttonReset}>Скинути</button>
      </div>
    </div>
  );
}

export default TrainingTimer;
// Note: Ensure that the audio files 'start.mp3' and 'ding.mp3' are placed in the public directory of your React app for them to be accessible.