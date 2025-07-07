// App.jsx
import { Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import css from './App.module.css';
import bgImage from './assets/fitness-Vlad.jpg';

import Header from './components/Header/Header';
import SocialLinks from './components/SocialLinks/SocialLinks';
import TrainingPrograms from './components/TrainingPrograms/TrainingPrograms';
import CalorieCalculator from './components/CalorieCalculator/CalorieCalculator';
import TrainingTimer from './components/Header/TrainingTimer/TrainingTimer';
import TrainingDiary from './components/Header/TrainingDiary/TrainingDiary';
import Articles from './components/Header/Articles/Articles';

export default function App() {
  return (
    <div className={css.container} style={{ backgroundImage: `url(${bgImage})` }}>
      <div className={css.overlay}></div>
      <div className={css.content}>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={
              <>
                <Header />
                <SocialLinks />
                <TrainingPrograms />
                <CalorieCalculator />
              </>
            } />

            <Route path="/timer" element={<TrainingTimer />} />
            <Route path="/diary" element={<TrainingDiary />} />
            <Route path="/articles" element={<Articles />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}
