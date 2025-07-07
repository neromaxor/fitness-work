import css from './Articles.module.css';

function Articles() {
  return (
    <div className={css.container}>
      <h2 className={css.title}>Статті</h2>
      <p>Тут будуть розміщуватись корисні фітнес-статті.</p>
    </div>
  );
}

export default Articles;
