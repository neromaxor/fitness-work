import Header from './components/Header/Header';
import SocialLinks from './components/SocialLinks/SocialLinks';
import TrainingPrograms from './components/TrainingPrograms/TrainingPrograms';
import CalorieCalculator from './components/CalorieCalculator/CalorieCalculator';
import css from './App.module.css';

function App() {
  return (
    <div className={css.container}>
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
