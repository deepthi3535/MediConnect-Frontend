import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      {/* Top navigation bar */}
      <header className="home-nav">
        <div className="home-nav-left">
          <span className="home-brand-pill">Medi</span>
          <span className="home-brand-text">Connect</span>
        </div>

        <nav className="home-nav-links">
          <button type="button">Services</button>
          <button type="button">Departments</button>
          <button type="button">Doctors</button>
          <button type="button">Billing</button>
          <button type="button">Records</button>
        </nav>

        <div className="home-nav-right">
          <button
            type="button"
            className="home-login-btn"
            onClick={() => navigate("/login")}
          >
            Staff Login
          </button>
        </div>
      </header>

      {/* Hero section */}
      <main className="home-hero">
        <section className="home-hero-content">
          <p className="home-pill">Smart Hospital Management</p>
          <h1>
            Care on demand.
            <br />
            No paperwork.
          </h1>
          <p className="home-hero-subtitle">
            Connect patients, doctors, nurses and billing teams in one
            digital hospital platform. Real-time appointments, unified
            medical records, and transparent billing for everyone.
          </p>

          <div className="home-hero-actions">
            <button
              type="button"
              className="home-primary-btn"
              onClick={() => navigate("/login")}
            >
              Enter Staff Portal
            </button>
            <button type="button" className="home-secondary-btn">
              Explore Modules
            </button>
          </div>
        </section>

        <section className="home-hero-visual">
          <div className="home-hero-card">
            <h3>Today at MediConnect</h3>
            <ul>
              <li>
                <span className="dot dot-green" />
                34 active appointments
              </li>
              <li>
                <span className="dot dot-blue" />
                12 doctors on duty
              </li>
              <li>
                <span className="dot dot-amber" />
                8 pending discharges
              </li>
            </ul>
          </div>
        </section>
      </main>

      {/* Categories / modules grid */}
      <section className="home-modules">
        <h2>Hospital Modules</h2>
        <p className="home-modules-subtitle">
          Everything your hospital needs in one place.
        </p>

        <div className="home-modules-grid">
          <div className="home-module-card">
            <div className="home-module-icon">P</div>
            <div>
              <h3>Patient Management</h3>
              <p>Register, track, and manage OPD &amp; IPD patients.</p>
            </div>
          </div>

          <div className="home-module-card">
            <div className="home-module-icon">A</div>
            <div>
              <h3>Appointments</h3>
              <p>Smart scheduling with reminders and status tracking.</p>
            </div>
          </div>

          <div className="home-module-card">
            <div className="home-module-icon">D</div>
            <div>
              <h3>Doctor &amp; Nurse Desk</h3>
              <p>Role-based dashboards for clinicians and staff.</p>
            </div>
          </div>

          <div className="home-module-card">
            <div className="home-module-icon">B</div>
            <div>
              <h3>Billing</h3>
              <p>Generate invoices and manage payments in seconds.</p>
            </div>
          </div>

          <div className="home-module-card">
            <div className="home-module-icon">R</div>
            <div>
              <h3>Medical Records</h3>
              <p>Centralized diagnoses, prescriptions, and histories.</p>
            </div>
          </div>

          <div className="home-module-card">
            <div className="home-module-icon">A</div>
            <div>
              <h3>Analytics</h3>
              <p>Monitor occupancy, revenue, and care quality metrics.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;

