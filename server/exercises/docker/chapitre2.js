/**
 * Exercices du chapitre 2 — Docker B2.
 * Images, Layers &amp; Registres Docker.
 */
'use strict';

module.exports = [
  {
    id: 'dk2-c2-e1',
    chapter: 2,
    title: 'Calculateur de taille d’image et déduplication des Layers (OverlayFS)',
    level: 'n1',
    language: 'python',
    goal: 'Calculer le stockage réel consommé sur le démon Docker grâce au partage de couches en lecture seule (UnionFS).',
    brief: '<p>Le script lit sur l\'entrée standard des lignes au format <code>&lt;NomImage&gt; : &lt;Layer1&gt;:&lt;TailleMo&gt; , &lt;Layer2&gt;:&lt;TailleMo&gt; , ...</code>.<br>\nDans le pilote de stockage Overlay2, chaque couche en lecture seule (identifiée par son ID unique) n\'est stockée qu\'une seule fois sur le disque hôte, quel que soit le nombre d\'images qui s\'appuient dessus.<br>\nCalculer :<br>\n1. La taille apparente de chaque image (somme de ses couches).<br>\n2. La taille brute totale cumulée (somme naïve sans partage).<br>\n3. La taille réelle stockée sur l\'hôte (somme des couches uniques sans doublon).<br>\n4. L\'économie d\'espace réalisée (<code>TailleBrute - TailleReelle</code>).<br>\nAfficher :<br>\n<code>IMAGE: &lt;NomImage&gt; -&gt; TAILLE_APPARENTE: &lt;T&gt; Mo</code><br>\n... puis en fin d\'exécution :<br>\n<code>TOTAL_BRUT: &lt;Tb&gt; Mo | TOTAL_REEL: &lt;Tr&gt; Mo | ECONOMIE_DEDUPLICATION: -&lt;Gain&gt; Mo</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer les tailles apparentes, le total brut, réel et l'économie
`,
    hints: [
      'Garder un dictionnaire des couches uniques (id_couche -> taille) pour la taille réelle.',
      'Faire attention aux espaces autour des deux-points et des virgules.'
    ],
    examples: [
      {
        stdin: 'NodeApp : base_os:100 , node_runtime:80 , app_code:20\nPythonApp : base_os:100 , python_runtime:70 , app_code_py:15',
        expected: 'IMAGE: NodeApp -> TAILLE_APPARENTE: 200 Mo\nIMAGE: PythonApp -> TAILLE_APPARENTE: 185 Mo\nTOTAL_BRUT: 385 Mo | TOTAL_REEL: 285 Mo | ECONOMIE_DEDUPLICATION: -100 Mo',
        note: 'La couche commune base_os (100 Mo) n’est stockée qu’une seule fois.'
      }
    ],
    tests: [
      {
        label: 'Trois microservices partageant la même base Alpine',
        stdin: 'SvcA : alpine:5 , curl:10 , appA:2\nSvcB : alpine:5 , curl:10 , appB:3\nSvcC : alpine:5 , git:15 , appC:4',
        expected: 'IMAGE: SvcA -> TAILLE_APPARENTE: 17 Mo\nIMAGE: SvcB -> TAILLE_APPARENTE: 18 Mo\nIMAGE: SvcC -> TAILLE_APPARENTE: 24 Mo\nTOTAL_BRUT: 59 Mo | TOTAL_REEL: 39 Mo | ECONOMIE_DEDUPLICATION: -20 Mo'
      },
      {
        label: 'Image unique sans déduplication',
        stdin: 'Nginx : debian:120 , nginx_bin:30',
        expected: 'IMAGE: Nginx -> TAILLE_APPARENTE: 150 Mo\nTOTAL_BRUT: 150 Mo | TOTAL_REEL: 150 Mo | ECONOMIE_DEDUPLICATION: -0 Mo'
      },
      {
        label: 'Empilement de couches lourdes',
        stdin: 'Img1 : os:200 , libs:150\nImg2 : os:200 , libs:150 , extra:50\nImg3 : os:200 , libs:150 , extra:50 , debug:25',
        expected: 'IMAGE: Img1 -> TAILLE_APPARENTE: 350 Mo\nIMAGE: Img2 -> TAILLE_APPARENTE: 400 Mo\nIMAGE: Img3 -> TAILLE_APPARENTE: 425 Mo\nTOTAL_BRUT: 1175 Mo | TOTAL_REEL: 425 Mo | ECONOMIE_DEDUPLICATION: -750 Mo'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

couches_uniques = {}
total_brut = 0

for l in lignes:
    if ':' not in l:
        continue
    parties = l.split(':', 1)
    nom_image = parties[0].strip()
    couches_str = parties[1].strip()

    taille_image = 0
    morceaux = [m.strip() for m in couches_str.split(',') if m.strip()]
    for m in morceaux:
        sub = [s.strip() for s in m.split(':')]
        if len(sub) == 2:
            layer_id, sz = sub[0], int(sub[1])
            taille_image += sz
            couches_uniques[layer_id] = sz

    total_brut += taille_image
    print(f"IMAGE: {nom_image} -> TAILLE_APPARENTE: {taille_image} Mo")

total_reel = sum(couches_uniques.values())
economie = total_brut - total_reel
print(f"TOTAL_BRUT: {total_brut} Mo | TOTAL_REEL: {total_reel} Mo | ECONOMIE_DEDUPLICATION: -{economie} Mo")
`
  },
  {
    id: 'dk2-c2-e2',
    chapter: 2,
    title: 'Parseur canonique de références d’images et de tags',
    level: 'n2',
    language: 'python',
    goal: 'Décomposer une référence d’image Docker en ses composantes normalisées : registre, namespace/nom, tag et digest SHA256.',
    brief: '<p>Le script lit sur l\'entrée standard des références d\'images (une par ligne).<br>\nRègles de normalisation canonique :<br>\n1. <strong>Digest</strong> : si la référence contient <code>@sha256:...</code>, l\'extraire (sinon <code>NONE</code>).<br>\n2. <strong>Tag</strong> : si la référence contient <code>:&lt;tag&gt;</code> (hors du digest), l\'extraire (sinon valeur par défaut <code>latest</code>).<br>\n3. <strong>Registre &amp; Nom</strong> :<br>\n   - Si l\'image contient un nom de domaine avec point (ex: <code>ghcr.io/org/app</code> ou <code>docker.elastic.co/...</code>), le registre est le premier segment avant le slash.<br>\n   - Si l\'image est officielle sans slash (ex: <code>nginx</code>, <code>ubuntu</code>), le registre est <code>docker.io/library</code> et le nom est l\'image.<br>\n   - Si l\'image a un namespace simple (ex: <code>monorg/monapp</code>), le registre est <code>docker.io</code> et le nom est <code>monorg/monapp</code>.<br>\nPour chaque référence, afficher :<br>\n<code>REF: &lt;entree&gt; -&gt; REGISTRE: &lt;reg&gt; | IMAGE: &lt;nom&gt; | TAG: &lt;tag&gt; | DIGEST: &lt;digest&gt;</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : normaliser et décomposer chaque référence d'image Docker
`,
    hints: [
      'Traiter en premier l’éventuel digest après @.',
      'Extraire ensuite le tag après le dernier deux-points.',
      'Déterminer le registre selon la présence d’un point ou d’un slash.'
    ],
    examples: [
      {
        stdin: 'nginx\nubuntu:22.04\nmyorg/backend:v1.0\nghcr.io/dev/api:latest@sha256:abcd1234ef',
        expected: 'REF: nginx -> REGISTRE: docker.io/library | IMAGE: nginx | TAG: latest | DIGEST: NONE\nREF: ubuntu:22.04 -> REGISTRE: docker.io/library | IMAGE: ubuntu | TAG: 22.04 | DIGEST: NONE\nREF: myorg/backend:v1.0 -> REGISTRE: docker.io | IMAGE: myorg/backend | TAG: v1.0 | DIGEST: NONE\nREF: ghcr.io/dev/api:latest@sha256:abcd1234ef -> REGISTRE: ghcr.io | IMAGE: dev/api | TAG: latest | DIGEST: sha256:abcd1234ef',
        note: 'Normalisation canonique conforme à la spécification Docker distribution.'
      }
    ],
    tests: [
      {
        label: 'Images officielles simples',
        stdin: 'redis\nalpine:3.18',
        expected: 'REF: redis -> REGISTRE: docker.io/library | IMAGE: redis | TAG: latest | DIGEST: NONE\nREF: alpine:3.18 -> REGISTRE: docker.io/library | IMAGE: alpine | TAG: 3.18 | DIGEST: NONE'
      },
      {
        label: 'Registres tiers avec sous-chemins',
        stdin: 'quay.io/coreos/etcd:v3.5\nregistry.gitlab.com/equipe/projet/service:prod',
        expected: 'REF: quay.io/coreos/etcd:v3.5 -> REGISTRE: quay.io | IMAGE: coreos/etcd | TAG: v3.5 | DIGEST: NONE\nREF: registry.gitlab.com/equipe/projet/service:prod -> REGISTRE: registry.gitlab.com | IMAGE: equipe/projet/service | TAG: prod | DIGEST: NONE'
      },
      {
        label: 'Image avec digest sans tag explicite',
        stdin: 'postgres@sha256:998877aabb',
        expected: 'REF: postgres@sha256:998877aabb -> REGISTRE: docker.io/library | IMAGE: postgres | TAG: latest | DIGEST: sha256:998877aabb'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for ref in lignes:
    rest = ref
    digest = "NONE"
    if '@' in rest:
        rest, digest = rest.split('@', 1)

    tag = "latest"
    if ':' in rest:
        # attention : si un port est présent dans le nom de registre (ex: localhost:5000)
        # un tag ne contient pas de slash
        parties_colon = rest.rsplit(':', 1)
        if '/' not in parties_colon[1]:
            rest = parties_colon[0]
            tag = parties_colon[1]

    # Analyse du registre
    if '/' not in rest:
        registre = "docker.io/library"
        image = rest
    else:
        premier_seg = rest.split('/', 1)[0]
        if '.' in premier_seg or ':' in premier_seg:
            registre = premier_seg
            image = rest.split('/', 1)[1]
        else:
            registre = "docker.io"
            image = rest

    print(f"REF: {ref} -> REGISTRE: {registre} | IMAGE: {image} | TAG: {tag} | DIGEST: {digest}")
`
  },
  {
    id: 'dk2-c2-e3',
    chapter: 2,
    title: 'Simulateur de stratégie Copy-On-Write (CoW) et couche conteneur',
    level: 'n3',
    language: 'python',
    goal: 'Simuler le fonctionnement du pilote de stockage OverlayFS lors des opérations de lecture, écriture et suppression.',
    brief: '<p>Le script lit sur l\'entrée standard :<br>\n- Première ligne : liste des fichiers existants dans l\'image de base (séparés par des virgules).<br>\n- Lignes suivantes : opérations au format <code>&lt;ACTION&gt; &lt;CheminFichier&gt;</code> où ACTION vaut <code>READ</code>, <code>WRITE</code>, <code>CREATE</code> ou <code>DELETE</code>.<br>\nComportement OverlayFS :<br>\n- <code>READ</code> :<br>\n  * Si le fichier a déjà été modifié dans le conteneur : <code>ACCES: Container Layer (Version modifiee)</code><br>\n  * Sinon s\'il est dans l\'image : <code>ACCES: Image Layer (Lecture directe RO sans duplication)</code><br>\n  * Sinon ou s\'il est marqué supprimé : <code>ERREUR: Fichier introuvable (404 ENOENT)</code><br>\n- <code>WRITE</code> :<br>\n  * S\'il est dans l\'image et pas encore copié : <code>MECANISME: Copy-On-Write (Copie du fichier vers la Container Layer puis ecriture)</code><br>\n  * S\'il est déjà dans la Container Layer : <code>MECANISME: Ecriture directe dans Container Layer</code><br>\n  * Sinon : <code>ERREUR: Fichier introuvable pour modification</code><br>\n- <code>CREATE</code> : <code>MECANISME: Creation directe dans Container Layer</code> (le fichier devient actif dans la couche conteneur).<br>\n- <code>DELETE</code> :<br>\n  * S\'il était dans l\'image : <code>MECANISME: Whiteout (Creation d\'un fichier masque dans Container Layer sans toucher a l\'image RO)</code><br>\n  * S\'il a été créé uniquement dans le conteneur : <code>MECANISME: Suppression directe de Container Layer</code><br>\nAfficher :<br>\n<code>&lt;ACTION&gt; &lt;Chemin&gt; -&gt; &lt;RESULTAT&gt;</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : simuler le cycle Copy-On-Write et OverlayFS
`,
    hints: [
      'Gérer trois ensembles : fichiers dans l’image, fichiers copiés/créés dans le conteneur, fichiers supprimés (whiteout).',
      'Un fichier supprimé dans le conteneur ne peut plus être lu.'
    ],
    examples: [
      {
        stdin: '/etc/app.conf, /usr/bin/python, /var/log/old.log\nREAD /etc/app.conf\nWRITE /etc/app.conf\nREAD /etc/app.conf\nDELETE /var/log/old.log\nREAD /var/log/old.log',
        expected: 'READ /etc/app.conf -> ACCES: Image Layer (Lecture directe RO sans duplication)\nWRITE /etc/app.conf -> MECANISME: Copy-On-Write (Copie du fichier vers la Container Layer puis ecriture)\nREAD /etc/app.conf -> ACCES: Container Layer (Version modifiee)\nDELETE /var/log/old.log -> MECANISME: Whiteout (Creation d\'un fichier masque dans Container Layer sans toucher a l\'image RO)\nREAD /var/log/old.log -> ERREUR: Fichier introuvable (404 ENOENT)',
        note: 'Démonstration complète de la mécanique Copy-On-Write et du masquage Whiteout.'
      }
    ],
    tests: [
      {
        label: 'Création d’un nouveau fichier puis écriture et suppression',
        stdin: '/bin/sh\nCREATE /tmp/test.txt\nWRITE /tmp/test.txt\nDELETE /tmp/test.txt\nREAD /tmp/test.txt',
        expected: 'CREATE /tmp/test.txt -> MECANISME: Creation directe dans Container Layer\nWRITE /tmp/test.txt -> MECANISME: Ecriture directe dans Container Layer\nDELETE /tmp/test.txt -> MECANISME: Suppression directe de Container Layer\nREAD /tmp/test.txt -> ERREUR: Fichier introuvable (404 ENOENT)'
      },
      {
        label: 'Erreurs de lecture et écriture sur fichier inexistant',
        stdin: '/etc/hosts\nREAD /etc/inexistant\nWRITE /etc/inexistant',
        expected: 'READ /etc/inexistant -> ERREUR: Fichier introuvable (404 ENOENT)\nWRITE /etc/inexistant -> ERREUR: Fichier introuvable pour modification'
      },
      {
        label: 'Multiples écritures successives sur fichier existant',
        stdin: '/app/settings.json\nWRITE /app/settings.json\nWRITE /app/settings.json',
        expected: 'WRITE /app/settings.json -> MECANISME: Copy-On-Write (Copie du fichier vers la Container Layer puis ecriture)\nWRITE /app/settings.json -> MECANISME: Ecriture directe dans Container Layer'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]
if not lignes:
    sys.exit(0)

fichiers_image = set([f.strip() for f in lignes[0].split(',') if f.strip()])
fichiers_conteneur = set()
fichiers_crees_dans_conteneur = set()
fichiers_whiteout = set()

for l in lignes[1:]:
    parties = l.split(None, 1)
    if len(parties) != 2:
        continue
    act, chemin = parties[0].upper(), parties[1].strip()

    if act == 'READ':
        if chemin in fichiers_whiteout:
            res = "ERREUR: Fichier introuvable (404 ENOENT)"
        elif chemin in fichiers_conteneur:
            res = "ACCES: Container Layer (Version modifiee)"
        elif chemin in fichiers_image:
            res = "ACCES: Image Layer (Lecture directe RO sans duplication)"
        else:
            res = "ERREUR: Fichier introuvable (404 ENOENT)"

    elif act == 'WRITE':
        if chemin in fichiers_whiteout:
            res = "ERREUR: Fichier introuvable pour modification"
        elif chemin in fichiers_conteneur:
            res = "MECANISME: Ecriture directe dans Container Layer"
        elif chemin in fichiers_image:
            fichiers_conteneur.add(chemin)
            res = "MECANISME: Copy-On-Write (Copie du fichier vers la Container Layer puis ecriture)"
        else:
            res = "ERREUR: Fichier introuvable pour modification"

    elif act == 'CREATE':
        fichiers_conteneur.add(chemin)
        fichiers_crees_dans_conteneur.add(chemin)
        if chemin in fichiers_whiteout:
            fichiers_whiteout.remove(chemin)
        res = "MECANISME: Creation directe dans Container Layer"

    elif act == 'DELETE':
        if chemin in fichiers_image:
            fichiers_whiteout.add(chemin)
            if chemin in fichiers_conteneur:
                fichiers_conteneur.remove(chemin)
            res = "MECANISME: Whiteout (Creation d'un fichier masque dans Container Layer sans toucher a l'image RO)"
        elif chemin in fichiers_crees_dans_conteneur:
            fichiers_crees_dans_conteneur.remove(chemin)
            if chemin in fichiers_conteneur:
                fichiers_conteneur.remove(chemin)
            res = "MECANISME: Suppression directe de Container Layer"
        else:
            res = "ERREUR: Fichier introuvable pour suppression"
    else:
        res = "ACTION_INCONNUE"

    print(f"{act} {chemin} -> {res}")
`
  }
];
