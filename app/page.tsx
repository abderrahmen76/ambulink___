'use client';

import { useState } from 'react';
import DemoRequest from './demo-request';
import InternshipForm from './internship-form';

const problemCards = [
  {
    title: 'Appels et WhatsApp',
    description: 'Plusieurs appels pour trouver une ambulance libre : des minutes perdues pour le patient.',
  },
  {
    title: 'Papier et Excel',
    description: 'Saisies manuelles, doublons, données périmées : impossible de gérer à grande échelle.',
  },
  {
    title: 'Zéro visibilité',
    description: 'Quelle ambulance est libre ? Qui est en mission ? Le gérant ne le voit pas en temps réel.',
  },
  {
    title: 'Aucune traçabilité',
    description: 'La clinique ne sait pas quand le patient arrive, et aucun historique en cas d\'incident.',
  },
];

const solutionCards = [
  {
    title: 'Dispatch intelligent',
    description: 'L\'IA propose l\'ambulance la plus adaptée selon la position, la disponibilité et le besoin du patient.',
  },
  {
    title: 'Suivi en temps réel',
    description: 'Patients, équipes et cliniques suivent chaque mission en direct, jusqu\'à l\'arrivée.',
  },
  {
    title: 'Alertes et fiche patient',
    description: 'La clinique est prévenue dès le départ et reçoit les informations du patient avant son arrivée.',
  },
];

const appCards = [
  {
    tag: 'blue',
    tagLabel: 'Patients',
    title: 'AmbuLink',
    description: 'L\'application patient pour demander une ambulance en quelques secondes, envoyer sa position et suivre la mission jusqu\'à l\'arrivée du véhicule.',
    points: [
      'Ambulance la plus proche ou société préférée',
      'Besoins du patient indiqués à la commande',
      'Accessible aux personnes en situation de handicap',
      'Compatible montre connectée',
    ],
    images: ['/p1.jpg', '/p2.jpg', '/p3.jpg'],
    imageSizes: [[512, 907], [504, 907], [505, 898]],
    imagesAlt: [
      'AmbuLink : écran de demande d\'ambulance',
      'AmbuLink : informations du patient',
      'AmbuLink : suivi de l\'ambulance',
    ],
  },
  {
    tag: 'red',
    tagLabel: 'Sociétés d\'ambulances',
    title: 'AmbuLink Management',
    description: 'L\'application des équipes terrain et des managers pour recevoir les missions, suivre les véhicules et gérer les opérations au quotidien.',
    points: [
      'Gestion des missions, de l\'ambulance et des équipements',
      'Ambulanciers, historiques et rapports statistiques',
      'Suivi du carburant et de la maintenance',
      'Recommandations de l\'IA pour le manager',
    ],
    images: ['/a1.jpg', '/a3.jpg', '/a4.jpg'],
    imageSizes: [[540, 1158], [493, 890], [596, 1280]],
    imagesAlt: [
      'AmbuLink Mobile : écran ambulancier',
      'AmbuLink Mobile : écran manager',
      'AmbuLink Mobile : revenus et statistiques',
    ],
  },
  {
    tag: 'green',
    tagLabel: 'Cliniques',
    title: 'Clinic App',
    description: 'L\'application clinique pour suivre les demandes, coordonner les équipes et préparer la prise en charge du patient avant son arrivée.',
    points: [
      'Notification dès qu\'un transfert démarre',
      'Fiche médicale reçue avant l\'arrivée',
      'Suivi du transfert en temps réel',
      'Coordination avec les sociétés d\'ambulances',
    ],
    images: ['/c1.jpg'],
    imageSizes: [[1600, 721]],
    imagesAlt: ['Clinic App : tableau de bord'],
  },
];

const steps = [
  { number: '1', title: 'Demande', description: 'Le patient, ou la clinique pour son patient, demande une ambulance en quelques clics.' },
  { number: '2', title: 'Affectation', description: 'L\'IA propose l\'ambulance disponible la plus adaptée et le meilleur trajet.' },
  { number: '3', title: 'Mission', description: 'La société d\'ambulances accepte la mission dans son application et part.' },
  { number: '4', title: 'Suivi', description: 'Patient, équipe et clinique suivent le trajet en direct ; la clinique prépare l\'arrivée.' },
];

const forWhom = [
  { image: '/amb.jpg', title: 'Sociétés d\'ambulances', description: 'Ne perdez plus aucune mission et pilotez votre flotte en temps réel.' },
  { image: '/cli.jpg', title: 'Cliniques et hôpitaux', description: 'Commandez, suivez les transferts et soyez prêts avant l\'arrivée du patient.' },
  { image: '/pat.jpg', title: 'Patients et familles', description: 'Une ambulance en quelques secondes, suivie en direct, accessible à tous.' },
];

const downloadCards = [
  {
    tag: 'blue',
    tagLabel: 'Patients',
    title: 'AmbuLink',
    description: 'Application Android pour demander et suivre une ambulance.',
    link: 'https://www.dropbox.com/scl/fi/dw4myvax5023bfwo3dcw0/ambulink.apk?rlkey=bdyia96cr0hdx9gpb7unizi66&st=qfci1twl&dl=1',
    buttonText: 'Télécharger l\'app patient',
  },
  {
    tag: 'red',
    tagLabel: 'Équipes terrain',
    title: 'AmbuLink Management',
    description: 'Application Android des ambulanciers et des managers.',
    link: '#contact',
    buttonText: 'Demander un accès',
  },
  {
    tag: 'green',
    tagLabel: 'Cliniques',
    title: 'Clinic App',
    description: 'Accès fourni à chaque clinique partenaire après une démonstration.',
    link: '#contact',
    buttonText: 'Demander un accès',
  },
];

const internships = [
  {
    id: 'ing-01',
    category: 'Engineering',
    title: 'AI & Operations Research',
    description: 'Optimiser les itinéraires et l\'allocation des ressources avec des algorithmes ML.',
    subjects: ['ING-01: AI & Operations Research', 'ING-02: Computer Vision & NLP', 'ING-03: Data Science', 'ING-04: IoT/Embedded/Mobile', 'ING-05: Cybersecurity', 'ING-06: Cloud/DevOps', 'BUS-01: Sales & Marketing', 'BUS-02: Strategy & International', 'BUS-03: Finance'],
  },
  {
    id: 'ing-02',
    category: 'Engineering',
    title: 'Computer Vision & NLP',
    description: 'Traiter les images de vidéosurveillance et les données textuelles pour l\'IA.',
    subjects: ['ING-01: AI & Operations Research', 'ING-02: Computer Vision & NLP', 'ING-03: Data Science', 'ING-04: IoT/Embedded/Mobile', 'ING-05: Cybersecurity', 'ING-06: Cloud/DevOps', 'BUS-01: Sales & Marketing', 'BUS-02: Strategy & International', 'BUS-03: Finance'],
  },
  {
    id: 'ing-03',
    category: 'Engineering',
    title: 'Data Science',
    description: 'Analyser les données de missions et créer des insights pour l\'optimisation.',
    subjects: ['ING-01: AI & Operations Research', 'ING-02: Computer Vision & NLP', 'ING-03: Data Science', 'ING-04: IoT/Embedded/Mobile', 'ING-05: Cybersecurity', 'ING-06: Cloud/DevOps', 'BUS-01: Sales & Marketing', 'BUS-02: Strategy & International', 'BUS-03: Finance'],
  },
  {
    id: 'ing-04',
    category: 'Engineering',
    title: 'IoT/Embedded/Mobile',
    description: 'Développer les applications mobiles et les systèmes embarqués des ambulances.',
    subjects: ['ING-01: AI & Operations Research', 'ING-02: Computer Vision & NLP', 'ING-03: Data Science', 'ING-04: IoT/Embedded/Mobile', 'ING-05: Cybersecurity', 'ING-06: Cloud/DevOps', 'BUS-01: Sales & Marketing', 'BUS-02: Strategy & International', 'BUS-03: Finance'],
  },
  {
    id: 'ing-05',
    category: 'Engineering',
    title: 'Cybersecurity',
    description: 'Sécuriser les données sensibles des patients et les communications.',
    subjects: ['ING-01: AI & Operations Research', 'ING-02: Computer Vision & NLP', 'ING-03: Data Science', 'ING-04: IoT/Embedded/Mobile', 'ING-05: Cybersecurity', 'ING-06: Cloud/DevOps', 'BUS-01: Sales & Marketing', 'BUS-02: Strategy & International', 'BUS-03: Finance'],
  },
  {
    id: 'ing-06',
    category: 'Engineering',
    title: 'Cloud/DevOps',
    description: 'Déployer et maintenir l\'infrastructure cloud scalable d\'AmbuLink.',
    subjects: ['ING-01: AI & Operations Research', 'ING-02: Computer Vision & NLP', 'ING-03: Data Science', 'ING-04: IoT/Embedded/Mobile', 'ING-05: Cybersecurity', 'ING-06: Cloud/DevOps', 'BUS-01: Sales & Marketing', 'BUS-02: Strategy & International', 'BUS-03: Finance'],
  },
  {
    id: 'bus-01',
    category: 'Business',
    title: 'Sales & Marketing',
    description: 'Développer la stratégie de go-to-market et les partenariats.',
    subjects: ['ING-01: AI & Operations Research', 'ING-02: Computer Vision & NLP', 'ING-03: Data Science', 'ING-04: IoT/Embedded/Mobile', 'ING-05: Cybersecurity', 'ING-06: Cloud/DevOps', 'BUS-01: Sales & Marketing', 'BUS-02: Strategy & International', 'BUS-03: Finance'],
  },
  {
    id: 'bus-02',
    category: 'Business',
    title: 'Strategy & International',
    description: 'Étudier l\'expansion internationale et les stratégies de croissance.',
    subjects: ['ING-01: AI & Operations Research', 'ING-02: Computer Vision & NLP', 'ING-03: Data Science', 'ING-04: IoT/Embedded/Mobile', 'ING-05: Cybersecurity', 'ING-06: Cloud/DevOps', 'BUS-01: Sales & Marketing', 'BUS-02: Strategy & International', 'BUS-03: Finance'],
  },
  {
    id: 'bus-03',
    category: 'Business',
    title: 'Finance',
    description: 'Analyser les modèles financiers et optimiser les revenus.',
    subjects: ['ING-01: AI & Operations Research', 'ING-02: Computer Vision & NLP', 'ING-03: Data Science', 'ING-04: IoT/Embedded/Mobile', 'ING-05: Cybersecurity', 'ING-06: Cloud/DevOps', 'BUS-01: Sales & Marketing', 'BUS-02: Strategy & International', 'BUS-03: Finance'],
  },
];

const aiAdvantages = [
  {
    title: 'Meilleur trajet pour le patient',
    description: 'Choix de l\'ambulance et de l\'itinéraire pour réduire l\'attente et arriver plus vite.',
  },
  {
    title: 'Recommandations aux managers',
    description: 'Affectation des missions, alertes carburant et maintenance, rapports pour décider plus vite.',
  },
  {
    title: 'Sécurité des données de santé',
    description: 'Plan de sécurité avec chiffrement, accès contrôlé et historique des actions.',
  },
];

const getIconSvg = (type: string) => {
  const icons: Record<string, string> = {
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
    paper: '<path d="M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h6"/>',
    location: '<path d="M12 21s-7-6.5-7-12a7 7 0 0 1 14 0c0 5.5-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/>',
    warning: '<path d="M12 3l9 16H3zM12 10v4M12 17h.01"/>',
    chart: '<path d="M4 12h4l3-7 3 14 3-7h3"/>',
    clock: '<circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/>',
    bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 8 3 8H3s3-1 3-8M10 20a2 2 0 0 0 4 0"/>',
    lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  };
  return icons[type] || '';
};

export default function HomePage() {
  const [formOpen, setFormOpen] = useState(false);
  const allSubjects = ['ING-01: AI & Operations Research', 'ING-02: Computer Vision & NLP', 'ING-03: Data Science', 'ING-04: IoT/Embedded/Mobile', 'ING-05: Cybersecurity', 'ING-06: Cloud/DevOps', 'BUS-01: Sales & Marketing', 'BUS-02: Strategy & International', 'BUS-03: Finance'];

  return (
    <>
      <header className="nav" id="top">
        <div className="wrap nav-in">
          <a href="#top" className="brand" aria-label="AmbuLink, retour en haut">
            <img src="/logo.png" alt="AmbuLink" width={634} height={525} />
          </a>
          <button className="menu-btn" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="menu">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <nav id="menu" className="menu" aria-label="Navigation principale">
            <a href="#solution">Solution</a>
            <a href="#applications">Applications</a>
            <a href="#fonctionnement">Fonctionnement</a>
            <a href="#pour-qui">Pour qui</a>
            <a href="#telechargements">Télécharger</a>
            <a href="#internships">Stages</a>
            <DemoRequest small />
          </nav>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="hero" id="accueil">
          <div className="wrap hero-in">
            <div className="hero-text">
              <p className="eyebrow light">Intelligent Healthcare Logistics · Sfax, Tunisie</p>
              <h1>De la demande à la destination, <span>en une seule plateforme.</span></h1>
              <p className="lead">AmbuLink connecte patients, sociétés d'ambulances privées et cliniques en temps réel. Notre IA choisit le meilleur trajet, les équipes gèrent leurs missions depuis une seule application et la clinique prépare l'arrivée du patient.</p>
              <div className="cta-row">
                <DemoRequest />
                <a href="#telechargements" className="btn btn-ghost">Télécharger les applications</a>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-circle">
                <img src="/hero.jpg" alt="Les trois applications AmbuLink et une ambulance" width={640} height={595} />
              </div>
            </div>
          </div>
          <div className="wrap award">
            <img src="/trophy.jpg" alt="Trophée Summit Start-up, AI Forward Summit 2026" width={657} height={700} />
            <p><strong>Prix de l'esprit d'innovation</strong><br />Summit Start-up, AI Forward Summit 2026</p>
          </div>
        </section>

        {/* PROBLEM */}
        <section className="section" id="probleme">
          <div className="wrap">
            <p className="eyebrow">Le problème</p>
            <h2>Le transport médical se coordonne encore par téléphone.</h2>
            <div className="grid4">
              {problemCards.map((card, idx) => (
                <article className="card" key={idx}>
                  <div className="ic red">
                    <svg viewBox="0 0 24 24" aria-hidden="true" dangerouslySetInnerHTML={{ __html: [getIconSvg('phone'), getIconSvg('paper'), getIconSvg('location'), getIconSvg('warning')][idx] }} />
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SOLUTION */}
        <section className="section alt" id="solution">
          <div className="wrap">
            <p className="eyebrow">La solution</p>
            <h2>Une plateforme, trois acteurs connectés.</h2>
            <p className="sub">AmbuLink relie patients, sociétés d'ambulances et cliniques sur un même flux, du premier clic jusqu'à l'arrivée à la clinique.</p>
            <div className="grid3">
              {solutionCards.map((card, idx) => (
                <article className="card feature" key={idx}>
                  <div className="ic blue">
                    <svg viewBox="0 0 24 24" aria-hidden="true" dangerouslySetInnerHTML={{ __html: [getIconSvg('chart'), getIconSvg('clock'), getIconSvg('bell')][idx] }} />
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* APPS */}
        <section className="section" id="applications">
          <div className="wrap">
            <p className="eyebrow">L'écosystème</p>
            <h2>Trois applications, une seule plateforme.</h2>

            {appCards.map((app, idx) => (
              <div className={`app ${idx === 1 ? 'rev' : ''}`} key={idx}>
                <div className="app-text">
                  <span className={`tag ${app.tag}`}>{app.tagLabel}</span>
                  <h3>{app.title}</h3>
                  <p>{app.description}</p>
                  <ul className="checks">
                    {app.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
                <div className={`shots ${app.images.length > 1 ? 'phones' : 'desk'}`}>
                  {app.images.map((img, i) => (
                    <img key={i} src={img} alt={app.imagesAlt[i]} width={app.imageSizes[i][0]} height={app.imageSizes[i][1]} loading="lazy" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* HOW */}
        <section className="section navy" id="fonctionnement">
          <div className="wrap">
            <p className="eyebrow light">Comment ça marche</p>
            <h2>De la demande à la destination, en 4 étapes.</h2>
            <ol className="steps">
              {steps.map((step) => (
                <li key={step.number}>
                  <span>{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* AI & SECURITY */}
        <section className="section" id="atouts">
          <div className="wrap">
            <p className="eyebrow">Nos atouts</p>
            <h2>Une IA utile, des données protégées.</h2>
            <div className="grid3">
              {aiAdvantages.map((item, idx) => (
                <article className="card" key={idx}>
                  <div className={`ic ${['blue', 'red', 'green'][idx]}`}>
                    <svg viewBox="0 0 24 24" aria-hidden="true" dangerouslySetInnerHTML={{ __html: [getIconSvg('chart'), getIconSvg('bell'), getIconSvg('lock')][idx] }} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FOR WHOM */}
        <section className="section alt" id="pour-qui">
          <div className="wrap">
            <p className="eyebrow">Pour qui</p>
            <h2>Chacun y gagne.</h2>
            <div className="grid3">
              {forWhom.map((item, idx) => (
                <article className="who" key={idx}>
                  <img src={item.image} alt="" width={124} height={124} />
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* DOWNLOADS */}
        <section className="section" id="telechargements">
          <div className="wrap">
            <p className="eyebrow">Téléchargements</p>
            <h2>Essayez AmbuLink.</h2>
            <div className="grid3">
              {downloadCards.map((card, idx) => (
                <article className="card dl" key={idx}>
                  <span className={`tag ${card.tag}`}>{card.tagLabel}</span>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  <a className={`btn btn-${card.tag}`} href={card.link}>{card.buttonText}</a>
                </article>
              ))}
            </div>
            <p className="fine">Applications Android (fichier APK). Sur votre téléphone, autorisez l'installation depuis cette source si Android le demande.</p>
          </div>
        </section>

        {/* INTERNSHIPS */}
        <section className="section alt" id="internships">
          <div className="wrap">
            <p className="eyebrow">Carrière</p>
            <h2>Rejoignez notre équipe en stage.</h2>
            <p className="sub">Explorez nos offres de stage en engineering et business. Téléchargez la brochure complète ou postulez directement.</p>
            <div className="internships-cta">
              <a
                href="/AmbuLink_PFE_Book.pdf"
                download
                className="btn btn-secondary"
                title="Télécharger la brochure PFE complète"
              >
                📥 Télécharger la brochure PDF
              </a>
              <button
                className="btn btn-primary"
                onClick={() => setFormOpen(true)}
                title="Postuler à un stage"
              >
                📝 Postuler à un stage
              </button>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="section contact" id="contact">
          <div className="wrap contact-in">
            <div>
              <p className="eyebrow light">Contact</p>
              <h2>Parlons de votre flotte ou de votre clinique.</h2>
              <p className="lead">Sociétés d'ambulances, cliniques, investisseurs et partenaires : écrivez-nous pour une démonstration en direct.</p>
              <DemoRequest />
            </div>
            <ul className="contact-list">
              <li><span>E-mail</span><a href="mailto:ambulink.contact@gmail.com">ambulink.contact@gmail.com</a></li>
              <li><span>Téléphone</span><a href="tel:+21653514183">+216 53 51 41 83</a></li>
              <li><span>Adresse</span>Sfax, Tunisie</li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="foot">
        <div className="wrap foot-in">
          <img src="/logo.png" alt="AmbuLink" width={634} height={525} />
          <p>© <span id="y">2026</span> AmbuLink · Sfax, Tunisie</p>
          <a href="#top">Retour en haut ↑</a>
        </div>
      </footer>

      <script suppressHydrationWarning>{`
        (function () {
          var b = document.querySelector('.menu-btn'), m = document.getElementById('menu');
          b.addEventListener('click', function () {
            var o = m.classList.toggle('open'); b.setAttribute('aria-expanded', o ? 'true' : 'false');
          });
          m.addEventListener('click', function (e) {
            if (e.target.tagName === 'A') { m.classList.remove('open'); b.setAttribute('aria-expanded', 'false'); }
          });
          document.getElementById('y').textContent = new Date().getFullYear();
        })();
      `}</script>

      <InternshipForm isOpen={formOpen} onClose={() => setFormOpen(false)} subjects={allSubjects} />

      <style jsx>{`
        .internships-cta {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 40px;
        }

        .internships-cta .btn {
          padding: 14px 28px;
          font-size: 16px;
          font-weight: 600;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
          display: inline-block;
          border: none;
        }

        .btn-primary {
          background: var(--blue);
          color: white;
        }

        .btn-primary:hover {
          background: #1547a3;
          transform: translateY(-2px);
        }

        .btn-secondary {
          background: var(--soft);
          color: var(--blue);
        }

        .btn-secondary:hover {
          background: #dde9ff;
          transform: translateY(-2px);
        }

        @media (max-width: 640px) {
          .internships-cta {
            flex-direction: column;
          }

          .internships-cta .btn {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}
