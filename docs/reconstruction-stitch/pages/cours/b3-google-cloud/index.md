# Google Cloud Platform B3

> Fiche extraite du fichier `b3-google-cloud/index.html` (207 lignes, 21.2 Ko, sha256 `19c0431d186f`).
> Famille : **cours-b3-google-cloud** · sous-type : `index` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-google-cloud/index.html` |
| Titre du document | Google Cloud Platform B3 — Accueil |
| Description meta | Formation d’excellence en ingénierie et architecture Cloud Google pour le Bachelor 3 : structure physique mondiale des datacenters (Régions, Zones de disponibilité isolées, réseau privé mondial Anycast et PoP edge), hiérarchie organisationnelle (Organisation racine liée au domaine, Dossiers hiérarchiques, Projets et Ressources), conventions de nommage et identifiants de projets (Project ID RFC 1035, Project Name et Project Number), quotas de ressources et maîtrise des outils d'administration (Google Cloud Console, Cloud Shell avec stockage persistant et SDK gcloud CLI), sécurité des identités et des accès (Cloud IAM, principe du moindre privilège, typologie des membres, rôles de base à limiter, rôles prédéfinis managés, création de rôles personnalisés avec permissions atomiques, liaisons de politiques IAM et conditions contextuelles CEL, gouvernance des comptes de service, risques majeurs des clés JSON privées et déploiement de Workload Identity Federation sans clé), services de calcul et virtualisation (familles de machines Compute Engine E2, N2, C2, M2, instances Spot avec réduction jusqu'à 91%, disques persistants Standard/Balanced/SSD/Extreme, comparaison des SLA selon les configurations admissibles, Groupes d'Instances Gérés MIG avec auto-scaling et auto-healing par Health Check, clusters Google Kubernetes Engine GKE Standard vs GKE Autopilot, et architectures Serverless modernes avec Cloud Run, concurrence élevée, scale-to-zero et traffic splitting), réseau virtuel logiciel (VPC mondial sur SDN Andromeda, mode sous-réseaux personnalisé, plan d'adressage CIDR, les 4 adresses IP réservées par sous-réseau, passerelle Cloud NAT pour sorties sécurisées sans IP publique, règles de pare-feu avec état ordonnées par priorité de 0 à 65535 et Network Tags, interconnexions VPC Peering, Cloud VPN HA IPsec IKEv2 avec Cloud Router/BGP, Cloud Interconnect, et répartiteurs de charge mondiaux Anycast Global External HTTP(S) Load Balancer avec URL Maps et Cloud Armor WAF/DDoS), stockage distribué et moteurs de données (Google Cloud Storage avec classes Standard, Rapid zonale, Nearline 30j, Coldline 90j et Archive 365j, règles d'Object Lifecycle Management dans les buckets compatibles, Uniform Bucket-Level Access et Signed URLs, bases relationnelles Cloud SQL et Cloud Spanner avec SLA dépendant de leur configuration, bases NoSQL Firestore et Cloud Bigtable, et ingestion asynchrone découplée avec Cloud Pub/Sub, topics et abonnements Pull/Push), et enfin observabilité, FinOps et automatisation déclarative (Google Cloud Operations Suite avec Cloud Monitoring, métriques, alertes et tableaux de bord, Cloud Logging avec requêtes de filtrage et Log Sinks vers BigQuery/GCS/PubSub, diagnostics de latence Cloud Trace et profilage Cloud Profiler, gestion financière FinOps avec budgets, alertes de seuil 50%/90%/100%, remises d'usage continu SUD automatiques et engagements CUD 1 an/3 ans, et Infrastructure as Code avec Terraform, provider Google, état distant sécurisé sur backend GCS avec verrouillage et zéro secret en dur). |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | — |
| Regle d'acces | Libre (aucun compte) |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Google Cloud Platform B3 |
| 3 | h2 | — | Parcours d’apprentissage |
| 4 | h2 | — | L'Ingénierie Cloud Google en Bachelor 3 |

## 3. Hierarchie des titres

- **H1** — Google Cloud Platform B3
  - **H2** — Parcours d’apprentissage
    - **H3** — Architecture Globale, Hiérarchie des Ressources & CLI gcloud
    - **H3** — Sécurité des Identités IAM, Comptes de Service & Stratégies d'Accès
    - **H3** — Calcul & Virtualisation (Compute Engine, GKE, Cloud Run & App Engine)
    - **H3** — Réseau Virtuel VPC, Routage, Sécurité & Répartiteurs de Charge
    - **H3** — Stockage Distribué, Bases de Données & Pipeline Big Data
    - **H3** — Observabilité (Operations Suite), FinOps & Infrastructure as Code (Terraform)
  - **H2** — L'Ingénierie Cloud Google en Bachelor 3

## 4. Navigation et liens

| Zone | Classe | Liens |
|---|---|---|
| nav | `skip-nav` | Aller au contenu → `#content` |
| nav | `b3-google-cloudnav` | Portail → `/`<br>Google Cloud Platform B3 → `index.html`<br>Sommaire → `sommaire.html`<br>Ch. 1 → `chapitres/chapitre1.html`<br>Ch. 2 → `chapitres/chapitre2.html`<br>Ch. 3 → `chapitres/chapitre3.html`<br>Ch. 4 → `chapitres/chapitre4.html`<br>Ch. 5 → `chapitres/chapitre5.html`<br>Ch. 6 → `chapitres/chapitre6.html`<br>Cartes → `chapitres/cartes.html`<br>Mémo → `chapitres/formules.html`<br>Exercices → `chapitres/exercices.html`<br>Atelier → `atelier.html`<br>Examen → `chapitres/examens.html` |
| header | `hero` | Démarrer le cours → `chapitres/chapitre1.html`<br>Voir le sommaire → `sommaire.html`<br>Bac à sable CLI gcloud & Études de Cas → `atelier.html` |

Liens sortants : **24** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| Google Cloud Platform B3 | `index.html` | `b3-google-cloud/index.html` | interne |
| Sommaire | `sommaire.html` | `b3-google-cloud/sommaire.html` | interne |
| Ch. 1 | `chapitres/chapitre1.html` | `b3-google-cloud/chapitres/chapitre1.html` | interne |
| Ch. 2 | `chapitres/chapitre2.html` | `b3-google-cloud/chapitres/chapitre2.html` | interne |
| Ch. 3 | `chapitres/chapitre3.html` | `b3-google-cloud/chapitres/chapitre3.html` | interne |
| Ch. 4 | `chapitres/chapitre4.html` | `b3-google-cloud/chapitres/chapitre4.html` | interne |
| Ch. 5 | `chapitres/chapitre5.html` | `b3-google-cloud/chapitres/chapitre5.html` | interne |
| Ch. 6 | `chapitres/chapitre6.html` | `b3-google-cloud/chapitres/chapitre6.html` | interne |
| Cartes | `chapitres/cartes.html` | `b3-google-cloud/chapitres/cartes.html` | interne |
| Mémo | `chapitres/formules.html` | `b3-google-cloud/chapitres/formules.html` | interne |
| Exercices | `chapitres/exercices.html` | `b3-google-cloud/chapitres/exercices.html` | interne |
| Atelier | `atelier.html` | `b3-google-cloud/atelier.html` | interne |
| Examen | `chapitres/examens.html` | `b3-google-cloud/chapitres/examens.html` | interne |
| Démarrer le cours | `chapitres/chapitre1.html` | `b3-google-cloud/chapitres/chapitre1.html` | interne |
| Voir le sommaire | `sommaire.html` | `b3-google-cloud/sommaire.html` | interne |
| Bac à sable CLI gcloud & Études de Cas | `atelier.html` | `b3-google-cloud/atelier.html` | interne |
| Architecture Globale, Hiérarchie des Ressources & CLI gcloud | `chapitres/chapitre1.html` | `b3-google-cloud/chapitres/chapitre1.html` | interne |
| Sécurité des Identités IAM, Comptes de Service & Stratégies d'Accès | `chapitres/chapitre2.html` | `b3-google-cloud/chapitres/chapitre2.html` | interne |
| Calcul & Virtualisation (Compute Engine, GKE, Cloud Run & App Engine) | `chapitres/chapitre3.html` | `b3-google-cloud/chapitres/chapitre3.html` | interne |
| Réseau Virtuel VPC, Routage, Sécurité & Répartiteurs de Charge | `chapitres/chapitre4.html` | `b3-google-cloud/chapitres/chapitre4.html` | interne |
| Stockage Distribué, Bases de Données & Pipeline Big Data | `chapitres/chapitre5.html` | `b3-google-cloud/chapitres/chapitre5.html` | interne |
| Observabilité (Operations Suite), FinOps & Infrastructure as Code (Terraform) | `chapitres/chapitre6.html` | `b3-google-cloud/chapitres/chapitre6.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |

## 7. Composants pedagogiques et etats observes

- Encadres pedagogiques : 1 (`.box`, variantes `box--*`).

Etats et interactions a reconstruire :

- En-tête : marque + 3 liens (Epreuves, Atelier, Mon compte) + bouton profil + bascule de thème.
- Etat `prepLockedMsg` : bandeau « L'atelier est protege » si `?preparation=locked`, refermable.
- Filtre de niveau : 4 onglets (B1/B2/B3/Tous), onglet actif noir, persistance `portal_selected_level`.
- Recherche : champ `#courseSearch`, filtrage en direct sur `data-title` ; compteur `#activeFilterCount`.
- Etat vide : `#portalEmptyState` (bloc pointille) avec bouton de reinitialisation des filtres.
- Carte « Reprendre » : masquee par defaut (`hidden`), visible si progression locale > 0.
- Utilisateur connecte : bouton profil marque `is-authenticated`, nom en title/aria-label.

## 8. Tableaux, code et medias

- Tableaux : 0
- Blocs `pre` : 0 · elements `code` : 0
- SVG inline : 21 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-cloud`, `#i-play`, `#i-layers`, `#i-terminal`, `#i-clock`, `#i-arrow-right`, `#i-info`
- Volume de texte : ~951 mots · 183 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 1

## 10. Classes et attributs data observes

Classes distinctes : 41. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `ic` | 19 |
| `badge` | 7 |
| `card` | 6 |
| `card__head` | 6 |
| `card__num` | 6 |
| `card__title` | 6 |
| `card__desc` | 6 |
| `card__foot` | 6 |
| `card__time` | 6 |
| `card__link` | 6 |
| `stat` | 4 |
| `stat__val` | 4 |
| `stat__lbl` | 4 |
| `btn` | 3 |
| `btn--lg` | 3 |
| `skip-nav` | 1 |
| `skip-link` | 1 |
| `b3-google-cloudnav` | 1 |
| `b3-google-cloudnav__in` | 1 |
| `b3-google-cloudnav__home` | 1 |

Aucun attribut `data-*`.

## 11. Controle qualite automatique

- Titres `h1` : 1
- Boutons sans texte ni aria-label : 0
- Champs identifies sans label associe : 0
- Images sans attribut alt : 0
- Liens sans texte ni aria-label : 0
- Emoji detectes : 0 (la charte du produit les proscrit)

## 12. Renvois

- Layouts et gabarits : [04_LAYOUTS_ET_STRUCTURES.md](../../../04_LAYOUTS_ET_STRUCTURES.md)
- Composants et etats : [05_COMPOSANTS_REUTILISABLES.md](../../../05_COMPOSANTS_REUTILISABLES.md) · [10_ETATS_INTERFACE.md](../../../10_ETATS_INTERFACE.md)
- Regles d'acces : [11_ETATS_CONDITIONNELS.md](../../../11_ETATS_CONDITIONNELS.md) · [17_REGLES_METIER.md](../../../17_REGLES_METIER.md)
- Captures a produire : [22_REGISTRE_CAPTURES.md](../../../22_REGISTRE_CAPTURES.md)

*Fiche generee le 2026-11-05 par `tools/extract.mjs` ; donnees brutes dans `evidence/pages.json`.
