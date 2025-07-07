import css from './Header.module.css';
import { Link } from 'react-router-dom';


function Header() {
  return (
    <header className={css.header}>
     
      <Link className={css.subtitle} to="/timer">Таймер</Link>
      <Link className={css.subtitle} to="/diary">Щоденник</Link>
      <Link className={css.subtitle} to="/articles">Статті</Link>
      <h1 className={css.title}>Фітнес з Владсиславом Музика</h1>
      <p className={css.subtitle}>Досягай своїх цілей разом зі мною!</p>
    </header>
  );
}

export default Header;