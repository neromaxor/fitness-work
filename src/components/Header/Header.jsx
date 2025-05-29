import css from './Header.module.css';

function Header() {
  return (
    <header className={css.header}>
      <h1 className={css.title}>Фітнес із Владсислав Музика</h1>
      <p className={css.subtitle}>Досягай своїх цілей разом зі мною!</p>
    </header>
  );
}

export default Header;