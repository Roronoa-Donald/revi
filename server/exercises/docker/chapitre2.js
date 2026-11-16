'use strict';

module.exports = [
  {
    "id": "dk2-c2-e1",
    "chapter": 2,
    "title": "Calculateur de taille d’image et déduplication des Layers (OverlayFS)",
    "level": "n1",
    "language": "shell",
    "goal": "Calculer le stockage réel consommé sur le démon Docker grâce au partage de couches en lecture seule (UnionFS).",
    "brief": "<p>Le script Bash lit une image par ligne sur l’entrée standard (stdin), au format <code>NomImage : id_couche:taille , id_couche:taille</code>. Les tailles sont des entiers positifs ou nuls en Mo ; un même identifiant de couche a toujours la même taille.<br>\nDans le pilote de stockage Overlay2, chaque couche en lecture seule (identifiée par son ID unique) n'est stockée qu'une seule fois sur le disque hôte, quel que soit le nombre d'images qui s'appuient dessus.<br>\nCalculer :<br>\n1. La taille apparente de chaque image (somme de ses couches).<br>\n2. La taille brute totale cumulée (somme naïve sans partage).<br>\n3. La taille réelle stockée sur l'hôte (somme des couches uniques sans doublon).<br>\n4. L'économie d'espace réalisée (<code>TailleBrute - TailleReelle</code>).<br>\nAfficher :<br>\n<code>IMAGE: &lt;NomImage&gt; -&gt; TAILLE_APPARENTE: &lt;T&gt; Mo</code><br>\n... puis en fin d'exécution :<br>\n<code>TOTAL_BRUT: &lt;Tb&gt; Mo | TOTAL_REEL: &lt;Tr&gt; Mo | ECONOMIE_DEDUPLICATION: -&lt;Gain&gt; Mo</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (dk2-c2-e1) — Calculateur de taille d’image et déduplication des Layers (OverlayFS)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\n# Écrivez votre traitement Bash ci-dessous (affichage attendu sur stdout)\n",
    "hints": [
      "Garder un dictionnaire des couches uniques (id_couche -> taille) pour la taille réelle.",
      "Faire attention aux espaces autour des deux-points et des virgules.",
      "Pour chaque image : additionner ses couches pour la taille apparente ; cumuler le tout pour le total brut ; ne sommer chaque identifiant de couche qu une seule fois pour le réel, puis soustraire."
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
        "label": "Couche partagée de taille nulle",
        "stdin": "Un : shared:0, code:1\nDeux : shared:0, second:2",
        "expected": "IMAGE: Un -> TAILLE_APPARENTE: 1 Mo\nIMAGE: Deux -> TAILLE_APPARENTE: 2 Mo\nTOTAL_BRUT: 3 Mo | TOTAL_REEL: 3 Mo | ECONOMIE_DEDUPLICATION: -0 Mo"
      },
      {
        "label": "Couche partagée trois fois",
        "stdin": "One : seed:6\nTwo : seed:6, tail:0\nThree : seed:6",
        "expected": "IMAGE: One -> TAILLE_APPARENTE: 6 Mo\nIMAGE: Two -> TAILLE_APPARENTE: 6 Mo\nIMAGE: Three -> TAILLE_APPARENTE: 6 Mo\nTOTAL_BRUT: 18 Mo | TOTAL_REEL: 6 Mo | ECONOMIE_DEDUPLICATION: -12 Mo"
      },
      {
        "label": "Trois microservices partageant la même base Alpine",
        "stdin": "SvcA : alpine:5 , curl:10 , appA:2\nSvcB : alpine:5 , curl:10 , appB:3\nSvcC : alpine:5 , git:15 , appC:4",
        "expected": "IMAGE: SvcA -> TAILLE_APPARENTE: 17 Mo\nIMAGE: SvcB -> TAILLE_APPARENTE: 18 Mo\nIMAGE: SvcC -> TAILLE_APPARENTE: 24 Mo\nTOTAL_BRUT: 59 Mo | TOTAL_REEL: 39 Mo | ECONOMIE_DEDUPLICATION: -20 Mo"
      },
      {
        "label": "Image unique sans déduplication",
        "stdin": "Nginx : debian:120 , nginx_bin:30",
        "expected": "IMAGE: Nginx -> TAILLE_APPARENTE: 150 Mo\nTOTAL_BRUT: 150 Mo | TOTAL_REEL: 150 Mo | ECONOMIE_DEDUPLICATION: -0 Mo"
      },
      {
        "label": "Empilement de couches lourdes",
        "stdin": "Img1 : os:200 , libs:150\nImg2 : os:200 , libs:150 , extra:50\nImg3 : os:200 , libs:150 , extra:50 , debug:25",
        "expected": "IMAGE: Img1 -> TAILLE_APPARENTE: 350 Mo\nIMAGE: Img2 -> TAILLE_APPARENTE: 400 Mo\nIMAGE: Img3 -> TAILLE_APPARENTE: 425 Mo\nTOTAL_BRUT: 1175 Mo | TOTAL_REEL: 425 Mo | ECONOMIE_DEDUPLICATION: -750 Mo"
      },
      {
        "label": "Aucune image",
        "stdin": "",
        "expected": "TOTAL_BRUT: 0 Mo | TOTAL_REEL: 0 Mo | ECONOMIE_DEDUPLICATION: -0 Mo"
      },
      {
        "label": "Deux images avec une seule couche partagée",
        "stdin": "One : base:6\nTwo : base:6",
        "expected": "IMAGE: One -> TAILLE_APPARENTE: 6 Mo\nIMAGE: Two -> TAILLE_APPARENTE: 6 Mo\nTOTAL_BRUT: 12 Mo | TOTAL_REEL: 6 Mo | ECONOMIE_DEDUPLICATION: -6 Mo"
      }
    ],
    "solution": "#!/usr/bin/env bash\nawk '\nfunction trim(value) { sub(/^[[:space:]]+/, \"\", value); sub(/[[:space:]]+$/, \"\", value); return value }\nNF {\n  colon = index($0, \":\")\n  image = trim(substr($0, 1, colon - 1))\n  count = split(substr($0, colon + 1), layers, \",\")\n  apparent = 0\n  for (index_layer = 1; index_layer <= count; index_layer++) {\n    split(layers[index_layer], pair, \":\")\n    id = trim(pair[1])\n    size = trim(pair[2]) + 0\n    apparent += size\n    if (!(id in seen)) { seen[id] = 1; real += size }\n  }\n  total += apparent\n  printf \"IMAGE: %s -> TAILLE_APPARENTE: %.0f Mo\\n\", image, apparent\n}\nEND { printf \"TOTAL_BRUT: %.0f Mo | TOTAL_REEL: %.0f Mo | ECONOMIE_DEDUPLICATION: -%.0f Mo\\n\", total, real, total - real }\n'\n",
    "takeaway": "Grâce aux couches en lecture seule partagées (OverlayFS), dix conteneurs issus d une même image ne dupliquent pas sa taille."
  },
  {
    "id": "dk2-c2-e2",
    "chapter": 2,
    "title": "Parseur canonique de références d’images et de tags",
    "level": "n2",
    "language": "shell",
    "goal": "Décomposer une référence d’image Docker en ses composantes normalisées : registre, namespace/nom, tag et digest SHA256.",
    "brief": "<p>Le script Bash lit les paramètres sur l’entrée standard (stdin).<br>\nRègles de normalisation canonique :<br>\n1. <strong>Digest</strong> : si la référence contient <code>@sha256:...</code>, l'extraire (sinon <code>NONE</code>).<br>\n2. <strong>Tag</strong> : si le dernier segment après le dernier slash contient <code>:&lt;tag&gt;</code> (hors du digest), l'extraire (sinon valeur par défaut <code>latest</code>).<br>\n3. <strong>Registre &amp; Nom</strong> :<br>\n   - Si le premier segment avant un slash contient un point ou un port, ou vaut <code>localhost</code>, il désigne le registre (ex. <code>localhost:5000/org/app</code>).<br>\n   - Si l'image est officielle sans slash (ex: <code>nginx</code>, <code>ubuntu</code>), le registre est <code>docker.io/library</code> et le nom est l'image.<br>\n   - Si l'image a un namespace simple (ex: <code>monorg/monapp</code>), le registre est <code>docker.io</code> et le nom est <code>monorg/monapp</code>.<br>\nLe modèle affiche <code>latest</code> pour un tag absent, même en présence d'un digest ; il ne valide pas la longueur des exemples de digest et ne réécrit pas la référence.<br>\nPour chaque référence, afficher :<br>\n<code>REF: &lt;entree&gt; -&gt; REGISTRE: &lt;reg&gt; | IMAGE: &lt;nom&gt; | TAG: &lt;tag&gt; | DIGEST: &lt;digest&gt;</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (dk2-c2-e2) — Parseur canonique de références d’images et de tags\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\n# Écrivez votre traitement Bash ci-dessous (affichage attendu sur stdout)\n",
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
        "label": "Registre local, espace de noms et registre distant",
        "stdin": "localhost:5000/app\nteam/service\nexample.org/worker:v2",
        "expected": "REF: localhost:5000/app -> REGISTRE: localhost:5000 | IMAGE: app | TAG: latest | DIGEST: NONE\nREF: team/service -> REGISTRE: docker.io | IMAGE: team/service | TAG: latest | DIGEST: NONE\nREF: example.org/worker:v2 -> REGISTRE: example.org | IMAGE: worker | TAG: v2 | DIGEST: NONE"
      },
      {
        "label": "Tag et digest associés ; port sans tag",
        "stdin": "busybox:stable@sha256:bb22\n127.0.0.1:5000/org/app",
        "expected": "REF: busybox:stable@sha256:bb22 -> REGISTRE: docker.io/library | IMAGE: busybox | TAG: stable | DIGEST: sha256:bb22\nREF: 127.0.0.1:5000/org/app -> REGISTRE: 127.0.0.1:5000 | IMAGE: org/app | TAG: latest | DIGEST: NONE"
      },
      {
        "label": "Images officielles simples",
        "stdin": "redis\nalpine:3.18",
        "expected": "REF: redis -> REGISTRE: docker.io/library | IMAGE: redis | TAG: latest | DIGEST: NONE\nREF: alpine:3.18 -> REGISTRE: docker.io/library | IMAGE: alpine | TAG: 3.18 | DIGEST: NONE"
      },
      {
        "label": "Registres tiers avec sous-chemins",
        "stdin": "quay.io/coreos/etcd:v3.5\nregistry.gitlab.com/equipe/projet/service:prod",
        "expected": "REF: quay.io/coreos/etcd:v3.5 -> REGISTRE: quay.io | IMAGE: coreos/etcd | TAG: v3.5 | DIGEST: NONE\nREF: registry.gitlab.com/equipe/projet/service:prod -> REGISTRE: registry.gitlab.com | IMAGE: equipe/projet/service | TAG: prod | DIGEST: NONE"
      },
      {
        "label": "Image avec digest sans tag explicite",
        "stdin": "postgres@sha256:998877aabb",
        "expected": "REF: postgres@sha256:998877aabb -> REGISTRE: docker.io/library | IMAGE: postgres | TAG: latest | DIGEST: sha256:998877aabb"
      },
      {
        "label": "Registre à port et tag explicite",
        "stdin": "localhost:5000/team/app:v1",
        "expected": "REF: localhost:5000/team/app:v1 -> REGISTRE: localhost:5000 | IMAGE: team/app | TAG: v1 | DIGEST: NONE"
      }
    ],
    "solution": "#!/usr/bin/env bash\nawk '\nNF {\n  reference = $0\n  name = reference\n  digest = \"NONE\"\n  at = index(name, \"@\")\n  if (at) { digest = substr(name, at + 1); name = substr(name, 1, at - 1) }\n  count = split(name, segments, \"/\")\n  last = segments[count]\n  colon = index(last, \":\")\n  tag = \"latest\"\n  if (colon) {\n    tag = substr(last, colon + 1)\n    name = substr(name, 1, length(name) - length(last)) substr(last, 1, colon - 1)\n    count = split(name, segments, \"/\")\n  }\n  if (count == 1) registry = \"docker.io/library\"\n  else if (segments[1] ~ /[.:]/ || segments[1] == \"localhost\") {\n    registry = segments[1]\n    name = substr(name, length(registry) + 2)\n  } else registry = \"docker.io\"\n  printf \"REF: %s -> REGISTRE: %s | IMAGE: %s | TAG: %s | DIGEST: %s\\n\", reference, registry, name, tag, digest\n}\n'\n",
    "takeaway": "Une référence canonique sépare registre, dépôt, tag mutable (:1.2) et digest SHA-256 immuable pour les déploiements reproductibles."
  },
  {
    "id": "dk2-c2-e3",
    "chapter": 2,
    "title": "Simulateur de stratégie Copy-On-Write (CoW) et couche conteneur",
    "level": "n3",
    "language": "shell",
    "goal": "Simuler le fonctionnement du pilote de stockage OverlayFS lors des opérations de lecture, écriture et suppression.",
    "brief": "<p>Le script Bash lit les paramètres sur l’entrée standard (stdin).<br>\n- Première ligne : chemins de l'image séparés par des virgules ; cette liste peut être vide.<br>\n- Lignes suivantes : opérations au format <code>&lt;ACTION&gt; &lt;CheminFichier&gt;</code> où ACTION vaut <code>READ</code>, <code>WRITE</code>, <code>CREATE</code> ou <code>DELETE</code>.<br>\nDans ce modèle, CREATE vise un fichier absent et DELETE un fichier présent ; les autres cas ne sont pas définis.<br>\nComportement OverlayFS :<br>\n- <code>READ</code> :<br>\n  * Si le fichier a déjà été modifié dans le conteneur : <code>ACCES: Container Layer (Version modifiee)</code><br>\n  * Sinon s'il est dans l'image : <code>ACCES: Image Layer (Lecture directe RO sans duplication)</code><br>\n  * Sinon ou s'il est marqué supprimé : <code>ERREUR: Fichier introuvable (404 ENOENT)</code><br>\n- <code>WRITE</code> :<br>\n  * S'il est dans l'image et pas encore copié : <code>MECANISME: Copy-On-Write (Copie du fichier vers la Container Layer puis ecriture)</code><br>\n  * S'il est déjà dans la Container Layer : <code>MECANISME: Ecriture directe dans Container Layer</code><br>\n  * Sinon : <code>ERREUR: Fichier introuvable pour modification</code><br>\n- <code>CREATE</code> : <code>MECANISME: Creation directe dans Container Layer</code> (le fichier devient actif dans la couche conteneur).<br>\n- <code>DELETE</code> :<br>\n  * S'il était dans l'image : <code>MECANISME: Whiteout (Creation d'un fichier masque dans Container Layer sans toucher a l'image RO)</code><br>\n  * S'il a été créé uniquement dans le conteneur : <code>MECANISME: Suppression directe de Container Layer</code><br>\nAfficher :<br>\n<code>&lt;ACTION&gt; &lt;Chemin&gt; -&gt; &lt;RESULTAT&gt;</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (dk2-c2-e3) — Simulateur de stratégie Copy-On-Write (CoW) et couche conteneur\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\n# Écrivez votre traitement Bash ci-dessous (affichage attendu sur stdout)\n",
    "hints": [
      "Gérer trois ensembles : fichiers dans l’image, fichiers copiés/créés dans le conteneur, fichiers supprimés (whiteout).",
      "Un fichier supprimé dans le conteneur ne peut plus être lu.",
      "Pour chaque opération : lire l action et le chemin, tester d abord l ensemble conteneur, puis l image, puis le marquage whiteout, et conclure selon le premier cas vérifié."
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
        "label": "Whiteout puis recréation",
        "stdin": "/base\nDELETE /base\nWRITE /base\nCREATE /base\nWRITE /base",
        "expected": "DELETE /base -> MECANISME: Whiteout (Creation d'un fichier masque dans Container Layer sans toucher a l'image RO)\nWRITE /base -> ERREUR: Fichier introuvable pour modification\nCREATE /base -> MECANISME: Creation directe dans Container Layer\nWRITE /base -> MECANISME: Ecriture directe dans Container Layer"
      },
      {
        "label": "Création et suppression sans toucher à l’image",
        "stdin": "/only\nCREATE /fresh\nREAD /fresh\nDELETE /fresh\nREAD /fresh\nREAD /only",
        "expected": "CREATE /fresh -> MECANISME: Creation directe dans Container Layer\nREAD /fresh -> ACCES: Container Layer (Version modifiee)\nDELETE /fresh -> MECANISME: Suppression directe de Container Layer\nREAD /fresh -> ERREUR: Fichier introuvable (404 ENOENT)\nREAD /only -> ACCES: Image Layer (Lecture directe RO sans duplication)"
      },
      {
        "label": "Multiples écritures successives sur fichier existant",
        "stdin": "/app/settings.json\nWRITE /app/settings.json\nWRITE /app/settings.json",
        "expected": "WRITE /app/settings.json -> MECANISME: Copy-On-Write (Copie du fichier vers la Container Layer puis ecriture)\nWRITE /app/settings.json -> MECANISME: Ecriture directe dans Container Layer"
      },
      {
        "label": "Erreurs de lecture et écriture sur fichier inexistant",
        "stdin": "/etc/hosts\nREAD /etc/inexistant\nWRITE /etc/inexistant",
        "expected": "READ /etc/inexistant -> ERREUR: Fichier introuvable (404 ENOENT)\nWRITE /etc/inexistant -> ERREUR: Fichier introuvable pour modification"
      },
      {
        "label": "Création d’un nouveau fichier puis écriture et suppression",
        "stdin": "/bin/sh\nCREATE /tmp/test.txt\nWRITE /tmp/test.txt\nDELETE /tmp/test.txt\nREAD /tmp/test.txt",
        "expected": "CREATE /tmp/test.txt -> MECANISME: Creation directe dans Container Layer\nWRITE /tmp/test.txt -> MECANISME: Ecriture directe dans Container Layer\nDELETE /tmp/test.txt -> MECANISME: Suppression directe de Container Layer\nREAD /tmp/test.txt -> ERREUR: Fichier introuvable (404 ENOENT)"
      }
    ],
    "solution": "#!/usr/bin/env bash\nawk '\nfunction trim(value) { sub(/^[[:space:]]+/, \"\", value); sub(/[[:space:]]+$/, \"\", value); return value }\nNR == 1 {\n  count = split($0, files, \",\")\n  for (index_file = 1; index_file <= count; index_file++) {\n    file = trim(files[index_file])\n    if (file != \"\") image[file] = 1\n  }\n  next\n}\nNF >= 2 {\n  action = $1\n  file = $2\n  if (action == \"READ\") {\n    if (active[file]) result = \"ACCES: Container Layer (Version modifiee)\"\n    else if (image[file] && !deleted[file]) result = \"ACCES: Image Layer (Lecture directe RO sans duplication)\"\n    else result = \"ERREUR: Fichier introuvable (404 ENOENT)\"\n  } else if (action == \"WRITE\") {\n    if (active[file]) result = \"MECANISME: Ecriture directe dans Container Layer\"\n    else if (image[file] && !deleted[file]) {\n      result = \"MECANISME: Copy-On-Write (Copie du fichier vers la Container Layer puis ecriture)\"\n      active[file] = 1\n    } else result = \"ERREUR: Fichier introuvable pour modification\"\n  } else if (action == \"CREATE\") {\n    active[file] = 1\n    deleted[file] = 0\n    result = \"MECANISME: Creation directe dans Container Layer\"\n  } else if (action == \"DELETE\" && (active[file] || (image[file] && !deleted[file]))) {\n    if (image[file]) {\n      result = \"MECANISME: Whiteout (Creation d\\047un fichier masque dans Container Layer sans toucher a l\\047image RO)\"\n      deleted[file] = 1\n    } else result = \"MECANISME: Suppression directe de Container Layer\"\n    delete active[file]\n  } else next\n  printf \"%s %s -> %s\\n\", action, file, result\n}\n'\n",
    "takeaway": "En Copy-on-Write, une modification d un fichier d image basse recopie d abord le fichier dans la couche supérieure inscriptible du conteneur."
  }
];
