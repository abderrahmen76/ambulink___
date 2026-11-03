const patientDownloadUrl = 'https://www.dropbox.com/scl/fi/sdgqcp0myvcz3lxmpzs2g/ambulink_platform.apk?rlkey=mb28ozw7s7jfckq760nwuhm54&st=6yhtt9q5&dl=1';
const mobileDownloadUrl = 'https://www.dropbox.com/scl/fi/x8hwdxc68nixmb4thiqy7/mobile_app.apk?rlkey=mhczw5rcn8vdk0r56t7vpnlse&st=3z8mv78b&dl=1';

export default function HomePage() {
  return (
    <main className="site-shell">
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand-link" href="#accueil" aria-label="Accueil AmbuLink">
            <img className="brand-logo" src="/logo.png" alt="AmbuLink" />
          </a>

          <nav className="site-nav" aria-label="Navigation principale">
            <a href="#solution">Solution</a>
            <a href="#ecosysteme">Écosystème</a>
            <a href="#fonctionnement">Fonctionnement</a>
            <a href="#atouts">Atouts</a>
          </nav>

          <a className="header-cta" href="#contact">
            Contactez-nous
          </a>
        </div>
      </header>

      <section className="hero-section" id="accueil">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow-pill">
              <span className="accent-dot" />
              <span>Plateforme intelligente de logistique de santé</span>
            </div>

            <h1>
              Gérez. Optimisez. <span>Sauvez des vies.</span>
            </h1>

            <p>
              AmbuLink aide les sociétés d&apos;ambulances privées à gérer leurs
              missions, leur personnel, leur maintenance et leurs opérations en
              temps réel avec une visibilité totale et une efficacité maximale.
            </p>

            <div className="hero-actions">
              <a
                className="primary-button"
                href={patientDownloadUrl}
                style={{ backgroundColor: '#003ec7', color: '#ffffff' }}
              >
                Télécharger l&apos;app patient
              </a>
              <a className="secondary-button" href={mobileDownloadUrl}>
                Télécharger l&apos;app ambulance
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-logo-card">
              <img
                className="hero-logo"
                src="/hero-logo.png"
                alt="Visuel principal AmbuLink"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section section-white" id="solution">
        <div className="container">
          <div className="section-heading centered">
            <h2>Une solution tout-en-un pour les sociétés d&apos;ambulances</h2>
            <div className="heading-line" />
          </div>

          <div className="three-grid">
            <article className="info-card">
              <div className="icon-box" aria-hidden="true">🚑</div>
              <h3>Dispatch intelligent</h3>
              <p>
                Répartition plus rapide des missions vers les bonnes équipes selon
                la situation et la disponibilité.
              </p>
            </article>

            <article className="info-card">
              <div className="icon-box" aria-hidden="true">📍</div>
              <h3>Suivi en temps réel</h3>
              <p>
                Visualisez les ambulances, les missions en cours et l&apos;avancement
                des interventions en direct.
              </p>
            </article>

            <article className="info-card">
              <div className="icon-box" aria-hidden="true">🚨</div>
              <h3>Alertes d&apos;urgence</h3>
              <p>
                Recevez rapidement les informations importantes pour mieux réagir
                face aux urgences et événements critiques.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section section-soft" id="ecosysteme">
        <div className="container">
          <div className="section-heading centered">
            <h2>Un écosystème simple, utile et connecté</h2>
            <p>
              Trois applications complémentaires pour relier le patient,
              l&apos;ambulance et la clinique dans un même système de coordination.
            </p>
          </div>

          <div className="three-grid ecosystem-grid">
            <article className="ecosystem-card">
              <div className="corner-glow" />
              <div className="ecosystem-icon" aria-hidden="true">📱</div>
              <h3>Ambulink</h3>
              <p>
                L&apos;application patient pour demander une ambulance, envoyer sa
                position et suivre la mission jusqu&apos;à l&apos;arrivée du véhicule.
              </p>
              <ul>
                <li>Demande d&apos;ambulance rapide</li>
                <li>Suivi en direct</li>
              </ul>
            </article>

            <article className="ecosystem-card ecosystem-card-featured">
              <div className="corner-glow" />
              <div className="ecosystem-icon" aria-hidden="true">🚑</div>
              <h3>AmbuLink Mobile</h3>
              <p>
                L&apos;application des équipes terrain pour recevoir les missions,
                suivre les véhicules et gérer les opérations quotidiennes.
              </p>
              <ul>
                <li>Gestion des missions</li>
                <li>Suivi des ambulances</li>
              </ul>
            </article>

            <article className="ecosystem-card">
              <div className="corner-glow" />
              <div className="ecosystem-icon" aria-hidden="true">🏥</div>
              <h3>Clinic App</h3>
              <p>
                L&apos;application clinique pour suivre les demandes, coordonner les
                équipes et préparer la prise en charge du patient.
              </p>
              <ul>
                <li>Suivi des demandes</li>
                <li>Coordination clinique</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="section section-white" id="fonctionnement">
        <div className="container">
          <div className="section-heading centered">
            <h2>Comment AmbuLink fonctionne</h2>
          </div>

          <div className="steps-grid">
            <article className="step-card">
              <div className="step-number">1</div>
              <h3>Le patient demande de l&apos;aide</h3>
              <p>
                La demande part depuis Najda avec les informations essentielles et
                la localisation du patient.
              </p>
            </article>

            <article className="step-card">
              <div className="step-number">2</div>
              <h3>L&apos;équipe reçoit la mission</h3>
              <p>
                AmbuLink Mobile transmet la mission, le suivi terrain et l&apos;état
                de l&apos;intervention à l&apos;équipe concernée.
              </p>
            </article>

            <article className="step-card">
              <div className="step-number">3</div>
              <h3>La clinique coordonne</h3>
              <p>
                Clinic App suit les demandes, organise les opérations et aide à
                préparer l&apos;accueil du patient.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section section-soft" id="atouts">
        <div className="container">
          <div className="four-grid">
            <article className="asset-card">
              <div className="asset-icon" aria-hidden="true">📋</div>
              <h3>Gestion des missions</h3>
              <p>Suivi complet des missions du début à la fin.</p>
            </article>

            <article className="asset-card">
              <div className="asset-icon" aria-hidden="true">👥</div>
              <h3>Gestion du personnel</h3>
              <p>Suivi des équipes, des plannings et de l&apos;organisation interne.</p>
            </article>

            <article className="asset-card">
              <div className="asset-icon" aria-hidden="true">📊</div>
              <h3>Statistiques &amp; rapports</h3>
              <p>Des tableaux de bord plus clairs pour piloter l&apos;activité.</p>
            </article>

            <article className="asset-card">
              <div className="asset-icon" aria-hidden="true">🛠️</div>
              <h3>Maintenance de flotte</h3>
              <p>Suivi des véhicules, des entretiens et des coûts de maintenance.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section section-cta" id="contact">
        <div className="container">
          <div className="cta-card">
            <h2>Téléchargez AmbuLink et contactez-nous</h2>
            <p>
              Découvrez une solution conçue pour mieux gérer les missions,
              optimiser les opérations et améliorer la coordination médicale.
            </p>

            <div className="hero-actions centered-actions">
              <a
                className="primary-button"
                href={patientDownloadUrl}
                style={{ backgroundColor: '#003ec7', color: '#ffffff' }}
              >
                Télécharger l&apos;app patient
              </a>
              <a className="secondary-button" href={mobileDownloadUrl}>
                Télécharger l&apos;app ambulance
              </a>
            </div>

            <div className="partner-row">
              <span>+216 53 51 48 83</span>
              <span>ambulink.contact@gmail.com</span>
              <span>Sfax, Tunisie</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <img className="footer-logo" src="/logo.png" alt="AmbuLink" />
            <p>
              Plateforme intelligente de logistique de santé pour les sociétés
              d&apos;ambulances privées.
            </p>
          </div>

          <div>
            <h4>Produit</h4>
            <ul>
              <li>Najda Patient</li>
              <li>AmbuLink Mobile</li>
              <li>Clinic App</li>
              <li>Téléchargements</li>
            </ul>
          </div>

          <div>
            <h4>Contact</h4>
            <ul>
              <li>+216 53 51 48 83</li>
              <li>ambulink.contact@gmail.com</li>
              <li>Sfax, Tunisie</li>
            </ul>
          </div>
        </div>

        <div className="container footer-bottom">
          <span>© 2026 AmbuLink Systems. Tous droits réservés.</span>
          <div>
            <a href="#contact">Contact</a>
            <a href="#accueil">Retour en haut</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
