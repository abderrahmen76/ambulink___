import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Suppression du compte — AmbuLink',
  description:
    'Comment supprimer définitivement votre compte AmbuLink depuis l’application ou demander une suppression par e-mail lorsque l’application n’est pas accessible.',
};

const contactEmail = 'ambulink.contact@gmail.com';
const deletionSubject = 'AmbuLink account deletion request';
const mailtoHref = `mailto:${contactEmail}?subject=${encodeURIComponent(deletionSubject)}`;

export default function AccountDeletionPage() {
  return (
    <>
      <header className="nav">
        <div className="wrap nav-in">
          <a href="/" className="brand" aria-label="AmbuLink, retour à l’accueil">
            <img src="/logo.png" alt="AmbuLink" width={634} height={525} />
          </a>
          <a className="btn btn-blue small" href="/">
            Retour à l’accueil
          </a>
        </div>
      </header>

      <main>
        <section className="policy-hero">
          <div className="wrap policy-wrap">
            <p className="eyebrow">AmbuLink · Compte et données</p>
            <h1>Suppression du compte</h1>
            <p className="lead">
              Les patients et les conducteurs peuvent supprimer définitivement
              leur compte AmbuLink. Cette page explique la procédure depuis
              l’application et la demande externe par e-mail si vous ne pouvez
              pas utiliser l’application.
            </p>
            <div className="policy-meta">
              <span>
                <strong>Application :</strong> AmbuLink (Android)
              </span>
              <span>
                <strong>Contact :</strong>{' '}
                <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
              </span>
            </div>
          </div>
        </section>

        <section className="policy">
          <div className="wrap policy-wrap">
            <h2 id="application">1. Supprimer le compte depuis l’application</h2>
            <p>
              La suppression se fait dans l’application, avec le compte connecté
              et après confirmation du mot de passe :
            </p>
            <ul>
              <li>Ouvrez l’application AmbuLink et connectez-vous au compte à supprimer.</li>
              <li>
                Ouvrez votre profil : l’écran Profil pour un compte patient, ou
                l’onglet Profil pour un compte conducteur.
              </li>
              <li>
                Appuyez sur « Supprimer mon compte », saisissez le mot de passe
                du compte, puis confirmez la suppression.
              </li>
              <li>
                L’application vous indique le résultat de la demande. Le compte
                ne peut pas être supprimé tant qu’une mission ou une répartition
                est en cours.
              </li>
            </ul>

            <h2 id="email">2. Demander la suppression par e-mail</h2>
            <p>
              Si vous ne pouvez pas accéder à l’application ou terminer la
              procédure dans l’application, envoyez une demande depuis l’adresse
              e-mail que vous contrôlez à l’adresse de contact surveillée
              ci-dessous. Indiquez le numéro de téléphone associé au compte et le
              type de compte (patient ou conducteur).
            </p>
            <div className="deletion-cta">
              <p>
                <strong>{contactEmail}</strong>
                <br />
                Objet suggéré : {deletionSubject}
              </p>
              <a className="btn btn-blue" href={mailtoHref}>
                Écrire un e-mail de demande
              </a>
            </div>
            <p>
              Une demande envoyée par e-mail ne supprime pas automatiquement le
              compte. Elle est examinée, puis la suppression est effectuée avec
              les contrôles de sécurité prévus par AmbuLink.
            </p>

            <h2 id="verification">3. Vérification de l’identité et du compte</h2>
            <p>
              AmbuLink peut avoir besoin de vérifier votre identité et que vous
              êtes bien le propriétaire du compte avant de traiter la demande.
              Un numéro de téléphone, une adresse e-mail ou un identifiant
              utilisateur seul ne suffit pas à prouver la propriété du compte ;
              une vérification supplémentaire peut être demandée.
            </p>
            <p>
              <strong>
                N’envoyez jamais votre mot de passe, un code d’authentification
                ou d’autres identifiants de connexion par e-mail.
              </strong>{' '}
              AmbuLink ne vous demandera pas ces informations par e-mail.
            </p>

            <h2 id="supprime">4. Données supprimées</h2>
            <p>Lorsque la suppression est confirmée, AmbuLink supprime :</p>
            <ul>
              <li>les identifiants d’authentification et l’accès au compte ;</li>
              <li>le nom et les coordonnées du profil ;</li>
              <li>les jetons de notification et les données de notification privées ;</li>
              <li>
                pour un conducteur : la position GPS enregistrée, l’horodatage de
                localisation et le statut en ligne/disponible ;
              </li>
              <li>
                l’appartenance à une entreprise ou à un hôpital et les autres
                données personnelles qui ne doivent pas être conservées.
              </li>
            </ul>

            <h2 id="conserve">5. Enregistrements conservés</h2>
            <p>
              Certains enregistrements opérationnels et médicaux peuvent être
              conservés lorsque cela est nécessaire au suivi médical, à la
              continuité des soins, à la responsabilité opérationnelle, au
              traitement des litiges ou à une obligation légale applicable à
              l’exploitant. Cela peut inclure les missions, les tentatives de
              répartition et offres, les pièces jointes de mission, les rapports
              médicaux et leurs révisions/transmissions, les dossiers de
              carburant et d’entretien, l’équipement et l’inventaire, les
              ambulances, les entreprises et les hôpitaux.
            </p>
            <p>
              Lorsque ces enregistrements sont conservés, les identifiants
              personnels sont retirés ou remplacés dans la mesure appropriée.
              L’historique affiche « Ancien utilisateur » pour un compte patient
              et « Ancien conducteur » pour un compte conducteur, au lieu du nom
              d’origine. Aucune durée de conservation fixe n’est promise par
              cette page.
            </p>

            <h2 id="delai">6. Traitement de la demande</h2>
            <p>
              AmbuLink ne promet pas de suppression immédiate et ne fixe pas de
              délai de traitement dans cette page. Une demande est traitée après
              vérification, et la suppression est refusée tant qu’une mission ou
              une répartition est en cours. Les comptes responsables
              d’entreprise, responsables d’hôpital et administrateurs ne peuvent
              pas encore être supprimés par ce flux ; contactez{' '}
              <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
            </p>

            <p className="policy-note">
              Cette page décrit la procédure de suppression du compte AmbuLink.
              Elle ne constitue pas une certification de conformité. Pour le
              détail des données traitées, consultez la{' '}
              <a href="/privacy">politique de confidentialité</a>.
            </p>
          </div>
        </section>
      </main>

      <footer className="foot">
        <div className="wrap foot-in">
          <a href="/" className="brand" aria-label="AmbuLink, accueil">
            <img src="/logo.png" alt="AmbuLink" width={634} height={525} />
          </a>
          <p>© 2026 AmbuLink · Sfax, Tunisie</p>
          <div className="foot-links">
            <a href="/privacy">Politique de confidentialité</a>
            <a href="/account-deletion" aria-current="page">
              Suppression du compte
            </a>
            <a href="/">Accueil</a>
          </div>
        </div>
      </footer>
    </>
  );
}
