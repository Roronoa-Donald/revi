# Livrable 15 — Référentiels Scientifiques, Normatifs et Bibliographie

> Répertoire de livraison : `CONSOLIDATION_REMEDIATION/`  
> Projet : `revi-cours-html` — Plateforme d'apprentissage et d'évaluation interactive B1, B2 et B3  
> Branche active : `remediation-pedagogique-qualite`  
> Date de certification : 3 novembre 2026  
> Statut : Référentiel bibliographique et méthodologique de référence  

---

## 1. Standards Psychométriques et Métrologie des Évaluations

1. **AERA, APA, & NCME (2014)**  
   *Standards for Educational and Psychological Testing*. American Educational Research Association, American Psychological Association, National Council on Measurement in Education. Washington, DC: AERA.  
   *Application* : Définition de la validité de contenu, équité des épreuves sommatives, minimisation des erreurs de mesure et standardisation des conditions de passation.

2. **National Board of Medical Examiners (NBME, 2024)**  
   *Constructing Written Test Questions for the Basic and Clinical Sciences* (6e édition). Philadelphia: NBME.  
   *Application* : Directives de rédaction des questions à choix multiples (QCM) ; proscription formelle des formulations négatives (Règle 6), des options composées « Toutes/Aucune » (Règle 10), et des asymétries de longueur de distracteurs (Règle 11).

3. **Haladyna, T. M., & Rodriguez, M. C. (2013)**  
   *Developing and Validating Test Items*. New York: Routledge.  
   *Application* : Taxonomie des défauts de rédaction d'items (*item-writing flaws*), analyse de plausibilité des distracteurs et prévention des biais de devinette par indices syntaxiques.

4. **Anderson, L. W., Krathwohl, D. R., et al. (2001)**  
   *A Taxonomy for Learning, Teaching, and Assessing: A Revision of Bloom's Taxonomy of Educational Objectives*. New York: Longman.  
   *Application* : Hiérarchisation des objectifs pédagogiques du niveau 1 (Mémorisation) au niveau 4-5 (Analyse et Évaluation) pour les ateliers de code et exercices d'ingénierie.

---

## 2. Sciences de l'Éducation et Psychologie Cognitive

5. **Roediger, H. L., & Karpicke, J. D. (2006)**  
   *Test-Enhanced Learning: Taking Memory Tests Improves Long-Term Retention*. Psychological Science, 17(3), 249-255.  
   *Application* : Justification théorique de l'auto-évaluation formative continue (*testing effect*) et de la séparation entre entraînement formatif et examen sommatif.

6. **Sweller, J., Ayres, P., & Kalyuga, S. (2011)**  
   *Cognitive Load Theory*. New York: Springer.  
   *Application* : Réduction de la charge cognitive extrinsèque par élimination des formats de saisie artificiels (`stdin` en Linux/Docker) et focalisation sur les compétences intrinsèques de la discipline.

7. **Wood, D., Bruner, J. S., & Ross, G. (1976)**  
   *The Role of Tutoring in Problem Solving*. Journal of Child Psychology and Psychiatry, 17(2), 89-100.  
   *Application* : Conception du modèle d'étayage didactique (*scaffolding*) par paliers dans le moteur de rétroaction du Code Lab.

---

## 3. Normes Internationales de Qualité Logicielle et Sécurité

8. **ISO/IEC 25010 (2023)**  
   *Systems and software engineering — Systems and software Quality Requirements and Evaluation (SQuaRE) — Product quality model*. International Organization for Standardization.  
   *Application* : Évaluation multi-dimensionnelle du logiciel : adéquation fonctionnelle, efficacité des performances, compatibilité, utilisabilité, fiabilité et sécurité.

9. **Open Web Application Security Project (OWASP, 2023)**  
   *OWASP Top 10 API Security Risks*.  
   *Application* : Prévention des vulnérabilités d'authentification brisée (API2:2023), de falsification d'assignation d'objet (API3:2023) et d'exposition excessive de données (API5:2023) sur `/api/qcm/verify` et `/api/qcm/submit`.

10. **IETF RFC 9110 (2022)**  
    *HTTP Semantics*. Internet Engineering Task Force.  
    *Application* : Respect strict de l'idempotence des méthodes HTTP et conformité des codes d'état de retour (`400 Bad Request`, `403 Forbidden`, `404 Not Found`).

---

## 4. Accessibilité Numérique et Ergonomie Web

11. **World Wide Web Consortium (W3C, 2023)**  
    *Web Content Accessibility Guidelines (WCAG) 2.2*. W3C Recommendation.  
    *Application* : Conformité au niveau AA : ratios de contraste textuel 4,5:1, navigation séquentielle au clavier, présence d'étiquettes sémantiques `<label for="...">` et interdiction de dépendance sensorielle exclusive.

12. **ISO 9241-11 (2018)**  
    *Ergonomie de l'interaction homme-système — Partie 11: Utilisabilité : Définitions et concepts*.  
    *Application* : Mesure de l'efficacité, de l'efficience et de la satisfaction de l'apprenant dans l'exécution de ses parcours de travaux pratiques.
