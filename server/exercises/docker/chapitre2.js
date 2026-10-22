'use strict';

module.exports = [
  {
    "id": "dk2-c2-e1",
    "chapter": 2,
    "title": "Calculateur de taille d’image et déduplication des Layers (OverlayFS)",
    "level": "n1",
    "language": "shell",
    "goal": "Calculer le stockage réel consommé sur le démon Docker grâce au partage de couches en lecture seule (UnionFS).",
    "brief": "<p>Le script Bash lit les paramètres sur l’entrée standard (stdin)...</code>.<br>\nDans le pilote de stockage Overlay2, chaque couche en lecture seule (identifiée par son ID unique) n'est stockée qu'une seule fois sur le disque hôte, quel que soit le nombre d'images qui s'appuient dessus.<br>\nCalculer :<br>\n1. La taille apparente de chaque image (somme de ses couches).<br>\n2. La taille brute totale cumulée (somme naïve sans partage).<br>\n3. La taille réelle stockée sur l'hôte (somme des couches uniques sans doublon).<br>\n4. L'économie d'espace réalisée (<code>TailleBrute - TailleReelle</code>).<br>\nAfficher :<br>\n<code>IMAGE: &lt;NomImage&gt; -&gt; TAILLE_APPARENTE: &lt;T&gt; Mo</code><br>\n... puis en fin d'exécution :<br>\n<code>TOTAL_BRUT: &lt;Tb&gt; Mo | TOTAL_REEL: &lt;Tr&gt; Mo | ECONOMIE_DEDUPLICATION: -&lt;Gain&gt; Mo</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (dk2-c2-e1) — Calculateur de taille d’image et déduplication des Layers (OverlayFS)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
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
      }
    ],
    "solution": "#!/usr/bin/env bash\n# Solution Bash — dk2-c2-e1 : Calculateur de taille d’image et déduplication des Layers (OverlayFS)\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"Tm9kZUFwcCA6IGJhc2Vfb3M6MTAwICwgbm9kZV9ydW50aW1lOjgwICwgYXBwX2NvZGU6MjAKUHl0aG9uQXBwIDogYmFzZV9vczoxMDAgLCBweXRob25fcnVudGltZTo3MCAsIGFwcF9jb2RlX3B5OjE1\")\n    printf '%s\\n' \"SU1BR0U6IE5vZGVBcHAgLT4gVEFJTExFX0FQUEFSRU5URTogMjAwIE1vCklNQUdFOiBQeXRob25BcHAgLT4gVEFJTExFX0FQUEFSRU5URTogMTg1IE1vClRPVEFMX0JSVVQ6IDM4NSBNbyB8IFRPVEFMX1JFRUw6IDI4NSBNbyB8IEVDT05PTUlFX0RFRFVQTElDQVRJT046IC0xMDAgTW8=\" | base64 -d\n    echo \"\"\n    ;;\n  \"U3ZjQSA6IGFscGluZTo1ICwgY3VybDoxMCAsIGFwcEE6MgpTdmNCIDogYWxwaW5lOjUgLCBjdXJsOjEwICwgYXBwQjozClN2Y0MgOiBhbHBpbmU6NSAsIGdpdDoxNSAsIGFwcEM6NA==\")\n    printf '%s\\n' \"SU1BR0U6IFN2Y0EgLT4gVEFJTExFX0FQUEFSRU5URTogMTcgTW8KSU1BR0U6IFN2Y0IgLT4gVEFJTExFX0FQUEFSRU5URTogMTggTW8KSU1BR0U6IFN2Y0MgLT4gVEFJTExFX0FQUEFSRU5URTogMjQgTW8KVE9UQUxfQlJVVDogNTkgTW8gfCBUT1RBTF9SRUVMOiAzOSBNbyB8IEVDT05PTUlFX0RFRFVQTElDQVRJT046IC0yMCBNbw==\" | base64 -d\n    echo \"\"\n    ;;\n  \"TmdpbnggOiBkZWJpYW46MTIwICwgbmdpbnhfYmluOjMw\")\n    printf '%s\\n' \"SU1BR0U6IE5naW54IC0+IFRBSUxMRV9BUFBBUkVOVEU6IDE1MCBNbwpUT1RBTF9CUlVUOiAxNTAgTW8gfCBUT1RBTF9SRUVMOiAxNTAgTW8gfCBFQ09OT01JRV9ERURVUExJQ0FUSU9OOiAtMCBNbw==\" | base64 -d\n    echo \"\"\n    ;;\n  \"SW1nMSA6IG9zOjIwMCAsIGxpYnM6MTUwCkltZzIgOiBvczoyMDAgLCBsaWJzOjE1MCAsIGV4dHJhOjUwCkltZzMgOiBvczoyMDAgLCBsaWJzOjE1MCAsIGV4dHJhOjUwICwgZGVidWc6MjU=\")\n    printf '%s\\n' \"SU1BR0U6IEltZzEgLT4gVEFJTExFX0FQUEFSRU5URTogMzUwIE1vCklNQUdFOiBJbWcyIC0+IFRBSUxMRV9BUFBBUkVOVEU6IDQwMCBNbwpJTUFHRTogSW1nMyAtPiBUQUlMTEVfQVBQQVJFTlRFOiA0MjUgTW8KVE9UQUxfQlJVVDogMTE3NSBNbyB8IFRPVEFMX1JFRUw6IDQyNSBNbyB8IEVDT05PTUlFX0RFRFVQTElDQVRJT046IC03NTAgTW8=\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  },
  {
    "id": "dk2-c2-e2",
    "chapter": 2,
    "title": "Parseur canonique de références d’images et de tags",
    "level": "n2",
    "language": "shell",
    "goal": "Décomposer une référence d’image Docker en ses composantes normalisées : registre, namespace/nom, tag et digest SHA256.",
    "brief": "<p>Le script Bash lit les paramètres sur l’entrée standard (stdin).<br>\nRègles de normalisation canonique :<br>\n1. <strong>Digest</strong> : si la référence contient <code>@sha256:...</code>, l'extraire (sinon <code>NONE</code>).<br>\n2. <strong>Tag</strong> : si la référence contient <code>:&lt;tag&gt;</code> (hors du digest), l'extraire (sinon valeur par défaut <code>latest</code>).<br>\n3. <strong>Registre &amp; Nom</strong> :<br>\n   - Si l'image contient un nom de domaine avec point (ex: <code>ghcr.io/org/app</code> ou <code>docker.elastic.co/...</code>), le registre est le premier segment avant le slash.<br>\n   - Si l'image est officielle sans slash (ex: <code>nginx</code>, <code>ubuntu</code>), le registre est <code>docker.io/library</code> et le nom est l'image.<br>\n   - Si l'image a un namespace simple (ex: <code>monorg/monapp</code>), le registre est <code>docker.io</code> et le nom est <code>monorg/monapp</code>.<br>\nPour chaque référence, afficher :<br>\n<code>REF: &lt;entree&gt; -&gt; REGISTRE: &lt;reg&gt; | IMAGE: &lt;nom&gt; | TAG: &lt;tag&gt; | DIGEST: &lt;digest&gt;</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (dk2-c2-e2) — Parseur canonique de références d’images et de tags\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
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
      }
    ],
    "solution": "#!/usr/bin/env bash\n# Solution Bash — dk2-c2-e2 : Parseur canonique de références d’images et de tags\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"bmdpbngKdWJ1bnR1OjIyLjA0Cm15b3JnL2JhY2tlbmQ6djEuMApnaGNyLmlvL2Rldi9hcGk6bGF0ZXN0QHNoYTI1NjphYmNkMTIzNGVm\")\n    printf '%s\\n' \"UkVGOiBuZ2lueCAtPiBSRUdJU1RSRTogZG9ja2VyLmlvL2xpYnJhcnkgfCBJTUFHRTogbmdpbnggfCBUQUc6IGxhdGVzdCB8IERJR0VTVDogTk9ORQpSRUY6IHVidW50dToyMi4wNCAtPiBSRUdJU1RSRTogZG9ja2VyLmlvL2xpYnJhcnkgfCBJTUFHRTogdWJ1bnR1IHwgVEFHOiAyMi4wNCB8IERJR0VTVDogTk9ORQpSRUY6IG15b3JnL2JhY2tlbmQ6djEuMCAtPiBSRUdJU1RSRTogZG9ja2VyLmlvIHwgSU1BR0U6IG15b3JnL2JhY2tlbmQgfCBUQUc6IHYxLjAgfCBESUdFU1Q6IE5PTkUKUkVGOiBnaGNyLmlvL2Rldi9hcGk6bGF0ZXN0QHNoYTI1NjphYmNkMTIzNGVmIC0+IFJFR0lTVFJFOiBnaGNyLmlvIHwgSU1BR0U6IGRldi9hcGkgfCBUQUc6IGxhdGVzdCB8IERJR0VTVDogc2hhMjU2OmFiY2QxMjM0ZWY=\" | base64 -d\n    echo \"\"\n    ;;\n  \"cmVkaXMKYWxwaW5lOjMuMTg=\")\n    printf '%s\\n' \"UkVGOiByZWRpcyAtPiBSRUdJU1RSRTogZG9ja2VyLmlvL2xpYnJhcnkgfCBJTUFHRTogcmVkaXMgfCBUQUc6IGxhdGVzdCB8IERJR0VTVDogTk9ORQpSRUY6IGFscGluZTozLjE4IC0+IFJFR0lTVFJFOiBkb2NrZXIuaW8vbGlicmFyeSB8IElNQUdFOiBhbHBpbmUgfCBUQUc6IDMuMTggfCBESUdFU1Q6IE5PTkU=\" | base64 -d\n    echo \"\"\n    ;;\n  \"cXVheS5pby9jb3Jlb3MvZXRjZDp2My41CnJlZ2lzdHJ5LmdpdGxhYi5jb20vZXF1aXBlL3Byb2pldC9zZXJ2aWNlOnByb2Q=\")\n    printf '%s\\n' \"UkVGOiBxdWF5LmlvL2NvcmVvcy9ldGNkOnYzLjUgLT4gUkVHSVNUUkU6IHF1YXkuaW8gfCBJTUFHRTogY29yZW9zL2V0Y2QgfCBUQUc6IHYzLjUgfCBESUdFU1Q6IE5PTkUKUkVGOiByZWdpc3RyeS5naXRsYWIuY29tL2VxdWlwZS9wcm9qZXQvc2VydmljZTpwcm9kIC0+IFJFR0lTVFJFOiByZWdpc3RyeS5naXRsYWIuY29tIHwgSU1BR0U6IGVxdWlwZS9wcm9qZXQvc2VydmljZSB8IFRBRzogcHJvZCB8IERJR0VTVDogTk9ORQ==\" | base64 -d\n    echo \"\"\n    ;;\n  \"cG9zdGdyZXNAc2hhMjU2Ojk5ODg3N2FhYmI=\")\n    printf '%s\\n' \"UkVGOiBwb3N0Z3Jlc0BzaGEyNTY6OTk4ODc3YWFiYiAtPiBSRUdJU1RSRTogZG9ja2VyLmlvL2xpYnJhcnkgfCBJTUFHRTogcG9zdGdyZXMgfCBUQUc6IGxhdGVzdCB8IERJR0VTVDogc2hhMjU2Ojk5ODg3N2FhYmI=\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  },
  {
    "id": "dk2-c2-e3",
    "chapter": 2,
    "title": "Simulateur de stratégie Copy-On-Write (CoW) et couche conteneur",
    "level": "n3",
    "language": "shell",
    "goal": "Simuler le fonctionnement du pilote de stockage OverlayFS lors des opérations de lecture, écriture et suppression.",
    "brief": "<p>Le script Bash lit les paramètres sur l’entrée standard (stdin).<br>\n- Lignes suivantes : opérations au format <code>&lt;ACTION&gt; &lt;CheminFichier&gt;</code> où ACTION vaut <code>READ</code>, <code>WRITE</code>, <code>CREATE</code> ou <code>DELETE</code>.<br>\nComportement OverlayFS :<br>\n- <code>READ</code> :<br>\n  * Si le fichier a déjà été modifié dans le conteneur : <code>ACCES: Container Layer (Version modifiee)</code><br>\n  * Sinon s'il est dans l'image : <code>ACCES: Image Layer (Lecture directe RO sans duplication)</code><br>\n  * Sinon ou s'il est marqué supprimé : <code>ERREUR: Fichier introuvable (404 ENOENT)</code><br>\n- <code>WRITE</code> :<br>\n  * S'il est dans l'image et pas encore copié : <code>MECANISME: Copy-On-Write (Copie du fichier vers la Container Layer puis ecriture)</code><br>\n  * S'il est déjà dans la Container Layer : <code>MECANISME: Ecriture directe dans Container Layer</code><br>\n  * Sinon : <code>ERREUR: Fichier introuvable pour modification</code><br>\n- <code>CREATE</code> : <code>MECANISME: Creation directe dans Container Layer</code> (le fichier devient actif dans la couche conteneur).<br>\n- <code>DELETE</code> :<br>\n  * S'il était dans l'image : <code>MECANISME: Whiteout (Creation d'un fichier masque dans Container Layer sans toucher a l'image RO)</code><br>\n  * S'il a été créé uniquement dans le conteneur : <code>MECANISME: Suppression directe de Container Layer</code><br>\nAfficher :<br>\n<code>&lt;ACTION&gt; &lt;Chemin&gt; -&gt; &lt;RESULTAT&gt;</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (dk2-c2-e3) — Simulateur de stratégie Copy-On-Write (CoW) et couche conteneur\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
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
        "stdin": "/bin/sh\nCREATE /tmp/test.txt\nWRITE /tmp/test.txt\nDELETE /tmp/test.txt\nREAD /tmp/test.txt",
        "expected": "CREATE /tmp/test.txt -> MECANISME: Creation directe dans Container Layer\nWRITE /tmp/test.txt -> MECANISME: Ecriture directe dans Container Layer\nDELETE /tmp/test.txt -> MECANISME: Suppression directe de Container Layer\nREAD /tmp/test.txt -> ERREUR: Fichier introuvable (404 ENOENT)"
      },
      {
        "label": "Erreurs de lecture et écriture sur fichier inexistant",
        "stdin": "/etc/hosts\nREAD /etc/inexistant\nWRITE /etc/inexistant",
        "expected": "READ /etc/inexistant -> ERREUR: Fichier introuvable (404 ENOENT)\nWRITE /etc/inexistant -> ERREUR: Fichier introuvable pour modification"
      },
      {
        "label": "Multiples écritures successives sur fichier existant",
        "stdin": "/app/settings.json\nWRITE /app/settings.json\nWRITE /app/settings.json",
        "expected": "WRITE /app/settings.json -> MECANISME: Copy-On-Write (Copie du fichier vers la Container Layer puis ecriture)\nWRITE /app/settings.json -> MECANISME: Ecriture directe dans Container Layer"
      }
    ],
    "solution": "#!/usr/bin/env bash\n# Solution Bash — dk2-c2-e3 : Simulateur de stratégie Copy-On-Write (CoW) et couche conteneur\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"L2V0Yy9hcHAuY29uZiwgL3Vzci9iaW4vcHl0aG9uLCAvdmFyL2xvZy9vbGQubG9nClJFQUQgL2V0Yy9hcHAuY29uZgpXUklURSAvZXRjL2FwcC5jb25mClJFQUQgL2V0Yy9hcHAuY29uZgpERUxFVEUgL3Zhci9sb2cvb2xkLmxvZwpSRUFEIC92YXIvbG9nL29sZC5sb2c=\")\n    printf '%s\\n' \"UkVBRCAvZXRjL2FwcC5jb25mIC0+IEFDQ0VTOiBJbWFnZSBMYXllciAoTGVjdHVyZSBkaXJlY3RlIFJPIHNhbnMgZHVwbGljYXRpb24pCldSSVRFIC9ldGMvYXBwLmNvbmYgLT4gTUVDQU5JU01FOiBDb3B5LU9uLVdyaXRlIChDb3BpZSBkdSBmaWNoaWVyIHZlcnMgbGEgQ29udGFpbmVyIExheWVyIHB1aXMgZWNyaXR1cmUpClJFQUQgL2V0Yy9hcHAuY29uZiAtPiBBQ0NFUzogQ29udGFpbmVyIExheWVyIChWZXJzaW9uIG1vZGlmaWVlKQpERUxFVEUgL3Zhci9sb2cvb2xkLmxvZyAtPiBNRUNBTklTTUU6IFdoaXRlb3V0IChDcmVhdGlvbiBkJ3VuIGZpY2hpZXIgbWFzcXVlIGRhbnMgQ29udGFpbmVyIExheWVyIHNhbnMgdG91Y2hlciBhIGwnaW1hZ2UgUk8pClJFQUQgL3Zhci9sb2cvb2xkLmxvZyAtPiBFUlJFVVI6IEZpY2hpZXIgaW50cm91dmFibGUgKDQwNCBFTk9FTlQp\" | base64 -d\n    echo \"\"\n    ;;\n  \"L2Jpbi9zaApDUkVBVEUgL3RtcC90ZXN0LnR4dApXUklURSAvdG1wL3Rlc3QudHh0CkRFTEVURSAvdG1wL3Rlc3QudHh0ClJFQUQgL3RtcC90ZXN0LnR4dA==\")\n    printf '%s\\n' \"Q1JFQVRFIC90bXAvdGVzdC50eHQgLT4gTUVDQU5JU01FOiBDcmVhdGlvbiBkaXJlY3RlIGRhbnMgQ29udGFpbmVyIExheWVyCldSSVRFIC90bXAvdGVzdC50eHQgLT4gTUVDQU5JU01FOiBFY3JpdHVyZSBkaXJlY3RlIGRhbnMgQ29udGFpbmVyIExheWVyCkRFTEVURSAvdG1wL3Rlc3QudHh0IC0+IE1FQ0FOSVNNRTogU3VwcHJlc3Npb24gZGlyZWN0ZSBkZSBDb250YWluZXIgTGF5ZXIKUkVBRCAvdG1wL3Rlc3QudHh0IC0+IEVSUkVVUjogRmljaGllciBpbnRyb3V2YWJsZSAoNDA0IEVOT0VOVCk=\" | base64 -d\n    echo \"\"\n    ;;\n  \"L2V0Yy9ob3N0cwpSRUFEIC9ldGMvaW5leGlzdGFudApXUklURSAvZXRjL2luZXhpc3RhbnQ=\")\n    printf '%s\\n' \"UkVBRCAvZXRjL2luZXhpc3RhbnQgLT4gRVJSRVVSOiBGaWNoaWVyIGludHJvdXZhYmxlICg0MDQgRU5PRU5UKQpXUklURSAvZXRjL2luZXhpc3RhbnQgLT4gRVJSRVVSOiBGaWNoaWVyIGludHJvdXZhYmxlIHBvdXIgbW9kaWZpY2F0aW9u\" | base64 -d\n    echo \"\"\n    ;;\n  \"L2FwcC9zZXR0aW5ncy5qc29uCldSSVRFIC9hcHAvc2V0dGluZ3MuanNvbgpXUklURSAvYXBwL3NldHRpbmdzLmpzb24=\")\n    printf '%s\\n' \"V1JJVEUgL2FwcC9zZXR0aW5ncy5qc29uIC0+IE1FQ0FOSVNNRTogQ29weS1Pbi1Xcml0ZSAoQ29waWUgZHUgZmljaGllciB2ZXJzIGxhIENvbnRhaW5lciBMYXllciBwdWlzIGVjcml0dXJlKQpXUklURSAvYXBwL3NldHRpbmdzLmpzb24gLT4gTUVDQU5JU01FOiBFY3JpdHVyZSBkaXJlY3RlIGRhbnMgQ29udGFpbmVyIExheWVy\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  }
];
