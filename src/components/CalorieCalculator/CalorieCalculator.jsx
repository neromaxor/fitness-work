import { useState } from 'react';
import css from './CalorieCalculator.module.css';

function CalorieCalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [activity, setActivity] = useState('1.2');
  const [goal, setGoal] = useState('maintain');
  const [calories, setCalories] = useState(null);
  const [bmr, setBmr] = useState(null);
  const [bju, setBju] = useState({ proteins: 0, fats: 0, carbs: 0 });

  const calculateCalories = () => {
    if (!weight || !height || !age) {
      alert('Будь ласка, заповніть усі поля!');
      return;
    }

    // Розрахунок BMR (основний обмін речовин)
    let bmrValue;
    if (gender === 'male') {
      bmrValue = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmrValue = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    setBmr(Math.round(bmrValue));

    // Загальні калорії для підтримки ваги
    const maintenanceCalories = bmrValue * activity;

    // Корекція залежно від цілі
    let adjustedCalories;
    switch (goal) {
      case 'cut': // Сушка (дефіцит калорій, -15%)
        adjustedCalories = maintenanceCalories * 0.85;
        break;
      case 'bulk': // Набір маси (надлишок калорій, +15%)
        adjustedCalories = maintenanceCalories * 1.15;
        break;
      case 'maintain': // Підтримка ваги
      default:
        adjustedCalories = maintenanceCalories;
        break;
    }
    setCalories(Math.round(adjustedCalories));

    // Розрахунок БЖУ (приблизний розподіл: 30% білки, 30% жири, 40% вуглеводи)
    const proteins = Math.round((adjustedCalories * 0.3) / 4); // 4 ккал на 1г білка
    const fats = Math.round((adjustedCalories * 0.3) / 9); // 9 ккал на 1г жиру
    const carbs = Math.round((adjustedCalories * 0.4) / 4); // 4 ккал на 1г вуглеводів
    setBju({ proteins, fats, carbs });
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
        <div className={css.inputGroup}>
          <label className={css.label}>Ціль:</label>
          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className={css.input}
          >
            <option value="maintain">Підтримка ваги</option>
            <option value="cut">Сушка (зниження ваги)</option>
            <option value="bulk">Набір маси</option>
          </select>
        </div>
      </div>
      <button onClick={calculateCalories} className={css.button}>
        Розрахувати
      </button>
      {calories !== null && bmr !== null && (
        <div className={css.result}>
          <p>
            BMR: <span className={css.resultValue}>{bmr} ккал</span>
          </p>
          <p>
            Калорії для підтримки ваги: <span className={css.resultValue}>{Math.round(bmr * activity)} ккал</span>
          </p>
          <p>
            Калорії для вашої цілі: <span className={css.resultValue}>{calories} ккал</span>
          </p>
          <p>
            БЖУ: Білки - <span className={css.resultValue}>{bju.proteins} г</span>, Жири - <span className={css.resultValue}>{bju.fats} г</span>, Вуглеводи - <span className={css.resultValue}>{bju.carbs} г</span>
          </p>
        </div>
      )}
    </div>
  );
}

export default CalorieCalculator;