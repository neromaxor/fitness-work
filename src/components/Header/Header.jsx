import css from './Header.module.css';
import { Link } from 'react-router-dom';


function Header() {
  return (
    <header className={css.header}>
     
      <Link className={css.dodatok} to="/timer">Таймер</Link>
      <Link className={css.dodatok} to="/diary">Щоденник</Link>
      <Link className={css.dodatok} to="/articles">Статті</Link>
      <Link className={css.dodatok} to="/nutrition">БЖУ Підрахунок</Link>
      <h1 className={css.title}>Персональний тренер Владислав </h1>
      <p className={css.subtitle}>Трансформація починається тут</p>
    </header>
  );
}

export default Header;