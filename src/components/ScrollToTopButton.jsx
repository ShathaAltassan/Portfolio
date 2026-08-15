export default function ScrollToTopButton() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <button id="btnScrollToTop" onClick={scrollToTop}>
      <i className="material-icons">arrow_upward</i>
    </button>
  );
}
