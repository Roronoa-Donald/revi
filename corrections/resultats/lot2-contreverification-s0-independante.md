# Relecture indépendante — lot 2, S0 B

**Relevé du 30 octobre 2026.** Périmètre : F172, F173, F175, F176, F177, F180, F181, F184, F185, F186, F187, F188, F190, F192, F193, F194, F196, F198, F199, F201, F205, F206, F207, F217, F220 et F221. La ligne F175 est S2 dans le CSV d'origine, mais S0 dans le suivi ; elle est incluse parce qu'elle figure explicitement dans la demande.

## Synthèse

| Résultat | Nombre | Signification |
|---|---:|---|
| Rejoué | 22 | La correction ciblée résiste aux jeux et contre-exemples effectivement exécutés, dans les limites indiquées. Ce n'est pas une preuve universelle. |
| Partiel | 2 | F172 et F173 : les phénomènes PostgreSQL et les modèles sont rejoués, mais la soumission réelle des deux labs est suspendue par l'API. |
| Défaut constaté | 2 | F220 : une affirmation subsiste dans un autre cours actif ; F221 : deux anciens QCM restent directement servis et évaluables. Les pages initialement corrigées sont nuancées. |

Une **alerte connexe** est également reproduite dans le QCM TLS du chapitre de F188 : elle concerne les RTT, non le défaut initial sur la confidentialité persistante. Elle ne contredit donc pas le statut « rejoué » de F188 lui-même.

## Méthode et limites communes

- Lecture préalable des lignes demandées dans `verification/04-erreurs-a-corriger.csv` et `corrections/suivi.csv`. Les identifiants d'exercices sont résolus par `server/exercises/index.js` : par exemple, le catalogue actif SQL est `server/exercises/b3-sql.js`, et non un fichier de chapitre simplement homonyme.
- Pour 19 grilles d'analyse, les réponses des cas et de l'exemple ont été recalculées par des oracles indépendants ; les réponses reconstruites sont soumises au véritable `runTests`/`runAnalyse`, puis une réponse erronée ciblée est refusée. Le DOM de la page, l'énoncé et le starter ont été comparés au catalogue actif avec `parse5`. Ce contrôle porte sur les cas déclarés et les mutations indiquées, pas sur toutes les entrées possibles.
- Pour F205–F207, les corrigés de référence et les variantes construites pour le rejeu sont exécutés par Python ou Node dans des processus séparés Bubblewrap, sans réseau ni montage du dépôt, avec limites CPU, taille et délai. Aucun code soumis par un apprenant n'a été exécuté. Le moteur `runTests` réel est utilisé, avec un adaptateur local isolé à la place du fournisseur externe.
- Les pages générées des 15 cours contrôlés ont été comparées à leur rendu par `scripts/generate-courses.js --check` dans un montage en lecture seule : 195 pages synchronisées. Les ateliers ciblés des trois exercices de code ont également été comparés en DOM à leur rendu. Ceci n'est pas une vérification globale du site.
- Chromium a exécuté les QCM en `file://` dans un espace réseau isolé. Séparément, des requêtes `Fastify.inject` ont traversé le véritable gestionnaire statique, avec authentification et abonnement **simulés** ; le statut HTTP n'est pas une observation d'un déploiement public. L'API SQL a aussi été interrogée par injection, sans écoute réseau.
- PostgreSQL 18.6 a été lancé sur une socket Unix dans un cluster jetable en mémoire ; le crash immédiat et la reprise ne concernent pas une base existante. OpenSSL, `iptables-translate`, un filtre UDP local et une image ext4 creuse ont été utilisés dans des espaces isolés. Aucune règle de pare-feu n'a été appliquée.
- Pas de validation sur une instance Azure, un hyperviseur VMware, un vrai réseau NAT/TURN, un serveur OpenVPN, un prestataire de paiement ou le fournisseur d'exécution. Les sources officielles ont été consultées le 30 octobre 2026 et figurent plus bas. Aucun contenu de cours, aucun test existant, `dist/` ou Git n'a été modifié.

## Verdict par fiche

Les chemins ci-dessous sont relatifs à `/home/rd/Téléchargements/revi-cours-html /revi-cours-html`. Le détail des sorties et les scripts sont conservés dans `corrections/resultats/relecture-independante-s0-b-journal.txt`.

| Fiche | Statut | Rejeu indépendant et emplacement actif |
|---|---|---|
| F172 | Partiel | `b3-sql/chapitres/chapitre1.html`, `sql3-c1-e2` : SQLite/WASM 5/5 + exemple. Dans PostgreSQL, un XID 753 inférieur au `snapshot_xmax` 755 reste invisible car encore en cours ; même après son commit, l'ancien snapshot ne le voit pas, un nouveau oui. Soumission API : 503 `grading_suspended`. |
| F173 | Partiel | `b3-sql/chapitres/chapitre1.html`, `sql3-c1-e1` : SQLite/WASM 5/5 + exemple. Un enregistrement WAL d'INSERT non commis se trouve dans l'intervalle de redo après arrêt immédiat ; après reprise, seule la ligne commise est visible. Soumission API : 503 `grading_suspended`. |
| F175 | Rejoué | `b1-stats/chapitres/chapitre2.html`, `st-c2-e2` : 1, 2, 2, 3, 3 donnent trois modalités et 20 %, 40 %, 40 %. Trois cas + exemple recalculés ; fréquence erronée refusée. |
| F176 | Rejoué | `b3-etude-quantitative/chapitres/chapitre4.html`, `eq3-c4-e3` : accord brut 90 %, accord attendu 90,5 %, kappa −0,05263 ; cas à dénominateur nul indéfini. Trois cas + exemple ; inversion du signe refusée. |
| F177 | Rejoué | `b3-etude-quantitative/chapitres/chapitre2.html`, `eq3-c2-e3` : quotas A/B 5/5 malgré 10/10 revenus élevés dans l'échantillon contre 20/100 dans la population. Trois cas + exemple ; verdict de représentativité globale refusé. |
| F180 | Rejoué | `b3-voip/chapitres/chapitre5.html`, `vo3-c5-e3` : deux cas + exemple ; mappages identiques ne sont pas un flux direct garanti. Deux réponses STUN locales donnent le même mappage alors qu'un paquet pair est filtré par le noyau ; aucun NAT réel n'est simulé. |
| F181 | Rejoué | `b3-pfsense/chapitres/chapitre5.html`, `pf3-c5-e2` : quatre cas + exemple ; groupe 22 rejeté, 14/19/20 traités selon la politique du lab et les autres non déduits du numéro. Le registre IANA classe 22 parmi les groupes MODP 1024 dépréciés. |
| F184 | Rejoué | `b3-cryptographie/chapitres/chapitre5.html`, `cr3-c5-e2` : sept cas + exemple ; SAN correspondant et wildcard à un label, SAN divergent malgré CN correspondant, chaîne explicitement non vérifiée par le modèle. OpenSSL accepte encore par défaut un certificat CN seul : la règle « SAN seulement » est confrontée à la RFC 9525, pas attribuée à ce comportement d'OpenSSL. |
| F185 | Rejoué | `Cyber securite B2/chapitres/chapitre1.html`, `cs2-c1-e3` : sept cas + exemple, comptage en points de code, seuils du modèle 15 en facteur unique et 8 en MFA, liste de refus synthétique ; rejet pour composition imposée refusé. La conformité au seul modèle n'établit pas la robustesse générale. |
| F186 | Rejoué | `b3-cryptographie/chapitres/chapitre1.html`, `cr3-c1-e2` : quatre cas + exemple. `0x42 XOR 0x00 = 0x42` montre que longueur et non-réemploi seuls ne démontrent pas le secret parfait ; une réponse affirmant cette garantie est refusée. |
| F187 | Rejoué | `b3-cryptographie/chapitres/chapitre6.html`, `cr3-c6-e2` : sept cas + exemple, phases 0-RTT/1-RTT et modes distincts ; le hachage d'identifiant de démonstration n'est pas présenté comme un secret TLS. La PFS garantie en 0-RTT est refusée. |
| F188 | Rejoué | `b3-cryptographie/chapitres/chapitre6.html`, `cr3-c6-e1` : sept cas + exemple. Deux handshakes OpenSSL utilisent `TLS_AES_128_GCM_SHA256` : l'un a `key_share`, l'autre `pre_shared_key` sans `key_share` (`psk_ke`). La suite seule ne fixe donc pas le mode ; voir aussi l'alerte RTT distincte ci-dessous. |
| F190 | Rejoué | `Cyber securite B2/chapitres/chapitre4.html`, `cs2-c4-e2` : quatre cas + exemple. Un parseur HTML confirme que l'encodage de texte ne rend pas sûre une URL `javascript:alert(1)` placée dans `href` ; le lab limite son traitement au texte HTML. |
| F192 | Rejoué | `b3-firewall/chapitres/chapitre6.html`, `fw3-c6-e1` : quatre cas + exemple ; la combinaison `proto=ANY` et port est refusée dans le mini-format. `iptables-translate -A INPUT --dport 80 -j ACCEPT` échoue avec code 2 ; quatre commandes valides sont traduites sans application de règles. Ce n'est pas une interdiction générale de nftables. |
| F193 | Rejoué | `b3-cryptographie/chapitres/chapitre5.html`, `cr3-c5-e1` : quatre cas + exemple. Deux messages distincts produisent chacun un SHA-256 réduit à 566 modulo 3233, égal à `1706^17 mod 3233` ; le verdict d'authenticité garantie est refusé. |
| F194 | Rejoué | `Cyber securite B2/chapitres/chapitre2.html`, `cs2-c2-e2` : six cas + exemple. Un message et son SHA-256 concordent, mais une référence déclarée non fiable conduit à `INTEGRITE_NON_ETABLIE`. |
| F196 | Rejoué | `b3-anglais/chapitres/chapitre5.html`, `an3-c5-e1` : quatre cas + exemple ; le choix de support pour une 502 garde le paiement incertain et demande une vérification avant nouvelle tentative. Aucun paiement réel. |
| F198 | Rejoué | `b3-cloud-azure/chapitres/chapitre4.html`, `az3-c4-e1` : quatre cas + exemple, calcul IPv4 indépendant incluant les cinq adresses réservées ; +2/+3 sont des correspondances DNS, pas deux résolveurs. Le DNS fourni par Azure utilise `168.63.129.16` selon la configuration. |
| F199 | Rejoué | `b3-cloud-azure/chapitres/chapitre3.html`, `az3-c3-e3` : trois scénarios + exemple ; la règle du rollback est un scénario fictif. La documentation indique que, par défaut, tous les codes HTTP, y compris 500, sont acceptés pour le warm-up du swap. Aucun swap Azure réel. |
| F201 | Rejoué | `b3-cloud-computing/chapitres/chapitre3.html`, `cc3-c3-e3` : quatre cas + exemple ; concurrence moyenne recalculée par débit × durée, pointe fournie séparément, base mémoire prise en compte ; donnée manquante et base inadmissible restent indéterminées. |
| F205 | Rejoué | `b1-algo/chapitres/chapitre6.html`, `algo-c6-e3` : corrigé 4/4. Entrée `2\n5\n1\n` : la variante arrêtée trop tôt produit `5 1` au lieu de `1 5` et est refusée au test 1/4. |
| F206 | Rejoué | `b1-algo/chapitres/chapitre10.html`, `algo-c10-e1` : corrigé 7/7. Prix 100 et quantités 10 et 50 : les remises aux bornes produisent 950 et 4500 au lieu de 1000 et 4750 et sont refusées ; les voisins 11 et 51 sont aussi testés. |
| F207 | Rejoué | `b1-prog-web/chapitres/chapitre1.html`, `web-c1-e2` : corrigé 4/4. Avec `1\n451\n`, l'arrondi produit `451 erreur serveur` au lieu de `451 erreur client` ; la variante est refusée par le premier jeu, qui comprend 199. |
| F217 | Rejoué | `b3-pfsense/chapitres/chapitre5.html`, `pf3-c5-e1` : six cas + exemple. Certificat révoqué accepté sans CRL ou avec ancienne CRL vide, puis refusé avec CRL actualisée par OpenSSL. Aucun serveur OpenVPN ni session déjà établie n'a été testé. |
| F220 | Défaut constaté | Le passage ciblé `admin-vm/chapitres/chapitre4.html:82` est nuancé, mais `rd_winserver/chapitres/chapitre5.html:117` et sa source affirment encore que le thin n'alloue que l'espace réellement utilisé et que le thick garantit l'espace. Reproduction et portée ci-dessous. |
| F221 | Défaut constaté | Les chapitres courants sont nuancés, mais deux QCM historiques directement servis après authentification continuent à noter correcte une migration « sans interruption ». Reproduction et portée ci-dessous. |

## Constats non rejoués en conditions réelles

Aucune des 26 fiches n'est entièrement sans rejeu ; les contrôles manquants ci-dessous ne doivent cependant pas être confondus avec les démonstrations locales réalisées. L'accès et le comportement d'un déploiement public n'ont été vérifiés pour aucune fiche.

- **F172 et F173** : la correction de `sql3-c1-e2` et `sql3-c1-e1` par l'API de soumission n'a pas pu être rejouée de bout en bout : elle répond 503 `grading_suspended`. Les requêtes modèles et les phénomènes PostgreSQL ont été exécutés séparément, sans base de production.
- **F180, F181 et F217** : pas de vraie traversée NAT/ICE/TURN, de négociation IKEv2 sur pfSense ou de connexion OpenVPN ; la propagation d'une CRL et l'effet sur une session déjà établie n'ont pas été mesurés sur un serveur réel. Le filtrage UDP et les contrôles de certificat/CRL locaux ne les remplacent pas.
- **F184 et F187** : aucune validation d'une chaîne de certification de production ni échange réel de données anticipées TLS 0-RTT. Les certificats sont synthétiques et le scénario 0-RTT reste un modèle ; le rejeu TLS réel de F188 porte sur le handshake et les modes indiqués.
- **F190 et F192** : aucun code XSS n'a été exécuté dans une application réelle et aucune règle iptables/nftables n'a été installée. Le parseur HTML et `iptables-translate` sont les seules exécutions correspondantes.
- **F193 et F194** : aucune signature ou authentification d'intégrité avec des clés de production ; seules l'arithmétique du jouet RSA et les comparaisons de SHA-256 prévues par les cas synthétiques ont été rejouées.
- **F196, F198, F199 et F201** : aucun paiement réel, VNet Azure, swap App Service ou dimensionnement d'infrastructure réelle ; les réponses de l'atelier ont été calculées localement et confrontées aux documentations officielles.
- **F205, F206 et F207** : pas d'appel au fournisseur d'exécution, ni de soumission utilisateur de bout en bout ; le véritable évaluateur a utilisé un adaptateur local dans un bac à sable.
- **F220 et F221** : aucun disque VMware, banc de performances thick, migration vMotion ou accès au déploiement externe n'a été exercé. L'image ext4, les QCM Chromium et le gestionnaire statique avec session simulée établissent seulement les constats locaux précisés ci-dessous.

## Défauts et alerte reproduits

### F220 — autre cours actif : allocation thin/thick trop catégorique

- Source active : `server/content/rd_winserver/chapitre5.js:80` ; rendu : `rd_winserver/chapitres/chapitre5.html:117`. Le gestionnaire statique réel renvoie 200 pour ce chapitre avec une session et un abonnement simulés. Le rendu est synchronisé avec sa source.
- Le paragraphe dit que le thin « n’alloue que l’espace réellement utilisé » et que le thick « garantit l’espace », sans préciser les blocs conservés ou la couche de réservation. Le chapitre ciblé d'`admin-vm` fait, lui, la distinction.
- Rejeu sur une image ext4 creuse de 64 Mio : allocation de l'image 356 352 octets avant, 8 744 960 après écriture de 8 Mio, encore 8 744 960 après suppression du fichier dans l'image ; `debugfs` ne retrouve plus le fichier. Les chiffres dépendent du système de fichiers. Ce n'est **pas** un test VMware : l'article Broadcom sur la suppression dans un disque thin corrobore séparément l'absence de réduction automatique et décrit des mécanismes de récupération selon la configuration.
- Correction à envisager dans la source génératrice : parler de blocs alloués et de récupération éventuelle, et limiter la réservation thick à la couche concernée ; ne pas promettre l'absence générale de saturation.

### F221 — anciens QCM directement accessibles

- `rd_winserver/chapitres/qcm-100.html:223`, question 95 : choisir `vMotion` est marqué correct, score 1/1, avec explication « sans interruption de service ».
- `admin-vm/qcm-100.html:226`, question 89 : choisir `De deplacer une VM en fonctionnement sans interruption` est marqué correct, score 1/1. L'ordre des réponses change ; sélectionner le texte, pas sa lettre.
- Les deux interactions sont rejouées avec Chromium. `Fastify.inject`, sur le gestionnaire statique réel, renvoie 302 sans session puis 200 avec session B3 et abonnement **simulés**. Une recherche dans les HTML et JS des deux cours n'a trouvé de référence à ces fichiers que dans les fichiers eux-mêmes : il s'agit de pages historiques directement servables, sans lien trouvé dans la navigation actuelle ; leur présence dans un déploiement externe n'a pas été vérifiée.
- Les passages corrigés `admin-vm/chapitres/chapitre6.html:125` et `rd_winserver/chapitres/chapitre6.html:111` mentionnent bien la pause de bascule. Envisager d'actualiser ou de retirer les deux anciens QCM de l'accès servi, sans réintroduire une garantie absolue.

### Alerte connexe F188 — QCM RTT trop absolu

- Source génératrice : `server/content/b3-cryptographie/chapitre6.js:180` ; page : `b3-cryptographie/chapitres/chapitre6.html:399`. Le cours principal indique déjà qu'un échange supplémentaire peut être nécessaire.
- Dans Chromium, à la question sur le nombre de RTT d'une première connexion TLS 1.3, choisir `2-RTT` est marqué faux et `1-RTT` est marqué seul correct. L'explication affirme sans condition la finalisation en 1-RTT. La page est également servie par le gestionnaire réel avec une session simulée.
- Avec OpenSSL isolé, serveur limité à P-256 et client proposant `X25519:P-256`, la connexion initiale vérifiée réussit après deux `ClientHello` : le premier `ServerHello` est un `HelloRetryRequest`, puis vient le second `ServerHello`. Ce cas réel nécessite un aller-retour supplémentaire. La RFC 9846 décrit ce mécanisme. Il s'agit d'une anomalie voisine sur les RTT, **pas** d'un échec du modèle F188 sur les suites et la PFS.

## Reproduction exacte des constats

Depuis la racine du dépôt, ces commandes extraient uniquement les scripts de rejeu enregistrés dans le journal, puis les exécutent avec réseau et écritures sur le dépôt isolés. Prérequis : Linux avec `bwrap`, Node, Chromium, OpenSSL, `mkfs.ext4`, `debugfs`, `parse5` et `playwright-core` tels que présents dans l'environnement examiné. Les clés et certificats éventuellement générés sont synthétiques et restent dans le `/tmp` éphémère du conteneur.

```sh
cd '/home/rd/Téléchargements/revi-cours-html /revi-cours-html'
D="$(mktemp -d)"
J="$PWD/corrections/resultats/relecture-independante-s0-b-journal.txt"
for nom in pages-server.js browser-pages.js stockage.sh tls-handshakes.sh tls-wire.py; do
  awk -v nom="$nom" '
    $0 == "=== DEBUT SCRIPT " nom " ===" { copie = 1; next }
    $0 == "=== FIN SCRIPT " nom " ===" { exit }
    copie { print }
  ' "$J" > "$D/$nom"
  test -s "$D/$nom" || exit 1
done

sandbox_node() {
  bwrap --unshare-all --die-with-parent --new-session \
    --ro-bind /usr /usr --ro-bind "$PWD" /repo \
    --ro-bind "$(command -v node)" /node --ro-bind "$D/$1" /controle.js \
    --symlink usr/bin /bin --symlink usr/lib /lib --symlink usr/lib /lib64 \
    --tmpfs /tmp --proc /proc --dev /dev --clearenv \
    --setenv HOME /tmp --setenv PATH /usr/bin:/bin --chdir /repo \
    /node /controle.js
}
sandbox_node pages-server.js
sandbox_node browser-pages.js
```

La première commande affiche les 302/200 simulés et le paragraphe F220 ; la seconde affiche les deux QCM F221 marqués corrects et le `2-RTT` marqué faux. Les tests HTTP et navigateur sont distincts ; aucun service de production n'est contacté.

```sh
bwrap --unshare-all --die-with-parent --new-session \
  --ro-bind /usr /usr --ro-bind "$D/tls-handshakes.sh" /rejouer.sh \
  --ro-bind "$D/tls-wire.py" /tls-wire.py \
  --symlink usr/bin /bin --symlink usr/lib /lib --symlink usr/lib /lib64 \
  --tmpfs /tmp --proc /proc --dev /dev --clearenv \
  --setenv HOME /tmp --setenv PATH /usr/bin:/bin --chdir /tmp \
  /bin/sh /rejouer.sh

bwrap --unshare-all --die-with-parent --new-session \
  --ro-bind /usr /usr --ro-bind "$D/stockage.sh" /rejouer.sh \
  --symlink usr/bin /bin --symlink usr/lib /lib --symlink usr/lib /lib64 \
  --tmpfs /tmp --proc /proc --dev /dev --clearenv \
  --setenv HOME /tmp --setenv PATH /usr/bin:/bin --chdir /tmp \
  /bin/sh /rejouer.sh
```

La première affiche deux `ClientHello`, un `HelloRetryRequest` et les extensions réellement négociées ; la seconde affiche l'allocation de l'image avant écriture, après écriture et après suppression. Le journal contient aussi les sources des oracles et des autres rejeux, leurs sorties et les versions des outils.

## Sources officielles consultées

- F172–F173 : [PostgreSQL, fonctions d'instantané](https://www.postgresql.org/docs/18/functions-info.html), [colonnes système](https://www.postgresql.org/docs/18/ddl-system-columns.html) et [reprise après crash](https://wiki.postgresql.org/wiki/Operations_cheat_sheet).
- F176–F177 : [scikit-learn, kappa de Cohen](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.cohen_kappa_score.html) et [Statistique Canada, échantillonnage par quotas](https://www150.statcan.gc.ca/n1/edu/power-pouvoir/ch13/nonprob/5214898-fra.htm).
- F180–F181 : [RFC 8489, STUN](https://www.rfc-editor.org/rfc/rfc8489.html), [RFC 8445, ICE](https://www.rfc-editor.org/rfc/rfc8445.html) et [registre IANA IKEv2](https://www.iana.org/assignments/ikev2-parameters/ikev2-parameters.xhtml).
- F184–F188 : [RFC 9525, identité des services](https://www.rfc-editor.org/rfc/rfc9525.html), [NIST SP 800-63B-4](https://pages.nist.gov/800-63-4/sp800-63b.html), [Shannon, secret parfait](https://www.cs.virginia.edu/~evans/greatworks/shannon1949.pdf) et [RFC 9846, TLS 1.3](https://www.rfc-editor.org/rfc/rfc9846.html).
- F190–F194 : [OWASP, prévention XSS contextuelle](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html), [Netfilter, options de filtrage](https://netfilter.org/documentation/HOWTO/packet-filtering-HOWTO-7.html), [RFC 8017, RSA-PSS](https://www.rfc-editor.org/rfc/rfc8017.html) et [NIST, HMAC](https://csrc.nist.gov/pubs/fips/198-1/final).
- F196 et F207 : [RFC 9110, HTTP](https://www.rfc-editor.org/rfc/rfc9110.html), [Stripe, erreurs et état des opérations](https://docs.stripe.com/error-low-level) et [Stripe, requêtes idempotentes](https://docs.stripe.com/api/idempotent_requests).
- F198–F201 : [Microsoft, adresses réservées dans un VNet](https://learn.microsoft.com/en-us/azure/virtual-network/virtual-networks-faq), [DNS Azure](https://learn.microsoft.com/en-us/troubleshoot/azure/dns/troubleshoot-dns), [paramètres de warm-up App Service](https://learn.microsoft.com/en-us/azure/app-service/reference-app-settings) et [AWS, calcul de concurrence](https://docs.aws.amazon.com/lambda/latest/dg/lambda-concurrency.html).
- F205–F206 : [NIST, tri par sélection](https://xlinux.nist.gov/dads/HTML/selectionSort.html) et [Python, comparaisons](https://docs.python.org/3/reference/expressions.html#comparisons).
- F217 : [Netgate, configuration cryptographique OpenVPN](https://docs.netgate.com/pfsense/en/latest/vpn/openvpn/configure-server-crypto.html), [gestion des CRL](https://docs.netgate.com/pfsense/en/latest/certificates/crl.html) et [RFC 5280](https://www.rfc-editor.org/rfc/rfc5280.html).
- F220–F221 : [Broadcom, disques thin](https://knowledge.broadcom.com/external/article/337348/using-thin-provisioned-disks-with-virtua.html), [suppression de données et récupération d'espace](https://knowledge.broadcom.com/external/article/450717/deleting-data-from-a-thin-provisioned-di.html) et [impact de vMotion sur les machines sensibles](https://knowledge.broadcom.com/external/article/407273/sensitive-virtual-machines-become-impact.html).

## Reprise indépendante après les corrections de l'utilisateur — 30 octobre 2026

Cette reprise remplace, pour les seuls éléments mentionnés ici, l'état constaté précédemment ; les observations initiales sont conservées comme historique. Le journal complet, avec scripts et sorties, est `corrections/resultats/lot2-contreverification-reprise-s0-b-journal.txt`.

### F220 : correction rejouée

Dans Chromium isolé, `rd_winserver/chapitres/chapitre5.html:117`, produit depuis `server/content/rd_winserver/chapitre5.js:80`, distingue maintenant les blocs thin alloués à la demande, la récupération non nécessairement immédiate après suppression, et la réservation thick limitée à une couche, sans garantie générale de capacité ou de performances. Le gestionnaire statique réel renvoie 302 sans session et 200 avec session B3 et abonnement **simulés**. Le rendu des 4 cours ciblés est synchronisé avec les sources : 52 pages contrôlées en lecture seule.

Rejeu indépendant du contre-exemple : sur une image ext4 creuse de 64 Mio, l'allocation passe de 356 352 à 8 744 960 octets après écriture, puis reste à 8 744 960 après suppression du fichier dans l'image. Ce n'est pas un disque VMware ni un essai de performances ; l'article Broadcom précité distingue suppression invitée et récupération physique.

### F221 : QCM et plusieurs doublons corrigés, mais défaut résiduel en B3

- `rd_winserver/chapitres/qcm-100.html:223` : dans Chromium, choisir `vMotion` à la question 95 donne 1/1 ; l'énoncé parle maintenant de limiter l'interruption et l'explication admet une pause possible.
- `admin-vm/qcm-100.html:226` : choisir à la question 89 le déplacement avec pause de bascule possible donne 1/1 et la même réserve. Les deux fichiers sont renvoyés 302 sans session et 200 avec session et abonnement simulés ; l'ordre des réponses est aléatoire.
- Les deux anciens `admin-vm/assets/js/exercises.js:204` et `rd_winserver/assets/js/exercises.js:204` ont été exécutés dans Chromium avec un **harnais HTML synthétique** : cliquer sur « Voir la correction » affiche une pause possible. Les fichiers JS sont servis en HTTP 200 par le gestionnaire local, mais aucun rattachement à la navigation actuelle n'a été établi ; il ne s'agit pas d'une page chapitre 8 réellement servie.
- `b3-virtualisation/index.html` et `b3-virtualisation/chapitres/chapitre4.html:112` mentionnent une pause possible ; le palier de maîtrise du chapitre 5 parle de limiter les interruptions. Dans `b3-pfsense/chapitres/chapitre6.html:393`, le QCM `pfsync` reconnaît qu'une session peut être interrompue ; la carte `b3-pfsense/chapitres/cartes.html:118` a été retournée et l'énoncé ainsi que le corrigé de `b3-pfsense/chapitres/examens.html` reprennent cette limite.
- **Défaut constaté, toujours actif :** `b3-virtualisation/chapitres/chapitre5.html:66` demande encore une maintenance « sans aucune seconde d'interruption », la ligne 139 affirme « sans coupure de service pour les utilisateurs », et la ligne 469 annonce une bascule imperceptible en moins d'une demi-seconde. Sources : `server/content/b3-virtualisation/chapitre5.js:20`, `:96` et `:131`. Le lab affiché à `b3-virtualisation/chapitres/chapitre5.html:193` affirme aussi « sans rupture de service » ; `getExercise('vrt3-c5-e1')` confirme que son énoncé actif provient de `server/exercises/b3-virtualisation/chapitre5.js:11`. La page B3 a été reçue HTTP 200 avec session simulée et lue dans Chromium ; ces affirmations restent trop absolues au regard de [l'impact possible documenté par Broadcom](https://knowledge.broadcom.com/external/article/407273/sensitive-virtual-machines-become-impact.html).

### QCM TLS connexe à F188 : correction rejouée

Le QCM de `b3-cryptographie/chapitres/chapitre6.html:399` précise désormais que les paramètres conviennent dès le départ **sans `HelloRetryRequest`**. Dans Chromium, `1-RTT` est marqué correct et, après rechargement, `2-RTT` est marqué faux pour cette condition ; l'explication ajoute qu'un `HelloRetryRequest` peut porter le total à 2-RTT. Source génératrice : `server/content/b3-cryptographie/chapitre6.js:180`.

Deux handshakes OpenSSL TLS 1.3 réels sur sockets Unix isolées, certificat synthétique vérifié : serveur P-256 et client P-256 donnent un `ClientHello`/`ServerHello` ; serveur P-256 et client X25519:P-256 donnent deux de chaque avec `HelloRetryRequest`. Ils confirment les deux cas du QCM, pas une mesure de latence d'un réseau réel. Voir la [RFC 9846](https://www.rfc-editor.org/rfc/rfc9846.html).

### Périmètre et limites de la reprise

Les QCM ont tourné en Chromium avec ressources externes bloquées ; les requêtes HTTP ont été testées séparément par `Fastify.inject` avec session et abonnement fictifs. Les fiches historiques utilisent un harnais synthétique. Aucune migration VMware, mesure de pause effective, instance pfSense, réseau de production ou déploiement public n'a été exercé. Aucun cours, test existant, `dist/` ou Git n'a été modifié ; 20 sources et pages sont restées inchangées pendant le rejeu.

## Nouvelle reprise F221 — 30 octobre 2026, après S0 C

**Rejoué sur les corrections ciblées ; aucun des quatre défauts B3 antérieurement signalés n'a été retrouvé aux emplacements vérifiés.** Les observations précédentes, dont la mention « toujours actif », sont conservées comme historique de l'état antérieur, non comme état actuel. Le journal `corrections/resultats/lot2-contreverification-reprise-s0-b-journal.txt` contient les nouveaux programmes et sorties brutes.

- `server/content/b3-virtualisation/chapitre5.js:20` et `b3-virtualisation/chapitres/chapitre5.html:66` visent désormais à limiter les interruptions. La page à la ligne 139 admet une pause possible ; à la ligne 147, les 500 ms sont un objectif non garanti ; à la ligne 461, la durée est variable. Le texte et le QCM sont rendus et manipulés dans Chromium. Les articles Broadcom 436882 et 407273 consultés le 30 octobre 2026 confirment respectivement l'objectif susceptible d'être dépassé et un impact possible sur les applications sensibles.
- `vrt3-c5-e1`, issu de `server/exercises/b3-virtualisation/chapitre5.js:5` et affiché à `b3-virtualisation/chapitres/chapitre5.html:166`, annonce bien un modèle fictif à deux passes, des unités décimales et une pause possible. Un oracle `Decimal` calcule séparément les durées de chaque passe : exemple `vm-web01` = 16 320,0 Mo / 16,3 s ; `vm-db01` = 96 000,0 Mo / 960,0 s ; `vm-cache` = non-convergence selon la convention. Les trois lignes d'exemple et les trois lignes des deux cas concordent avec les attendus **et** le corrigé actif.
- Les deux cas soumis dans le vrai formulaire Chromium à la route réelle, avec authentification fictive, donnent 2/2 ; remplacer `33 280,0` par `33 281,0 Mo` est rejeté au cas 1. La source et la page sont synchronisées ; `--check b3-virtualisation` confirme 13 pages. Le balayage DOM de 13 pages a examiné 41 éléments mentionnant vMotion sans retrouver les formulations absolues recherchées.
- **Limite de couverture :** le correcteur actif contient seulement deux cas, sans égalité du débit ni seuils 30/90 s. Des données synthétiques calculées hors catalogue vérifient l'égalité de débit et les frontières 30 et 90 ; elles ne sont pas des tests existants du correcteur. Le classement utilise la durée avant arrondi : 30,03 s s'affiche 30,0 s mais reste `ACCEPTABLE` dans ce modèle.

Aucune migration VMware réelle, mesure de pause, validation sur environnement de production ni test des affirmations distinctes sur les snapshots et les commutateurs VDS. Les identités, la base et `/api/verify` sont simulés ; les ressources externes du navigateur sont bloquées. Aucun cours ni test existant n'a été modifié.
