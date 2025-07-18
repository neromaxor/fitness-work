import css from './SocialLinks.module.css';

function SocialLinks() {
  return (
    <div className={css.container}>
      <a href="https://t.me/neromaxor" target="_blank" className={css.link}>
        <i className="fab fa-telegram"></i>
      </a>
      <a href="https://instagram.com/vladmuz_" target="_blank" className={css.link}>
        <i className="fab fa-instagram"></i>
      </a>
      <a href="https://www.tiktok.com/@usurmac" target="_blank" className={css.link}>
        <i className="fab fa-tiktok"></i>
      </a>
    </div>
  );
}

export default SocialLinks;