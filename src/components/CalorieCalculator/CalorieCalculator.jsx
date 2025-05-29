import { useState } from 'react';
import css from './CalorieCalculator.module.css';

function CalorieCalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [activity, setActivity] = useState('1.2');
  const [calories, setCalories] = useState(null);

  const calculateCalories = () => {
    if (!weight || !height || !age) {
      alert('Будь ласка, заповніть усі поля!');
      return;
    }

    let bmr;
    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    const totalCalories = bmr * activity;
    setCalories(Math.round(totalCalories));
  };

  return (
    <div className={css.container}>
      <h2 className={css.title}>Калькулятор калорій</h2>
      <div className={css.form}>
        <div className={css.inputGroup}>
          <label className={css.label}>Вага (кг):</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className={css.input}
            placeholder="Введіть вагу"
          />
        </div>
        <div className={css.inputGroup}>
          <label className={css.label}>Зріст (см):</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className={css.input}
            placeholder="Введіть зріст"
          />
        </div>
        <div className={css.inputGroup}>
          <label className={css.label}>Вік:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className={css.input}
            placeholder="Введіть вік"
          />
        </div>
        <div className={css.inputGroup}>
          <label className={css.label}>Стать:</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className={css.input}
          >
            <option value="male">Чоловік</option>
            <option value="female">Жінка</option>
          </select>
        </div>
        <div className={css.inputGroup}>
          <label className={css.label}>Рівень активності:</label>
          <select
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            className={css.input}
          >
            <option value="1.2">Мінімальний (сидячий спосіб життя)</option>
            <option value="1.375">Легкий (1-3 тренування/тиждень)</option>
            <option value="1.55">Середній (3-5 тренувань/тиждень)</option>
            <option value="1.725">Високий (6-7 тренувань/тиждень)</option>
            <option value="1.9">Екстремальний (фізична робота, інтенсивні тренування)</option>
          </select>
        </div>
      </div>
      <button onClick={calculateCalories} className={css.button}>
        Розрахувати
      </button>
      {calories && (
        <p className={css.result}>
          Ваші добові калорії: <span className={css.resultValue}>{calories} ккал</span>
        </p>
      )}
    </div>
  );
}

export default CalorieCalculator;
