# Référentiels Externes, Benchmarks et Justification des Choix Pédagogiques

Ce document consigne les ressources éducatives et académiques externes réelles, vérifiables et effectivement consultées lors de l'audit didactique de [REVI-MU](file:///home/rd/Desktop/proba). 

Il démontre pourquoi les exercices conservés et adaptés apportent une valeur intellectuelle et professionnelle supérieure aux anciens exercices mécaniques basés sur la saisie de chaînes artificielles.

---

## 1. Famille Mathématiques, Statistiques et Recherche Opérationnelle

### A. Références consultées
1. **MIT OpenCourseWare — *18.05 Introduction to Probability and Statistics***
   - *Auteurs :* Prof. Jeremy Orloff, Dr. Jonathan Bloom (Massachusetts Institute of Technology, Spring 2014).
   - *Accès :* [https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2014/](https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2014/)
   - *Licence :* Creative Commons BY-NC-SA 4.0.
   - *Notions exploitées :* Probabilités conditionnelles, théorème de Bayes, espérance discrète, lois usuelles, estimation par intervalle.
   - *Apport pédagogique :* Approche orientée « intuition probabiliste » évitant la simple manipulation calculatoire sans signification concrète.
2. **MIT OpenCourseWare — *15.053 Optimization Methods in Management Science***
   - *Auteur :* Prof. James Orlin (MIT Sloan School of Management, Spring 2013).
   - *Accès :* [https://ocw.mit.edu/courses/15-053-optimization-methods-in-management-science-spring-2013/](https://ocw.mit.edu/courses/15-053-optimization-methods-in-management-science-spring-2013/)
   - *Licence :* Creative Commons BY-NC-SA 4.0.
   - *Notions exploitées :* Modélisation linéaire formelle, formulation de contraintes contractuelles d'égalité, hypothèses de Dantzig (proportionnalité, additivité, divisibilité, certitude), variables d'écart (*slacks*).
   - *Apport pédagogique :* Structuration en 3 étapes : identification des variables de décision $\rightarrow$ formulation de la fonction objectif $\rightarrow$ écriture des contraintes techniques et de signe.
3. **Inria / Université Paris-Saclay — *Optimisation linéaire et recherche opérationnelle***
   - *Auteurs :* Philippe Baptiste, Colin de la Higuera.
   - *Accès :* [https://inria.fr](https://inria.fr)
   - *Notions exploitées :* Algorithme du simplexe, dualité, optimisation sur réseau (transport, affectation, flots).

### B. Justification didactique des sélections
- **Pourquoi l'exercice de modélisation `ro2-c1-e4` est supérieur à l'ancien `MAX;25,30;2,3` :**
  L'ancien exercice demandait à l'élève de saisir une chaîne pseudo-CSV sans expliquer la signification des nombres. Le nouvel exercice soumet un contrat d'approvisionnement industriel avec une contrainte d'égalité obligatoire ($x_1 + x_2 = 120$) et une ressource critique. L'élève doit justifier pourquoi une égalité réduit la dimension de l'espace des solutions réalisables.
- **Pourquoi l'exercice sur les 4 hypothèses de George Dantzig (`ro2-c1-e5`) est essentiel :**
  Résoudre un problème linéaire sans savoir si la proportionnalité ou la divisibilité est vérifiée conduit à des erreurs majeures dans la pratique industrielle (ex. fabriquer un demi-camion ou supposer des rendements d'échelle constants sans seuil de rentabilité). L'exercice exige la qualification explicite des limites du modèle continu.

---

## 2. Famille Algorithmique, Programmation et Génie Logiciel

### A. Références consultées
1. **MIT OpenCourseWare — *6.006 Introduction to Algorithms***
   - *Auteurs :* Prof. Erik Demaine, Prof. Srini Devadas (MIT Electrical Engineering and Computer Science, Fall 2011).
   - *Accès :* [https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/)
   - *Licence :* Creative Commons BY-NC-SA 4.0.
   - *Notions exploitées :* Algorithmes de tri, recherche dichotomique, arbres binaires de recherche, tables de hachage, graphes (BFS/DFS, Dijkstra), programmation dynamique.
2. **Python Software Foundation — *PEP 8: Style Guide for Python Code***
   - *Auteurs :* Guido van Rossum, Barry Warsaw, Nick Coghlan.
   - *Accès :* [https://peps.python.org/pep-0008/](https://peps.python.org/pep-0008/)
   - *Norme officielle :* Idiomes Pythoniques, lisibilité du code, gestion des exceptions.
3. **ISO/IEC 9899:2018 — *Information technology — Programming languages — C***
   - *Organisation :* International Organization for Standardization (ISO).
   - *Accès :* [https://www.iso.org/standard/74528.html](https://www.iso.org/standard/74528.html)
   - *Notions exploitées :* Gestion manuelle de la mémoire (`malloc`, `free`), arithmétique de pointeurs, sécurité des tampons mémoire (*buffer overflow*).
4. **MDN Web Docs — *JavaScript Guide & Reference***
   - *Organisme :* Mozilla Foundation.
   - *Accès :* [https://developer.mozilla.org/fr/docs/Web/JavaScript](https://developer.mozilla.org/fr/docs/Web/JavaScript)
   - *Licence :* CC-BY-SA 2.5.
   - *Notions exploitées :* Fonctions d'ordre supérieur (`map`, `filter`, `reduce`), asynchronisme (`Promises`, `async/await`), DOM et gestion d'événements.

### B. Justification didactique des sélections
- **Conservation du Monaco Editor sur les 10 cours de programmation :**
  Pour coder en C, en Python, en Java ou en PHP, l'indentation syntaxique, la complétion automatique et l'exécution dans un bac à sable isolé ([isolated-worker.js](file:///home/rd/Desktop/proba/server/services/execution/isolated-worker.js)) sont des instruments authentiques indispensables. L'éditeur Monaco y est légitime et formateur.
- **Suppression des exercices d'algorithmique "jouet" :**
  Les exercices consistant simplement à concaténer des chaînes ont été recentrés sur l'évaluation des invariants de boucles, le coût algorithmique ($O(1)$ vs $O(n)$ vs $O(n \log n)$) et la gestion des cas limites (tableaux vides, valeurs sentinelles).

---

## 3. Famille Bases de Données, Modélisation et Systèmes d'Information

### A. Références consultées
1. **Stanford Online — *Databases: Relational Databases and SQL***
   - *Auteure :* Prof. Jennifer Widom (Stanford University).
   - *Accès :* [https://online.stanford.edu/courses/soe-ydatabases-databases-relational-databases-and-sql](https://online.stanford.edu/courses/soe-ydatabases-databases-relational-databases-and-sql)
   - *Notions exploitées :* Algèbre relationnelle, sous-requêtes corrélées, jointures externes (LEFT/RIGHT/FULL OUTER JOIN), clauses d'agrégation conditionnelle (`HAVING`).
2. **Object Management Group (OMG) — *Unified Modeling Language (UML) Specification Version 2.5.1***
   - *Accès :* [https://www.omg.org/spec/UML/2.5.1/](https://www.omg.org/spec/UML/2.5.1/)
   - *Notions exploitées :* Diagrammes de classes (composition, agrégation, cardinalités strictes), diagrammes de séquences, diagrammes d'états-transitions.
3. **Méthode MERISE — *Principes et démarche de conception des SI***
   - *Auteurs de référence :* Hubert Tardieu, Bernard Espinasse (Éditions Dunod).
   - *Notions exploitées :* Modèle Conceptuel des Données (MCD), Modèle Logique des Données (MLD relationnel), formes normales (1FN, 2FN, 3FN, BCNF).

### B. Justification didactique des sélections
- **Élimination de la programmation de parseurs relationnels en Bash :**
  Dans l'ancienne mouture, les cours de SQL et MERISE obligeaient l'élève à parser des fichiers CSV avec `cut -d','` ou `awk`. Désormais, l'étudiant est interrogé sur la sémantique de l'intégrité référentielle, le choix de clés primaires composites et la formulation de requêtes SQL authentiques validées par le simulateur.

---

## 4. Famille Réseaux, Systèmes, Cloud et Cybersécurité

### A. Références consultées
1. **IETF (Internet Engineering Task Force) — *RFCs Fondamentales du Réseau***
   - *RFC 791 (IPv4)* : [https://datatracker.ietf.org/doc/html/rfc791](https://datatracker.ietf.org/doc/html/rfc791)
   - *RFC 8200 (IPv6 Specification)* : [https://datatracker.ietf.org/doc/html/rfc8200](https://datatracker.ietf.org/doc/html/rfc8200)
   - *RFC 9293 (Transmission Control Protocol)* : [https://datatracker.ietf.org/doc/html/rfc9293](https://datatracker.ietf.org/doc/html/rfc9293)
   - *RFC 2131 (Dynamic Host Configuration Protocol)* : [https://datatracker.ietf.org/doc/html/rfc2131](https://datatracker.ietf.org/doc/html/rfc2131)
2. **ANSSI (Agence Nationale de la Sécurité des Systèmes d'Information)**
   - *Titre :* *Guide d'hygiène informatique : renforcer la sécurité de son système d'information en 42 mesures simples*.
   - *Accès :* [https://cyber.gouv.fr/publications/guide-dhygiene-informatique](https://cyber.gouv.fr/publications/guide-dhygiene-informatique)
   - *Licence :* Licence Ouverte 2.0.
   - *Notions exploitées :* Cloisonnement réseau (DMZ, bastions), gestion des privilèges d'administration, politiques de mots de passe, désactivation des protocoles en clair.
3. **NIST (National Institute of Standards and Technology)**
   - *NIST SP 800-145 : The NIST Definition of Cloud Computing* (P. Mell, T. Grance).
     [https://csrc.nist.gov/publications/detail/sp/800-145/final](https://csrc.nist.gov/publications/detail/sp/800-145/final)
   - *NIST SP 800-63B : Digital Identity Guidelines (Authentication & Lifecycle)*.
     [https://csrc.nist.gov/publications/detail/sp/800-63b/final](https://csrc.nist.gov/publications/detail/sp/800-63b/final)
   - *NIST Cybersecurity Framework (CSF 2.0)* : Gouvernance, Identification, Protection, Détection, Réponse, Rétablissement.
     [https://www.nist.gov/cyberframework](https://www.nist.gov/cyberframework)
4. **Cisco Networking Academy — *CCNA Curriculum Objectives (v7.0)***
   - *Accès :* [https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/associate/ccna.html](https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/associate/ccna.html)
   - *Notions exploitées :* Découpage VLSM, protocole OSPF multi-aires, commutation VLAN/802.1Q, listes de contrôle d'accès (ACL standard et étendue).

### B. Justification didactique des sélections
- **Cas concrets d'architecture réseau vs manipulation d'adresses artificielles :**
  Dans `b1-ccna1`, `b1-reseaux` et `b3-reseau-lan`, les exercices placent l'étudiant face à une topologie d'entreprise réelle (ex. 3 agences avec 200, 50 et 12 postes) pour calculer le plan d'adressage VLSM optimal sans gaspillage, conformément aux exigences du référentiel Cisco CCNA.
- **Exercices de cybersécurité contextualisés selon les normes ISO 27005 et NIST :**
  Dans `Cyber securite B2`, la grille d'analyse n'évalue plus si l'élève sait faire `input().strip()`, mais sa capacité à catégoriser un incident de sécurité selon la triade CIA et à évaluer la matrice de risque Menace $\times$ Vulnérabilité $\times$ Impact financier.

---

## 5. Famille Droit, Gestion de Projet et Méthodologies

### A. Références consultées
1. **Union Européenne — *Règlement Général sur la Protection des Données (RGPD - Règlement UE 2016/679)***
   - *Accès :* [https://eur-lex.europa.eu/eli/reg/2016/679/oj](https://eur-lex.europa.eu/eli/reg/2016/679/oj)
   - *Notions exploitées :* Bases légales de traitement (Art. 6), droits des personnes (accès, rectification, effacement), notification des violations de données sous 72h (Art. 33), principe de responsabilité (*Accountability*).
2. **Ken Schwaber & Jeff Sutherland — *Le Guide Scrum (Novembre 2020)***
   - *Accès :* [https://scrumguides.org/scrum-guide.html](https://scrumguides.org/scrum-guide.html)
   - *Licence :* Creative Commons Attribution-ShareAlike 4.0.
   - *Notions exploitées :* Piliers empiriques (transparence, inspection, adaptation), rôles Scrum (Product Owner, Scrum Master, Développeurs), événements (Sprint Planning, Daily, Review, Rétrospective), artefacts (Product Backlog, Sprint Backlog, Incrément avec Definition of Done).
3. **ISO/IEC/IEEE 29148:2018 — *Systems and software engineering — Requirements engineering***
   - *Accès :* [https://www.iso.org/standard/72089.html](https://www.iso.org/standard/72089.html)
   - *Notions exploitées :* Critères de qualité d'une exigence (non ambiguë, vérifiable, traçable, atomique), distinction entre exigences fonctionnelles et non fonctionnelles (SLA, sécurité, performance).

### B. Justification didactique des sélections
- **Mise en situation de qualification juridique authentique :**
  Dans `droit` et `b1-droit`, les exercices soumettent des litiges contractuels réels (retard de livraison en régie vs forfait, clause de non-concurrence illicite, violation de données sous-traitant). L'étudiant applique la méthodologie du cas pratique juridique (Faits $\rightarrow$ Problème de droit $\rightarrow$ Règle applicable $\rightarrow$ Solution d'espèce) via une grille structurée.

---

## 6. Famille Langues, Communication et Design

### A. Références consultées
1. **Conseil de l'Europe — *Cadre Européen Commun de Référence pour les Langues (CECRL)***
   - *Accès :* [https://www.coe.int/fr/web/common-european-framework-reference-languages/](https://www.coe.int/fr/web/common-european-framework-reference-languages/)
   - *Niveaux ciblés :* B1 (indépendance en milieu professionnel), B2 (aisance technique et négociation), B3/C1 (communication stratégique internationale, rédaction de rapports d'audit).
2. **Nielsen Norman Group (NN/g) — *10 Usability Heuristics for User Interface Design***
   - *Auteur :* Dr. Jakob Nielsen.
   - *Accès :* [https://www.nngroup.com/articles/ten-usability-heuristics/](https://www.nngroup.com/articles/ten-usability-heuristics/)
   - *Notions exploitées :* Visibilité de l'état du système, correspondance entre le système et le monde réel, contrôle et liberté de l'utilisateur, prévention des erreurs, reconnaissance plutôt que rappel.
3. **W3C (World Wide Web Consortium) — *Web Content Accessibility Guidelines (WCAG) 2.2***
   - *Accès :* [https://www.w3.org/TR/WCAG22/](https://www.w3.org/TR/WCAG22/)
   - *Règles exploitées :* Contraste minimal des textes (4.5:1 au niveau AA), navigation au clavier sans piège de focus, alternatives textuelles pertinentes.

### B. Justification didactique des sélections
- **Évaluation de l'analyse critique de design vs catégorisation binaire :**
  Dans `uiux`, l'étudiant n'est pas interrogé sur la mémorisation d'une définition, mais sur l'audit critique d'un parcours utilisateur (tunnel de commande, formulaire complexe) à l'aide des heuristiques de Nielsen et des règles WCAG, avec justification de la remédiation ergonomique.
