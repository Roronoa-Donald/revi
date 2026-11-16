'use strict';

module.exports = [
  {
    "id": "hk3-c2-e1",
    "chapter": 2,
    "level": "n1",
    "language": "analyse",
    "title": "La collecte passive avant le bug bounty de Petibonum",
    "exampleTitle": "Exemple résolu — la divulgation responsable de la ville de Périgny",
    "goal": "Recenser les résultats d'une phase de reconnaissance passive sans jamais interroger la cible.",
    "brief": "<p><strong>Énoncé.</strong> Petibonum, PME de 60 salariés qui vend des accessoires de randonnée en ligne, publie un programme de bug bounty sur son domaine petibonum.fr. Avant tout test actif, la chasseuse de primes rassemble ses constats de collecte passive, obtenus sans jamais interroger les serveurs de l'entreprise :</p><table><tr><th>Source</th><th>Requête ou outil</th><th>Résultat</th></tr><tr><th>Google</th><td><code>site:petibonum.fr filetype:pdf</code></td><td>8 fiches produits indexées</td></tr><tr><th>Google</th><td><code>intitle:\"index of\" site:petibonum.fr</code></td><td>1 page d'index de répertoire</td></tr><tr><th>Shodan</th><td><code>http.title:\"petibonum\"</code></td><td>3 serveurs exposés</td></tr><tr><th>theHarvester</th><td>domaine petibonum.fr</td><td>15 adresses e-mail, 22 sous-domaines</td></tr><tr><th>WHOIS</th><td>petibonum.fr</td><td>Domaine créé en 2014, registrar français</td></tr></table><ol><li>Combien d'adresses e-mail professionnelles la collecte a-t-elle exposées ?</li><li>Combien de sous-domaines theHarvester a-t-il découverts ?</li><li>Quel moteur de recherche spécialisé recense les équipements connectés exposés sur Internet ?</li><li>Quel opérateur de recherche Google limite les résultats à un type de fichier précis ?</li><li>Pourquoi cette phase est-elle dite « passive » : aucun paquet n'est envoyé vers quel système ?</li></ol>",
    "starter": "# Exercice — La collecte passive avant le bug bounty de Petibonum\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 et 2 : un nombre. Questions 3 à 5 : quelques mots.\n\n[Question 1 — Adresses e-mail exposées]\nA_COMPLETER\n\n[Question 2 — Sous-domaines découverts]\nA_COMPLETER\n\n[Question 3 — Moteur de recherche des équipements exposés]\nA_COMPLETER\n\n[Question 4 — Opérateur Google limitant à un type de fichier]\nA_COMPLETER\n\n[Question 5 — Système qui ne reçoit aucune requête pendant la phase passive]\nA_COMPLETER\n",
    "hints": [
      "Lisez la ligne du tableau theHarvester : elle porte à la fois le nombre d'adresses e-mail et le nombre de sous-domaines.",
      "Deux moteurs apparaissent dans le tableau : celui de l'entreprise et un moteur spécialisé dans les équipements connectés.",
      "Une phase est passive quand toutes les informations viennent d'intermédiaires (caches, archives, registres) et qu'aucune requête ne part directement vers l'infrastructure testée."
    ],
    "examples": [
      {
        "stdin": "La ville de Périgny accepte la divulgation responsable sur son portail. Collecte passive :\nGoogle site:perigny.fr filetype:pdf : 12 documents indexés ;\nGoogle intitle:\"index of\" site:perigny.fr : 0 page ;\nShodan http.title:\"perigny\" : 2 serveurs exposés ;\ntheHarvester : 9 adresses e-mail et 17 sous-domaines.\n\n1) 9 adresses e-mail exposées. 2) 17 sous-domaines découverts. 3) Shodan recense les équipements exposés.\n4) filetype: limite aux fichiers PDF. 5) Aucun paquet n'est envoyé vers la cible.",
        "expected": "9 e-mails — 17 sous-domaines — Shodan — filetype: — aucun paquet vers la cible",
        "note": "Toutes ces informations viennent d'index tiers : la mairie ne voit aucune requête suspecte dans ses journaux pendant toute la phase."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Adresses e-mail exposées",
        "stdin": "q:1",
        "expected": "15"
      },
      {
        "label": "Question 2 — Sous-domaines découverts",
        "stdin": "q:2",
        "expected": "22"
      },
      {
        "label": "Question 3 — Moteur des équipements exposés",
        "stdin": "q:3",
        "expected": "shodan||Shodan"
      },
      {
        "label": "Question 4 — Opérateur Google pour un type de fichier",
        "stdin": "q:4",
        "expected": "filetype||filetype:||l'opérateur filetype"
      },
      {
        "label": "Question 5 — Système non sollicité en phase passive",
        "stdin": "q:5",
        "expected": "la cible||cible||les serveurs de la cible||l'infrastructure de la cible"
      }
    ],
    "solution": "[Question 1 — Adresses e-mail exposées]\n15\n\n[Question 2 — Sous-domaines découverts]\n22\n\n[Question 3 — Moteur de recherche des équipements exposés]\nshodan\n\n[Question 4 — Opérateur Google limitant à un type de fichier]\nfiletype\n\n[Question 5 — Système qui ne reçoit aucune requête pendant la phase passive]\nla cible",
    "takeaway": "1) theHarvester a exposé 15 adresses e-mail professionnelles, utilisables ensuite pour des simulations d'hameçonnage autorisées.\n2) Il a également découvert 22 sous-domaines, autant de portes d'entrée potentielles pour la suite du test.\n3) Shodan est le moteur qui recense les équipements connectés exposés sur Internet, ici 3 serveurs.\n4) L'opérateur filetype: limite les résultats de Google à un type de fichier, par exemple filetype:pdf.\n5) La phase est passive car aucun paquet n'est envoyé vers la cible : tout vient d'index et de registres tiers.\nContrôle : 15 e-mails + 22 sous-domaines + 3 serveurs Shodan = 40 éléments de renseignement collectés sans toucher l'infrastructure de Petibonum."
  },
  {
    "id": "hk3-c2-e2",
    "chapter": 2,
    "level": "n2",
    "language": "analyse",
    "title": "L'audit DNS et anti-usurpation de la ville de Saint-Rémy",
    "exampleTitle": "Exemple résolu — l'audit DNS de l'université de Marval",
    "goal": "Interpréter un transfert de zone AXFR et des enregistrements SPF, DMARC et DKIM pour mesurer le risque d'usurpation.",
    "brief": "<p><strong>Énoncé.</strong> La ville de Saint-Rémy confie un test d'intrusion de son domaine saint-remy.fr. Pendant la phase de reconnaissance, l'auditeur interroge l'infrastructure DNS et relève les constats suivants :</p><ul><li>Transfert de zone demandé au serveur <code>ns1.saint-remy.fr</code> : <strong>autorisé</strong> ; la zone complète compte 142 enregistrements, dont 34 sous-domaines internes (vpn, intranet, supervision, caméras).</li><li>Enregistrement SPF : <code>v=spf1 include:_spf.provider-mail.fr ip4:185.12.34.5 -all</code></li><li>Enregistrement DMARC : <code>v=DMARC1; p=none; rua=mailto:dmarc@saint-remy.fr</code></li><li>Enregistrement DKIM : deux sélecteurs actifs.</li></ul><ol><li>Le transfert de zone AXFR a-t-il été accepté ou refusé par le serveur ?</li><li>Combien de sous-domaines internes l'AXFR a-t-il révélés ?</li><li>La politique SPF se termine par « -all » : que subissent les messages envoyés depuis des serveurs non autorisés ?</li><li>Quelle est la valeur actuelle de la politique DMARC (le champ p=) ?</li><li>Quelle valeur faudrait-il donner à p= pour rejeter les messages usurpés ?</li><li>Quel enregistrement, complémentaire de SPF et DMARC, signe cryptographiquement les messages ?</li></ol>",
    "starter": "# Exercice — L'audit DNS et anti-usurpation de la ville de Saint-Rémy\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Question 2 : un nombre. Questions 1, 3, 4 et 5 : un mot. Question 6 : un sigle.\n\n[Question 1 — Verdict du transfert de zone AXFR]\nA_COMPLETER\n\n[Question 2 — Sous-domaines internes révélés]\nA_COMPLETER\n\n[Question 3 — Sort des messages depuis des serveurs non autorisés]\nA_COMPLETER\n\n[Question 4 — Valeur actuelle de la politique DMARC]\nA_COMPLETER\n\n[Question 5 — Valeur de p= pour rejeter les messages usurpés]\nA_COMPLETER\n\n[Question 6 — Enregistrement qui signe les messages]\nA_COMPLETER\n",
    "hints": [
      "Un AXFR accepté livre la zone complète à n'importe qui qui la demande : relisez le premier constat pour le verdict et le nombre de sous-domaines.",
      "En SPF, « -all » est un échec dur : les serveurs non listés ne doivent pas être crus ; « ~all » serait un simple soupçon.",
      "Les valeurs possibles du champ p= de DMARC sont none (surveillance), quarantine (mise à l'écart) et reject (rejet) ; la signature cryptographique des messages relève d'un autre enregistrement."
    ],
    "examples": [
      {
        "stdin": "L'université de Marval audite son domaine marval.fr. Constats :\nAXFR vers ns1.marval.fr : refusé, 0 sous-domaine révélé.\nSPF : v=spf1 include:_spf.google.com ip4:142.250.10.20 -all\nDMARC : v=DMARC1; p=quarantine; rua=mailto:dmarc@marval.fr\nDKIM : un sélecteur actif.\n\n1) L'AXFR a été refusé. 2) 0 sous-domaine révélé. 3) Les messages non autorisés sont rejetés (échec dur).\n4) La politique DMARC vaut quarantine. 5) Pour rejeter : p=reject. 6) DKIM signe les messages.",
        "expected": "AXFR refusé — 0 sous-domaine — rejet — p=quarantine — p=reject pour rejeter — DKIM",
        "note": "Marval protège sa zone (AXFR refusé) et applique déjà un DMARC actif : seul Saint-Rémy, avec p=none, laisse passer les usurpations."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Verdict de l'AXFR",
        "stdin": "q:1",
        "expected": "accepté||accepte||autorisé||il a été accepté"
      },
      {
        "label": "Question 2 — Sous-domaines révélés",
        "stdin": "q:2",
        "expected": "34"
      },
      {
        "label": "Question 3 — Sort des messages non autorisés",
        "stdin": "q:3",
        "expected": "un rejet||rejet||refus||ils sont rejetés||rejetés"
      },
      {
        "label": "Question 4 — Valeur actuelle de la politique DMARC",
        "stdin": "q:4",
        "expected": "none||p=none||aucune||aucune politique"
      },
      {
        "label": "Question 5 — Valeur de p= pour rejeter",
        "stdin": "q:5",
        "expected": "reject||p=reject"
      },
      {
        "label": "Question 6 — Enregistrement qui signe les messages",
        "stdin": "q:6",
        "expected": "dkim||DKIM||l'enregistrement dkim"
      }
    ],
    "solution": "[Question 1 — Verdict du transfert de zone AXFR]\naccepté\n\n[Question 2 — Sous-domaines internes révélés]\n34\n\n[Question 3 — Sort des messages depuis des serveurs non autorisés]\nun rejet\n\n[Question 4 — Valeur actuelle de la politique DMARC]\nnone\n\n[Question 5 — Valeur de p= pour rejeter les messages usurpés]\nreject\n\n[Question 6 — Enregistrement qui signe les messages]\ndkim",
    "takeaway": "1) Le serveur ns1.saint-remy.fr a autorisé le transfert de zone : n'importe qui peut récupérer la zone complète.\n2) L'AXFR a révélé 34 sous-domaines internes, dont vpn, intranet et supervision.\n3) Le « -all » de SPF est un échec dur : les messages venus de serveurs non autorisés subissent un rejet.\n4) La politique DMARC actuelle vaut p=none : la ville collecte des rapports mais n'agit pas sur les messages usurpés.\n5) Pour rejeter les usurpations, il faudrait passer à p=reject (l'étape intermédiaire usuelle étant p=quarantine).\n6) L'enregistrement DKIM signe cryptographiquement les messages et complète SPF et DMARC.\nContrôle : 142 enregistrements dans la zone, dont 34 sous-domaines internes : plus du quart de la zone décrit une infrastructure interne qui n'aurait jamais dû être publiée."
  },
  {
    "id": "hk3-c2-e3",
    "chapter": 2,
    "title": "Comparaison de réponses DNS avec une adresse témoin",
    "level": "n3",
    "language": "analyse",
    "goal": "Regrouper des réponses DNS sans conclure à la légitimité des noms.",
    "brief": "<p>Dans ce modèle, une adresse témoin est fournie avec des réponses DNS fictives. Classez les noms selon que leur adresse est égale ou non à cette adresse ; si le témoin vaut <code>NONE</code>, tous les noms vont dans la seconde liste. L’égalité d’IP ne prouve pas qu’un nom soit fictif : un nom réel peut partager cette adresse. Une IP différente ne prouve pas non plus la légitimité ou l’existence d’un service. Recoupez les observations dans le cadre autorisé.</p><p>Pour <code>SUBDOMAIN_FUZZ domain=&lt;dom&gt; wildcard_ip=&lt;ip|NONE&gt; responses=&lt;nom:ip,...&gt;</code>, trier chaque liste de noms complets et afficher <code>SUBDOMAIN_GROUP: domain=&lt;dom&gt; total=&lt;N&gt; meme_ip=&lt;M&gt; noms_meme=&lt;liste|NONE&gt; autre_ip=&lt;A&gt; noms_autres=&lt;liste|NONE&gt;</code>.</p>",
    "starter": "# Grille d'analyse (hk3-c2-e3) — Comparaison de réponses DNS avec une adresse témoin\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Aucune adresse témoin]\n# Données : SUBDOMAIN_FUZZ domain=corp.org wildcard_ip=NONE responses=vpn:10.0.0.1,api:10.0.0.2\nA_COMPLETER\n\n[Cas 2 — Trois réponses à la même adresse]\n# Données : SUBDOMAIN_FUZZ domain=wildcard-all.net wildcard_ip=172.16.0.50 responses=a:172.16.0.50,b:172.16.0.50,c:172.16.0.50\nA_COMPLETER\n\n[Cas 3 — Adresses mélangées et ordre alphabétique]\n# Données : SUBDOMAIN_FUZZ domain=cloud.dev wildcard_ip=1.1.1.1 responses=gitlab:10.1.1.5,bogus:1.1.1.1,auth:10.1.1.2,monitor:10.1.1.9\nA_COMPLETER\n",
    "hints": [
      "Comparer les adresses seulement ; ne pas décider si un nom est réel ou fictif.",
      "Trier chaque liste alphabétiquement et écrire NONE pour une liste vide.",
      "Comparez chaque IP résolue à l IP témoin du domaine ; un écart d IP ou un sous-domaine manquant indique un hôte distinct sans préjuger de sa légitimité."
    ],
    "examples": [
      {
        "stdin": "SUBDOMAIN_FUZZ domain=example.com wildcard_ip=192.168.1.100 responses=admin:192.168.1.5,fake99:192.168.1.100,mail:192.168.1.6,testabc:192.168.1.100",
        "expected": "SUBDOMAIN_GROUP: domain=example.com total=4 meme_ip=2 noms_meme=fake99.example.com,testabc.example.com autre_ip=2 noms_autres=admin.example.com,mail.example.com",
        "note": "Les deux listes sont des regroupements, pas des verdicts sur les noms."
      }
    ],
    "tests": [
      {
        "label": "Aucune adresse témoin",
        "stdin": "cas:1",
        "expected": "SUBDOMAIN_GROUP: domain=corp.org total=2 meme_ip=0 noms_meme=NONE autre_ip=2 noms_autres=api.corp.org,vpn.corp.org"
      },
      {
        "label": "Trois réponses à la même adresse",
        "stdin": "cas:2",
        "expected": "SUBDOMAIN_GROUP: domain=wildcard-all.net total=3 meme_ip=3 noms_meme=a.wildcard-all.net,b.wildcard-all.net,c.wildcard-all.net autre_ip=0 noms_autres=NONE"
      },
      {
        "label": "Adresses mélangées et ordre alphabétique",
        "stdin": "cas:3",
        "expected": "SUBDOMAIN_GROUP: domain=cloud.dev total=4 meme_ip=1 noms_meme=bogus.cloud.dev autre_ip=3 noms_autres=auth.cloud.dev,gitlab.cloud.dev,monitor.cloud.dev"
      }
    ],
    "solution": "[Exemple]\nSUBDOMAIN_GROUP: domain=example.com total=4 meme_ip=2 noms_meme=fake99.example.com,testabc.example.com autre_ip=2 noms_autres=admin.example.com,mail.example.com\n\n[Cas 1 — Aucune adresse témoin]\nSUBDOMAIN_GROUP: domain=corp.org total=2 meme_ip=0 noms_meme=NONE autre_ip=2 noms_autres=api.corp.org,vpn.corp.org\n\n[Cas 2 — Trois réponses à la même adresse]\nSUBDOMAIN_GROUP: domain=wildcard-all.net total=3 meme_ip=3 noms_meme=a.wildcard-all.net,b.wildcard-all.net,c.wildcard-all.net autre_ip=0 noms_autres=NONE\n\n[Cas 3 — Adresses mélangées et ordre alphabétique]\nSUBDOMAIN_GROUP: domain=cloud.dev total=4 meme_ip=1 noms_meme=bogus.cloud.dev autre_ip=3 noms_autres=auth.cloud.dev,gitlab.cloud.dev,monitor.cloud.dev\n",
    "takeaway": "À retenir : Regrouper des réponses DNS sans conclure à la légitimité des noms.\nRepère : Les deux listes sont des regroupements, pas des verdicts sur les noms."
  }
];
