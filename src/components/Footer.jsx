export default function Footer({ theme }) {
  const logo = theme === 'light' ? '/images/LOGO01.png' : '/images/LOGO00.png';

  return (
    <footer>
      <div className="text-center">
        <span style={{ fontSize: 12 }}>
          Created By <img src={logo} alt="Logo" style={{ width: 60, height: 'auto', verticalAlign: 'middle' }} /> |{' '}
          <span className="far fa-copyright" /> {new Date().getFullYear()} All rights reserved.
        </span>
      </div>
    </footer>
  );
}
