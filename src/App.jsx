import Header from './components/Header/Header';
import SocialLinks from './components/SocialLinks/SocialLinks';
import TrainingPrograms from './components/TrainingPrograms/TrainingPrograms';
import CalorieCalculator from './components/CalorieCalculator/CalorieCalculator';
import css from './App.module.css';
import bgImage from './assets/fitness-Vlad.jpg'; // Імпортуємо фон

function App() {
  return (
    <div className={css.container} style={{ backgroundImage: `url(${bgImage})` }}>
      <div className={css.overlay}></div>
      <div className={css.content}>
        <Header />
        <SocialLinks />
        <TrainingPrograms />
        <CalorieCalculator />
      </div>
    </div>
  );
}

export default App;
