# Fiche Source : Recueil Officiel des Épreuves — Session Normale 2024-2025

- **Fichiers sources** : `epreuves/Recueil_Epreuves_2024_2025.pdf` (21 pages) et `Epreuves_Groupées.pdf` (21 pages, doublon scanné)
- **Établissement** : Collège de Paris Supérieur (Campus de Lomé)
- **Niveau / Classe** : Bachelor 2 (B2 IT A & B)
- **Date d'examen** : Février 2025
- **Matières couvertes** : 8 disciplines professionnelles fondamentales

## Liste Exhaustive des Épreuves et Notions Testées

### 1. Probabilités (Pages 1 à 3)
- 8 exercices concrets :
  - **Exercice 1 (p.1)** : Pannes conjointes de deux machines $M_1, M_2$ ($P(M_1)=0.01, P(M_2)=0.008, P(M_2|M_1)=0.4$). Calcul de $P(M_1 \cap M_2) = 0.004$ et $P(\text{au moins une fonctionne}) = 1 - 0.004 = 0.996$.
  - **Exercice 2 (p.1)** : Bayes sur la taille des étudiants de l'IUT (40% G > 1.80m, 15% F > 1.80m, 60% Filles). Calcul de $P(\text{Fille} \mid > 1.80\text{m}) = \frac{0.60 \times 0.15}{(0.40 \times 0.40) + (0.60 \times 0.15)} = \frac{0.09}{0.16 + 0.09} = \frac{0.09}{0.25} = 0.36$.
  - **Exercice 3 (p.1-2)** : Tableaux de contingence tabagisme/sexe (1000 personnes) et test d'indépendance $P(A \cap B) = P(A)P(B)$.
  - **Exercice 4 (p.2)** : Traitements de lentilles $T_1$ et $T_2$ ($P(A)=0.10, P(B)=0.20$, aucun défaut $=0.75$). Calcul de $P(A \cup B) = 0.25$, $P(A \cap B) = 0.05$, indépendance non vérifiée car $0.05 \ne 0.02$.
  - **Exercice 5 (p.2-3)** : Dépistage de deux maladies ($M_1$ 10%, $M_2$ 20%) avec sensibilités et faux positifs.
  - **Exercice 6 (p.3)** : Alcooltest routier (2% ivresse, 95% sensibilité, 96% spécificité). Probabilité d'ivresse réelle sachant test positif :
    $$P(I \mid +) = \frac{0.02 \times 0.95}{(0.02 \times 0.95) + (0.98 \times 0.04)} = \frac{0.019}{0.019 + 0.0392} = \frac{0.019}{0.0582} \approx 0.3265 \quad (\approx 32.65\%)$$
  - **Exercice 7 (p.3)** : Répartition des filières IUT (A1 40%, A2 30%, A3 30%) et taux d'échec respectifs.
  - **Exercice 8 (p.3)** : Vol de la Joconde et croisement de deux expertises indépendantes.

### 2. Recherche Opérationnelle (Pages 4 à 8)
- Examen final complet : QCM de théorie des bases et du Simplexe (p.4-5), problème de crashing d'ordonnancement de projet informatique (p.6), problème d'optimisation d'atelier industriel (p.7), construction du dual et conditions d'optimalité de Kuhn-Tucker (p.8).

### 3. Réseau Informatique — CCNA 2 (Pages 9 à 11)
- Notion d'adresse IPv4 privée (RFC 1918) et plages de classes A (`10.0.0.0/8`), B (`172.16.0.0/12`), C (`192.168.0.0/16`).
- Configuration de VLANs, routage inter-VLAN (Router-on-a-Stick), Trunking 802.1Q.
- Protocoles Spanning-Tree (STP) et sécurité des ports (Port-Security).

### 4. Administration des Machines Virtuelles (Pages 9 à 11)
- Étude de cas "L'aventure de Max, l'Administrateur Virtuose" par M. BOUKLINAM :
  - Création de VM sous VMware vSphere ESXi et vCenter (vCPU, RAM, stockage).
  - vMotion pour résolution de contention de ressources.
  - Restauration de VM critique avec Veeam Backup & Replication.
  - Cluster VMware HA (High Availability) pour basculement automatique en cas de panne physique.

### 5. Programmation C# (Pages 12 et 13)
- Épreuve de Mme AGBEGNAN :
  - Exercice 1 (p.12) : Programme d'authentification console (`ESP_Etudiant_B2_IT` / `Examen@2024@2025`).
  - Exercice 2 (p.12-13) : Gestion de parc informatique en POO : classe `Appareil`, dérivées `Ordinateur` et `Imprimante`, méthode virtuelle et surcharge `AfficherDetails()`, collection `List<Appareil>`.

### 6. Programmation Orientée Objet en PHP (Pages 14 et 15)
- Exercice 1 (p.14) : Classe `Livre` (`titre`, `auteur`, `nbPages`, constructeur, `afficherInfos()`).
- Exercice 2 (p.14) : Encapsulation (`private $nbPages`, `setNbPages` avec validation $>0$).
- Exercice 3 (p.14) : Héritage `LivreElectronique extends Livre` (`tailleFichier`, surcharge).
- Exercice 4 (p.15) : Exceptions et gestion d'erreurs (`throw new Exception`, `try/catch`).

### 7. UML — Diagrammes (Page 16)
- Exercice 1 (p.16) : Diagramme de classes d'une académie scolaire multi-écoles (écoles, départements, enseignants, étudiants, matières, salles de cours, notes).
- Exercice 2 (p.16) : Diagramme de cas d'utilisation pour système de préparation avant achat de chevaux (`<<extend>>`, `<<include>>`, base externe haras).

### 8. Programmation Orientée Objet et Java (Pages 17 à 20)
- Exercice 1 (p.17-18) : QCM de cours (constructeurs, encapsulation, méthodes statiques, JVM bytecode `.class`, opérateur `new`, mot-clé `final`).
- Exercice 2 (p.18) : Tableaux statiques pour calcul d'intérêts composés sur $n$ années à 4%.
- Exercice 3 (p.18-20) : Application bancaire complète : classe `Client`, classe `Compte`, héritage `CompteCourant` (frais de retrait) et `CompteEpargne` (solde minimum, liaison de transfert).
