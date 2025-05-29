import css from './SocialLinks.module.css';

function SocialLinks() {
  return (
    <div className={css.container}>
      <a href="https://t.me/yourtelegram" target="_blank" className={css.link}>
        <i className="fab fa-telegram"></i>
      </a>
      <a href="https://instagram.com/yourinstagram" target="_blank" className={css.link}>
        <i className="fab fa-instagram"></i>
      </a>
      <a href="https://tiktok.com/@yourtiktok" target="_blank" className={css.link}>
        <i className="fab fa-tiktok"></i>
      </a>
    </div>
  );
}

export default SocialLinks;