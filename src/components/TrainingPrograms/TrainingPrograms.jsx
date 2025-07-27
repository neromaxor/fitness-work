import css from './TrainingPrograms.module.css';

function TrainingPrograms() {
  return (
    <div className={css.container}>
      <h2 className={css.title}>Програми тренувань</h2>
      <div className={css.grid}>
        <div className={css.card}>
          <h3 className={css.cardTitle}>Жироспалювання</h3>
          <a href="/public/Programs/fat_burning.pdf" download className={css.button}>
            Завантажити
          </a>
        </div>
        <div className={css.card}>
          <h3 className={css.cardTitle}>Набір маси</h3>
          <a href="/public/Programs/mass_gain.pdf" download className={css.button}>
            Завантажити
          </a>
        </div>
        <div className={css.card}>
          <h3 className={css.cardTitle}>Фітнес</h3>
          <a href="/public/Programs/fitness.pdf" download className={css.button}>
            Завантажити
          </a>
        </div>
      </div>
    </div>
  );
}

export default TrainingPrograms;