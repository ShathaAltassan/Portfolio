import { useLanguage } from '../i18n/LanguageContext.jsx';

export default function Footer({ theme }) {
  const { t } = useLanguage();
  const logo = theme === 'light' ? '/images/LOGO01.png' : '/images/LOGO00.png';

  return (
    <footer>
      <div className="shell">
        <span>{t.footer.createdBy}</span>
        <img src={logo} alt="Shatha Altasan" />
        <span>
          © {new Date().getFullYear()} · {t.footer.rights}
        </span>
      </div>
    </footer>
  );
}
