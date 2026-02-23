# -*- coding: utf-8 -*-
"""
Generateur PDF professionnel - Epreuves College de Paris Superieur
Session 2024/2025
"""

from fpdf import FPDF
import os

# ============================================================
# CLASSE PDF PERSONNALISEE
# ============================================================
class ExamPDF(FPDF):
    def __init__(self):
        super().__init__()
        self.set_auto_page_break(auto=True, margin=25)
        # Couleurs
        self.COLOR_PRIMARY = (25, 55, 109)      # Bleu fonce
        self.COLOR_SECONDARY = (70, 70, 70)      # Gris fonce
        self.COLOR_ACCENT = (180, 30, 30)        # Rouge sobre
        self.COLOR_LIGHT_BG = (245, 245, 250)    # Fond clair
        self.COLOR_LINE = (25, 55, 109)          # Ligne bleue
        self.COLOR_BLACK = (0, 0, 0)
        self.COLOR_GRAY = (120, 120, 120)

    def header(self):
        if self.page_no() == 1:
            return  # Page de garde geree manuellement
        # En-tete sobre sur les pages suivantes
        self.set_font("Helvetica", "I", 8)
        self.set_text_color(*self.COLOR_GRAY)
        self.cell(0, 8, "College de Paris Superieur  |  Epreuves  |  Session 2024/2025", align="C")
        self.ln(4)
        # Ligne de separation
        self.set_draw_color(*self.COLOR_LINE)
        self.set_line_width(0.3)
        self.line(15, self.get_y(), self.w - 15, self.get_y())
        self.ln(8)

    def footer(self):
        if self.page_no() == 1:
            return
        self.set_y(-20)
        self.set_draw_color(*self.COLOR_LINE)
        self.set_line_width(0.3)
        self.line(15, self.get_y(), self.w - 15, self.get_y())
        self.ln(3)
        self.set_font("Helvetica", "I", 8)
        self.set_text_color(*self.COLOR_GRAY)
        self.cell(0, 10, f"Page {self.page_no() - 1}", align="C")

    # --- Methodes utilitaires ---
    def section_title(self, title):
        """Titre de section principal (nom de la matiere)"""
        self.set_font("Helvetica", "B", 18)
        self.set_text_color(*self.COLOR_PRIMARY)
        self.cell(0, 12, title, new_x="LMARGIN", new_y="NEXT")
        self.set_draw_color(*self.COLOR_ACCENT)
        self.set_line_width(0.8)
        self.line(15, self.get_y(), 80, self.get_y())
        self.ln(8)

    def exam_header_block(self, info_lines):
        """Bloc d'informations d'examen (institution, filiere, duree...)"""
        self.set_fill_color(*self.COLOR_LIGHT_BG)
        self.set_draw_color(*self.COLOR_LINE)
        x = 15
        y = self.get_y()
        w = self.w - 30
        # Calculer la hauteur
        h = 6 * len(info_lines) + 8
        self.rect(x, y, w, h, style="DF")
        self.set_xy(x + 5, y + 4)
        self.set_font("Helvetica", "", 9)
        self.set_text_color(*self.COLOR_SECONDARY)
        for line in info_lines:
            self.cell(0, 6, line, new_x="LMARGIN", new_y="NEXT")
            self.set_x(x + 5)
        self.set_y(y + h + 6)

    def sub_title(self, title):
        """Sous-titre (Exercice, Partie...)"""
        self.set_font("Helvetica", "B", 13)
        self.set_text_color(*self.COLOR_PRIMARY)
        self.cell(0, 10, title, new_x="LMARGIN", new_y="NEXT")
        self.ln(2)

    def sub_sub_title(self, title):
        """Sous-sous-titre"""
        self.set_font("Helvetica", "B", 11)
        self.set_text_color(*self.COLOR_SECONDARY)
        self.cell(0, 8, title, new_x="LMARGIN", new_y="NEXT")
        self.ln(1)

    def body_text(self, text):
        """Texte de corps normal"""
        self.set_font("Helvetica", "", 10)
        self.set_text_color(*self.COLOR_BLACK)
        self.multi_cell(0, 6, text)
        self.ln(2)

    def body_text_bold(self, text):
        """Texte en gras"""
        self.set_font("Helvetica", "B", 10)
        self.set_text_color(*self.COLOR_BLACK)
        self.multi_cell(0, 6, text)
        self.ln(2)

    def question(self, num, text, points=None):
        """Question numerotee avec points optionnels"""
        self.set_font("Helvetica", "B", 10)
        self.set_text_color(*self.COLOR_PRIMARY)
        prefix = f"{num}. "
        if points:
            prefix_end = f" ({points} pts)"
        else:
            prefix_end = ""

        self.set_font("Helvetica", "B", 10)
        self.set_text_color(*self.COLOR_PRIMARY)
        # Write the number
        w_prefix = self.get_string_width(prefix)
        self.cell(w_prefix, 6, prefix)
        self.set_font("Helvetica", "", 10)
        self.set_text_color(*self.COLOR_BLACK)
        remaining_w = self.w - self.get_x() - 15
        if points:
            self.multi_cell(remaining_w, 6, text + prefix_end)
        else:
            self.multi_cell(remaining_w, 6, text)
        self.ln(2)

    def sub_question(self, label, text):
        """Sous-question (a, b, c...)"""
        self.set_x(25)
        self.set_font("Helvetica", "B", 10)
        self.set_text_color(*self.COLOR_SECONDARY)
        w_label = self.get_string_width(f"{label}. ") + 2
        self.cell(w_label, 6, f"{label}. ")
        self.set_font("Helvetica", "", 10)
        self.set_text_color(*self.COLOR_BLACK)
        remaining_w = self.w - self.get_x() - 15
        self.multi_cell(remaining_w, 6, text)
        self.ln(1)

    def option(self, letter, text, indent=25):
        """Option QCM"""
        self.set_x(indent)
        self.set_font("Helvetica", "B", 10)
        self.set_text_color(*self.COLOR_ACCENT)
        self.cell(10, 6, f"{letter}.")
        self.set_font("Helvetica", "", 10)
        self.set_text_color(*self.COLOR_BLACK)
        remaining_w = self.w - self.get_x() - 15
        self.multi_cell(remaining_w, 6, text)
        self.ln(0.5)

    def separator(self):
        """Ligne de separation fine"""
        self.ln(4)
        self.set_draw_color(*self.COLOR_GRAY)
        self.set_line_width(0.2)
        self.line(30, self.get_y(), self.w - 30, self.get_y())
        self.ln(6)

    def page_separator(self):
        """Nouvelle page pour un nouvel examen"""
        self.add_page()

    def check_space(self, needed=40):
        """Verifie s'il reste assez d'espace, sinon saut de page"""
        if self.get_y() > self.h - needed:
            self.add_page()

    def italic_text(self, text):
        """Texte en italique"""
        self.set_font("Helvetica", "I", 9)
        self.set_text_color(*self.COLOR_GRAY)
        self.multi_cell(0, 5, text)
        self.ln(2)

    def table_row(self, cells, widths, bold=False, fill=False):
        """Ligne de tableau"""
        x_start = self.get_x()
        h = 7
        style = "B" if bold else ""
        if fill:
            self.set_fill_color(*self.COLOR_LIGHT_BG)
        self.set_font("Helvetica", style, 9)
        self.set_text_color(*self.COLOR_BLACK)
        self.set_draw_color(*self.COLOR_LINE)
        for i, cell_text in enumerate(cells):
            self.cell(widths[i], h, cell_text, border=1, fill=fill, align="C")
        self.ln(h)


# ============================================================
# CONSTRUCTION DU PDF
# ============================================================
def build_pdf():
    pdf = ExamPDF()

    # ===================== PAGE DE GARDE =====================
    pdf.add_page()
    pdf.ln(30)

    # Cadre decoratif
    pdf.set_draw_color(*pdf.COLOR_PRIMARY)
    pdf.set_line_width(1.5)
    pdf.rect(20, 20, pdf.w - 40, pdf.h - 40)
    pdf.set_line_width(0.5)
    pdf.rect(23, 23, pdf.w - 46, pdf.h - 46)

    # Institution
    pdf.set_font("Helvetica", "B", 22)
    pdf.set_text_color(*pdf.COLOR_PRIMARY)
    pdf.cell(0, 14, "COLLEGE DE PARIS SUPERIEUR", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(5)

    # Ligne decorative
    pdf.set_draw_color(*pdf.COLOR_ACCENT)
    pdf.set_line_width(1)
    pdf.line(60, pdf.get_y(), pdf.w - 60, pdf.get_y())
    pdf.ln(12)

    # Titre principal
    pdf.set_font("Helvetica", "B", 28)
    pdf.set_text_color(*pdf.COLOR_PRIMARY)
    pdf.cell(0, 16, "RECUEIL DES EPREUVES", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(3)
    pdf.set_font("Helvetica", "", 16)
    pdf.set_text_color(*pdf.COLOR_SECONDARY)
    pdf.cell(0, 10, "Premiere Session Normale", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(15)

    # Annee
    pdf.set_font("Helvetica", "B", 20)
    pdf.set_text_color(*pdf.COLOR_ACCENT)
    pdf.cell(0, 14, "Annee Academique 2024 - 2025", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(15)

    # Informations
    pdf.set_font("Helvetica", "", 12)
    pdf.set_text_color(*pdf.COLOR_SECONDARY)
    pdf.cell(0, 8, "Niveau : Bachelor 2 (B2 IT A & B)", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.cell(0, 8, "Fevrier 2025", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(20)

    # Liste des matieres
    pdf.set_draw_color(*pdf.COLOR_PRIMARY)
    pdf.set_line_width(0.3)
    pdf.line(50, pdf.get_y(), pdf.w - 50, pdf.get_y())
    pdf.ln(8)
    pdf.set_font("Helvetica", "B", 11)
    pdf.set_text_color(*pdf.COLOR_PRIMARY)
    pdf.cell(0, 8, "MATIERES COUVERTES", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(5)

    matieres = [
        "1.  Probabilites",
        "2.  Recherche Operationnelle (RO)",
        "3.  Reseau Informatique (CCNA 2)",
        "4.  Administration des Machines Virtuelles",
        "5.  Programmation C#",
        "6.  Programmation Orientee Objet en PHP",
        "7.  UML (Diagrammes)",
        "8.  Programmation Orientee Objet et Java",
    ]
    pdf.set_font("Helvetica", "", 11)
    pdf.set_text_color(*pdf.COLOR_SECONDARY)
    for m in matieres:
        pdf.cell(0, 7, m, align="C", new_x="LMARGIN", new_y="NEXT")

    # ============================================================
    # EPREUVE 1 : PROBABILITES
    # ============================================================
    pdf.page_separator()
    pdf.section_title("PROBABILITES")
    pdf.exam_header_block([
        "Etablissement : College de Paris Superieur",
        "Annee Academique : 2024/2025",
        "Session : Premiere Session Normale",
        "Niveau : Bachelor 2",
        "Date : Fevrier 2025",
    ])

    # Exercice 1
    pdf.sub_title("Exercice 1")
    pdf.body_text(
        "Dans une usine, on utilise conjointement deux machines M1 et M2 pour fabriquer des pieces "
        "cylindriques en serie. Pour une periode donnee, leurs probabilites de tomber en panne sont "
        "respectivement 0,01 et 0,008. De plus la probabilite de l'evenement \"la machine M2 est en "
        "panne sachant que M1 est en panne\" est egale a 0,4."
    )
    pdf.question(1, "Quelle est la probabilite d'avoir les deux machines en panne au meme moment ?")
    pdf.question(2, "Quelle est la probabilite d'avoir au moins une machine qui fonctionne ?")

    pdf.separator()

    # Exercice 2
    pdf.sub_title("Exercice 2")
    pdf.body_text(
        "A l'IUT de Digne, 40% de garcons et 15% des filles mesurent plus de 1,80m. "
        "De plus, 60% des eleves sont des filles. Sachant qu'un eleve, choisi au hasard, mesure "
        "plus de 1,80m, quelle est la probabilite que ce soit une fille ?"
    )

    pdf.separator()

    # Exercice 3
    pdf.sub_title("Exercice 3")
    pdf.body_text(
        "Dans une universite, une enquete sur le tabagisme a donne les resultats suivants :"
    )
    # Tableau
    pdf.set_x(40)
    widths = [40, 30, 30]
    pdf.table_row(["", "Hommes", "Femmes"], widths, bold=True, fill=True)
    pdf.set_x(40)
    pdf.table_row(["Fumeurs", "420", "75"], widths)
    pdf.set_x(40)
    pdf.table_row(["Non fumeurs", "280", "225"], widths)
    pdf.ln(4)

    pdf.body_text(
        "On choisit au hasard l'une des 1000 personnes interrogees. On note A l'evenement "
        "\"en reponse a l'enquete, la personne a declare fumer\" et on note B l'evenement "
        "\"en reponse a l'enquete, la personne a declare etre du sexe feminin\"."
    )
    pdf.question(1, "A et B sont-ils independants pour l'equiprobabilite P definie sur l'ensemble des 1000 personnes interrogees ?")
    pdf.question(2, "Meme question pour la meme enquete dans une autre universite ou les resultats sont consignes dans le tableau suivant :")

    pdf.set_x(40)
    pdf.table_row(["", "Hommes", "Femmes"], widths, bold=True, fill=True)
    pdf.set_x(40)
    pdf.table_row(["Fumeurs", "440", "360"], widths)
    pdf.set_x(40)
    pdf.table_row(["Non fumeurs", "110", "90"], widths)
    pdf.ln(4)

    pdf.separator()

    # Exercice 4
    pdf.check_space(80)
    pdf.sub_title("Exercice 4")
    pdf.body_text(
        "Au cours de la fabrication d'un certain type de lentilles, chacune de ces lentilles doit subir "
        "deux traitements notes T1 et T2. On preleve au hasard une lentille dans la production.\n"
        "On designe par A l'evenement : \"la lentille presente un defaut pour le traitement T1\".\n"
        "On designe par B l'evenement : \"la lentille presente un defaut pour le traitement T2\".\n"
        "Une etude a montre que :\n"
        "- la probabilite qu'une lentille presente un defaut pour le traitement T1 est P(A) = 0,10 ;\n"
        "- la probabilite qu'une lentille presente un defaut pour le traitement T2 est P(B) = 0,20 ;\n"
        "- la probabilite qu'une lentille ne presente aucun des deux defauts est 0,75."
    )
    pdf.question(1, "Calculer la probabilite qu'une lentille, prelevee au hasard dans la production, presente un defaut pour au moins un des deux traitements T1 ou T2.")
    pdf.question(2, "Calculer la probabilite qu'une lentille, prelevee au hasard dans la production, presente un defaut pour les deux traitements T1 et T2.")
    pdf.question(3, "Les evenements T1 et T2 sont-ils independants ?")
    pdf.question(4, "Calculer la probabilite qu'une lentille, prelevee au hasard dans la production, presente un defaut pour un seul des deux traitements.")
    pdf.question(5, "Calculer la probabilite qu'une lentille, prelevee au hasard dans la production, presente un defaut pour le traitement T1, sachant qu'il presente un defaut pour le traitement T2.")

    pdf.separator()

    # Exercice 5
    pdf.check_space(80)
    pdf.sub_title("Exercice 5")
    pdf.body_text(
        "Dans une population Omega, deux maladies M1 et M2 sont presentes respectivement chez 10% et 20%. "
        "On suppose que le nombre de ceux qui souffrent des deux maladies est negligeable. On entreprend "
        "un depistage systematique des maladies M1 et M2. Pour cela, on applique un test qui reagit sur "
        "90% des malades de M1, sur 70% des malades de M2, et sur 10% des individus qui n'ont aucune de "
        "ces deux affections."
    )
    pdf.question(1, "Quand on choisit au hasard un individu dans Omega, quelle est la probabilite pour que le test reagisse ?")
    pdf.question(2, "Sachant que pour un individu, le test a reagi, donner les probabilites :")
    pdf.sub_question("a", "pour que le test ait reagi a cause de la maladie M1,")
    pdf.sub_question("b", "pour que le test ait reagi a cause de la maladie M2,")
    pdf.sub_question("c", "pour que le test ait reagi alors que l'individu n'est infecte par aucune des deux maladies.")

    pdf.separator()

    # Exercice 6
    pdf.check_space(60)
    pdf.sub_title("Exercice 6")
    pdf.body_text(
        "Un laboratoire a mis au point un alcooltest. On sait que 2% des personnes controlees par la police "
        "sont reellement en etat d'ebriete. Les premiers essais ont conduit aux resultats suivants :\n"
        "- lorsqu'une personne est reellement en etat d'ebriete, 95 fois sur 100 l'alcooltest se revele positif ;\n"
        "- lorsqu'une personne n'est pas en etat d'ebriete, 96 fois sur 100 l'alcooltest se revele negatif."
    )
    pdf.question(1, "Quelle est la probabilite pour qu'une personne soit reellement en etat d'ebriete lorsque l'alcooltest est positif ?")

    pdf.separator()

    # Exercice 7
    pdf.check_space(60)
    pdf.sub_title("Exercice 7")
    pdf.body_text(
        "A l'IUT, parmi les etudiants 40% suivent l'option A1, 30% suivent l'option A2 et 30% suivent "
        "l'option A3. Chaque etudiant suit une seule option. La proportion d'etudiants qui n'ont pas la "
        "moyenne dans l'option A1 est de 10%, dans l'option A2 de 5% et dans l'option A3 de 5%. "
        "On choisit un etudiant au hasard."
    )
    pdf.question(1, "Calculer la probabilite qu'il n'ait pas la moyenne.")
    pdf.question(2, "Sachant qu'il n'a pas la moyenne, calculer la probabilite a posteriori qu'il ait suivi l'option A1, A2 ou A3.")

    pdf.separator()

    # Exercice 8
    pdf.check_space(80)
    pdf.sub_title("Exercice 8")
    pdf.body_text(
        "On a vole la Joconde. Deux ans plus tard, en perquisitionnant chez un collectionneur, la police "
        "retrouve Mona Lisa. Un doute plane sur l'authenticite de la toile retrouvee. On estime a 80% la "
        "probabilite pour que ce soit celle que Leonard a peinte. On consulte alors deux experts en peinture "
        "de la Renaissance. Le premier, qui se trompe une fois sur cinq, declare que le tableau est "
        "authentique. Le deuxieme, qui se trompe deux fois sur onze, annonce que c'est une copie. "
        "Les conclusions des experts sont independantes."
    )
    pdf.question(1, "Calculer la probabilite d'avoir retrouve la Joconde authentique.")

    # ============================================================
    # EPREUVE 2 : RECHERCHE OPERATIONNELLE
    # ============================================================
    pdf.page_separator()
    pdf.section_title("RECHERCHE OPERATIONNELLE (RO)")
    pdf.exam_header_block([
        "Etablissement : College de Paris Superieur",
        "Annee Academique : 2024/2025",
        "Filiere : B2 A&B-IT",
        "Examen Final  |  Duree : 3 heures",
        "Documents non autorises",
    ])

    # Partie A
    pdf.sub_title("Partie A : Cours")

    pdf.question(1, "Definir les termes suivants : Programmation lineaire, solution admissible, variable hors la base.")
    pdf.question(2, "En quoi consiste la modelisation mathematique ?")

    pdf.question(3, "Choisir la ou les bonnes reponses. Pour un modele de programmation lineaire a n activites et m contraintes, une solution de base est :")
    pdf.option("a", "Toutes solutions admissibles")
    pdf.option("b", "Une solution verifiant uniquement les contraintes de positivite des variables")
    pdf.option("c", "Une solution admettant au moins n variables hors base et au plus m variables dans la base")
    pdf.option("d", "Une solution admettant au moins m variables hors base et au plus n variables dans la base")

    pdf.question(4, "Choisir la ou les bonnes reponses. Pour un modele de programmation lineaire a n activites et m contraintes, la solution optimale si elle existe est :")
    pdf.option("a", "La solution admissible ayant toutes les activites non nulles")
    pdf.option("b", "Un n-uplets satisfaisant aux exigences du decideur")
    pdf.option("c", "Un n-uplets realisant necessairement le maximum")
    pdf.option("d", "Un n-uplets realisant le meilleur programme d'activites")

    pdf.question(5, "Choisir la ou les bonnes reponses. Dans un modele de programmation lineaire a n activites et m contraintes, la variable d'ecart associee a une contrainte du type >= est :")
    pdf.option("a", "Positive")
    pdf.option("b", "Negative")
    pdf.option("c", "Nulle")
    pdf.option("d", "Quelconque")

    pdf.check_space(60)
    pdf.question(6, "Choisir la ou les bonnes reponses. Dans un modele de programmation lineaire a n activites et m contraintes, le test d'optimalite de la methode de Simplexe consiste a :")
    pdf.option("a", "Verifier si la solution trouvee est le meilleur programme d'activites")
    pdf.option("b", "Verifier si la solution trouvee est un n-uplets admissible")
    pdf.option("c", "Verifier si la solution trouvee est un m-uplets admissible")
    pdf.option("d", "Verifier si la solution trouvee correspond aux contraintes optimales")

    pdf.question(7, "Choisir la ou les bonnes reponses. Dans un modele de programmation lineaire a n activites et m contraintes, la variable d'ecart associee a une contrainte du type <= est :")
    pdf.option("a", "m")
    pdf.option("b", "n")
    pdf.option("c", "0")
    pdf.option("d", "nm")

    pdf.question(8, "Choisir la ou les bonnes reponses. Dans un modele de programmation lineaire a n activites et m contraintes, les variables hors la base sont :")
    pdf.option("a", "Les variables non nulles")
    pdf.option("b", "Les variables nulles")
    pdf.option("c", "Les variables d'ecarts")
    pdf.option("d", "Les activites")

    pdf.separator()

    # Partie B
    pdf.check_space(80)
    pdf.sub_title("Partie B : Modelisation")
    pdf.body_text(
        "Une entreprise de la place produit trois types de produits (la farine du ble, le pain et le sandwich) "
        "et peut les vendre en quantite illimitee aux prix unitaires suivants :\n"
        "- la farine du ble (en kg) : 100 Francs\n"
        "- le pain : 200 Francs\n"
        "- le sandwich : 350 Francs\n\n"
        "Les contraintes de productions sont les suivantes :\n"
        "1. Produire une unite de pain requiert : trois heures de main d'oeuvre + 2 unites de A\n"
        "2. Produire une unite de sandwich requiert : deux heures de main d'oeuvre + 1 unite de B\n"
        "3. Un total de 35 heures de main d'oeuvre est disponible"
    )
    pdf.body_text_bold("T.A.F. Proposer a l'entreprise un meilleur programme d'activite. Pour cela repondez aux questions suivantes :")
    pdf.question(1, "Quel est le type de probleme qui repond au mieux a la situation decrite ? Justifier.")
    pdf.question(2, "Determiner la fonction objectif en fonction des activites.")
    pdf.question(3, "Determiner toutes les contraintes.")
    pdf.question(4, "Ecrire le probleme sous la forme standard.")
    pdf.question(5, "Trouver une solution de base et faire le test d'optimalite.")

    # ============================================================
    # EPREUVE 3 : RESEAU INFORMATIQUE (CCNA 2)
    # ============================================================
    pdf.page_separator()
    pdf.section_title("RESEAU INFORMATIQUE (CCNA 2)")
    pdf.exam_header_block([
        "Etablissement : College de Paris Superieur",
        "Annee Academique : 2024/2025",
        "Date : Mardi 11 Fevrier 2025",
        "Filiere : B2-A-IT et B2-B-IT  |  Niveau : Bachelor 2  |  Semestre : 1",
        "Duree : 02 Heures",
        "Consignes : Lisez attentivement et repondez clairement. A chaque question",
        "QCM, ecrivez juste la lettre correspondant a la bonne reponse.",
    ])

    pdf.sub_title("QCM (10 pts)")

    pdf.question(1, "Combien de couches comprend le modele OSI ?", 1)
    pdf.option("A", "4")
    pdf.option("B", "5")
    pdf.option("C", "7")
    pdf.option("D", "6")

    pdf.question(2, "Quel est le role principal des VLANs ?", 1)
    pdf.option("A", "Reduction des couts materiels")
    pdf.option("B", "Isolation du trafic pour une meilleure securite et performance")
    pdf.option("C", "Suppression des adresses IP")
    pdf.option("D", "Remplacement des routeurs dans un reseau")

    pdf.question(3, "Quelle couche du modele OSI est responsable du routage des paquets ?", 1)
    pdf.option("A", "Couche transport")
    pdf.option("B", "Couche reseau")
    pdf.option("C", "Couche liaison de donnees")
    pdf.option("D", "Couche application")

    pdf.question(4, "Quel protocole est utilise pour attribuer dynamiquement des adresses IP ?", 1)
    pdf.option("A", "DNS")
    pdf.option("B", "DHCP")
    pdf.option("C", "ICMP")
    pdf.option("D", "ARP")

    pdf.question(5, "Que signifie l'acronyme VLAN ?", 1)
    pdf.option("A", "Virtual Local Area Network")
    pdf.option("B", "Virtual Link Access Node")
    pdf.option("C", "Virtual Logical Addressing Network")
    pdf.option("D", "Virtual Latency Access Network")

    pdf.check_space(50)
    pdf.question(6, "Dans une adresse IP de classe C, combien d'adresses peuvent etre attribuees aux hotes ?", 1)
    pdf.option("A", "126")
    pdf.option("B", "254")
    pdf.option("C", "510")
    pdf.option("D", "1022")

    pdf.question(7, "Quel protocole permet de trouver l'adresse MAC associee a une adresse IP ?", 1)
    pdf.option("A", "DNS")
    pdf.option("B", "ARP")
    pdf.option("C", "ICMP")
    pdf.option("D", "NAT")

    pdf.question(8, "Quelles sont les deux methodes principales de routage ?", 1)
    pdf.option("A", "Routage statique et routage dynamique")
    pdf.option("B", "Routage a commutation et routage par circuit")
    pdf.option("C", "Routage manuel et routage automatique")
    pdf.option("D", "Routage statique et routage dynamique")

    pdf.question(9, "Quelle est la principale difference entre IPv4 et IPv6 ?", 1)
    pdf.option("A", "IPv6 est plus rapide")
    pdf.option("B", "IPv6 utilise des adresses plus longues (128 bits)")
    pdf.option("C", "IPv6 ne supporte pas le routage")
    pdf.option("D", "IPv6 est utilise uniquement pour les reseaux sans fil")

    pdf.question(10, "Quel type d'adresse IP est utilise pour communiquer avec un autre hote sur le meme reseau ?", 1)
    pdf.option("A", "Adresse publique")
    pdf.option("B", "Adresse privee")
    pdf.option("C", "Adresse de broadcast")
    pdf.option("D", "Adresse de loopback")

    pdf.separator()

    # Questions
    pdf.sub_title("Questions (10 pts)")

    pdf.question(1, "Quelles sont les differentes classes d'adresses IPv4 existantes. Qu'est-ce qui les distingue les unes des autres ?", 2)
    pdf.question(2, "Apres avoir decrit la particularite d'une adresse IPv4 privee, donnez les differents intervalles qui leur sont affectes dans le lot de toutes les adresses IPv4.", 2)
    pdf.question(3, "Voici l'adresse reseau d'une Infrastructure LAN : 192.168.10.0 puis son masque de reseau etant : 255.255.255.0. Quel est selon vous le nombre d'hotes maximal ? Quelle est selon vous l'adresse IP de diffusion ?", 2)
    pdf.question(4, "Une infrastructure reseau LAN a pour adresse reseau 192.168.10.0. Son administrateur reseau souhaiterait subdiviser son reseau primaire en 4 sous-reseaux. Faites les calculs necessaires pour determiner les 4 sous-reseaux avec le nombre d'hotes maximal pour chaque sous-reseau. Aussi quelle serait la nouvelle adresse de masque de sous-reseau ? Determinez les plages d'adresses.", 4)

    # ============================================================
    # EPREUVE 4 : ADMINISTRATION DES MACHINES VIRTUELLES
    # ============================================================
    pdf.page_separator()
    pdf.section_title("ADMINISTRATION DES MACHINES VIRTUELLES")
    pdf.exam_header_block([
        "Etablissement : College de Paris Superieur",
        "Annee Academique : 2024/2025",
        "Niveau : B2 IT",
        "Examen : Session Normale  |  Duree : 2 Heures",
        "Condition : Document non autorise (Pas de PC ni portable)",
        "Enseignant : BOUKLINAM",
    ])

    # Exercice 1
    pdf.sub_title("Exercice 1 : L'aventure de Max, l'Administrateur Virtuose")
    pdf.body_text(
        "Max est un jeune administrateur systeme fraichement recrute dans une entreprise specialisee "
        "dans l'e-commerce. A son arrivee, il decouvre que l'infrastructure repose en grande partie sur "
        "la virtualisation. Les serveurs physiques sont rares : tout est heberge sur une plateforme de "
        "virtualisation centralisee utilisant VMware ESXi et vCenter."
    )
    pdf.body_text(
        "Son premier defi ? Creer une nouvelle machine virtuelle (VM) pour heberger un site promotionnel "
        "temporaire. Il ouvre vSphere Client, choisit un hote ESXi, alloue 2 vCPU, 8 Go de RAM et 100 Go "
        "de stockage. Il choisit le systeme d'exploitation Ubuntu Server 22.04, et lance l'installation."
    )
    pdf.body_text(
        "Quelques jours plus tard, la VM devient lente. Max analyse la situation et se rend compte que "
        "plusieurs VMs sont hebergees sur le meme hote physique, en surconsommation de ressources. Il "
        "utilise vMotion pour deplacer la VM vers un autre hote moins sollicite. Resultat : les performances "
        "sont de retour."
    )
    pdf.body_text(
        "Plus tard, un collegue supprime accidentellement une VM critique. Heureusement, Max avait configure "
        "une sauvegarde automatique quotidienne avec Veeam. Il restaure la VM en moins de 30 minutes. En fin "
        "de mois, l'entreprise subit une panne electrique majeure. Grace a la configuration d'un cluster HA "
        "(Haute Disponibilite), les VMs redemarrent automatiquement sur un autre hote disponible du cluster "
        "des que l'on tombe en panne."
    )
    pdf.body_text(
        "Max devient rapidement indispensable. Il documente chaque action, surveille regulierement les "
        "performances avec vCenter, et programme des snapshots avant chaque mise a jour majeure. Grace a lui, "
        "l'infrastructure virtuelle reste stable, performante, et resiliente."
    )

    pdf.separator()
    pdf.sub_sub_title("Questions")
    pdf.question(1, "Quels sont les avantages de creer une machine virtuelle plutot qu'un serveur physique dans le contexte de l'histoire ?")
    pdf.question(2, "Pourquoi Max a-t-il choisi de deplacer la VM vers un autre hote ? Quel outil a-t-il utilise ?")
    pdf.question(3, "Qu'est-ce qu'un vCPU et en quoi est-il different d'un CPU physique ?")
    pdf.question(4, "Que se serait-il passe si Max n'avait pas mis en place un systeme de sauvegarde ?")
    pdf.question(5, "Expliquez le role de la fonction vMotion dans la gestion des ressources.")
    pdf.question(6, "Comment la Haute Disponibilite (HA) a-t-elle permis de minimiser l'impact de la panne electrique ?")
    pdf.question(7, "Quelle est la difference entre une sauvegarde et un snapshot dans un environnement virtuel ?")
    pdf.question(8, "Pourquoi la documentation et la surveillance reguliere des VMs sont-elles importantes dans le travail de Max ?")
    pdf.question(9, "Quels sont les risques si plusieurs VMs surconsomment les ressources d'un hote physique ?")
    pdf.question(10, "Quels autres outils ou bonnes pratiques Max pourrait-il mettre en place pour ameliorer encore la gestion des machines virtuelles ?")

    pdf.separator()

    # Exercice 2
    pdf.check_space(60)
    pdf.sub_title("Exercice 2 : QCM")

    pdf.question(1, "Quel est le role principal d'un hyperviseur de type 1 ?")
    pdf.option("A", "Executer des applications Windows sur Linux")
    pdf.option("B", "Installer automatiquement les systemes d'exploitation")
    pdf.option("C", "Permettre la virtualisation directement sur le materiel physique")
    pdf.option("D", "Gerer les imprimantes et les peripheriques externes")

    pdf.question(2, "Quelle technologie permet de sauvegarder l'etat d'une machine virtuelle a un instant donne ?")
    pdf.option("A", "Clonage")
    pdf.option("B", "Snapshot")
    pdf.option("C", "RAID")
    pdf.option("D", "Reboot")

    pdf.question(3, "Quelle est l'unite de mesure de la consommation CPU dans un environnement VMware ?")
    pdf.option("A", "vMIPS")
    pdf.option("B", "GHz")
    pdf.option("C", "CPU Ready Time")
    pdf.option("D", "vCPU Seconds")

    pdf.question(4, "Quelle est la principale consequence d'une surallocation de vCPU ?")
    pdf.option("A", "Reduction de la memoire RAM disponible")
    pdf.option("B", "Utilisation excessive de l'espace disque")
    pdf.option("C", "Allongement du CPU Ready Time")
    pdf.option("D", "Augmentation du trafic reseau")

    pdf.question(5, "Parmi les solutions suivantes, laquelle est un hyperviseur de type 1 ?")
    pdf.option("A", "VMware Workstation")
    pdf.option("B", "Oracle VirtualBox")
    pdf.option("C", "VMware ESXi")
    pdf.option("D", "Microsoft Windows")

    pdf.question(6, "Quelle commande (ou action) permet de migrer une VM en cours d'execution sans interruption de service ?")
    pdf.option("A", "vMotion")
    pdf.option("B", "vClone")
    pdf.option("C", "vSnapshot")
    pdf.option("D", "vStop")

    pdf.question(7, "Que signifie le terme \"thin provisioning\" dans un contexte de stockage ?")
    pdf.option("A", "La VM utilise tout l'espace disque immediatement")
    pdf.option("B", "Le disque est sauvegarde en mode compresse")
    pdf.option("C", "L'espace disque est alloue dynamiquement selon les besoins")
    pdf.option("D", "L'espace est partage uniquement entre deux VM")

    pdf.question(8, "Quelle fonctionnalite est essentielle pour la haute disponibilite (HA) des VM ?")
    pdf.option("A", "Hyper-threading")
    pdf.option("B", "vSwitch")
    pdf.option("C", "Redondance reseau")
    pdf.option("D", "Cluster de virtualisation")

    pdf.question(9, "Que permet la fonctionnalite \"template\" dans la gestion des VM ?")
    pdf.option("A", "Optimiser le CPU Ready Time")
    pdf.option("B", "Cloner rapidement une VM preconfiguree")
    pdf.option("C", "Reinitialiser une VM aux valeurs d'usine")
    pdf.option("D", "Lancer une VM en mode sans echec")

    pdf.question(10, "Qu'est-ce qu'un fichier VMDK dans un environnement VMware ?")
    pdf.option("A", "Un script d'installation de VM")
    pdf.option("B", "Une image ISO du systeme")
    pdf.option("C", "Un fichier de configuration reseau")
    pdf.option("D", "Un disque virtuel contenant les donnees de la VM")

    pdf.ln(6)
    pdf.italic_text("\"Le mal de cou est la consequence premiere de la cyber tricherie\" - BOUKLINAM ABALO")

    # ============================================================
    # EPREUVE 5 : PROGRAMMATION C#
    # ============================================================
    pdf.page_separator()
    pdf.section_title("PROGRAMMATION C#")
    pdf.exam_header_block([
        "Annee Scolaire : 2024/2025",
        "UE : Programmation C#",
        "Professeur : Mme AGBEGNAN",
        "Classe : B2-B-IT  |  Duree : 03 Heures",
    ])

    # Exercice 1
    pdf.sub_title("Exercice 1 (05 pts)")
    pdf.body_text(
        "Ecrire un programme en C# qui verifie le nom d'utilisateur et le mot de passe saisis par "
        "l'utilisateur. Si les deux correspondent aux valeurs predefinies, l'acces est accorde. "
        "Sinon, l'acces est refuse."
    )
    pdf.sub_sub_title("Instructions :")
    pdf.question(1, "Le programme demande a l'utilisateur de saisir un nom d'utilisateur et un mot de passe.")
    pdf.question(2, "Le systeme affiche la liste des mots de passe dans le programme :")
    pdf.body_text(
        "    Nom d'utilisateur = ESP_Etudiant_B2_IT\n"
        "    Mot de passe = Examen@2024@2025"
    )
    pdf.question(3, "Si le nom d'utilisateur et le mot de passe sont corrects, affichez : \"Acces autorise.\" Sinon, affichez : \"Nom d'utilisateur ou mot de passe incorrect.\"")

    pdf.separator()

    # Exercice 2
    pdf.sub_title("Exercice 2 : Mise en application de la POO en programmation C# : Heritage (15 pts)")
    pdf.body_text(
        "Le directeur des systemes d'informations de la societe IP tech souhaite mettre en place un module "
        "pour la gestion du parc informatique de son entreprise. Pour cela, il vous a fait appel pour "
        "realiser cette tache."
    )
    pdf.body_text(
        "Vous allez concevoir un programme qui permet de gerer les ordinateurs et les imprimantes du parc informatique."
    )

    pdf.check_space(60)
    pdf.sub_sub_title("1. Classe de base : Appareil")
    pdf.body_text("Proprietes :")
    pdf.body_text(
        "    - Nom (string) : le nom de l'appareil.\n"
        "    - Marque (string) : la marque de l'appareil.\n"
        "    - Modele (string) : le modele de l'appareil.\n"
        "    - AnneeAchat (int) : l'annee d'achat de l'appareil."
    )
    pdf.body_text("Methodes :")
    pdf.body_text(
        "    - AfficherDetails() : Affiche les informations generales de l'appareil.\n"
        "    - CalculerAge() : Calcule l'age de l'appareil (par rapport a l'annee actuelle)."
    )

    pdf.check_space(50)
    pdf.sub_sub_title("2. Classe derivee : Ordinateur")
    pdf.body_text("Proprietes supplementaires :")
    pdf.body_text(
        "    - Processeur (string)\n"
        "    - RAM (int) (en Go)\n"
        "    - Stockage (int) (en Go)"
    )
    pdf.body_text("Methodes :")
    pdf.body_text("    - Redefinir AfficherDetails() pour inclure les informations specifiques de l'ordinateur.")

    pdf.check_space(50)
    pdf.sub_sub_title("3. Classe derivee : Imprimante")
    pdf.body_text("Proprietes supplementaires :")
    pdf.body_text(
        "    - Technologie (string) : type d'impression (ex. : \"Laser\", \"Jet d'encre\").\n"
        "    - Couleur (bool) : indique si l'imprimante imprime en couleur."
    )
    pdf.body_text("Methodes :")
    pdf.body_text("    - Redefinir AfficherDetails() pour inclure les informations specifiques de l'imprimante.")

    pdf.check_space(40)
    pdf.sub_sub_title("4. Methode Main")
    pdf.body_text(
        "    - Creez une liste de quatre (04) appareils : (02) ordinateurs et (02) imprimantes melanges.\n"
        "    - Ajoutez des objets Ordinateur et Imprimante a la liste.\n"
        "    - Parcourez la liste et affichez les informations de chaque appareil."
    )

    # ============================================================
    # EPREUVE 6 : POO EN PHP
    # ============================================================
    pdf.page_separator()
    pdf.section_title("PROGRAMMATION ORIENTEE OBJET EN PHP")
    pdf.exam_header_block([
        "Etablissement : College de Paris Superieur",
        "Annee Academique : 2024/2025",
        "Niveau : Bachelor 2  |  Duree : 2 Heures",
        "Consignes : Aucun document n'est autorise.",
        "1 point est reserve pour une copie bien soignee.",
    ])

    # Exercice 1
    pdf.sub_title("Exercice 1 : Creation et manipulation de classes (5 pts)")
    pdf.body_text("Contexte : On souhaite modeliser une bibliotheque avec des livres.")
    pdf.question(1, "Creez une classe Livre avec les attributs suivants : titre (chaine de caracteres), auteur (chaine de caracteres), nbPages (entier). Implementez un constructeur permettant d'initialiser ces attributs.", 2)
    pdf.question(2, "Ajoutez une methode afficherInfos() qui affiche les informations du livre sous la forme : \"Titre : <titre>, Auteur : <auteur>, Nombre de pages : <nbPages>\"", 1)
    pdf.question(3, "Instanciez deux objets de la classe Livre et affichez leurs informations.", 2)

    pdf.separator()

    # Exercice 2
    pdf.sub_title("Exercice 2 : Encapsulation et methodes (5 pts)")
    pdf.body_text("Contexte : On veut securiser la gestion du nombre de pages d'un livre.")
    pdf.question(1, "Modifiez la classe Livre pour que l'attribut nbPages soit prive.", 2)
    pdf.question(2, "Ajoutez une methode setNbPages($pages) qui permet de modifier nbPages uniquement si la valeur est un entier strictement positif.", 2)
    pdf.question(3, "Testez cette methode avec des valeurs valides et invalides.", 1)

    pdf.separator()

    # Exercice 3
    pdf.sub_title("Exercice 3 : Heritage et surcharge (5 pts)")
    pdf.body_text("Contexte : On veut etendre notre systeme avec des livres electroniques.")
    pdf.question(1, "Creez une classe LivreElectronique qui herite de Livre et ajoute un nouvel attribut tailleFichier (en Mo).", 2)
    pdf.question(2, "Redefinissez la methode afficherInfos() pour inclure la taille du fichier dans l'affichage.", 2)
    pdf.question(3, "Instanciez un objet LivreElectronique et testez l'affichage.", 1)

    pdf.separator()

    # Exercice 4
    pdf.sub_title("Exercice 4 : Gestion des erreurs et exceptions (5 pts)")
    pdf.body_text("On souhaite gerer les erreurs liees a la manipulation des livres.")
    pdf.question(1, "Ajoutez une exception dans la methode setNbPages($pages) si la valeur fournie n'est pas un entier positif.", 2)
    pdf.question(2, "Ajoutez un bloc try/catch dans le script principal pour intercepter et afficher les erreurs de maniere appropriee.", 2)
    pdf.question(3, "Testez la gestion des erreurs en provoquant volontairement une exception.", 1)

    pdf.ln(4)
    pdf.body_text_bold("Bonne chance !")

    # ============================================================
    # EPREUVE 7 : UML (DIAGRAMMES)
    # ============================================================
    pdf.page_separator()
    pdf.section_title("UML (DIAGRAMMES)")
    pdf.exam_header_block([
        "Etablissement : College de Paris Superieur",
        "Annee Academique : 2024/2025",
    ])

    # Exercice 1
    pdf.sub_title("Exercice 1 : Diagramme de Classe")
    pdf.body_text(
        "Une academie souhaite gerer les cours dispenses dans plusieurs ecoles. "
        "Pour cela, on dispose des renseignements suivants :"
    )
    pdf.body_text(
        "- Chaque ecole possede un site Internet.\n"
        "- Chaque ecole est structuree en departements, qui regroupent chacun des enseignants specifiques.\n"
        "- Un enseignant se definit par son nom, prenom, tel, mail, date de prise de fonction et son indice.\n"
        "- Les etudiants suivent quant a eux plusieurs matieres et recoivent une note pour chacune d'elles.\n"
        "- Pour chaque etudiant, on veut gerer son nom, prenom, tel, mail, ainsi que son annee d'entree au college.\n"
        "- Une matiere peut etre enseignee par plusieurs enseignants mais a toujours lieu dans la meme salle de cours "
        "(chaque salle ayant un nombre de places determine).\n"
        "- On desire pouvoir calculer la moyenne par matiere ainsi que par departement.\n"
        "- On veut egalement calculer la moyenne generale d'un eleve et pouvoir afficher les matieres dans "
        "lesquelles il n'a pas ete note.\n"
        "- Enfin, on doit pouvoir imprimer la fiche signaletique (nom, prenom, tel, mail) d'un enseignant ou d'un eleve."
    )
    pdf.body_text_bold("Travail a faire : Elaborer le diagramme de classes correspondant. Pour simplifier l'exercice, on limitera le diagramme a une seule annee d'etude.")

    pdf.separator()

    # Exercice 2
    pdf.sub_title("Exercice 2 : Diagramme de cas d'utilisation")
    pdf.body_text(
        "Un systeme informatique doit permettre a des acheteurs potentiels de preparer l'achat de chevaux "
        "(mais pas l'achat proprement dit). L'achat d'un cheval concerne soit une jument soit un etalon."
    )
    pdf.body_text(
        "Dans le premier cas, on doit imperativement examiner l'etat de maternite du cheval, et eventuellement "
        "verifier que la jument n'a pas un jeune poulain en ce moment."
    )
    pdf.body_text(
        "Que l'on souhaite acheter un etalon ou une jument, on doit effectuer un examen des conditions. "
        "En outre, l'acheteur peut souhaiter, lors de la preparation au sein du camp, choisir le calibre du cheval "
        "ou bien choisir le type de robe."
    )
    pdf.body_text(
        "Toutes les informations en rapport a la filiation d'un cheval sont obtenues en consultant la base de "
        "donnees externe des haras nationaux."
    )
    pdf.body_text_bold("Question : Donnez un diagramme de cas d'utilisation pour le systeme de preparation avant achat.")

    # ============================================================
    # EPREUVE 8 : POO ET JAVA
    # ============================================================
    pdf.page_separator()
    pdf.section_title("PROGRAMMATION ORIENTEE OBJET ET JAVA")
    pdf.exam_header_block([
        "Etablissement : College de Paris Superieur",
        "Niveau : B2 IT A,B",
        "Rattrapage  |  Duree : 02H00",
        "Attention : l'etudiant traitera son devoir de facon precise et concise.",
        "Documents, telephones et ordinateurs non autorises en salle d'examen.",
    ])

    # Exercice 1
    pdf.sub_title("Exercice 1 : Questions de cours (4 pts)")
    pdf.body_text_bold("Choisir ci-dessous la ou les bonnes reponses :")

    pdf.question(1, "Dans une classe :")
    pdf.option("a", "On peut avoir plusieurs constructeurs")
    pdf.option("b", "On peut avoir des methodes publiques et des methodes privees")
    pdf.option("c", "On peut avoir des attributs et des methodes statiques")
    pdf.option("d", "On doit avoir un seul constructeur")

    pdf.question(2, "Par convention :")
    pdf.option("a", "Le nom de la classe commence par une majuscule.")
    pdf.option("b", "Le nom d'un attribut commence par une minuscule.")
    pdf.option("c", "Le nom de la classe commence par une minuscule.")
    pdf.option("d", "Le nom d'un attribut commence par une majuscule.")

    pdf.question(3, "Une methode statique d'une classe dans un programme :")
    pdf.option("a", "Peut etre appelee en utilisant le nom de classe (MaClasse.maMethode)")
    pdf.option("b", "Peut etre appelee en utilisant le nom de l'objet (MonObjet.maMethode)")
    pdf.option("c", "Peut etre appelee directement en n'utilisant ni le nom de classe ni le nom de l'objet instancie.")

    pdf.question(4, "Un attribut d'un objet sert a representer :")
    pdf.option("a", "Ses etats")
    pdf.option("b", "Ses caracteristiques")
    pdf.option("c", "Ses actions")
    pdf.option("d", "Ses composants")
    pdf.option("e", "Ses fonctions")

    pdf.question(5, "La machine virtuelle Java permet de :")
    pdf.option("a", "Executer le code source Java (fichier .java)")
    pdf.option("b", "Compiler le code source")
    pdf.option("c", "Executer les fichiers bytecode (fichier .class)")

    pdf.question(6, "L'operateur new :")
    pdf.option("a", "Sert a fabriquer un objet a l'aide d'un constructeur defini dans une classe.")
    pdf.option("b", "Sert a initialiser une classe")
    pdf.option("c", "Ne s'emploie que pour les acces statiques")

    pdf.question(7, "Pour empecher de redefinir une methode on la declare :")
    pdf.option("a", "Final")
    pdf.option("b", "Private")
    pdf.option("c", "Exclusive")
    pdf.option("d", "Static")

    pdf.question(8, "Le constructeur d'une classe doit porter le meme nom que la classe :")
    pdf.option("a", "Non c'est interdit")
    pdf.option("b", "Pas obligatoirement")
    pdf.option("c", "C'est deconseille")
    pdf.option("d", "Oui, imperativement")

    pdf.separator()

    # Exercice 2
    pdf.sub_title("Exercice 2 : Tableau statique (04 pts)")
    pdf.body_text(
        "On place un capital durant n annees a un taux annuel d'interet compose de 4 %. "
        "Realiser un programme qui calcule les interets acquis au cours de n annees. "
        "On utilisera un tableau pour enregistrer les interets acquis chaque annee puis les afficher."
    )

    pdf.separator()

    # Exercice 3
    pdf.check_space(60)
    pdf.sub_title("Exercice 3 : Projet de gestion d'une banque (12 pts)")
    pdf.body_text(
        "Pour la gestion d'une banque, il vous est demande d'ecrire une application dont le libelle des exercices se trouve ci-dessous."
    )

    pdf.sub_sub_title("I. Classe Client")
    pdf.body_text("Attributs :")
    pdf.body_text(
        "    - nom : String\n"
        "    - prenom : String\n"
        "    - numeroTel : long"
    )
    pdf.body_text_bold("Travail a faire :")
    pdf.question(1, "Declarer des attributs nom, prenom et numeroTel comme dans le tableau ci-dessus. Declarer ces attributs en respectant le principe d'encapsulation.")
    pdf.question(2, "Definir un constructeur d'initialisation pour les attributs de la classe Client.")
    pdf.question(3, "Definir des getters getNom(), getPrenom() et getNumeroTel() qui retourneront respectivement les valeurs des attributs nom, prenom et numeroTel.")
    pdf.question(4, "Definir un mutateur (setter) setNumeroTel() qui permet de modifier la valeur d'attribut numeroTel.")
    pdf.question(5, "Ajouter la methode saisir() qui permet de saisir les informations d'un client.")
    pdf.question(6, "Ajouter la methode afficher() qui permet d'afficher les informations d'un client.")

    pdf.separator()

    pdf.check_space(60)
    pdf.sub_sub_title("II. Classe Compte")
    pdf.body_text("Attributs :")
    pdf.body_text(
        "    - numero : long\n"
        "    - solde : double\n"
        "    - client : Client"
    )
    pdf.body_text_bold("Travail a faire :")
    pdf.question(1, "Declarer des attributs numero, solde et client comme dans le tableau ci-dessus.")
    pdf.question(2, "Definir un constructeur prenant en parametres un numero de compte et un solde initial.")
    pdf.question(3, "Definir un constructeur prenant en parametres un numero de compte, un solde initial et un client.")
    pdf.question(4, "Definir des accesseurs getNumero(), getSolde() et getClient() qui renvoient respectivement le numero de compte, le solde et le client qui dispose du compte.")
    pdf.question(5, "Definir une methode deposer permettant de deposer un montant dans un compte.")
    pdf.question(6, "Definir une methode retirer permettant de retirer un montant d'un compte.")

    pdf.separator()

    pdf.check_space(80)
    pdf.sub_sub_title("III. Heritage : Compte Courant et Compte d'Epargne")
    pdf.body_text(
        "Dans la classe Compte, nous redefinissons la methode toString() heritee de la classe Object. "
        "La methode toString() retourne \"Compte numero 12121 avec solde 120000 U.M\"."
    )
    pdf.body_text(
        "On distingue 2 types de comptes specialises :\n"
        "- Compte courant : un compte destine aux transactions quotidiennes.\n"
        "- Compte d'epargne : un compte de depot remunere qui permet des transactions limitees."
    )

    pdf.check_space(50)
    pdf.sub_sub_title("Compte Courant")
    pdf.body_text_bold("Travail a faire :")
    pdf.sub_question("a", "Creer une classe CompteCourant qui herite de la classe Compte.")
    pdf.sub_question("b", "Ajouter un attribut tauxFrais: float qui represente le taux de frais qui doit etre soustraits du solde a chaque operation de retrait.")
    pdf.sub_question("c", "Redefinir la methode retirer tel que le frais soit soustrait du solde.")
    pdf.sub_question("d", "Redefinir la methode toString() tel que l'affichage devient : \"Compte courant numero... avec solde...\".")

    pdf.check_space(50)
    pdf.sub_sub_title("Compte d'Epargne")
    pdf.body_text_bold("Travail a faire :")
    pdf.sub_question("a", "Creer une classe CompteEpargne qui herite de la classe Compte.")
    pdf.sub_question("b", "Ajouter un attribut soldeMinimum: double qui represente le solde minimum requis pour maintenir un compte d'epargne.")
    pdf.sub_question("c", "Definir un attribut compteCourant permettant de faire reference au compte courant a partir duquel les transferts seront effectues.")
    pdf.sub_question("d", "Definir une methode transfert() permettant de retirer du compte courant en utilisant le montant transfere.")
    pdf.sub_question("e", "Redefinir la methode retirer telle que le solde d'un compte d'epargne ne soit pas inferieur a soldeMinimum.")
    pdf.sub_question("f", "Redefinir la methode toString() telle que l'affichage devient : \"Compte d'epargne numero... avec solde...\".")

    # ============================================================
    # SAUVEGARDE
    # ============================================================
    output_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "Recueil_Epreuves_2024_2025.pdf")
    pdf.output(output_path)
    print(f"PDF genere avec succes : {output_path}")
    print(f"Nombre de pages : {pdf.page_no()}")

if __name__ == "__main__":
    build_pdf()
