function Footer() {
  const year = 2026;
  const developerName = "<My Name>";

  return (
    <footer className="app-footer">
      <p>
        © {year} Hospital Management System | Developed by {developerName}
      </p>
    </footer>
  );
}

export default Footer;

