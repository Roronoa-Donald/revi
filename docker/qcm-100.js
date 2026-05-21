window.COURSE_QCM = [
  {
    "id": 1,
    "ch": 1,
    "q": "Un conteneur : quelle définition est correcte ?",
    "o": [
      "Un ordinateur physique",
      "Une base de données relationnelle",
      "Un fichier PDF compressé",
      "Une instance isolée exécutée à partir d'une image"
    ],
    "a": 3,
    "e": "Le conteneur est l'objet exécuté. Il partage le noyau de l'hôte mais isole l'environnement de l'application."
  },
  {
    "id": 2,
    "ch": 1,
    "q": "Question probable - Un conteneur : que faut-il retenir ?",
    "o": [
      "Il remplace le noyau de la machine",
      "Il ne sert qu'au stockage",
      "Il exécute une application avec ses dépendances dans un environnement isolé",
      "Il contient toujours un OS complet"
    ],
    "a": 2,
    "e": "Le conteneur est l'objet exécuté. Il partage le noyau de l'hôte mais isole l'environnement de l'application."
  },
  {
    "id": 3,
    "ch": 1,
    "q": "Une image Docker : quelle définition est correcte ?",
    "o": [
      "Un port réseau",
      "Un modèle immuable servant à créer des conteneurs",
      "Un conteneur déjà lancé",
      "Un volume de sauvegarde"
    ],
    "a": 1,
    "e": "L'analogie POO du cours est très probable en examen."
  },
  {
    "id": 4,
    "ch": 1,
    "q": "Question probable - Une image Docker : que faut-il retenir ?",
    "o": [
      "Image = classe, conteneur = instance",
      "Image = instance, conteneur = classe",
      "Image = réseau, conteneur = DNS",
      "Image = uniquement un fichier texte"
    ],
    "a": 0,
    "e": "L'analogie POO du cours est très probable en examen."
  },
  {
    "id": 5,
    "ch": 1,
    "q": "VM vs conteneur : quelle définition est correcte ?",
    "o": [
      "Le conteneur contient toujours un hyperviseur",
      "La VM partage toujours le noyau hôte",
      "Les deux sont identiques",
      "La VM embarque un OS complet, le conteneur partage le noyau hôte"
    ],
    "a": 3,
    "e": "Le prof peut demander la différence en trois points: OS complet, noyau partagé, légèreté."
  },
  {
    "id": 6,
    "ch": 1,
    "q": "Question probable - VM vs conteneur : que faut-il retenir ?",
    "o": [
      "La VM ne peut jamais être isolée",
      "Le conteneur nécessite deux OS",
      "Le conteneur démarre plus vite et utilise moins de ressources qu'une VM",
      "Le conteneur est toujours plus lourd"
    ],
    "a": 2,
    "e": "Le prof peut demander la différence en trois points: OS complet, noyau partagé, légèreté."
  },
  {
    "id": 7,
    "ch": 1,
    "q": "Le noyau hôte : quelle définition est correcte ?",
    "o": [
      "Le noyau est un volume",
      "Les conteneurs utilisent le noyau du système d'exploitation hôte",
      "Chaque conteneur démarre son propre noyau",
      "Le noyau est stocké sur Docker Hub"
    ],
    "a": 1,
    "e": "Les namespaces, le système de fichiers isolé et les quotas expliquent l'isolation."
  },
  {
    "id": 8,
    "ch": 1,
    "q": "Question probable - Le noyau hôte : que faut-il retenir ?",
    "o": [
      "La conteneurisation s'appuie sur des mécanismes du kernel Linux",
      "Elle dépend seulement de Photoshop",
      "Elle demande obligatoirement une VM",
      "Elle supprime l'isolation"
    ],
    "a": 0,
    "e": "Les namespaces, le système de fichiers isolé et les quotas expliquent l'isolation."
  },
  {
    "id": 9,
    "ch": 1,
    "q": "Déploiement reproductible : quelle définition est correcte ?",
    "o": [
      "Chaque poste doit installer à la main",
      "L'image change toute seule selon le PC",
      "Docker interdit la production",
      "La même image peut servir en développement, test et production"
    ],
    "a": 3,
    "e": "Le cours insiste sur la fin des installations manuelles fragiles."
  },
  {
    "id": 10,
    "ch": 1,
    "q": "Question probable - Déploiement reproductible : que faut-il retenir ?",
    "o": [
      "Il supprime le besoin de versionner",
      "Il ne sert qu'aux images JPEG",
      "Docker réduit le problème 'ça marche sur ma machine'",
      "Il augmente les différences d'environnement"
    ],
    "a": 2,
    "e": "Le cours insiste sur la fin des installations manuelles fragiles."
  },
  {
    "id": 11,
    "ch": 1,
    "q": "Intégration continue : quelle définition est correcte ?",
    "o": [
      "Les tests ne peuvent fonctionner que localement",
      "Un conteneur propre peut être lancé pour chaque étape de test",
      "Un conteneur garde toujours les anciens tests",
      "La CI interdit Docker"
    ],
    "a": 1,
    "e": "Les conteneurs donnent des environnements jetables et identiques."
  },
  {
    "id": 12,
    "ch": 1,
    "q": "Question probable - Intégration continue : que faut-il retenir ?",
    "o": [
      "L'intérêt est d'éviter la pollution entre exécutions",
      "L'intérêt est de mélanger les environnements",
      "L'intérêt est de supprimer les logs",
      "L'intérêt est de rendre les tests manuels"
    ],
    "a": 0,
    "e": "Les conteneurs donnent des environnements jetables et identiques."
  },
  {
    "id": 13,
    "ch": 1,
    "q": "Artefact applicatif : quelle définition est correcte ?",
    "o": [
      "Un artefact est un utilisateur Docker",
      "Un artefact est un câble réseau",
      "Un artefact est forcément un conteneur lancé",
      "Une image peut être construite, taggée puis stockée dans un registre"
    ],
    "a": 3,
    "e": "Distribution d'artefacts: build, stockage, pull, exécution."
  },
  {
    "id": 14,
    "ch": 1,
    "q": "Question probable - Artefact applicatif : que faut-il retenir ?",
    "o": [
      "Le registre remplace le Dockerfile",
      "Le registre supprime les tags",
      "Le registre rend l'image récupérable par d'autres machines",
      "Le registre exécute le conteneur dans Photoshop"
    ],
    "a": 2,
    "e": "Distribution d'artefacts: build, stockage, pull, exécution."
  },
  {
    "id": 15,
    "ch": 1,
    "q": "Infrastructure as Code : quelle définition est correcte ?",
    "o": [
      "Elle désactive Docker Compose",
      "L'infrastructure est décrite dans des fichiers texte versionnables",
      "L'infrastructure est décrite oralement",
      "Elle ne peut pas être dans Git"
    ],
    "a": 1,
    "e": "Le cours présente Dockerfile et Compose comme description reproductible de l'infrastructure."
  },
  {
    "id": 16,
    "ch": 1,
    "q": "Question probable - Infrastructure as Code : que faut-il retenir ?",
    "o": [
      "Dockerfile et Compose servent aussi de documentation",
      "Ils remplacent le code source applicatif",
      "Ils ne doivent jamais être versionnés",
      "Ils sont des fichiers binaires"
    ],
    "a": 0,
    "e": "Le cours présente Dockerfile et Compose comme description reproductible de l'infrastructure."
  },
  {
    "id": 17,
    "ch": 1,
    "q": "Conteneur éphémère : quelle définition est correcte ?",
    "o": [
      "Il doit être modifié à la main pour toujours",
      "Il doit contenir les données critiques dans sa couche writable",
      "Il remplace la sauvegarde",
      "Un conteneur doit pouvoir être supprimé et recréé sans perdre l'application"
    ],
    "a": 3,
    "e": "Question vrai/faux probable: un conteneur est pensé comme éphémère."
  },
  {
    "id": 18,
    "ch": 1,
    "q": "Question probable - Conteneur éphémère : que faut-il retenir ?",
    "o": [
      "Les données ne peuvent pas être persistantes",
      "Les données doivent être dans l'image de base",
      "Les données persistantes doivent aller dans des volumes ou bind mounts",
      "Les données doivent rester uniquement dans la couche du conteneur"
    ],
    "a": 2,
    "e": "Question vrai/faux probable: un conteneur est pensé comme éphémère."
  },
  {
    "id": 19,
    "ch": 1,
    "q": "Avantages des conteneurs : quelle définition est correcte ?",
    "o": [
      "Impossible à transférer",
      "Démarrage rapide, images plus légères et meilleur partage des ressources",
      "Démarrage très lent",
      "OS complet obligatoire"
    ],
    "a": 1,
    "e": "Les avantages listés dans le PDF sont performance, rapidité et légèreté."
  },
  {
    "id": 20,
    "ch": 1,
    "q": "Question probable - Avantages des conteneurs : que faut-il retenir ?",
    "o": [
      "Ils coûtent moins en stockage qu'une image VM complète",
      "Ils ajoutent toujours plusieurs Go",
      "Ils ne partagent aucune couche",
      "Ils ne peuvent pas accéder au matériel"
    ],
    "a": 0,
    "e": "Les avantages listés dans le PDF sont performance, rapidité et légèreté."
  },
  {
    "id": 21,
    "ch": 2,
    "q": "Docker Engine : quelle définition est correcte ?",
    "o": [
      "Un format d'image PNG",
      "Un outil de retouche",
      "Un câble réseau",
      "Le service qui exécute et gère les conteneurs"
    ],
    "a": 3,
    "e": "Docker est présenté comme une application client-serveur."
  },
  {
    "id": 22,
    "ch": 2,
    "q": "Question probable - Docker Engine : que faut-il retenir ?",
    "o": [
      "Il fonctionne uniquement dans le navigateur",
      "Il ne manipule pas les conteneurs",
      "Il repose sur un daemon et une interface cliente",
      "Il n'a pas de serveur"
    ],
    "a": 2,
    "e": "Docker est présenté comme une application client-serveur."
  },
  {
    "id": 23,
    "ch": 2,
    "q": "Client Docker : quelle définition est correcte ?",
    "o": [
      "Un fichier de texture",
      "L'interface en ligne de commande utilisée par l'utilisateur",
      "Le noyau Linux",
      "Un registre public"
    ],
    "a": 1,
    "e": "Le client envoie les ordres, le daemon fait le travail."
  },
  {
    "id": 24,
    "ch": 2,
    "q": "Question probable - Client Docker : que faut-il retenir ?",
    "o": [
      "La commande docker parle au daemon Docker",
      "La commande docker remplace le daemon",
      "La commande docker est un format PDF",
      "La commande docker sert seulement au HTML"
    ],
    "a": 0,
    "e": "Le client envoie les ordres, le daemon fait le travail."
  },
  {
    "id": 25,
    "ch": 2,
    "q": "Registre Docker : quelle définition est correcte ?",
    "o": [
      "Un conteneur interactif",
      "Un volume tmpfs",
      "Une instruction RUN",
      "Un serveur qui stocke des images Docker"
    ],
    "a": 3,
    "e": "Le registre permet pull et push."
  },
  {
    "id": 26,
    "ch": 2,
    "q": "Question probable - Registre Docker : que faut-il retenir ?",
    "o": [
      "On y lance forcément tous les conteneurs",
      "On y configure les axes 3D",
      "On peut y pousser ou y récupérer des images",
      "On y crée des calques Photoshop"
    ],
    "a": 2,
    "e": "Le registre permet pull et push."
  },
  {
    "id": 27,
    "ch": 2,
    "q": "Docker Hub : quelle définition est correcte ?",
    "o": [
      "Une interface Unity",
      "Un registre public d'images Docker",
      "Un réseau bridge local",
      "Une commande de suppression"
    ],
    "a": 1,
    "e": "Docker Hub est l'exemple central du cours."
  },
  {
    "id": 28,
    "ch": 2,
    "q": "Question probable - Docker Hub : que faut-il retenir ?",
    "o": [
      "Les images officielles et utilisateurs peuvent s'y trouver",
      "Il ne contient que des volumes",
      "Il ne contient que des conteneurs arrêtés",
      "Il remplace docker build"
    ],
    "a": 0,
    "e": "Docker Hub est l'exemple central du cours."
  },
  {
    "id": 29,
    "ch": 2,
    "q": "docker pull : quelle définition est correcte ?",
    "o": [
      "Supprime un conteneur",
      "Affiche les logs",
      "Crée un volume",
      "Télécharge explicitement une image"
    ],
    "a": 3,
    "e": "Le PDF insiste sur pull et run au démarrage de hello-world."
  },
  {
    "id": 30,
    "ch": 2,
    "q": "Question probable - docker pull : que faut-il retenir ?",
    "o": [
      "docker pull démarre toujours le conteneur",
      "docker pull modifie le Dockerfile",
      "Si docker run ne trouve pas l'image localement, il peut la télécharger",
      "docker run ne télécharge jamais"
    ],
    "a": 2,
    "e": "Le PDF insiste sur pull et run au démarrage de hello-world."
  },
  {
    "id": 31,
    "ch": 2,
    "q": "docker run : quelle définition est correcte ?",
    "o": [
      "Liste les volumes",
      "Crée et exécute un conteneur à partir d'une image",
      "Construit une image depuis un Dockerfile",
      "Supprime un réseau"
    ],
    "a": 1,
    "e": "run est une commande incontournable."
  },
  {
    "id": 32,
    "ch": 2,
    "q": "Question probable - docker run : que faut-il retenir ?",
    "o": [
      "La commande utilise l'image, puis lance la commande définie par CMD ou ENTRYPOINT",
      "Elle ne crée jamais de conteneur",
      "Elle sert à exporter en PNG",
      "Elle configure seulement les DNS"
    ],
    "a": 0,
    "e": "run est une commande incontournable."
  },
  {
    "id": 33,
    "ch": 2,
    "q": "Tag d'image : quelle définition est correcte ?",
    "o": [
      "Une adresse IP de conteneur",
      "Un mot de passe admin",
      "Un type de lumière",
      "Un nom ou pointeur associé à une image"
    ],
    "a": 3,
    "e": "Le cours précise que tagger ajoute un pointeur."
  },
  {
    "id": 34,
    "ch": 2,
    "q": "Question probable - Tag d'image : que faut-il retenir ?",
    "o": [
      "Tagger lance un shell",
      "Tagger crée une VM",
      "Tagger ne renomme pas l'image, cela ajoute une référence",
      "Tagger supprime les couches"
    ],
    "a": 2,
    "e": "Le cours précise que tagger ajoute un pointeur."
  },
  {
    "id": 35,
    "ch": 2,
    "q": "Nom d'image : quelle définition est correcte ?",
    "o": [
      "Il est obligatoirement une adresse MAC",
      "Il peut indiquer un namespace utilisateur ou un registre privé",
      "Il doit toujours être seulement ubuntu",
      "Il ne peut jamais contenir de slash"
    ],
    "a": 1,
    "e": "Les noms d'images peuvent être officiels, utilisateur ou hébergés ailleurs."
  },
  {
    "id": 36,
    "ch": 2,
    "q": "Question probable - Nom d'image : que faut-il retenir ?",
    "o": [
      "registry.example.com:5000/mon/image désigne un registre self-hosted",
      "C'est un port publié",
      "C'est un volume nommé",
      "C'est un fichier CMYK"
    ],
    "a": 0,
    "e": "Les noms d'images peuvent être officiels, utilisateur ou hébergés ailleurs."
  },
  {
    "id": 37,
    "ch": 2,
    "q": "Layers : quelle définition est correcte ?",
    "o": [
      "Les images sont des pixels uniquement",
      "Les couches sont des ports TCP",
      "Les couches sont des utilisateurs",
      "Les images sont composées de couches en lecture seule"
    ],
    "a": 3,
    "e": "Les layers expliquent stockage, partage et build cache."
  },
  {
    "id": 38,
    "ch": 2,
    "q": "Question probable - Layers : que faut-il retenir ?",
    "o": [
      "Chaque couche démarre un OS complet",
      "Les couches empêchent le cache",
      "Chaque instruction de Dockerfile crée souvent une couche",
      "Chaque clic crée une couche Unity"
    ],
    "a": 2,
    "e": "Les layers expliquent stockage, partage et build cache."
  },
  {
    "id": 39,
    "ch": 2,
    "q": "Copy-on-Write : quelle définition est correcte ?",
    "o": [
      "Un volume devient un Dockerfile",
      "Une écriture crée une copie dans la couche writable",
      "Une lecture supprime la couche",
      "Un port écrit dans Docker Hub"
    ],
    "a": 1,
    "e": "Le PDF explique la couche supplémentaire du conteneur."
  },
  {
    "id": 40,
    "ch": 2,
    "q": "Question probable - Copy-on-Write : que faut-il retenir ?",
    "o": [
      "Les couches de l'image restent en lecture seule",
      "Toutes les couches sont modifiées directement",
      "Aucune couche n'est partagée",
      "Le conteneur n'a jamais de couche writable"
    ],
    "a": 0,
    "e": "Le PDF explique la couche supplémentaire du conteneur."
  },
  {
    "id": 41,
    "ch": 3,
    "q": "Dockerfile : quelle définition est correcte ?",
    "o": [
      "Une image déjà publiée",
      "Un conteneur en cours",
      "Un registre distant",
      "Une recette textuelle pour construire une image"
    ],
    "a": 3,
    "e": "Définition très probable en examen."
  },
  {
    "id": 42,
    "ch": 3,
    "q": "Question probable - Dockerfile : que faut-il retenir ?",
    "o": [
      "docker build supprime les volumes",
      "docker build est une commande Photoshop",
      "docker build crée une image à partir d'un Dockerfile",
      "docker build crée un Canvas"
    ],
    "a": 2,
    "e": "Définition très probable en examen."
  },
  {
    "id": 43,
    "ch": 3,
    "q": "FROM : quelle définition est correcte ?",
    "o": [
      "Liste les conteneurs",
      "Définit l'image de base",
      "Copie un fichier",
      "Expose un port"
    ],
    "a": 1,
    "e": "FROM est souvent la première instruction."
  },
  {
    "id": 44,
    "ch": 3,
    "q": "Question probable - FROM : que faut-il retenir ?",
    "o": [
      "Toute image part d'une image de base, ou de scratch",
      "FROM démarre Compose",
      "FROM publie sur Docker Hub",
      "FROM affiche les logs"
    ],
    "a": 0,
    "e": "FROM est souvent la première instruction."
  },
  {
    "id": 45,
    "ch": 3,
    "q": "RUN : quelle définition est correcte ?",
    "o": [
      "Définit le port hôte",
      "Démarre le conteneur final seulement",
      "Crée un réseau bridge",
      "Exécute une commande pendant la construction de l'image"
    ],
    "a": 3,
    "e": "RUN sert aux installations et préparations."
  },
  {
    "id": 46,
    "ch": 3,
    "q": "Question probable - RUN : que faut-il retenir ?",
    "o": [
      "RUN est une instruction d'export PNG",
      "RUN ne crée jamais de couche",
      "RUN apt-get update se fait au build",
      "RUN est exécuté uniquement quand on clique Play"
    ],
    "a": 2,
    "e": "RUN sert aux installations et préparations."
  },
  {
    "id": 47,
    "ch": 3,
    "q": "COPY : quelle définition est correcte ?",
    "o": [
      "Copie un calque Photoshop",
      "Copie un fichier du contexte vers l'image",
      "Copie un conteneur vers un port",
      "Copie une image vers Docker Hub"
    ],
    "a": 1,
    "e": "La notion de contexte est liée à COPY."
  },
  {
    "id": 48,
    "ch": 3,
    "q": "Question probable - COPY : que faut-il retenir ?",
    "o": [
      "Seuls les fichiers du contexte peuvent être copiés",
      "COPY peut copier n'importe où hors contexte sans règle",
      "COPY lance un shell interactif",
      "COPY remplace docker compose"
    ],
    "a": 0,
    "e": "La notion de contexte est liée à COPY."
  },
  {
    "id": 49,
    "ch": 3,
    "q": "EXPOSE : quelle définition est correcte ?",
    "o": [
      "Publie automatiquement le port sur l'hôte dans tous les cas",
      "Supprime le port",
      "Crée un volume",
      "Documente le port écouté par le conteneur"
    ],
    "a": 3,
    "e": "Question piège fréquente: exposer n'est pas forcément publier."
  },
  {
    "id": 50,
    "ch": 3,
    "q": "Question probable - EXPOSE : que faut-il retenir ?",
    "o": [
      "EXPOSE construit une image multi-stage",
      "EXPOSE télécharge Redis",
      "EXPOSE n'est pas la même chose que -p",
      "EXPOSE remplace docker run -p"
    ],
    "a": 2,
    "e": "Question piège fréquente: exposer n'est pas forcément publier."
  },
  {
    "id": 51,
    "ch": 3,
    "q": "CMD : quelle définition est correcte ?",
    "o": [
      "Copie les fichiers",
      "Définit la commande par défaut du conteneur",
      "Définit forcément l'image de base",
      "Interdit ENTRYPOINT"
    ],
    "a": 1,
    "e": "L'examen Docker montré insiste sur CMD."
  },
  {
    "id": 52,
    "ch": 3,
    "q": "Question probable - CMD : que faut-il retenir ?",
    "o": [
      "CMD peut être remplacée par une commande donnée à docker run",
      "CMD ne peut jamais être remplacée",
      "CMD sert uniquement au réseau",
      "CMD télécharge l'image"
    ],
    "a": 0,
    "e": "L'examen Docker montré insiste sur CMD."
  },
  {
    "id": 53,
    "ch": 3,
    "q": "ENTRYPOINT : quelle définition est correcte ?",
    "o": [
      "Liste les conteneurs",
      "Supprime un bridge",
      "Définit le registre",
      "Définit la commande principale toujours exécutée"
    ],
    "a": 3,
    "e": "CMD + ENTRYPOINT est un classique."
  },
  {
    "id": 54,
    "ch": 3,
    "q": "Question probable - ENTRYPOINT : que faut-il retenir ?",
    "o": [
      "ENTRYPOINT supprime les layers",
      "ENTRYPOINT sert à l'impression CMJN",
      "ENTRYPOINT fixe la commande de base, CMD donne souvent les paramètres par défaut",
      "ENTRYPOINT remplace FROM"
    ],
    "a": 2,
    "e": "CMD + ENTRYPOINT est un classique."
  },
  {
    "id": 55,
    "ch": 3,
    "q": "Build context : quelle définition est correcte ?",
    "o": [
      "La liste des conteneurs arrêtés",
      "Le répertoire envoyé au daemon pendant docker build",
      "Le registre public",
      "La mémoire tmpfs"
    ],
    "a": 1,
    "e": "Le PDF conseille de garder un contexte propre."
  },
  {
    "id": 56,
    "ch": 3,
    "q": "Question probable - Build context : que faut-il retenir ?",
    "o": [
      "Le Dockerfile doit être dans le contexte ou indiqué avec -f",
      "Le contexte est toujours C:/",
      "Le contexte n'est jamais envoyé",
      "Le contexte est un type de lumière"
    ],
    "a": 0,
    "e": "Le PDF conseille de garder un contexte propre."
  },
  {
    "id": 57,
    "ch": 3,
    "q": ".dockerignore : quelle définition est correcte ?",
    "o": [
      "Un fichier de QCM",
      "Une image vectorielle",
      "Une commande Compose",
      "Un fichier qui exclut des éléments du contexte de build"
    ],
    "a": 3,
    "e": "Bonne pratique importante pour les builds."
  },
  {
    "id": 58,
    "ch": 3,
    "q": "Question probable - .dockerignore : que faut-il retenir ?",
    "o": [
      "Il transforme CMD en ENTRYPOINT",
      "Il crée un volume nommé",
      "Il évite d'envoyer des fichiers inutiles ou sensibles au daemon",
      "Il publie automatiquement l'image"
    ],
    "a": 2,
    "e": "Bonne pratique importante pour les builds."
  },
  {
    "id": 59,
    "ch": 3,
    "q": "Build multi-stage : quelle définition est correcte ?",
    "o": [
      "Un volume en mémoire",
      "Un Dockerfile avec plusieurs FROM pour alléger l'image finale",
      "Un conteneur avec plusieurs noyaux",
      "Un réseau avec plusieurs DNS"
    ],
    "a": 1,
    "e": "Le PDF présente multi-stage pour créer une image plus petite."
  },
  {
    "id": 60,
    "ch": 3,
    "q": "Question probable - Build multi-stage : que faut-il retenir ?",
    "o": [
      "On peut copier depuis une étape précédente avec COPY --from",
      "Chaque stage est forcément conservé",
      "Multi-stage désactive COPY",
      "Multi-stage ne sert qu'à Docker Hub"
    ],
    "a": 0,
    "e": "Le PDF présente multi-stage pour créer une image plus petite."
  },
  {
    "id": 61,
    "ch": 4,
    "q": "docker ps : quelle définition est correcte ?",
    "o": [
      "Construit une image",
      "Télécharge une image",
      "Crée un Dockerfile",
      "Liste les conteneurs en cours d'exécution"
    ],
    "a": 3,
    "e": "Commande d'observation de base."
  },
  {
    "id": 62,
    "ch": 4,
    "q": "Question probable - docker ps : que faut-il retenir ?",
    "o": [
      "Il affiche uniquement les volumes",
      "Il modifie le CMD",
      "docker ps permet d'observer les conteneurs lancés",
      "Il exporte en PNG"
    ],
    "a": 2,
    "e": "Commande d'observation de base."
  },
  {
    "id": 63,
    "ch": 4,
    "q": "docker exec : quelle définition est correcte ?",
    "o": [
      "Supprime un volume",
      "Exécute une commande dans un conteneur déjà lancé",
      "Crée un registre",
      "Tagge une image"
    ],
    "a": 1,
    "e": "Le PDF montre docker exec -it ... bash."
  },
  {
    "id": 64,
    "ch": 4,
    "q": "Question probable - docker exec : que faut-il retenir ?",
    "o": [
      "docker exec -it peut ouvrir un shell dans le conteneur",
      "exec reconstruit l'image",
      "exec crée une VM complète",
      "exec remplace Docker Hub"
    ],
    "a": 0,
    "e": "Le PDF montre docker exec -it ... bash."
  },
  {
    "id": 65,
    "ch": 4,
    "q": "docker logs : quelle définition est correcte ?",
    "o": [
      "Publie une image",
      "Crée un bridge",
      "Convertit RGB en CMYK",
      "Affiche les logs d'un conteneur"
    ],
    "a": 3,
    "e": "Commande probable dans les QCM de manipulation."
  },
  {
    "id": 66,
    "ch": 4,
    "q": "Question probable - docker logs : que faut-il retenir ?",
    "o": [
      "logs supprime le conteneur",
      "logs lance Compose",
      "C'est utile pour observer ce qui se passe dans le conteneur",
      "Les logs sont toujours impossibles"
    ],
    "a": 2,
    "e": "Commande probable dans les QCM de manipulation."
  },
  {
    "id": 67,
    "ch": 4,
    "q": "Option -it : quelle définition est correcte ?",
    "o": [
      "Crée un volume nommé",
      "Ouvre une session interactive avec pseudo-terminal",
      "Lance toujours en arrière-plan",
      "Publie tous les ports"
    ],
    "a": 1,
    "e": "Le PDF montre docker run -it ubuntu."
  },
  {
    "id": 68,
    "ch": 4,
    "q": "Question probable - Option -it : que faut-il retenir ?",
    "o": [
      "On l'utilise pour entrer dans un conteneur Debian ou Ubuntu",
      "Elle sert à Docker Hub uniquement",
      "Elle désactive le terminal",
      "Elle crée une texture"
    ],
    "a": 0,
    "e": "Le PDF montre docker run -it ubuntu."
  },
  {
    "id": 69,
    "ch": 4,
    "q": "Option -d : quelle définition est correcte ?",
    "o": [
      "Ouvre un terminal interactif",
      "Supprime l'image",
      "Construit l'image",
      "Lance un conteneur en arrière-plan"
    ],
    "a": 3,
    "e": "Le détaché est central pour les services."
  },
  {
    "id": 70,
    "ch": 4,
    "q": "Question probable - Option -d : que faut-il retenir ?",
    "o": [
      "Elle imprime en 300 DPI",
      "Elle crée un tag latest",
      "Pratique pour un serveur web comme nginx",
      "Elle remplace -p"
    ],
    "a": 2,
    "e": "Le détaché est central pour les services."
  },
  {
    "id": 71,
    "ch": 4,
    "q": "Publication de port -p : quelle définition est correcte ?",
    "o": [
      "Crée une image de base",
      "Associe un port hôte à un port conteneur",
      "Copie un fichier vers l'image",
      "Définit un calque"
    ],
    "a": 1,
    "e": "Le PDF détaille -p port-on-host:port-on-container."
  },
  {
    "id": 72,
    "ch": 4,
    "q": "Question probable - Publication de port -p : que faut-il retenir ?",
    "o": [
      "docker run -p 8000:80 nginx publie le port 80 du conteneur sur 8000 hôte",
      "8000 est le port conteneur dans cet exemple",
      "La commande ne publie rien",
      "Elle remplace EXPOSE dans le Dockerfile"
    ],
    "a": 0,
    "e": "Le PDF détaille -p port-on-host:port-on-container."
  },
  {
    "id": 73,
    "ch": 4,
    "q": "Réseau bridge : quelle définition est correcte ?",
    "o": [
      "Un registre distant",
      "Un système de fichiers",
      "Un format d'image",
      "Réseau Docker local reliant des conteneurs sur une machine"
    ],
    "a": 3,
    "e": "Réseau Docker = drivers bridge, host, overlay, none."
  },
  {
    "id": 74,
    "ch": 4,
    "q": "Question probable - Réseau bridge : que faut-il retenir ?",
    "o": [
      "Le bridge remplace les volumes",
      "Le bridge est une image Docker",
      "Le bridge par défaut existe, mais un bridge utilisateur donne la résolution de noms",
      "Le bridge utilisateur interdit le DNS"
    ],
    "a": 2,
    "e": "Réseau Docker = drivers bridge, host, overlay, none."
  },
  {
    "id": 75,
    "ch": 4,
    "q": "Driver host : quelle définition est correcte ?",
    "o": [
      "Il stocke les données",
      "Le conteneur utilise directement le réseau de l'hôte",
      "Il crée un réseau multi-hôtes",
      "Il isole tous les ports par namespace privé"
    ],
    "a": 1,
    "e": "Le PDF compare host et bridge."
  },
  {
    "id": 76,
    "ch": 4,
    "q": "Question probable - Driver host : que faut-il retenir ?",
    "o": [
      "Il est moins isolé côté ports mais peut être plus performant",
      "Il est toujours recommandé pour tous les cas",
      "Il supprime le besoin de noyau",
      "Il sert à créer un Dockerfile"
    ],
    "a": 0,
    "e": "Le PDF compare host et bridge."
  },
  {
    "id": 77,
    "ch": 4,
    "q": "Volume Docker : quelle définition est correcte ?",
    "o": [
      "Couche supprimée à l'arrêt",
      "Instruction Dockerfile",
      "Port réseau",
      "Stockage géré par Docker sur l'hôte"
    ],
    "a": 3,
    "e": "Les volumes sont la réponse aux données persistantes."
  },
  {
    "id": 78,
    "ch": 4,
    "q": "Question probable - Volume Docker : que faut-il retenir ?",
    "o": [
      "Il est seulement en RAM",
      "Il remplace CMD",
      "Un volume permet de conserver et partager des données",
      "Il ne peut jamais persister"
    ],
    "a": 2,
    "e": "Les volumes sont la réponse aux données persistantes."
  },
  {
    "id": 79,
    "ch": 4,
    "q": "Bind mount : quelle définition est correcte ?",
    "o": [
      "Lumière directionnelle",
      "Montage d'un chemin précis de l'hôte dans le conteneur",
      "Registre public d'images",
      "Instruction FROM"
    ],
    "a": 1,
    "e": "Différence volume/bind mount très probable."
  },
  {
    "id": 80,
    "ch": 4,
    "q": "Question probable - Bind mount : que faut-il retenir ?",
    "o": [
      "Utile pour partager du code source ou de la configuration",
      "Il est toujours géré dans un dossier Docker opaque",
      "Il ne peut pas utiliser un chemin hôte",
      "Il supprime les fichiers de l'image"
    ],
    "a": 0,
    "e": "Différence volume/bind mount très probable."
  },
  {
    "id": 81,
    "ch": 5,
    "q": "Docker Compose : quelle définition est correcte ?",
    "o": [
      "Un outil de retouche photo",
      "Un driver de lumière",
      "Un format JPEG",
      "Outil pour décrire et démarrer une application multi-conteneurs"
    ],
    "a": 3,
    "e": "Le PDF finit par Compose, donc c'est une zone d'examen forte."
  },
  {
    "id": 82,
    "ch": 5,
    "q": "Question probable - Docker Compose : que faut-il retenir ?",
    "o": [
      "Il ne gère pas les réseaux",
      "Il interdit les volumes",
      "Il lit un fichier YAML et lance les services avec docker compose up",
      "Il lit uniquement des PDF"
    ],
    "a": 2,
    "e": "Le PDF finit par Compose, donc c'est une zone d'examen forte."
  },
  {
    "id": 83,
    "ch": 5,
    "q": "services : quelle définition est correcte ?",
    "o": [
      "Les erreurs de build",
      "Les composants d'une application Compose",
      "Les pixels d'une image",
      "Les axes d'un repère"
    ],
    "a": 1,
    "e": "Dans l'exemple: web et redis sont deux services."
  },
  {
    "id": 84,
    "ch": 5,
    "q": "Question probable - services : que faut-il retenir ?",
    "o": [
      "Chaque service correspond généralement à un conteneur créé",
      "Un service est toujours un volume",
      "Un service est un tag Docker Hub",
      "Un service ne peut pas avoir d'image"
    ],
    "a": 0,
    "e": "Dans l'exemple: web et redis sont deux services."
  },
  {
    "id": 85,
    "ch": 5,
    "q": "depends_on : quelle définition est correcte ?",
    "o": [
      "Expose un port",
      "Copie un fichier",
      "Crée une image de base",
      "Déclare une dépendance de démarrage entre services"
    ],
    "a": 3,
    "e": "Attention du PDF: démarré ne veut pas dire prêt."
  },
  {
    "id": 86,
    "ch": 5,
    "q": "Question probable - depends_on : que faut-il retenir ?",
    "o": [
      "depends_on supprime les volumes",
      "depends_on remplace image",
      "Compose démarre dans l'ordre des dépendances, sans garantir que l'application soit prête",
      "depends_on attend toujours que la base soit totalement prête"
    ],
    "a": 2,
    "e": "Attention du PDF: démarré ne veut pas dire prêt."
  },
  {
    "id": 87,
    "ch": 5,
    "q": "docker compose up : quelle définition est correcte ?",
    "o": [
      "Convertit une image",
      "Démarre la composition",
      "Supprime tout",
      "Liste les images seulement"
    ],
    "a": 1,
    "e": "Commande centrale de Compose."
  },
  {
    "id": 88,
    "ch": 5,
    "q": "Question probable - docker compose up : que faut-il retenir ?",
    "o": [
      "Avec -d, la composition démarre en arrière-plan",
      "-d signifie delete",
      "-d signifie Dockerfile",
      "-d signifie DPI"
    ],
    "a": 0,
    "e": "Commande centrale de Compose."
  },
  {
    "id": 89,
    "ch": 5,
    "q": "docker compose down : quelle définition est correcte ?",
    "o": [
      "Construit une seule image sans contexte",
      "Affiche seulement les logs",
      "Ajoute un calque Photoshop",
      "Arrête et supprime les ressources créées par Compose"
    ],
    "a": 3,
    "e": "Le PDF liste up, ps, kill, rm, down."
  },
  {
    "id": 90,
    "ch": 5,
    "q": "Question probable - docker compose down : que faut-il retenir ?",
    "o": [
      "Il lance les services",
      "Il remplace docker pull",
      "Il peut supprimer conteneurs, réseaux et parfois volumes selon options",
      "Il ne touche jamais les réseaux"
    ],
    "a": 2,
    "e": "Le PDF liste up, ps, kill, rm, down."
  },
  {
    "id": 91,
    "ch": 5,
    "q": "build ou image : quelle définition est correcte ?",
    "o": [
      "Chaque service doit être une VM",
      "Chaque service Compose doit définir une source d'image",
      "Chaque service doit définir CMYK",
      "Chaque service doit avoir une caméra"
    ],
    "a": 1,
    "e": "Le PDF explique build et image dans Compose."
  },
  {
    "id": 92,
    "ch": 5,
    "q": "Question probable - build ou image : que faut-il retenir ?",
    "o": [
      "build indique le chemin du Dockerfile, image indique l'image à utiliser",
      "build indique le port hôte",
      "image indique un volume seulement",
      "Les deux sont interdits ensemble"
    ],
    "a": 0,
    "e": "Le PDF explique build et image dans Compose."
  },
  {
    "id": 93,
    "ch": 5,
    "q": "Volumes Compose : quelle définition est correcte ?",
    "o": [
      "Ils définissent la couleur",
      "Ils remplacent les ports",
      "Ils créent l'image de base",
      "Ils déclarent et montent la persistance dans les services"
    ],
    "a": 3,
    "e": "Les services stateful ont besoin de persistance."
  },
  {
    "id": 94,
    "ch": 5,
    "q": "Question probable - Volumes Compose : que faut-il retenir ?",
    "o": [
      "Il ne peut pas être partagé",
      "Il n'existe qu'en mémoire",
      "Un volume nommé peut être réutilisé au redémarrage",
      "Il est écrasé à chaque up"
    ],
    "a": 2,
    "e": "Les services stateful ont besoin de persistance."
  },
  {
    "id": 95,
    "ch": 5,
    "q": "Découverte de service : quelle définition est correcte ?",
    "o": [
      "Ils ne peuvent jamais communiquer",
      "Les services se contactent par leur nom dans le réseau Compose",
      "Ils doivent deviner l'adresse IP à la main",
      "Ils communiquent par Photoshop"
    ],
    "a": 1,
    "e": "Le PDF insiste sur les noms de services."
  },
  {
    "id": 96,
    "ch": 5,
    "q": "Question probable - Découverte de service : que faut-il retenir ?",
    "o": [
      "web peut contacter redis avec le nom redis",
      "web doit utiliser l'IP fixe du PDF",
      "redis est forcément un volume",
      "Le DNS Compose est interdit"
    ],
    "a": 0,
    "e": "Le PDF insiste sur les noms de services."
  },
  {
    "id": 97,
    "ch": 5,
    "q": "Fichier YAML Compose : quelle définition est correcte ?",
    "o": [
      "Il contient uniquement des images JPEG",
      "Il remplace le noyau Linux",
      "Il sert à ouvrir un shell",
      "Le fichier décrit services, ports, volumes et dépendances"
    ],
    "a": 3,
    "e": "Le YAML est la documentation exécutable de l'application."
  },
  {
    "id": 98,
    "ch": 5,
    "q": "Question probable - Fichier YAML Compose : que faut-il retenir ?",
    "o": [
      "Il est toujours binaire",
      "Il n'est pas lisible",
      "docker-compose.yml est une forme d'Infrastructure as Code",
      "Il ne doit jamais être versionné"
    ],
    "a": 2,
    "e": "Le YAML est la documentation exécutable de l'application."
  },
  {
    "id": 99,
    "ch": 5,
    "q": "Mise à jour de service : quelle définition est correcte ?",
    "o": [
      "Compose transforme les conteneurs en VM",
      "Compose recrée un service si son image a changé",
      "Compose ne détecte jamais les changements",
      "Compose supprime toujours les données des volumes"
    ],
    "a": 1,
    "e": "Le PDF mentionne la mise à jour et la réutilisation des volumes."
  },
  {
    "id": 100,
    "ch": 5,
    "q": "Question probable - Mise à jour de service : que faut-il retenir ?",
    "o": [
      "Les volumes existants peuvent être réutilisés pour conserver l'état",
      "L'état doit être dans la couche writable",
      "L'état doit être dans CMD",
      "L'état ne peut pas persister"
    ],
    "a": 0,
    "e": "Le PDF mentionne la mise à jour et la réutilisation des volumes."
  }
];
