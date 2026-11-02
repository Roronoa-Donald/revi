# Sécurité et cryptographie

**Appréciation : à corriger avant publication.** Chapitres sélectionnés : hacking B3 1 et 6. Population : 5 cours avec chapitre 1, 90 exercices, 211 QCM, 196 cartes ; 20 exercices, 10 QCM et 10 cartes sont tirés à l'échelle de la famille. La sélection est dans `../echantillons-identifiants.json`.

## Exactitude et constats

- **F216/F217 — D12/D15, S0, observé** — `b3-cryptographie/chapitres/chapitre4.html:84` contient une définition de l'indicatrice d'Euler corrompue par un fragment technique. `b3-pfsense/chapitres/chapitre5.html:84` promet une révocation immédiate et `:104` généralise la consultation d'une CRL, alors que sa sélection OpenVPN est facultative et que sa diffusion peut introduire un délai. Sources consultées le 29 octobre 2026 : https://www.rfc-editor.org/rfc/rfc5280.html ; https://docs.netgate.com/pfsense/en/latest/vpn/openvpn/configure-server-crypto.html.

Les textes principaux des chapitres Hacking B3 1 et 6 sélectionnés ont été lus ; aucune opération sur une cible réelle n'a été entreprise.

- **F184–F188 et F193–F195 — cryptographie et authentification.** Le contrôle de nom TLS accepte le CN (`b3-cryptographie/chapitres/chapitre5.html:282`), l'exercice de mot de passe attribue des règles de composition au NIST (`Cyber securite B2/chapitres/chapitre1.html:309`), et plusieurs simulations déduisent à tort des garanties de l'OTP, des signatures, du hachage ou de TLS. La RFC 9846 a remplacé la RFC 8446 en juillet 2026 ; cette actualisation n'invalide pas automatiquement toutes les explications existantes. Détails et limites précis dans le registre.
- **F189–F192 — diagnostics et pare-feu.** L'absence de correspondance dans une liste SNMP ou quatre signatures est présentée comme une preuve de sécurité ; une conversion de règle accepte protocole `ANY` avec port mais perd la contrainte du port. L'affirmation du lab XSS répète celle de la carte F59. Les contre-exemples sont des modèles synthétiques, pas des vulnérabilités constatées sur la plateforme.
- **F153 — D8/D12, S1, observé** — `b3-hacking/chapitres/chapitre1.html:195`, « inférieur à 4.0 » : le texte classe aussi 0,0 en LOW, alors que CVSS v3.1 classe 0,0 en NONE. La grille du même chapitre distingue déjà cette valeur. Source : https://www.first.org/cvss/v3-1/specification-document, consultée le 29 octobre 2026.
- **F154 — D12, S0, observé** — `b3-hacking/chapitres/chapitre1.html:93`, « système de l'État » : le résumé de l'article 323-2 omet la condition portant sur des données à caractère personnel. Restituer la condition juridique exacte. Texte français consulté le 29 octobre 2026 : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000030939443 ; cela ne vaut pas validation des autres juridictions.
- **F53 — D12/D14, S0, observé** — `b3-cryptographie/chapitres/cartes.html:118`, « ESP assure ... intégrité ... authentification ET ... chiffrement » : ESP peut être configuré pour la confidentialité seule, l'intégrité seule ou les deux. Présenter les services effectivement choisis dans l'association de sécurité ; ne pas promettre les trois propriétés à partir du seul nom ESP.
- **F59 — D12, S0, observé** — `Cyber securite B2/chapitres/cartes.html:102`, « neutraliser une injection XSS dans du code HTML » : échapper cinq caractères ne suffit pas dans tous les contextes. Distinguer texte HTML, attributs, URL et JavaScript, et éviter l'insertion dans les contextes dangereux ; ce constat vise le cours, sans affirmer une vulnérabilité du site.
- **F73 — D12, S1, observé** — `b3-hacking/chapitres/chapitre2.html:420`, « le nom de domaine et tous ses sous-domaines » : les journaux CT portent sur les certificats soumis et les noms qu'ils contiennent ; un certificat générique `*.exemple.test` n'énumère pas tous les sous-domaines existants. Corriger aussi la réponse du QCM.
- **F77 — D12, S1, déduit** — `b3-hacking/chapitres/cartes.html:82`, « en ignorant tout résultat retournant cette même adresse IP wildcard » : un nom explicite légitime peut partager l'adresse du wildcard ; ce filtre produit alors un faux négatif. Prévoir un recoupement au lieu d'une exclusion automatique.
- **F56 — D12, S1, observé** — `Cyber securite B2/chapitres/cartes.html:126`, « les 6 phases de la réponse à incident » : la présentation ne précise pas la version. La révision 3 de NIST SP 800-61, publiée en avril 2025, articule la réponse autour de Detect, Respond et Recover, entourés de préparation et d'amélioration. Situer les anciennes décompositions et actualiser le référentiel.
- **F13 — D12, S0, observé** — `ccna/chapitres/cartes.html:97`, « hachage cryptographique fort ... MD5/SHA » : l'exemple range des mécanismes de sécurité différents dans une catégorie prétendument forte. Distinguer les types Cisco et actualiser les recommandations.
- **F47 — D12, S1, observé** — `Cyber securite B2/chapitres/chapitre5.html:363`, « paralysant les attaques par GPU et circuits ASIC » : Argon2id rend les attaques plus coûteuses selon le paramétrage ; il ne les rend pas universellement impossibles. Remplacer cette garantie par l'explication du coût temporel et mémoire.
- **F33 — D14, S1, observé** — `Cyber securite B2/chapitres/cartes.html:77`, « Diffie-Hellman » : la face réponse pose une nouvelle question au lieu d'expliquer la notion. Fournir une réponse sur le secret partagé et rappeler que l'échange seul n'authentifie pas les parties.
- **F28 — D15, S1, observé** — `Cyber securite B2/chapitres/exercices.html:68`, « `chapitre1.html#exo-1` » : la page s'ouvre mais cette ancre est absente ; l'exercice réel a un autre identifiant à `Cyber securite B2/chapitres/chapitre1.html:169`. Réparer le lien à la source.

## Grille C1–C14 — éléments examinés

| Critère | Constat ou limite |
|---|---|
| C1 Situation | `b3-hacking/chapitres/chapitre1.html:65` part d'un audit mandaté et introduit les limites d'autorisation. |
| C2 Objectifs | Le chapitre annonce rédaction de règles d'engagement, classification et analyse à `b3-hacking/chapitres/chapitre1.html:70` ; leur couverture reste à démontrer. |
| C3 Prérequis | Réseaux, systèmes, Web et droit applicables ne sont pas individuellement validés ; absence d'un graphe de dépendances contrôlé. |
| C4 Ordre | L'introduction parle d'autorisation avant les techniques ; l'absence de références en avant dans tout le cours n'est pas démontrée. |
| C5 Définitions | La carte ESP sur-promet et la carte Diffie-Hellman n'apporte pas de réponse ; F53/F33. |
| C6 Exemples et progression | Le chapitre 6 traite également du rapport et du nettoyage ; la présence d'exemples guidés avant chaque exercice reste à établir. |
| C7 Charge | Le premier chapitre rassemble droit, méthodologies et métriques ; leur appropriation dépend des prérequis, non mesurés. |
| C8 Cohérence | Le cadrage éthique est présent, mais le cas CVSS 0,0 diffère entre texte et exercice, F153 ; toutes les juridictions ne sont pas vérifiées. |
| C9 Exercices | Les corrigés échantillonnés passent, mais cela ne prouve pas les garanties des modèles ; F184–F194. Une ancre ne mène pas à la bonne section ; F28. |
| C10 QCM | La proposition Argon2id exagère sa protection, F47 ; les distracteurs invraisemblables ne sont pas toujours explicités individuellement. |
| C11 Auto-évaluation | Grilles recensées globalement ; pas de validation de l'alignement avec chaque objectif sécurité. |
| C12 Exactitude | Propriétés d'ESP, limites d'Argon2id et robustesse des mécanismes Cisco à corriger ; F53/F47/F13. |
| C13 Ressources | Une carte de cryptographie et une carte B2 sont à réviser ; toutes les ressources n'ont pas été relues. |
| C14 Rendu | Lien d'exercice réellement cassé, F28 ; aucun audit exhaustif des pages protégées. |

## Exercices, QCM et cartes

Les dix QCM et dix cartes de la famille ont été lus individuellement dans leur texte extrait ; appréciations et réserves figurent dans `../07-relecture-familles.csv`.

Les 20 exercices sélectionnés ont reçu deux variantes ciblées chacun ; les 40 variantes sont rejetées selon les règles de leurs modèles respectifs. Ce ne sont pas des réponses recueillies auprès d'étudiants, et ce résultat ne valide pas les garanties de sécurité que les énoncés attribuent parfois à ces modèles. Détails : `../sondes-reponses-plausibles.json`.

**20 corrigés sur 20** passent leurs tests et **40 variantes automatiques sur 40** sont rejetées. Les variantes ajoutent une affirmation erronée ou retirent une ligne ; leur rejet ne garantit pas la reconnaissance d'erreurs conceptuelles réalistes ni l'absence de solutions partielles acceptées. Les 10 QCM et 10 cartes sélectionnés incluent les problèmes documentés ; la vérification juridique et cryptographique exhaustive reste à faire.

**Niveau.** Les deux chapitres B3 visent des situations professionnelles avancées et rappellent la nécessité d'une autorisation ; cela ne prouve pas que tous les prérequis soient acquis. Aucun essai sur cible réelle ni sur la plateforme en ligne n'a été réalisé.

## Confrontation aux supports et références

`corpus-cours-revi.zip`, `textes/B3/Semestre II/hacking/Cours CEH.txt`, page 41, expose cinq étapes dont la reconnaissance ; `b3-hacking/chapitres/chapitre1.html:152` aborde également des phases. Cela ne valide ni l'ensemble de la méthodologie ni le cadre juridique. Le fichier B2 `sujet cybersecurite principale (2).pdf` est déclaré corrompu ; aucun PDF source n'est fourni pour `b1-cyber`.

Sources primaires consultées le 29 octobre 2026 :

- Let's Encrypt, journaux CT et certificats génériques : https://letsencrypt.org/docs/ct-logs/ ; https://letsencrypt.org/docs/glossary/
- IETF, sémantique des wildcards DNS : https://www.rfc-editor.org/rfc/rfc4592.html

- IETF, services ESP : https://www.rfc-editor.org/rfc/rfc4303.html
- OWASP, prévention XSS selon le contexte : https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html
- NIST, réponse à incident et révision 3 : https://csrc.nist.gov/projects/incident-response
- IETF, Argon2 : https://www.rfc-editor.org/rfc/rfc9106.html
- IETF, échange Diffie-Hellman : https://www.rfc-editor.org/rfc/rfc2631.html
- IETF, identité de service TLS, TLS 1.3 et RSA-PSS : https://www.rfc-editor.org/rfc/rfc9525.html ; https://www.rfc-editor.org/rfc/rfc9846.html ; https://www.rfc-editor.org/rfc/rfc8017.html
- NIST, politique de mots de passe dans son périmètre : https://pages.nist.gov/800-63-4/sp800-63b.html
- Cisco, stockage des secrets : https://www.cisco.com/c/en/us/about/trust-center/resilient-infrastructure/protecting-secrets.html
