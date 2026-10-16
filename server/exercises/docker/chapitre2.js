'use strict';

module.exports = [
  {
    "id": "dk2-c2-e1",
    "chapter": 2,
    "title": "Calculateur de taille d’image et déduplication des Layers (OverlayFS)",
    "level": "n1",
    "language": "analyse",
    "goal": "Calculer le stockage réel consommé sur le démon Docker grâce au partage de couches en lecture seule (UnionFS).",
    "brief": "<p>Analysez les paramètres du problème pour chaque cas...</code>.<br>\nDans le pilote de stockage Overlay2, chaque couche en lecture seule (identifiée par son ID unique) n'est stockée qu'une seule fois sur le disque hôte, quel que soit le nombre d'images qui s'appuient dessus.<br>\nCalculer :<br>\n1. La taille apparente de chaque image (somme de ses couches).<br>\n2. La taille brute totale cumulée (somme naïve sans partage).<br>\n3. La taille réelle stockée sur l'hôte (somme des couches uniques sans doublon).<br>\n4. L'économie d'espace réalisée (<code>TailleBrute - TailleReelle</code>).<br>\nAfficher :<br>\n<code>IMAGE: &lt;NomImage&gt; -&gt; TAILLE_APPARENTE: &lt;T&gt; Mo</code><br>\n... puis en fin d'exécution :<br>\n<code>TOTAL_BRUT: &lt;Tb&gt; Mo | TOTAL_REEL: &lt;Tr&gt; Mo | ECONOMIE_DEDUPLICATION: -&lt;Gain&gt; Mo</code></p>",
    "starter": "# Grille d'analyse (dk2-c2-e1) — Calculateur de taille d’image et déduplication des Layers (OverlayFS)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Trois microservices partageant la même base Alpine]\n# Données : SvcA : alpine:5 , curl:10 , appA:2\n# Données : SvcB : alpine:5 , curl:10 , appB:3\n# Données : SvcC : alpine:5 , git:15 , appC:4\nA_COMPLETER\n\n[Cas 2 — Image unique sans déduplication]\n# Données : Nginx : debian:120 , nginx_bin:30\nA_COMPLETER\n\n[Cas 3 — Empilement de couches lourdes]\n# Données : Img1 : os:200 , libs:150\n# Données : Img2 : os:200 , libs:150 , extra:50\n# Données : Img3 : os:200 , libs:150 , extra:50 , debug:25\nA_COMPLETER\n",
    "hints": [
      "Garder un dictionnaire des couches uniques (id_couche -> taille) pour la taille réelle.",
      "Faire attention aux espaces autour des deux-points et des virgules."
    ],
    "examples": [
      {
        "stdin": "NodeApp : base_os:100 , node_runtime:80 , app_code:20\nPythonApp : base_os:100 , python_runtime:70 , app_code_py:15",
        "expected": "IMAGE: NodeApp -> TAILLE_APPARENTE: 200 Mo\nIMAGE: PythonApp -> TAILLE_APPARENTE: 185 Mo\nTOTAL_BRUT: 385 Mo | TOTAL_REEL: 285 Mo | ECONOMIE_DEDUPLICATION: -100 Mo",
        "note": "La couche commune base_os (100 Mo) n’est stockée qu’une seule fois."
      }
    ],
    "tests": [
      {
        "label": "Trois microservices partageant la même base Alpine",
        "stdin": "cas:1",
        "expected": "IMAGE: SvcA -> TAILLE_APPARENTE: 17 Mo\nIMAGE: SvcB -> TAILLE_APPARENTE: 18 Mo\nIMAGE: SvcC -> TAILLE_APPARENTE: 24 Mo\nTOTAL_BRUT: 59 Mo | TOTAL_REEL: 39 Mo | ECONOMIE_DEDUPLICATION: -20 Mo"
      },
      {
        "label": "Image unique sans déduplication",
        "stdin": "cas:2",
        "expected": "IMAGE: Nginx -> TAILLE_APPARENTE: 150 Mo\nTOTAL_BRUT: 150 Mo | TOTAL_REEL: 150 Mo | ECONOMIE_DEDUPLICATION: -0 Mo"
      },
      {
        "label": "Empilement de couches lourdes",
        "stdin": "cas:3",
        "expected": "IMAGE: Img1 -> TAILLE_APPARENTE: 350 Mo\nIMAGE: Img2 -> TAILLE_APPARENTE: 400 Mo\nIMAGE: Img3 -> TAILLE_APPARENTE: 425 Mo\nTOTAL_BRUT: 1175 Mo | TOTAL_REEL: 425 Mo | ECONOMIE_DEDUPLICATION: -750 Mo"
      }
    ],
    "solution": "[Exemple]\nIMAGE: NodeApp -> TAILLE_APPARENTE: 200 Mo\nIMAGE: PythonApp -> TAILLE_APPARENTE: 185 Mo\nTOTAL_BRUT: 385 Mo | TOTAL_REEL: 285 Mo | ECONOMIE_DEDUPLICATION: -100 Mo\n\n[Cas 1 — Trois microservices partageant la même base Alpine]\nIMAGE: SvcA -> TAILLE_APPARENTE: 17 Mo\nIMAGE: SvcB -> TAILLE_APPARENTE: 18 Mo\nIMAGE: SvcC -> TAILLE_APPARENTE: 24 Mo\nTOTAL_BRUT: 59 Mo | TOTAL_REEL: 39 Mo | ECONOMIE_DEDUPLICATION: -20 Mo\n\n[Cas 2 — Image unique sans déduplication]\nIMAGE: Nginx -> TAILLE_APPARENTE: 150 Mo\nTOTAL_BRUT: 150 Mo | TOTAL_REEL: 150 Mo | ECONOMIE_DEDUPLICATION: -0 Mo\n\n[Cas 3 — Empilement de couches lourdes]\nIMAGE: Img1 -> TAILLE_APPARENTE: 350 Mo\nIMAGE: Img2 -> TAILLE_APPARENTE: 400 Mo\nIMAGE: Img3 -> TAILLE_APPARENTE: 425 Mo\nTOTAL_BRUT: 1175 Mo | TOTAL_REEL: 425 Mo | ECONOMIE_DEDUPLICATION: -750 Mo"
  },
  {
    "id": "dk2-c2-e2",
    "chapter": 2,
    "title": "Parseur canonique de références d’images et de tags",
    "level": "n2",
    "language": "analyse",
    "goal": "Décomposer une référence d’image Docker en ses composantes normalisées : registre, namespace/nom, tag et digest SHA256.",
    "brief": "<p>Analysez les paramètres du problème pour chaque cas.<br>\nRègles de normalisation canonique :<br>\n1. <strong>Digest</strong> : si la référence contient <code>@sha256:...</code>, l'extraire (sinon <code>NONE</code>).<br>\n2. <strong>Tag</strong> : si la référence contient <code>:&lt;tag&gt;</code> (hors du digest), l'extraire (sinon valeur par défaut <code>latest</code>).<br>\n3. <strong>Registre &amp; Nom</strong> :<br>\n   - Si l'image contient un nom de domaine avec point (ex: <code>ghcr.io/org/app</code> ou <code>docker.elastic.co/...</code>), le registre est le premier segment avant le slash.<br>\n   - Si l'image est officielle sans slash (ex: <code>nginx</code>, <code>ubuntu</code>), le registre est <code>docker.io/library</code> et le nom est l'image.<br>\n   - Si l'image a un namespace simple (ex: <code>monorg/monapp</code>), le registre est <code>docker.io</code> et le nom est <code>monorg/monapp</code>.<br>\nPour chaque référence, afficher :<br>\n<code>REF: &lt;entree&gt; -&gt; REGISTRE: &lt;reg&gt; | IMAGE: &lt;nom&gt; | TAG: &lt;tag&gt; | DIGEST: &lt;digest&gt;</code></p>",
    "starter": "# Grille d'analyse (dk2-c2-e2) — Parseur canonique de références d’images et de tags\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Images officielles simples]\n# Données : redis\n# Données : alpine:3.18\nA_COMPLETER\n\n[Cas 2 — Registres tiers avec sous-chemins]\n# Données : quay.io/coreos/etcd:v3.5\n# Données : registry.gitlab.com/equipe/projet/service:prod\nA_COMPLETER\n\n[Cas 3 — Image avec digest sans tag explicite]\n# Données : postgres@sha256:998877aabb\nA_COMPLETER\n",
    "hints": [
      "Traiter en premier l’éventuel digest après @.",
      "Extraire ensuite le tag après le dernier deux-points.",
      "Déterminer le registre selon la présence d’un point ou d’un slash."
    ],
    "examples": [
      {
        "stdin": "nginx\nubuntu:22.04\nmyorg/backend:v1.0\nghcr.io/dev/api:latest@sha256:abcd1234ef",
        "expected": "REF: nginx -> REGISTRE: docker.io/library | IMAGE: nginx | TAG: latest | DIGEST: NONE\nREF: ubuntu:22.04 -> REGISTRE: docker.io/library | IMAGE: ubuntu | TAG: 22.04 | DIGEST: NONE\nREF: myorg/backend:v1.0 -> REGISTRE: docker.io | IMAGE: myorg/backend | TAG: v1.0 | DIGEST: NONE\nREF: ghcr.io/dev/api:latest@sha256:abcd1234ef -> REGISTRE: ghcr.io | IMAGE: dev/api | TAG: latest | DIGEST: sha256:abcd1234ef",
        "note": "Normalisation canonique conforme à la spécification Docker distribution."
      }
    ],
    "tests": [
      {
        "label": "Images officielles simples",
        "stdin": "cas:1",
        "expected": "REF: redis -> REGISTRE: docker.io/library | IMAGE: redis | TAG: latest | DIGEST: NONE\nREF: alpine:3.18 -> REGISTRE: docker.io/library | IMAGE: alpine | TAG: 3.18 | DIGEST: NONE"
      },
      {
        "label": "Registres tiers avec sous-chemins",
        "stdin": "cas:2",
        "expected": "REF: quay.io/coreos/etcd:v3.5 -> REGISTRE: quay.io | IMAGE: coreos/etcd | TAG: v3.5 | DIGEST: NONE\nREF: registry.gitlab.com/equipe/projet/service:prod -> REGISTRE: registry.gitlab.com | IMAGE: equipe/projet/service | TAG: prod | DIGEST: NONE"
      },
      {
        "label": "Image avec digest sans tag explicite",
        "stdin": "cas:3",
        "expected": "REF: postgres@sha256:998877aabb -> REGISTRE: docker.io/library | IMAGE: postgres | TAG: latest | DIGEST: sha256:998877aabb"
      }
    ],
    "solution": "[Exemple]\nREF: nginx -> REGISTRE: docker.io/library | IMAGE: nginx | TAG: latest | DIGEST: NONE\nREF: ubuntu:22.04 -> REGISTRE: docker.io/library | IMAGE: ubuntu | TAG: 22.04 | DIGEST: NONE\nREF: myorg/backend:v1.0 -> REGISTRE: docker.io | IMAGE: myorg/backend | TAG: v1.0 | DIGEST: NONE\nREF: ghcr.io/dev/api:latest@sha256:abcd1234ef -> REGISTRE: ghcr.io | IMAGE: dev/api | TAG: latest | DIGEST: sha256:abcd1234ef\n\n[Cas 1 — Images officielles simples]\nREF: redis -> REGISTRE: docker.io/library | IMAGE: redis | TAG: latest | DIGEST: NONE\nREF: alpine:3.18 -> REGISTRE: docker.io/library | IMAGE: alpine | TAG: 3.18 | DIGEST: NONE\n\n[Cas 2 — Registres tiers avec sous-chemins]\nREF: quay.io/coreos/etcd:v3.5 -> REGISTRE: quay.io | IMAGE: coreos/etcd | TAG: v3.5 | DIGEST: NONE\nREF: registry.gitlab.com/equipe/projet/service:prod -> REGISTRE: registry.gitlab.com | IMAGE: equipe/projet/service | TAG: prod | DIGEST: NONE\n\n[Cas 3 — Image avec digest sans tag explicite]\nREF: postgres@sha256:998877aabb -> REGISTRE: docker.io/library | IMAGE: postgres | TAG: latest | DIGEST: sha256:998877aabb"
  },
  {
    "id": "dk2-c2-e3",
    "chapter": 2,
    "title": "Simulateur de stratégie Copy-On-Write (CoW) et couche conteneur",
    "level": "n3",
    "language": "analyse",
    "goal": "Simuler le fonctionnement du pilote de stockage OverlayFS lors des opérations de lecture, écriture et suppression.",
    "brief": "<p>Analysez les paramètres du problème pour chaque cas.<br>\n- Lignes suivantes : opérations au format <code>&lt;ACTION&gt; &lt;CheminFichier&gt;</code> où ACTION vaut <code>READ</code>, <code>WRITE</code>, <code>CREATE</code> ou <code>DELETE</code>.<br>\nComportement OverlayFS :<br>\n- <code>READ</code> :<br>\n  * Si le fichier a déjà été modifié dans le conteneur : <code>ACCES: Container Layer (Version modifiee)</code><br>\n  * Sinon s'il est dans l'image : <code>ACCES: Image Layer (Lecture directe RO sans duplication)</code><br>\n  * Sinon ou s'il est marqué supprimé : <code>ERREUR: Fichier introuvable (404 ENOENT)</code><br>\n- <code>WRITE</code> :<br>\n  * S'il est dans l'image et pas encore copié : <code>MECANISME: Copy-On-Write (Copie du fichier vers la Container Layer puis ecriture)</code><br>\n  * S'il est déjà dans la Container Layer : <code>MECANISME: Ecriture directe dans Container Layer</code><br>\n  * Sinon : <code>ERREUR: Fichier introuvable pour modification</code><br>\n- <code>CREATE</code> : <code>MECANISME: Creation directe dans Container Layer</code> (le fichier devient actif dans la couche conteneur).<br>\n- <code>DELETE</code> :<br>\n  * S'il était dans l'image : <code>MECANISME: Whiteout (Creation d'un fichier masque dans Container Layer sans toucher a l'image RO)</code><br>\n  * S'il a été créé uniquement dans le conteneur : <code>MECANISME: Suppression directe de Container Layer</code><br>\nAfficher :<br>\n<code>&lt;ACTION&gt; &lt;Chemin&gt; -&gt; &lt;RESULTAT&gt;</code></p>",
    "starter": "# Grille d'analyse (dk2-c2-e3) — Simulateur de stratégie Copy-On-Write (CoW) et couche conteneur\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Création d’un nouveau fichier puis écriture et suppression]\n# Données : /bin/sh\n# Données : CREATE /tmp/test.txt\n# Données : WRITE /tmp/test.txt\n# Données : DELETE /tmp/test.txt\n# Données : READ /tmp/test.txt\nA_COMPLETER\n\n[Cas 2 — Erreurs de lecture et écriture sur fichier inexistant]\n# Données : /etc/hosts\n# Données : READ /etc/inexistant\n# Données : WRITE /etc/inexistant\nA_COMPLETER\n\n[Cas 3 — Multiples écritures successives sur fichier existant]\n# Données : /app/settings.json\n# Données : WRITE /app/settings.json\n# Données : WRITE /app/settings.json\nA_COMPLETER\n",
    "hints": [
      "Gérer trois ensembles : fichiers dans l’image, fichiers copiés/créés dans le conteneur, fichiers supprimés (whiteout).",
      "Un fichier supprimé dans le conteneur ne peut plus être lu."
    ],
    "examples": [
      {
        "stdin": "/etc/app.conf, /usr/bin/python, /var/log/old.log\nREAD /etc/app.conf\nWRITE /etc/app.conf\nREAD /etc/app.conf\nDELETE /var/log/old.log\nREAD /var/log/old.log",
        "expected": "READ /etc/app.conf -> ACCES: Image Layer (Lecture directe RO sans duplication)\nWRITE /etc/app.conf -> MECANISME: Copy-On-Write (Copie du fichier vers la Container Layer puis ecriture)\nREAD /etc/app.conf -> ACCES: Container Layer (Version modifiee)\nDELETE /var/log/old.log -> MECANISME: Whiteout (Creation d'un fichier masque dans Container Layer sans toucher a l'image RO)\nREAD /var/log/old.log -> ERREUR: Fichier introuvable (404 ENOENT)",
        "note": "Démonstration complète de la mécanique Copy-On-Write et du masquage Whiteout."
      }
    ],
    "tests": [
      {
        "label": "Création d’un nouveau fichier puis écriture et suppression",
        "stdin": "cas:1",
        "expected": "CREATE /tmp/test.txt -> MECANISME: Creation directe dans Container Layer\nWRITE /tmp/test.txt -> MECANISME: Ecriture directe dans Container Layer\nDELETE /tmp/test.txt -> MECANISME: Suppression directe de Container Layer\nREAD /tmp/test.txt -> ERREUR: Fichier introuvable (404 ENOENT)"
      },
      {
        "label": "Erreurs de lecture et écriture sur fichier inexistant",
        "stdin": "cas:2",
        "expected": "READ /etc/inexistant -> ERREUR: Fichier introuvable (404 ENOENT)\nWRITE /etc/inexistant -> ERREUR: Fichier introuvable pour modification"
      },
      {
        "label": "Multiples écritures successives sur fichier existant",
        "stdin": "cas:3",
        "expected": "WRITE /app/settings.json -> MECANISME: Copy-On-Write (Copie du fichier vers la Container Layer puis ecriture)\nWRITE /app/settings.json -> MECANISME: Ecriture directe dans Container Layer"
      }
    ],
    "solution": "[Exemple]\nREAD /etc/app.conf -> ACCES: Image Layer (Lecture directe RO sans duplication)\nWRITE /etc/app.conf -> MECANISME: Copy-On-Write (Copie du fichier vers la Container Layer puis ecriture)\nREAD /etc/app.conf -> ACCES: Container Layer (Version modifiee)\nDELETE /var/log/old.log -> MECANISME: Whiteout (Creation d'un fichier masque dans Container Layer sans toucher a l'image RO)\nREAD /var/log/old.log -> ERREUR: Fichier introuvable (404 ENOENT)\n\n[Cas 1 — Création d’un nouveau fichier puis écriture et suppression]\nCREATE /tmp/test.txt -> MECANISME: Creation directe dans Container Layer\nWRITE /tmp/test.txt -> MECANISME: Ecriture directe dans Container Layer\nDELETE /tmp/test.txt -> MECANISME: Suppression directe de Container Layer\nREAD /tmp/test.txt -> ERREUR: Fichier introuvable (404 ENOENT)\n\n[Cas 2 — Erreurs de lecture et écriture sur fichier inexistant]\nREAD /etc/inexistant -> ERREUR: Fichier introuvable (404 ENOENT)\nWRITE /etc/inexistant -> ERREUR: Fichier introuvable pour modification\n\n[Cas 3 — Multiples écritures successives sur fichier existant]\nWRITE /app/settings.json -> MECANISME: Copy-On-Write (Copie du fichier vers la Container Layer puis ecriture)\nWRITE /app/settings.json -> MECANISME: Ecriture directe dans Container Layer"
  }
];
