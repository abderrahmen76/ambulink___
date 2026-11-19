import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politique de confidentialité — AmbuLink',
  description:
    'Politique de confidentialité de l’application AmbuLink : données traitées, localisation des conducteurs, partage avec les sociétés d’ambulances et les hôpitaux, sécurité et suppression du compte.',
};

const contactEmail = 'ambulink.contact@gmail.com';
const contactPhone = '+216 53 51 41 83';
const contactAddress = 'Sfax, Tunisie';
const effectiveDate = '19 novembre 2026';

export default function PrivacyPage() {
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
            <p className="eyebrow">AmbuLink · Informations légales</p>
            <h1>Politique de confidentialité</h1>
            <p className="lead">
              Cette politique décrit les données personnelles traitées par
              l’application mobile AmbuLink et son backend, pourquoi elles le
              sont, avec qui elles sont partagées et comment supprimer votre
              compte.
            </p>
            <div className="policy-meta">
              <span>
                <strong>Date d’entrée en vigueur :</strong> {effectiveDate}
              </span>
              <span>
                <strong>Application :</strong> AmbuLink (Android)
              </span>
              <span>
                <strong>Exploitant :</strong> AmbuLink
              </span>
            </div>
          </div>
        </section>

        <section className="section policy">
          <div className="wrap policy-wrap">
            <h2 id="qui-sommes-nous">1. Qui nous sommes et champ de cette politique</h2>
            <p>
              AmbuLink est une application de coordination d’ambulances et de
              transport médical. Elle met en relation les patients qui demandent
              une ambulance, les conducteurs et entreprises d’ambulances qui
              répondent, et les hôpitaux qui reçoivent les informations de
              mission et médicales.
            </p>
            <p>
              Cette politique couvre l’application mobile AmbuLink et les
              services qu’elle utilise. Les responsables d’entreprise, les
              responsables d’hôpital et les administrateurs utilisent la même
              plateforme via leurs propres comptes.
            </p>

            <h2 id="contact">2. Contact vie privée</h2>
            <p>
              Les questions et les demandes d’accès, de rectification ou de
              suppression qui ne peuvent pas être traitées dans l’application
              peuvent être envoyées à{' '}
              <a href={`mailto:${contactEmail}`}>{contactEmail}</a> ou au{' '}
              <a href="tel:+21653514183">{contactPhone}</a>. Nous pouvons devoir
              vérifier que vous contrôlez le compte avant d’agir ; un numéro de
              téléphone, un e-mail ou un identifiant seul n’est pas accepté comme
              preuve de propriété.
            </p>

            <h2 id="donnees">3. Informations que nous traitons</h2>
            <p>Selon votre rôle, nous traitons :</p>
            <ul>
              <li>
                <strong>Identité du compte :</strong> nom complet, numéro de
                téléphone, type de compte (patient, conducteur, responsable
                d’entreprise, utilisateur d’hôpital, administrateur), langue
                préférée et identifiant interne.
              </li>
              <li>
                <strong>Données d’authentification :</strong> votre mot de passe
                (géré par notre fournisseur d’authentification ; nous ne le
                voyons jamais) et, en cas de récupération, le nouveau mot de
                passe soumis, chiffré par notre backend jusqu’à ce qu’un
                administrateur termine la réinitialisation.
              </li>
              <li>
                <strong>Données de localisation :</strong> coordonnées du point
                de prise en charge et de la destination choisies ; pour les
                conducteurs, la position GPS de l’appareil lorsque vous êtes
                marqué disponible ou avez une mission en cours.
              </li>
              <li>
                <strong>Données de santé :</strong> un dossier médical que vous
                pouvez remplir (allergies, maladies chroniques, médicaments,
                groupe sanguin) et les rapports médicaux rédigés par le
                conducteur intervenant (motif, antécédents, observations,
                constantes vitales, traitements).
              </li>
              <li>
                <strong>Données opérationnelles :</strong> missions, statuts et
                horodatages, dossiers d’ambulances et de flotte (carburant,
                entretien, équipement), prix des missions et enregistrements de
                notifications.
              </li>
              <li>
                <strong>Données d’appareil et de notification :</strong> un jeton
                de notification généré par Firebase Cloud Messaging, le type de
                plateforme et la langue.
              </li>
              <li>
                <strong>Sessions invité :</strong> en navigation invité, un
                identifiant de session anonyme est créé. Une session invité ne
                peut pas demander de mission ni supprimer de compte.
              </li>
            </ul>
            <p>
              Nous n’utilisons <strong>aucun</strong> SDK publicitaire ou
              d’analyse, nous ne collectons ni contacts, ni agenda, ni SMS, ni
              micro, ni caméra, et nous ne vendons aucune donnée personnelle.
            </p>

            <h2 id="collecte">4. Comment les informations sont collectées</h2>
            <ul>
              <li>
                Vous fournissez les informations de compte lors de
                l’inscription patient ou conducteur, ou lorsqu’un responsable ou
                un administrateur crée votre compte.
              </li>
              <li>
                Vous saisissez ou sélectionnez des données dans l’application :
                prise en charge/destination, champs du dossier médical et, pour
                les conducteurs, champs du rapport médical.
              </li>
              <li>
                L’appareil fournit la position lorsque vous utilisez les
                fonctions de carte et, pour les conducteurs, tant que le suivi
                est actif et visible dans la notification permanente.
              </li>
              <li>
                Firebase Cloud Messaging génère un jeton sur votre appareil.
              </li>
              <li>
                La plateforme génère automatiquement les enregistrements
                opérationnels (missions, horodatages, statuts, événements de
                notification).
              </li>
            </ul>

            <h2 id="finalites">5. Pourquoi nous utilisons ces informations</h2>
            <p>
              Nous utilisons les données personnelles pour créer et sécuriser les
              comptes, authentifier les utilisateurs, permettre aux patients de
              choisir une société d’ambulances sur la carte et de transmettre
              leur demande aux conducteurs disponibles et éligibles de cette
              société, permettre au conducteur assigné de rejoindre le patient,
              permettre au patient et aux responsables de suivre l’ambulance
              assignée, afficher les temps d’arrivée estimés, envoyer les
              notifications de mission et d’offre, consigner la transmission
              médicale à un hôpital, gérer les dossiers de flotte et de
              facturation des prestataires, prévenir les abus et répondre aux
              demandes des autorités compétentes le cas échéant.
            </p>
            <p>
              Nous n’utilisons pas les données personnelles à des fins
              publicitaires ou de profilage.
            </p>

            <h2 id="localisation">6. Localisation et GPS</h2>
            <ul>
              <li>
                <strong>Patients :</strong> l’application utilise la position de
                l’appareil pour vous aider à choisir un point de prise en charge
                et affiche la carte. Les coordonnées confirmées sont enregistrées
                avec votre mission afin que le conducteur intervenant et
                l’entreprise ou l’hôpital concernés puissent vous rejoindre. Nous
                ne transmettons pas en continu la position du patient.
              </li>
              <li>
                <strong>Conducteurs :</strong> lorsque vous êtes marqué disponible
                ou avez une mission en cours, l’application collecte des
                positions GPS de haute précision (avec filtre de distance) via un
                service de premier plan. Une notification permanente
                (« AmbuLink en ligne — Position partagée pour la répartition des
                missions ») est affichée pendant ce fonctionnement, et les mises à
                jour s’arrêtent lorsque vous passez hors ligne ou terminez la
                mission. La dernière position est stockée dans notre backend afin
                que la répartition des missions, les responsables d’entreprise,
                les responsables d’hôpital et le patient assigné voient
                l’ambulance.
              </li>
              <li>
                <strong>Cartes et itinéraires :</strong> pour afficher les cartes
                et calculer les itinéraires, l’application envoie des coordonnées
                à des services publics liés à OpenStreetMap (tuiles de carte,
                géocodage inverse par Nominatim, calcul d’itinéraire par le
                serveur de démonstration OSRM). Ces services reçoivent les
                coordonnées nécessaires à la requête et peuvent recevoir la zone
                de carte consultée.
              </li>
              <li>
                Retirer l’autorisation de localisation désactive le suivi du
                conducteur et les fonctions de répartition et de suivi.
              </li>
            </ul>

            <h2 id="sante">7. Informations de santé</h2>
            <p>
              Le dossier médical patient est facultatif et saisi par le patient ;
              il est affiché au conducteur intervenant. Les rapports médicaux sont
              rédigés par les conducteurs pendant ou après une mission et
              transmis à l’entreprise et à l’hôpital concernés dans le cadre de la
              transmission des soins.
            </p>
            <p>
              Ces enregistrements peuvent contenir des données de santé
              sensibles. Ils sont utilisés uniquement pour la coordination des
              soins, la continuité des soins, l’administration des prestataires et
              les obligations légales applicables à l’exploitant. Ils ne servent
              pas à la publicité, ne sont pas vendus et ne sont pas transmis à des
              courtiers en données.
            </p>

            <h2 id="photos">8. Photos, fichiers et pièces jointes</h2>
            <p>
              L’application mobile AmbuLink ne demande pas d’autorisation caméra
              ou stockage et ne propose pas d’envoi de photos ou de fichiers.
            </p>

            <h2 id="compte">9. Compte, connexion et sécurité du mot de passe</h2>
            <p>
              Les comptes utilisent un numéro de téléphone et un mot de passe
              gérés par notre fournisseur d’authentification. L’application
              n’affiche jamais votre mot de passe. La récupération de mot de passe
              est effectuée par un administrateur via un flux chiffré. Vous êtes
              responsable de la confidentialité de votre mot de passe et de
              l’utilisation d’un numéro que vous contrôlez.
            </p>

            <h2 id="notifications">10. Notifications</h2>
            <p>
              Si vous autorisez les notifications, l’application enregistre un
              jeton Firebase Cloud Messaging afin d’envoyer les notifications de
              mission, de répartition et de compte. Les jetons sont stockés avec
              la plateforme et la langue. Ils sont désenregistrés à la déconnexion
              et supprimés lors de la suppression du compte. Le contenu des
              notifications est limité aux informations nécessaires pour agir sur
              une mission ou une offre.
            </p>

            <h2 id="tiers">11. Services tiers</h2>
            <p>Nous nous appuyons sur :</p>
            <ul>
              <li>
                <strong>Supabase</strong> — authentification, base de données,
                temps réel et fonctions serveur.
              </li>
              <li>
                <strong>Google Firebase Cloud Messaging</strong> — remise des
                notifications.
              </li>
              <li>
                <strong>Services liés à OpenStreetMap</strong> — tuiles de carte
                (<a href="https://tile.openstreetmap.org">tile.openstreetmap.org</a>),
                géocodage inverse
                (<a href="https://nominatim.openstreetmap.org">nominatim.openstreetmap.org</a>)
                et calcul d’itinéraire
                (<a href="https://router.project-osrm.org">router.project-osrm.org</a>).
              </li>
              <li>
                <strong>Google Play</strong> — distribution de l’application.
              </li>
            </ul>
            <p>
              Ces prestataires traitent les données pour fournir leur service.
              Nous ne les autorisons pas à utiliser vos données pour leur propre
              publicité.
            </p>

            <h2 id="partage">12. Partage entre patients, conducteurs, entreprises, hôpitaux et administrateurs</h2>
            <p>
              Pour faire fonctionner le service, les informations sont visibles
              par les personnes impliquées dans une mission :
            </p>
            <ul>
              <li>
                Le <strong>conducteur assigné</strong> voit le nom, le téléphone,
                la prise en charge et la destination du patient, ainsi que son
                dossier médical, pendant la mission.
              </li>
              <li>
                Le <strong>patient</strong> voit la position en direct de
                l’ambulance assignée et les informations du conducteur.
              </li>
              <li>
                Le <strong>responsable d’entreprise</strong> voit les missions de
                l’entreprise, ses conducteurs (y compris leur téléphone), ses
                ambulances, ses dossiers de flotte et de carburant, et les rapports
                médicaux de ses missions.
              </li>
              <li>
                Le <strong>responsable d’hôpital</strong> voit les missions et
                rapports médicaux envoyés à l’hôpital, et les informations des
                conducteurs concernés.
              </li>
              <li>
                Les <strong>administrateurs</strong> gèrent les comptes et la
                configuration.
              </li>
            </ul>
            <p>
              L’accès est limité par des politiques de base de données liées au
              rôle. Nous ne vendons pas les données et ne les partageons pas avec
              des publicitaires.
            </p>

            <h2 id="securite">13. Sécurité</h2>
            <p>
              Les données sont transmises en HTTPS ; l’application Android
              n’autorise pas le trafic en clair. L’accès aux données du backend
              est limité par des politiques liées au rôle, et les opérations
              réservées au serveur exigent un rôle de service.
            </p>
            <p>
              Le chiffrement au repos, la gestion des clés et les certifications
              indépendantes dépendent de nos prestataires et ne sont pas affirmés
              ici. Aucun système n’est parfaitement sûr ; signalez tout problème
              suspect à <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
            </p>

            <h2 id="conservation">14. Durée de conservation</h2>
            <ul>
              <li>
                Les données de compte actives sont conservées tant que le compte
                existe.
              </li>
              <li>
                La position GPS et la disponibilité du conducteur sont écrasées
                pendant l’utilisation et effacées lors de la suppression du compte
                ou à l’arrêt du suivi.
              </li>
              <li>
                Les enregistrements conservés (missions, rapports médicaux et
                révisions, transmissions, revues, dossiers de
                flotte/carburant/entretien, lignes de pièces jointes) sont gardés
                après la suppression du compte car ils font partie du dossier
                opérationnel et médical.
              </li>
              <li>
                Aucune durée de conservation fixe n’est actuellement définie pour
                ces enregistrements dans l’application. Ils sont conservés pour la
                continuité des soins et l’administration opérationnelle.
              </li>
            </ul>

            <h2 id="suppression">15. Suppression du compte</h2>
            <p>
              Les patients et les conducteurs peuvent supprimer leur compte
              depuis l’application, dans la section compte (« Supprimer mon
              compte »), après confirmation du mot de passe. La suppression est
              refusée tant qu’une mission ou une répartition est en cours.
            </p>
            <p>
              La suppression retire le compte d’authentification, les
              identifiants, le nom et le téléphone du profil, les demandes de
              réinitialisation en attente, les jetons de notification et les
              enregistrements de notification, les appartenances aux
              entreprises/hôpitaux, le dossier médical du patient et, pour les
              conducteurs, le statut en ligne, la position GPS et l’affectation
              d’ambulance. Les comptes responsables d’entreprise, d’hôpital et
              administrateurs ne peuvent pas encore être supprimés par ce flux ;
              contactez <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
            </p>

            <h2 id="historique">16. Enregistrements historiques après la suppression</h2>
            <p>
              Les missions, les enregistrements de répartition, les rapports
              médicaux, leurs révisions et transmissions, les revues et les
              dossiers de flotte/financiers sont conservés pour la continuité des
              soins et l’administration opérationnelle. Votre nom est remplacé par
              un libellé non personnel (« Ancien utilisateur » / « Ancien
              conducteur »), votre numéro de téléphone et les autres identifiants
              du profil sont retirés, et les noms de patients dans les
              enregistrements conservés sont remplacés. Le contenu clinique saisi
              par un conducteur reste partie du dossier médical.
            </p>
            <p>
              Cela ne signifie pas que toutes les données personnelles contenues
              dans les enregistrements conservés soient automatiquement gardées :
              les identifiants sont retirés ou anonymisés lorsqu’ils ne sont pas
              légitimement nécessaires à la finalité du dossier. La conservation de
              ces enregistrements est décrite à la section 14.
            </p>

            <h2 id="anciens-comptes">17. Comment apparaissent les anciens comptes</h2>
            <p>
              Après suppression, l’historique affiche « Ancien utilisateur » ou
              « Ancien conducteur » au lieu de votre nom. L’identifiant interne
              peut subsister comme référence non personnelle afin de préserver la
              cohérence des enregistrements.
            </p>

            <h2 id="droits">18. Vos droits</h2>
            <p>
              Sous réserve du droit applicable, vous pouvez demander l’accès à vos
              données personnelles, leur rectification ou leur suppression, vous
              opposer à certains traitements ou poser des questions sur cette
              politique, en contactant{' '}
              <a href={`mailto:${contactEmail}`}>{contactEmail}</a>. Nous
              vérifierons la propriété du compte avant d’agir. Certains
              enregistrements peuvent être conservés lorsque la loi applicable ou
              la nature du dossier médical l’exige.
            </p>

            <h2 id="enfants">19. Enfants</h2>
            <p>
              AmbuLink est destiné aux adultes demandant ou fournissant un
              transport d’urgence. L’application ne s’adresse pas aux enfants.
            </p>

            <h2 id="modifications">20. Traitement international, modifications et contact</h2>
            <p>
              Nos prestataires peuvent traiter des données en dehors de la
              Tunisie. Nous mettrons à jour cette politique lorsque le service ou
              les règles applicables changent et publierons la nouvelle version à
              l’adresse{' '}
              <a href="https://ambulink-lyart.vercel.app/privacy">
                ambulink-lyart.vercel.app/privacy
              </a>
              .
            </p>
            <p>
              Pour toute question, contactez{' '}
              <a href={`mailto:${contactEmail}`}>{contactEmail}</a>, le{' '}
              <a href="tel:+21653514183">{contactPhone}</a>, ou écrivez à{' '}
              {contactAddress}.
            </p>

            <p className="policy-note">
              Cette politique décrit le fonctionnement actuel de l’application
              AmbuLink. Elle ne constitue pas une certification de conformité et
              ne remplace pas les obligations légales applicables à l’exploitant.
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
            <a href="/privacy" aria-current="page">
              Politique de confidentialité
            </a>
            <a href="/">Accueil</a>
          </div>
        </div>
      </footer>
    </>
  );
}
