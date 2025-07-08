import { useState, useRef, useEffect } from 'react';
import css from './TrainingTimer.module.css';
import { Link } from 'react-router-dom';

function TrainingTimer() {
  // Таймер
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // Секундомір
  const [stopwatchSeconds, setStopwatchSeconds] = useState(0);
  const [stopwatchActive, setStopwatchActive] = useState(false);

  const intervalRef = useRef(null);
  const stopwatchRef = useRef(null);

  const startSound = useRef(new Audio('/start.mp3')).current;
  const endSound = useRef(new Audio('/ding.mp3')).current;

  useEffect(() => {
    startSound.loop = true;
  }, []);

  // Таймер логіка
  useEffect(() => {
    if (isActive && totalSeconds > 0) {
      intervalRef.current = setInterval(() => {
        setTotalSeconds((prev) => prev - 1);
      }, 1000);
    } else if (totalSeconds === 0 && hasStarted) {
      clearInterval(intervalRef.current);
      startSound.pause();
      startSound.currentTime = 0;
      endSound.play();
      setIsActive(false);
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive, totalSeconds]);

  // Секундомір логіка
  useEffect(() => {
    if (stopwatchActive) {
      stopwatchRef.current = setInterval(() => {
        setStopwatchSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(stopwatchRef.current);
  }, [stopwatchActive]);

  const calculateTotalSeconds = () => hours * 3600 + minutes * 60 + seconds;

  // Таймер функції
  const handleTimerStart = () => {
    if (!hasStarted) {
      setTotalSeconds(calculateTotalSeconds());
      setHasStarted(true);
    }
    setStopwatchActive(false); // зупиняємо секундомір
    startSound.play();
    setIsActive(true);
  };

  const handleTimerPause = () => {
    clearInterval(intervalRef.current);
    setIsActive(false);
    startSound.pause();
    startSound.currentTime = 0;
  };

  const handleTimerReset = () => {
    clearInterval(intervalRef.current);
    setIsActive(false);
    setHasStarted(false);
    setHours(0);
    setMinutes(1);
    setSeconds(0);
    setTotalSeconds(0);
    startSound.pause();
    startSound.currentTime = 0;
  };

  // Секундомір функції
  const handleStopwatchStart = () => {
    setIsActive(false); // зупиняємо таймер
    startSound.pause();
    setStopwatchActive(true);
  };

  const handleStopwatchPause = () => {
    clearInterval(stopwatchRef.current);
    setStopwatchActive(false);
  };

  const handleStopwatchReset = () => {
    clearInterval(stopwatchRef.current);
    setStopwatchActive(false);
    setStopwatchSeconds(0);
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
      <h2 className={css.title}>Тренувальний час</h2>

      <div className={css.wrapper}>
        {/* Таймер */}
        <div className={css.block}>
          <h3 className={css.subTitle}>Таймер</h3>
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
              <button onClick={handleTimerStart} className={css.buttonStart}>Старт</button>
            ) : (
              <button onClick={handleTimerPause} className={css.buttonPause}>Пауза</button>
            )}
            <button onClick={handleTimerReset} className={css.buttonReset}>Скинути</button>
          </div>
        </div>

        {/* Секундомір */}
        <div className={css.block}>
          <h3 className={css.subTitle}>Секундомір</h3>
          <div className={css.timerDisplay}>{formatTime(stopwatchSeconds)}</div>
          <div className={css.controls}>
            {!stopwatchActive ? (
              <button onClick={handleStopwatchStart} className={css.buttonStart}>Старт</button>
            ) : (
              <button onClick={handleStopwatchPause} className={css.buttonPause}>Пауза</button>
            )}
            <button onClick={handleStopwatchReset} className={css.buttonReset}>Скинути</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrainingTimer;
