'use strict';

module.exports = [
  {
    "id": "cr3-c1-e1",
    "chapter": 1,
    "title": "Chiffrement et Déchiffrement de César et Substitution Affine",
    "level": "n1",
    "language": "analyse",
    "goal": "Analyser des cas de chiffrements de César et de substitution affine, avec calcul d’inverse modulaire.",
    "brief": "<p>Dans la cryptographie classique, le chiffrement par décalage de César applique la transformation :\n<code>C = (P + k) mod 26</code>.\nLe chiffrement par substitution affine généralise ce principe selon :\n<code>C = (a * P + b) mod 26</code>, où la clé multiplicative <code>a</code> doit être strictement première avec 26 (<code>pgcd(a, 26) == 1</code>) pour garantir l'inversibilité.<br><br>\nAnalysez les données fournies pour chaque cas. <code>CAESAR ENC k=&lt;entier&gt; text=&lt;texte&gt;</code> :<br>\n   Décale chaque lettre de <code>k</code> positions (A=0, ..., Z=25). Les minuscules sont converties en majuscules, les caractères non alphabétiques sont préservés.<br>\n2. <code>CAESAR DEC k=&lt;entier&gt; text=&lt;texte&gt;</code> :<br>\n   Déchiffre le texte avec la clé <code>k</code>.<br>\n3. <code>AFFINE ENC a=&lt;entier&gt; b=&lt;entier&gt; text=&lt;texte&gt;</code> :<br>\n   Si <code>pgcd(a, 26) != 1</code>, utilisez le format <code>ERROR: &lt;motif&gt;</code> avec le motif <code>gcd(a,26)!=1</code>.<br>\n   Sinon chiffre selon <code>C = (a * P + b) mod 26</code>.<br>\n4. <code>AFFINE DEC a=&lt;entier&gt; b=&lt;entier&gt; text=&lt;texte&gt;</code> :<br>\n   Si <code>pgcd(a, 26) != 1</code>, utilisez le format <code>ERROR: &lt;motif&gt;</code> avec le motif <code>gcd(a,26)!=1</code>.<br>\n   Sinon calcule <code>a_inv = pow(a, -1, 26)</code> et déchiffre selon <code>P = (a_inv * (C - b)) mod 26</code>.<br><br>\nPour toute opération réussie :<br>\n<code>OUT: &lt;texte_resultat&gt;</code></p>",
    "starter": "# Grille d'analyse (cr3-c1-e1) — Chiffrement de César et substitution affine\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Déchiffrement de César]\n# Données : CAESAR DEC k=3 text=DWWDTXH D O'DXEH\nA_COMPLETER\n\n[Cas 2 — Opération B]\n# Données : AFFINE ENC a=5 b=8 text=SECRET\nA_COMPLETER\n\n[Cas 3 — Opération C]\n# Données : AFFINE DEC a=5 b=8 text=PCJW\nA_COMPLETER\n\n[Cas 4 — Opération D]\n# Données : AFFINE ENC a=4 b=3 text=HELLO\nA_COMPLETER\n",
    "hints": [
      "Comment associer chaque lettre à son indice sans modifier les espaces et la ponctuation ?",
      "Pour le chiffre affine, que faut-il vérifier sur a et 26 avant de chercher l’inverse modulaire ?",
      "Pour le déchiffrement affine E(x)=a*x+b mod 26, trouvez l inverse modulaire a^-1 mod 26 tel que (a * a^-1) % 26 == 1, puis appliquez ((x - b) * a^-1) mod 26."
    ],
    "examples": [
      {
        "stdin": "CAESAR ENC k=3 text=BONJOUR",
        "expected": "OUT: ERQMRXU",
        "note": "Chiffrement de César avec décalage de 3 positions."
      }
    ],
    "tests": [
      {
        "label": "Déchiffrement de César",
        "stdin": "cas:1",
        "expected": "OUT: ATTAQUE A L'AUBE"
      },
      {
        "label": "Chiffrement affine valide",
        "stdin": "cas:2",
        "expected": "OUT: UCSPCZ"
      },
      {
        "label": "Déchiffrement affine valide",
        "stdin": "cas:3",
        "expected": "OUT: REVI"
      },
      {
        "label": "Rejet clé affine non inversible",
        "stdin": "cas:4",
        "expected": "ERROR: gcd(a,26)!=1"
      }
    ],
    "solution": "[Exemple]\nOUT: ERQMRXU\n\n[Cas 1 — Déchiffrement de César]\nOUT: ATTAQUE A L'AUBE\n\n[Cas 2 — Chiffrement affine valide]\nOUT: UCSPCZ\n\n[Cas 3 — Déchiffrement affine valide]\nOUT: REVI\n\n[Cas 4 — Rejet clé affine non inversible]\nERROR: gcd(a,26)!=1",
    "takeaway": "À retenir : Analyser des cas de chiffrements de César et de substitution affine, avec calcul d’inverse modulaire.\nRepère : Chiffrement de César avec décalage de 3 positions."
  },
  {
    "id": "cr3-c1-e2",
    "chapter": 1,
    "title": "Chiffre Polyalphabétique de Vigenère et Masque Jetable (OTP)",
    "level": "n2",
    "language": "analyse",
    "goal": "Analyser Vigenère et examiner deux conditions nécessaires déclarées sans prétendre prouver la sécurité d’un masque jetable.",
    "brief": "<p>Le chiffre de Vigenère utilise une clé alphabétique répétée. Le masque jetable (Vernam / OTP) assure la confidentialité parfaite sous les hypothèses suivantes : clé secrète, uniformément aléatoire, indépendante du message, au moins aussi longue que lui et jamais réutilisée. Les longueurs et l’indicateur de réemploi sont des valeurs déclarées ; aucune clé ni aucun historique ne sont vérifiés. Ces paramètres ne permettent pas de démontrer la confidentialité parfaite : ils ne vérifient ni le secret, ni la distribution, ni l’indépendance. Une clé de zéros, assez longue et utilisée une seule fois, laisse pourtant le clair inchangé sous XOR.<br><br>\nOpérations soumises à l’analyse :<br>\n1. <code>VIGENERE ENC key=&lt;cle&gt; text=&lt;texte&gt;</code> : chiffre le texte.<br>\n2. <code>VIGENERE DEC key=&lt;cle&gt; text=&lt;texte&gt;</code> : déchiffre le texte.<br>\n3. <code>OTP VERIFY key_len=&lt;k&gt; text_len=&lt;t&gt; reuse=&lt;true|false&gt;</code> compare seulement les longueurs déclarées et l’indicateur de réemploi :<br>\n   Utilisez <code>OTP: &lt;statut&gt; (&lt;detail&gt;)</code>. Les statuts possibles sont <code>INVALID</code> et <code>CONDITIONS_NECESSAIRES_OK</code>. Les détails possibles sont <code>key shorter than message</code>, <code>key reused, vulnerable to two-time pad attack</code> et <code>perfect secrecy not verified</code>. Vérifiez d’abord la longueur, ensuite le réemploi, puis l’absence de ces deux motifs de rejet.<br><br>\nPour VIGENERE : <code>OUT: &lt;texte_resultat&gt;</code>.</p>",
    "starter": "# Grille d'analyse (cr3-c1-e2) — Chiffre Polyalphabétique de Vigenère et Masque Jetable (OTP)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Opération A]\n# Données : VIGENERE DEC key=SECRET text=EIUJEZW GQEJBVIPKMXD\nA_COMPLETER\n\n[Cas 2 — Opération B]\n# Données : OTP VERIFY key_len=64 text_len=64 reuse=false\nA_COMPLETER\n\n[Cas 3 — Opération C]\n# Données : OTP VERIFY key_len=32 text_len=64 reuse=false\nA_COMPLETER\n\n[Cas 4 — Opération D]\n# Données : OTP VERIFY key_len=128 text_len=64 reuse=true\nA_COMPLETER\n",
    "hints": [
      "Pour Vigenère, avancez dans la clé uniquement sur les lettres et conservez les espaces.",
      "La longueur et le non-réemploi sont nécessaires mais ne prouvent ni le secret, ni l’uniformité, ni l’indépendance de la clé.",
      "Décalez chaque lettre par la position correspondante de la clé répétée (A=0..Z=25) ; pour OTP, contrôlez l égalité de longueur avec la clé et son usage unique."
    ],
    "examples": [
      {
        "stdin": "VIGENERE ENC key=LUNE text=BONJOUR",
        "expected": "OUT: MIANZOE",
        "note": "Chiffrement polyalphabétique avec la clé LUNE répétée."
      }
    ],
    "tests": [
      {
        "label": "Déchiffrement de Vigenère",
        "stdin": "cas:1",
        "expected": "OUT: MESSAGE CONFIDENTIEL"
      },
      {
        "label": "Conditions nécessaires satisfaites, sécurité non vérifiée",
        "stdin": "cas:2",
        "expected": "OTP: CONDITIONS_NECESSAIRES_OK (perfect secrecy not verified)"
      },
      {
        "label": "Clé OTP trop courte",
        "stdin": "cas:3",
        "expected": "OTP: INVALID (key shorter than message)"
      },
      {
        "label": "Réutilisation de clé OTP interdite",
        "stdin": "cas:4",
        "expected": "OTP: INVALID (key reused, vulnerable to two-time pad attack)"
      }
    ],
    "solution": "[Exemple]\nOUT: MIANZOE\n\n[Cas 1 — Déchiffrement de Vigenère]\nOUT: MESSAGE CONFIDENTIEL\n\n[Cas 2 — Conditions nécessaires satisfaites, sécurité non vérifiée]\nOTP: CONDITIONS_NECESSAIRES_OK (perfect secrecy not verified)\n\n[Cas 3 — Clé OTP trop courte]\nOTP: INVALID (key shorter than message)\n\n[Cas 4 — Réutilisation de clé OTP interdite]\nOTP: INVALID (key reused, vulnerable to two-time pad attack)",
    "takeaway": "À retenir : Analyser Vigenère et examiner deux conditions nécessaires déclarées sans prétendre prouver la sécurité d’un masque jetable.\nRepère : Chiffrement polyalphabétique avec la clé LUNE répétée."
  },
  {
    "id": "cr3-c1-e3",
    "chapter": 1,
    "title": "Analyse Fréquentielle et Indice de Coïncidence (IC) pour Cryptanalyse",
    "level": "n3",
    "language": "analyse",
    "goal": "Calculer l’indice de coïncidence et les fréquences, puis appliquer un barème indicatif sans identifier le chiffrement avec certitude.",
    "brief": "<p>L'Indice de Coïncidence de Friedman est défini par :<br>\n<code>IC = sum(f_i * (f_i - 1)) / (N * (N - 1))</code><br>\noù <code>f_i</code> est la fréquence de chaque lettre (A-Z) et <code>N</code> est le nombre total de lettres.<br><br>\nOpérations soumises à l’analyse : <code>ANALYZE text=&lt;texte&gt;</code><br>\n1. Si <code>N &lt; 2</code>, utilisez le format <code>ERROR: &lt;motif&gt;</code> avec le motif <code>TEXT_TOO_SHORT</code>.<br>\n2. Calculer <code>IC</code> (4 décimales).<br>\n3. Attribuer une catégorie selon le barème fictif ci-dessous ; elle suggère une piste, sans identifier avec certitude le type de chiffrement :<br>\n   - Si <code>IC &gt;= 0.0650</code> : <code>TYPE=MONOALPHABETIC</code><br>\n   - Sinon si <code>IC &gt;= 0.0450</code> : <code>TYPE=POLYALPHABETIC_SHORT_KEY</code><br>\n   - Sinon : <code>TYPE=POLYALPHABETIC_OR_RANDOM</code><br>\n4. Identifier le top 3 : <code>TOP=L1(c1),L2(c2),L3(c3)</code> trié par occurrences décroissantes puis alphabétiquement.<br><br>\nFormat de sortie : <code>N=&lt;N&gt; IC=&lt;IC:.4f&gt; TYPE=&lt;TYPE&gt; TOP=&lt;TOP&gt;</code>.</p>",
    "starter": "# Grille d'analyse (cr3-c1-e3) — Analyse Fréquentielle et Indice de Coïncidence (IC) pour Cryptanalyse\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Texte A]\n# Données : ANALYZE text=OH SHWLW FKDSHURQ URXJH VH SURPHQDLW GDQV OD IRUHW WRXW VHXO HW UHQFRQWUD OH ORXS\nA_COMPLETER\n\n[Cas 2 — Texte B]\n# Données : ANALYZE text=WZKX PLMZ OJQY RTVA BXZP QWMC VBNM LKJH GFDS AZXC VBNM QWER TYUI OPAS DFGH JKLL ZXC\nA_COMPLETER\n\n[Cas 3 — Texte C]\n# Données : ANALYZE text=A\nA_COMPLETER\n",
    "hints": [
      "Filtrez le texte pour ne conserver que les 26 lettres de l'alphabet en majuscules.",
      "Classez les lettres par nombre d'occurrences décroissant, puis par ordre alphabétique en cas d'égalité.",
      "Comptez uniquement les lettres A-Z normalisées (N), calculez IC = sum(f_i*(f_i-1)) / (N*(N-1)) avec 4 décimales et comparez au seuil mono/polyalphabétique."
    ],
    "examples": [
      {
        "stdin": "ANALYZE text=LE PETIT CHAPERON ROUGE SE PROMENAIT DANS LA FORET TOUT SEUL ET RENCONTRA LE LOUP",
        "expected": "N=67 IC=0.0751 TYPE=MONOALPHABETIC TOP=E(11),T(8),O(7)",
        "note": "Distribution naturelle en français produisant un IC élevé (0.0751 > 0.065)."
      }
    ],
    "tests": [
      {
        "label": "Texte chiffré par César conservant l IC monoalphabétique",
        "stdin": "cas:1",
        "expected": "N=67 IC=0.0751 TYPE=MONOALPHABETIC TOP=H(11),W(8),R(7)"
      },
      {
        "label": "Texte aplati polyalphabétique ou aléatoire",
        "stdin": "cas:2",
        "expected": "N=67 IC=0.0294 TYPE=POLYALPHABETIC_OR_RANDOM TOP=Z(5),L(4),M(4)"
      },
      {
        "label": "Texte trop court pour le calcul d IC",
        "stdin": "cas:3",
        "expected": "ERROR: TEXT_TOO_SHORT"
      }
    ],
    "solution": "[Exemple]\nN=67 IC=0.0751 TYPE=MONOALPHABETIC TOP=E(11),T(8),O(7)\n\n[Cas 1 — Texte chiffré par César conservant l IC monoalphabétique]\nN=67 IC=0.0751 TYPE=MONOALPHABETIC TOP=H(11),W(8),R(7)\n\n[Cas 2 — Texte aplati polyalphabétique ou aléatoire]\nN=67 IC=0.0294 TYPE=POLYALPHABETIC_OR_RANDOM TOP=Z(5),L(4),M(4)\n\n[Cas 3 — Texte trop court pour le calcul d IC]\nERROR: TEXT_TOO_SHORT",
    "takeaway": "À retenir : Calculer l’indice de coïncidence et les fréquences, puis appliquer un barème indicatif sans identifier le chiffrement avec certitude.\nRepère : Distribution naturelle en français produisant un IC élevé (0.0751 > 0.065)."
  },
  {
    "id": "cr3-c2-e1",
    "chapter": 2,
    "level": "n1",
    "language": "analyse",
    "title": "La liaison radio du drone de surveillance",
    "exampleTitle": "Exemple résolu — la balise météo du club alpin",
    "goal": "Chiffrer et déchiffrer des octets par XOR avec une clé d'un octet, et expliquer les propriétés et les limites de ce chiffrement.",
    "brief": "<p><strong>Énoncé.</strong> Le club de robotique chiffre les commandes de son drone de surveillance par <strong>OU exclusif (XOR)</strong> bit à bit avec la clé d'un octet <code>0x2A</code> (0010 1010 en binaire). Chaque caractère ASCII de la commande est converti en octet, puis XORé avec la clé. Rappels : la lettre « A » vaut <code>0x41</code> (0100 0001) et le XOR de deux bits vaut 1 exactement lorsque les deux bits diffèrent.</p><ol><li>Chiffrez la commande « A » (0x41) avec la clé 0x2A. Donnez l'octet chiffré en hexadécimal.</li><li>Chiffrez la commande « GO » (octets 0x47 et 0x4F). Donnez les deux octets chiffrés en hexadécimal, séparés par un espace.</li><li>Le drone reçoit l'octet 0x19. Quel octet clair obtient-on en appliquant la même clé 0x2A ? Donnez la valeur hexadécimale.</li><li>Quelle propriété du XOR autorise le chiffrement et le déchiffrement avec la même opération et la même clé ?</li><li>Quel risque majeur présente ce dispositif si la même clé d'un octet sert à chiffrer des messages longs ?</li></ol>",
    "starter": "# Exercice — La liaison radio du drone de surveillance\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 3 : la valeur hexadécimale (avec ou sans préfixe 0x). Questions 4 et 5 : quelques mots.\n\n[Question 1 — Octet chiffré de la commande A]\nA_COMPLETER\n\n[Question 2 — Octets chiffrés de la commande GO]\nA_COMPLETER\n\n[Question 3 — Octet clair correspondant à 0x19]\nA_COMPLETER\n\n[Question 4 — Propriété du XOR qui permet de déchiffrer avec la même clé]\nA_COMPLETER\n\n[Question 5 — Risque d'une clé d'un octet sur de longs messages]\nA_COMPLETER\n",
    "hints": [
      "Posez les octets en binaire et appliquez le XOR bit à bit : 1 si les deux bits diffèrent, 0 sinon.",
      "Chiffrer puis déchiffrer revient au même calcul : (m XOR k) XOR k = m, car chaque bit subit deux fois la même transformation.",
      "1. 0100 0001 XOR 0010 1010. 2. Traitez 0x47 puis 0x4F de la même façon. 3. 0001 1001 XOR 0010 1010. 4. Que retrouve-t-on quand on XOR deux fois par la même valeur ? 5. Avec une clé d'un octet, chaque octet du message subit le même masque."
    ],
    "examples": [
      {
        "stdin": "La balise météo du club alpin chiffre ses relevés par XOR avec la clé 0x1F (0001 1111).\n1) Lettre « H » (0x48) : 0100 1000 XOR 0001 1111 = 0101 0111 : 0x57.\n2) Message « OK » (0x4F, 0x4B) : 0101 0000 et 0101 0100 : 0x50 0x54.\n3) Octet reçu 0x4D : 0100 1101 XOR 0001 1111 = 0101 0010 : 0x52, la lettre R.\n4) Le XOR est involutif : (m XOR k) XOR k = m.\n5) Une clé plus courte que le message se répète : risque de réutilisation (attaque à texte clair connu).",
        "expected": "0x57 — 0x50 0x54 — 0x52 (R) — involutif — clé répétée",
        "note": "Le XOR bit à bit se vérifie en binaire : chaque bit du résultat dépend uniquement des deux bits de même rang."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Octet chiffré de la commande A",
        "stdin": "q:1",
        "expected": "6B||0x6B||6b||0x6b"
      },
      {
        "label": "Question 2 — Octets chiffrés de la commande GO",
        "stdin": "q:2",
        "expected": "6D 65||0x6D 0x65||6d 65"
      },
      {
        "label": "Question 3 — Octet clair correspondant à 0x19",
        "stdin": "q:3",
        "expected": "33||0x33"
      },
      {
        "label": "Question 4 — Propriété du XOR qui permet de déchiffrer avec la même clé",
        "stdin": "q:4",
        "expected": "involutif||le xor est involutif||involution||la propriété d'involution"
      },
      {
        "label": "Question 5 — Risque d'une clé d'un octet sur de longs messages",
        "stdin": "q:5",
        "expected": "la clé se répète||réutilisation de la clé||la réutilisation de la clé||clé répétée||two-time pad"
      }
    ],
    "solution": "[Question 1 — Octet chiffré de la commande A]\n6B\n\n[Question 2 — Octets chiffrés de la commande GO]\n6D 65\n\n[Question 3 — Octet clair correspondant à 0x19]\n33\n\n[Question 4 — Propriété du XOR qui permet de déchiffrer avec la même clé]\ninvolutif\n\n[Question 5 — Risque d'une clé d'un octet sur de longs messages]\nla clé se répète",
    "takeaway": "1) 0x41 = 0100 0001 ; 0x2A = 0010 1010 ; XOR = 0110 1011 = 0x6B.\n2) 0x47 = 0100 0111 ; XOR 0x2A = 0110 1101 = 0x6D. 0x4F = 0100 1111 ; XOR 0x2A = 0110 0101 = 0x65. Chiffré : 6D 65.\n3) 0x19 = 0001 1001 ; XOR 0x2A = 0011 0011 = 0x33.\n4) Le XOR est involutif : (m XOR k) XOR k = m, donc la même opération et la même clé chiffrent et déchiffrent.\n5) Avec une clé d'un octet, chaque octet du message subit le même masque : la clé se répète en permanence, et un attaquant qui connaît un seul octet clair retrouve la clé et déchiffre tout (il n'existe d'ailleurs que 256 clés possibles).\nContrôle : 0x6B XOR 0x2A = 0x41 (la lettre A) et 0x33 XOR 0x2A = 0x19 : les déchiffrements retombent exactement sur les valeurs de départ."
  },
  {
    "id": "cr3-c2-e2",
    "chapter": 2,
    "level": "n2",
    "language": "analyse",
    "title": "Le choix d'AES ou de RSA à la banque NordFinance",
    "exampleTitle": "Exemple résolu — le stockage chiffré de la chaîne télé",
    "goal": "Choisir entre un algorithme symétrique et un algorithme asymétrique selon l'usage, et calculer le nombre de blocs et le bourrage d'un chiffrement par bloc.",
    "brief": "<p><strong>Énoncé.</strong> La banque NordFinance doit déployer deux mécanismes : le <strong>chiffrement de ses archives quotidiennes</strong> (fichiers volumineux) et la <strong>distribution des clés de session</strong> aux clients de sa plateforme en ligne. Le service sécurité compare les deux candidats :</p><table><tr><th>Critère</th><th>AES-256 (symétrique)</th><th>RSA-2048 (asymétrique)</th></tr><tr><th>Type de clé</th><td>une clé partagée secrète</td><td>paire clé publique / clé privée</td></tr><tr><th>Taille de clé usuelle</th><td>256 bits</td><td>2048 bits</td></tr><tr><th>Grain de traitement</th><td>blocs de 16 octets</td><td>blocs de moins de 256 octets</td></tr><tr><th>Vitesse</th><td>très rapide, accéléré par le matériel</td><td>environ mille fois plus lent</td></tr><tr><th>Usage principal</th><td>confidentialité de gros volumes</td><td>échange de clés, signature</td></tr></table><p>Le fichier d'archives du jour pèse exactement <strong>64 Ko, soit 65 536 octets</strong>, multiple exact de la taille de bloc d'AES.</p><ol><li>Quel algorithme la banque doit-elle retenir pour chiffrer ses archives quotidiennes ?</li><li>Quel algorithme doit-elle retenir pour distribuer la clé de session à chaque client ?</li><li>Combien de blocs de 16 octets l'algorithme retenu devra-t-il traiter pour ce fichier de 65 536 octets ?</li><li>Pourquoi l'autre algorithme est-il écarté pour le chiffrement des archives ? Répondez en quelques mots.</li><li>Le fichier étant un multiple exact de 16 octets, combien d'octets de bourrage PKCS#7 le chiffrement par blocs ajouterait-il ?</li></ol>",
    "starter": "# Exercice — Le choix d'AES ou de RSA à la banque NordFinance\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 et 2 : le nom de l'algorithme. Question 3 : le nombre. Questions 4 et 5 : quelques mots ou le nombre.\n\n[Question 1 — Algorithme pour chiffrer les archives]\nA_COMPLETER\n\n[Question 2 — Algorithme pour distribuer les clés de session]\nA_COMPLETER\n\n[Question 3 — Nombre de blocs de 16 octets pour 65 536 octets]\nA_COMPLETER\n\n[Question 4 — Raison d'écarter l'autre algorithme pour les archives]\nA_COMPLETER\n\n[Question 5 — Octets de bourrage PKCS#7 pour un multiple exact de 16]\nA_COMPLETER\n",
    "hints": [
      "Le chiffrement symétrique est rapide mais suppose que les deux parties partagent déjà la même clé ; l'asymétrique résout la distribution de clé, pas la vitesse.",
      "Nombre de blocs = taille du fichier divisée par la taille d'un bloc.",
      "1. Gros volumes : vitesse et accélération matérielle. 2. Distribution : aucun canal préalable partagé. 3. 65 536 / 16. 4. Comparez les vitesses du tableau. 5. PKCS#7 ajoute un bloc complet de bourrage quand le message est déjà aligné."
    ],
    "examples": [
      {
        "stdin": "Une chaîne télé chiffre ses rushes du jour : fichier de 32 Ko (32 768 octets), multiple exact de 16.\n1) Pour les rushes : AES (symétrique, rapide).\n2) Pour envoyer la clé de session à ses correspondants : RSA.\n3) Nombre de blocs : 32 768 / 16 = 2 048.\n4) RSA est écarté pour les volumes : environ mille fois plus lent.\n5) Fichier aligné : PKCS#7 ajoute un bloc complet, soit 16 octets.",
        "expected": "AES — RSA — 2 048 blocs — trop lent — 16 octets de bourrage",
        "note": "Symétrique pour les volumes, asymétrique pour la distribution : c'est le partage du travail des protocoles réels comme TLS."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Algorithme pour chiffrer les archives",
        "stdin": "q:1",
        "expected": "AES-256||AES 256||AES||aes-256||aes 256||le symétrique AES"
      },
      {
        "label": "Question 2 — Algorithme pour distribuer les clés de session",
        "stdin": "q:2",
        "expected": "RSA-2048||RSA 2048||RSA||rsa-2048||rsa 2048||l'asymétrique RSA"
      },
      {
        "label": "Question 3 — Nombre de blocs de 16 octets pour 65 536 octets",
        "stdin": "q:3",
        "expected": "4096||4 096||4096 blocs"
      },
      {
        "label": "Question 4 — Raison d'écarter l'autre algorithme pour les archives",
        "stdin": "q:4",
        "expected": "trop lent||il est trop lent||environ mille fois plus lent||mille fois plus lent||lent||sa lenteur"
      },
      {
        "label": "Question 5 — Octets de bourrage PKCS#7 pour un multiple exact de 16",
        "stdin": "q:5",
        "expected": "16||16 octets"
      }
    ],
    "solution": "[Question 1 — Algorithme pour chiffrer les archives]\nAES-256\n\n[Question 2 — Algorithme pour distribuer les clés de session]\nRSA-2048\n\n[Question 3 — Nombre de blocs de 16 octets pour 65 536 octets]\n4096\n\n[Question 4 — Raison d'écarter l'autre algorithme pour les archives]\ntrop lent\n\n[Question 5 — Octets de bourrage PKCS#7 pour un multiple exact de 16]\n16",
    "takeaway": "1) Les archives quotidiennes sont volumineuses : AES-256, symétrique et accéléré par le matériel, s'impose.\n2) La distribution des clés de session profite de la paire publique/privée : RSA-2048.\n3) 65 536 / 16 = 4 096 blocs.\n4) RSA-2048 est environ mille fois plus lent qu'AES : chiffrer les archives avec lui serait impraticable.\n5) Un multiple exact de 16 reçoit un bloc complet de bourrage : 16 octets (valeur 0x10 répétée 16 fois).\nContrôle : 4 096 blocs de 16 octets = 65 536 octets, et avec le bourrage le chiffré ferait 65 552 octets (4 097 blocs)."
  },
  {
    "id": "cr3-c2-e3",
    "chapter": 2,
    "level": "n3",
    "language": "analyse",
    "title": "Le logo visible : audit des modes d'opération d'ArchivePlus",
    "exampleTitle": "Exemple résolu — les radiographies du cabinet dentaire",
    "goal": "Distinguer ECB, CBC et GCM, et appliquer le bourrage PKCS#7 à des fichiers de tailles variées.",
    "brief": "<p><strong>Énoncé.</strong> La société ArchivePlus chiffre les documents de ses clients avec AES-128. Le stagiaire a chiffré le logo de l'entreprise (une grande image aux zones uniformes) en mode <strong>ECB</strong> : sur l'aperçu du fichier chiffré, on distingue encore vaguement le logo. L'entreprise chiffre aussi un <strong>fichier client de 100 octets</strong> et un <strong>fichier comptable de 96 octets</strong>, avec bourrage PKCS#7 et blocs de 16 octets.</p><ol><li>Pourquoi le logo reste-t-il reconnaissable dans le chiffré ECB ? Répondez en une phrase.</li><li>Quel mode chaîne chaque bloc clair avec le bloc chiffré précédent, à l'aide d'un vecteur d'initialisation ?</li><li>Quel mode fournit à la fois la confidentialité et l'authentification (chiffrement authentifié) ?</li><li>Combien d'octets de bourrage PKCS#7 ajoute le fichier client de 100 octets ?</li><li>Combien d'octets de bourrage ajoute le fichier comptable de 96 octets, multiple exact de 16 ?</li><li>Quelle sera la taille finale chiffrée du fichier comptable, bourrage compris ?</li></ol>",
    "starter": "# Exercice — Le logo visible : audit des modes d'opération d'ArchivePlus\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Question 1 : une phrase. Questions 2 et 3 : le nom du mode. Questions 4 à 6 : les nombres.\n\n[Question 1 — Pourquoi le logo reste visible en ECB]\nA_COMPLETER\n\n[Question 2 — Mode chaîné avec vecteur d'initialisation]\nA_COMPLETER\n\n[Question 3 — Mode de chiffrement authentifié]\nA_COMPLETER\n\n[Question 4 — Octets de bourrage pour 100 octets]\nA_COMPLETER\n\n[Question 5 — Octets de bourrage pour 96 octets]\nA_COMPLETER\n\n[Question 6 — Taille finale chiffrée du fichier de 96 octets]\nA_COMPLETER\n",
    "hints": [
      "ECB chiffre chaque bloc indépendamment, sans aucune liaison avec les blocs voisins.",
      "Le bourrage PKCS#7 ajoute p octets de valeur p, avec p = 16 − (taille mod 16) ; si la taille est déjà un multiple de 16, p = 16.",
      "1. Deux blocs clairs identiques donnent deux blocs chiffrés identiques en ECB. 2. CBC : XOR avec le chiffré précédent, IV pour le premier bloc. 3. GCM ajoute un tag d'authentification. 4. 100 = 6 × 16 + 4. 5. 96 = 6 × 16 exactement. 6. Ajoutez le bourrage au message."
    ],
    "examples": [
      {
        "stdin": "Un cabinet dentaire chiffre ses radiographies numériques avec AES-128 et des blocs de 16 octets.\n1) Une zone uniforme donne des blocs clairs identiques : en ECB, les blocs chiffrés se répètent et la forme transparaît.\n2) Mode chaîné avec IV : CBC.\n3) Mode authentifié : GCM.\n4) Une radio de 50 octets : 50 = 3 × 16 + 2, donc p = 16 − 2 = 14 octets de bourrage.\n5) Un compte rendu de 80 octets (5 × 16) : p = 16.\n6) Taille finale : 80 + 16 = 96 octets.",
        "expected": "blocs identiques — CBC — GCM — 14 octets — 16 octets — 96 octets",
        "note": "ECB ne doit jamais protéger des données structurées : le chaînement (CBC) ou le chiffrement authentifié (GCM) s'imposent."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Pourquoi le logo reste visible en ECB",
        "stdin": "q:1",
        "expected": "des blocs identiques donnent des blocs chiffrés identiques||blocs identiques, chiffrés identiques||deux blocs clairs identiques donnent le même chiffré||les blocs identiques restent identiques||chaque bloc est chiffré indépendamment"
      },
      {
        "label": "Question 2 — Mode chaîné avec vecteur d'initialisation",
        "stdin": "q:2",
        "expected": "CBC||cbc||le mode CBC"
      },
      {
        "label": "Question 3 — Mode de chiffrement authentifié",
        "stdin": "q:3",
        "expected": "GCM||gcm||le mode GCM"
      },
      {
        "label": "Question 4 — Octets de bourrage pour 100 octets",
        "stdin": "q:4",
        "expected": "12||12 octets"
      },
      {
        "label": "Question 5 — Octets de bourrage pour 96 octets",
        "stdin": "q:5",
        "expected": "16||16 octets"
      },
      {
        "label": "Question 6 — Taille finale chiffrée du fichier de 96 octets",
        "stdin": "q:6",
        "expected": "112||112 octets"
      }
    ],
    "solution": "[Question 1 — Pourquoi le logo reste visible en ECB]\ndes blocs identiques donnent des blocs chiffrés identiques\n\n[Question 2 — Mode chaîné avec vecteur d'initialisation]\nCBC\n\n[Question 3 — Mode de chiffrement authentifié]\nGCM\n\n[Question 4 — Octets de bourrage pour 100 octets]\n12\n\n[Question 5 — Octets de bourrage pour 96 octets]\n16\n\n[Question 6 — Taille finale chiffrée du fichier de 96 octets]\n112",
    "takeaway": "1) ECB chiffre chaque bloc indépendamment : les zones uniformes du logo produisent des blocs clairs identiques, donc des blocs chiffrés identiques, et la forme transparaît.\n2) CBC (Cipher Block Chaining) : chaque bloc clair est XORé avec le bloc chiffré précédent, le premier avec l'IV.\n3) GCM : chiffrement authentifié, confidentialité et tag d'intégrité.\n4) 100 = 6 × 16 + 4 : il manque 4 octets pour compléter le bloc, donc p = 16 − 4 = 12 octets de bourrage.\n5) 96 = 6 × 16 : multiple exact, donc p = 16 (un bloc complet de bourrage).\n6) Taille finale : 96 + 16 = 112 octets, soit 7 blocs.\nContrôle : 100 + 12 = 112 octets pour le fichier client également — les deux fichiers chiffrés font la même taille après bourrage."
  },
  {
    "id": "cr3-c3-e1",
    "chapter": 3,
    "level": "n1",
    "language": "analyse",
    "title": "La vérification de l'image ISO du logiciel libre",
    "exampleTitle": "Exemple résolu — le pilote d'imprimante du collège",
    "goal": "Vérifier l'intégrité d'un téléchargement par empreinte cryptographique et mobiliser les propriétés des fonctions de hachage.",
    "brief": "<p><strong>Énoncé.</strong> L'administrateur système du lycée télécharge l'image ISO d'une distribution libre (2,4 Go). Le site de l'éditeur publie l'empreinte <strong>SHA-256</strong> officielle du fichier. Après le téléchargement, l'administrateur recalcule l'empreinte du fichier obtenu et la compare à celle publiée.</p><ol><li>Combien de bits compte une empreinte SHA-256 ?</li><li>Un caractère hexadécimal code 4 bits : combien de caractères hexadécimaux affiche une empreinte SHA-256 ?</li><li>L'empreinte recalculée diffère de la publiée sur quelques caractères seulement. Le fichier téléchargé est-il intègre ? Répondez par oui ou non.</li><li>Quelle propriété de la fonction de hachage interdit de retrouver le message original à partir de sa seule empreinte ?</li><li>Pourquoi MD5 ne doit-il plus servir à vérifier l'intégrité d'un téléchargement sensible ?</li></ol>",
    "starter": "# Exercice — La vérification de l'image ISO du logiciel libre\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 et 2 : les nombres. Question 3 : oui ou non. Questions 4 et 5 : un terme.\n\n[Question 1 — Taille en bits d'une empreinte SHA-256]\nA_COMPLETER\n\n[Question 2 — Nombre de caractères hexadécimaux]\nA_COMPLETER\n\n[Question 3 — Le fichier est-il intègre]\nA_COMPLETER\n\n[Question 4 — Propriété interdisant de retrouver le message depuis l'empreinte]\nA_COMPLETER\n\n[Question 5 — Pourquoi MD5 est abandonné pour l'intégrité]\nA_COMPLETER\n",
    "hints": [
      "La taille d'une empreinte SHA-256 se lit dans son nom : c'est la longueur du condensé en bits.",
      "Un caractère hexadécimal code exactement 4 bits : divisez la taille en bits par 4.",
      "1. 256 bits. 2. 256 / 4. 3. Deux empreintes différentes signifient deux fichiers différents, même pour un seul bit changé. 4. On cherche la propriété « à sens unique ». 5. Des chercheurs ont fabriqué des paires de fichiers différents de même empreinte MD5."
    ],
    "examples": [
      {
        "stdin": "Le collège vérifie le pilote d'imprimante (empreinte SHA-1) qu'il télécharge.\n1) SHA-1 produit un condensé de 160 bits.\n2) 160 / 4 = 40 caractères hexadécimaux.\n3) L'empreinte recalculée diffère : le fichier a été modifié, il n'est pas intègre.\n4) La résistance à la préimage interdit de remonter au message depuis l'empreinte.\n5) MD5 est abandonné car des collisions complètes ont été construites en pratique.",
        "expected": "160 bits — 40 caractères — non — la résistance à la préimage — collisions",
        "note": "L'effet avalanche fait qu'une modification d'un seul bit change environ la moitié des bits de l'empreinte."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Taille en bits d'une empreinte SHA-256",
        "stdin": "q:1",
        "expected": "256||256 bits"
      },
      {
        "label": "Question 2 — Nombre de caractères hexadécimaux",
        "stdin": "q:2",
        "expected": "64||64 caractères"
      },
      {
        "label": "Question 3 — Le fichier est-il intègre",
        "stdin": "q:3",
        "expected": "non||non, il a été modifié||non, le fichier a été modifié"
      },
      {
        "label": "Question 4 — Propriété interdisant de retrouver le message depuis l'empreinte",
        "stdin": "q:4",
        "expected": "la résistance à la préimage||résistance à la préimage||préimage||la préimage"
      },
      {
        "label": "Question 5 — Pourquoi MD5 est abandonné pour l'intégrité",
        "stdin": "q:5",
        "expected": "des collisions||collisions||des collisions ont été trouvées||on peut fabriquer des collisions"
      }
    ],
    "solution": "[Question 1 — Taille en bits d'une empreinte SHA-256]\n256\n\n[Question 2 — Nombre de caractères hexadécimaux]\n64\n\n[Question 3 — Le fichier est-il intègre]\nnon\n\n[Question 4 — Propriété interdisant de retrouver le message depuis l'empreinte]\nla résistance à la préimage\n\n[Question 5 — Pourquoi MD5 est abandonné pour l'intégrité]\ndes collisions",
    "takeaway": "1) SHA-256 produit un condensé de 256 bits.\n2) 256 / 4 = 64 caractères hexadécimaux.\n3) Non : deux empreintes différentes prouvent que le fichier téléchargé diffère de l'original, même si l'écart affiché ne porte que sur quelques caractères.\n4) La résistance à la préimage : il est infaisable de retrouver un message donnant une empreinte donnée.\n5) MD5 est cassé : des collisions complètes (deux fichiers différents, même empreinte) se fabriquent en quelques secondes, ce qui permet la substitution de fichiers.\nContrôle : 64 caractères hexadécimaux × 4 bits = 256 bits, cohérent avec la question 1."
  },
  {
    "id": "cr3-c3-e2",
    "chapter": 3,
    "level": "n2",
    "language": "analyse",
    "title": "Les webhooks signés de la plateforme de paiement",
    "exampleTitle": "Exemple résolu — les notifications du transporteur",
    "goal": "Distinguer un simple hachage d'un HMAC et justifier l'authenticité apportée par la clé secrète partagée.",
    "brief": "<p><strong>Énoncé.</strong> La plateforme de paiement PayFlux notifie ses marchands par <strong>webhooks</strong> : à chaque événement, elle envoie un message du type « montant=500 devise=EUR » accompagné d'un <strong>tag HMAC-SHA256</strong> calculé avec la clé secrète partagée entre la plateforme et le marchand. Le marchand vérifie le tag avant d'enregistrer la transaction. Un attaquant connaît le format des messages et peut en envoyer à volonté.</p><ol><li>Un simple SHA-256 du message, sans clé, suffirait-il à prouver que le message émane bien de PayFlux ? Répondez par oui ou non.</li><li>Que combine le HMAC en plus du hachage du message pour produire le tag ?</li><li>L'attaquant renvoie « montant=9000 devise=EUR » avec l'ancien tag du message de 500 EUR : la vérification réussira-t-elle ? Répondez par oui ou non.</li><li>Pourquoi l'attaquant ne peut-il pas calculer un tag valide pour son message falsifié ?</li><li>Grâce à la clé secrète, le HMAC apporte l'intégrité et une seconde garantie : laquelle ?</li></ol>",
    "starter": "# Exercice — Les webhooks signés de la plateforme de paiement\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 et 3 : oui ou non. Questions 2, 4 et 5 : quelques mots.\n\n[Question 1 — Un simple SHA-256 suffit-il à authentifier l'expéditeur]\nA_COMPLETER\n\n[Question 2 — Ce que le HMAC combine en plus du hachage]\nA_COMPLETER\n\n[Question 3 — L'ancien tag valide-t-il le message falsifié]\nA_COMPLETER\n\n[Question 4 — Pourquoi l'attaquant ne peut pas produire un tag valide]\nA_COMPLETER\n\n[Question 5 — Garantie apportée en plus de l'intégrité]\nA_COMPLETER\n",
    "hints": [
      "N'importe qui peut calculer le SHA-256 d'un message : ce calcul ne prouve rien sur l'identité de l'expéditeur.",
      "Le HMAC réutilise la fonction de hachage, mais en y mêlant un élément que seuls les deux correspondants légitimes connaissent.",
      "1. Demandez-vous si un hachage sans clé lie le message à son auteur. 2. Le nom complet est « code d'authentification de message à clé secrète ». 3. Le tag dépend du message entier. 4. L'attaquant voit des messages et des tags, jamais l'élément secret. 5. Intégrité = le message n'a pas été modifié ; que prouve d'autre la clé partagée ?"
    ],
    "examples": [
      {
        "stdin": "Un transporteur envoie des notifications « colis=livre » signées par HMAC-SHA256 avec la clé du compte marchand.\n1) Un simple SHA-256 sans clé ne prouve pas l'origine : n'importe qui peut le calculer : non.\n2) Le HMAC combine le message et une clé secrète partagée.\n3) Le message falsifié « colis=perdu » avec l'ancien tag : vérification refusée.\n4) L'attaquant ne connaît pas la clé secrète : il ne peut pas produire de tag valide.\n5) Le HMAC apporte en plus l'authenticité : le message vient bien du transporteur.",
        "expected": "non — la clé secrète partagée — non — il ne connaît pas la clé — l'authenticité",
        "note": "Hachage = intégrité sans origine ; HMAC = intégrité et authenticité, car la clé secrète ne quitte jamais les deux parties."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Un simple SHA-256 suffit-il à authentifier l'expéditeur",
        "stdin": "q:1",
        "expected": "non"
      },
      {
        "label": "Question 2 — Ce que le HMAC combine en plus du hachage",
        "stdin": "q:2",
        "expected": "une clé secrète||la clé secrète||clé secrète||une clé secrète partagée||la clé secrète partagée"
      },
      {
        "label": "Question 3 — L'ancien tag valide-t-il le message falsifié",
        "stdin": "q:3",
        "expected": "non"
      },
      {
        "label": "Question 4 — Pourquoi l'attaquant ne peut pas produire un tag valide",
        "stdin": "q:4",
        "expected": "il ne connaît pas la clé||parce qu'il ne connaît pas la clé||il ne connaît pas la clé secrète||sans la clé secrète||il n'a pas la clé"
      },
      {
        "label": "Question 5 — Garantie apportée en plus de l'intégrité",
        "stdin": "q:5",
        "expected": "l'authenticité||authenticité||l'authentification||l'authentification de l'expéditeur||l'authenticité de l'expéditeur"
      }
    ],
    "solution": "[Question 1 — Un simple SHA-256 suffit-il à authentifier l'expéditeur]\nnon\n\n[Question 2 — Ce que le HMAC combine en plus du hachage]\nune clé secrète\n\n[Question 3 — L'ancien tag valide-t-il le message falsifié]\nnon\n\n[Question 4 — Pourquoi l'attaquant ne peut pas produire un tag valide]\nil ne connaît pas la clé\n\n[Question 5 — Garantie apportée en plus de l'intégrité]\nl'authenticité",
    "takeaway": "1) Non : quiconque connaît le format peut calculer le SHA-256 d'un message ; ce calcul ne lie pas le message à PayFlux.\n2) Le HMAC combine le message et la clé secrète partagée dans le calcul de hachage.\n3) Non : le tag dépend du message entier ; falsifié, le message donne un tag différent et l'ancien tag est rejeté.\n4) L'attaquant observe des messages et des tags mais ne connaît pas la clé secrète : il ne peut pas calculer un tag qui passe la vérification.\n5) L'authenticité (authentification de l'origine) : seul le détenteur de la clé a pu produire le tag.\nContrôle : intégrité et authenticité réunies, c'est exactement la définition d'un code d'authentification de message (MAC)."
  },
  {
    "id": "cr3-c3-e3",
    "chapter": 3,
    "level": "n3",
    "language": "analyse",
    "title": "L'audit des mots de passe du portail intranet",
    "exampleTitle": "Exemple résolu — la messagerie du groupement de pharmacies",
    "goal": "Expliquer le rôle du sel face aux tables précalculées, calculer un coût d'attaque sur une base salée et estimer une collision par le paradoxe des anniversaires.",
    "brief": "<p><strong>Énoncé.</strong> Le RSSI du groupe industriel Meridor audite le portail intranet. Les <strong>100 comptes</strong> actifs stockent aujourd'hui leurs mots de passe sous la forme <strong>SHA-256 sans sel</strong>. Un attaquant qui vole la base teste une liste de <strong>4 000 mots de passe courants</strong>. Le RSSI étudie la correction : ajouter à chaque compte un <strong>sel unique</strong> et une fonction de dérivation lente. Il relit aussi le paradoxe des anniversaires : sur un espace de n bits, une collision se trouve en environ 2^(n/2) essais.</p><ol><li>Comment s'appelle la table précalculée qui associe des empreintes aux mots de passe courants et déchiffre une base non salée presque instantanément ?</li><li>Avec une base non salée, l'attaquant calcule 4 000 hachages et les compare aux 100 comptes. Avec un sel unique par compte, combien de hachages faut-il pour tester la même liste sur les 100 comptes ?</li><li>Une empreinte de 64 bits : environ combien d'essais suffisent à trouver une collision (paradoxe des anniversaires) ?</li><li>Un sel doit-il être gardé secret comme un mot de passe ? Répondez par oui ou non.</li><li>Quelle fonction de dérivation lente, à facteur de coût réglable, peut remplacer SHA-256 seul pour le stockage (un nom suffit) ?</li></ol>",
    "starter": "# Exercice — L'audit des mots de passe du portail intranet\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Question 1 : le nom. Question 2 : le nombre. Question 3 : la puissance de 2. Question 4 : oui ou non. Question 5 : un nom.\n\n[Question 1 — Table précalculée d'empreintes]\nA_COMPLETER\n\n[Question 2 — Nombre de hachages contre une base salée]\nA_COMPLETER\n\n[Question 3 — Essais pour une collision sur 64 bits]\nA_COMPLETER\n\n[Question 4 — Un sel doit-il être secret]\nA_COMPLETER\n\n[Question 5 — Fonction de dérivation lente pour le stockage]\nA_COMPLETER\n",
    "hints": [
      "Sans sel, deux comptes au même mot de passe partagent la même empreinte, et l'attaquant peut préparer tout son travail à l'avance.",
      "Le paradoxe des anniversaires divise par deux la taille en bits : n bits donnent environ 2^(n/2) essais.",
      "1. Le nom anglais est « rainbow table ». 2. Chaque sel impose de recalculer toute la liste pour chaque compte. 3. 64 / 2 = 32. 4. Le sel doit être unique, pas caché. 5. bcrypt, scrypt, Argon2 ou PBKDF2."
    ],
    "examples": [
      {
        "stdin": "Un groupement de pharmacies audite sa messagerie : 250 comptes, liste d'attaque de 2 000 mots de passe.\n1) Sans sel, une rainbow table déchiffre les empreintes courantes instantanément.\n2) Base salée : 2 000 × 250 = 500 000 hachages pour la même liste.\n3) Empreinte de 48 bits : collision en environ 2^24 essais.\n4) Le sel n'a pas besoin d'être secret : il peut être stocké en clair.\n5) bcrypt (ou Argon2, PBKDF2) ralentit chaque essai par un facteur de coût.",
        "expected": "rainbow table — 500 000 hachages — 2^24 — non — bcrypt",
        "note": "Le sel rend chaque compte unique ; la dérivation lente rend chaque essai coûteux : les deux se combinent."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Table précalculée d'empreintes",
        "stdin": "q:1",
        "expected": "une rainbow table||rainbow table||la rainbow table||table arc-en-ciel||une table arc-en-ciel"
      },
      {
        "label": "Question 2 — Nombre de hachages contre une base salée",
        "stdin": "q:2",
        "expected": "400000||400 000||400000 hachages"
      },
      {
        "label": "Question 3 — Essais pour une collision sur 64 bits",
        "stdin": "q:3",
        "expected": "2^32||2^32 essais||2 puissance 32||4294967296"
      },
      {
        "label": "Question 4 — Un sel doit-il être secret",
        "stdin": "q:4",
        "expected": "non"
      },
      {
        "label": "Question 5 — Fonction de dérivation lente pour le stockage",
        "stdin": "q:5",
        "expected": "bcrypt||argon2||pbkdf2||scrypt||bcrypt ou argon2"
      }
    ],
    "solution": "[Question 1 — Table précalculée d'empreintes]\nune rainbow table\n\n[Question 2 — Nombre de hachages contre une base salée]\n400000\n\n[Question 3 — Essais pour une collision sur 64 bits]\n2^32\n\n[Question 4 — Un sel doit-il être secret]\nnon\n\n[Question 5 — Fonction de dérivation lente pour le stockage]\nbcrypt",
    "takeaway": "1) Une rainbow table (table arc-en-ciel) : des milliards d'empreintes précalculées que l'on confronte à la base non salée.\n2) Sans sel : 4 000 hachages pour toute la base. Avec un sel unique par compte : 4 000 × 100 = 400 000 hachages, la liste devant être recalculée pour chaque sel.\n3) 64 bits / 2 = 32 bits : environ 2^32 essais (paradoxe des anniversaires).\n4) Non : le sel doit être unique par compte, mais il peut être stocké en clair à côté de l'empreinte ; sa force vient de son unicité.\n5) bcrypt (ou Argon2, PBKDF2, scrypt) : un facteur de coût rend chaque essai volontairement lent.\nContrôle : 4 000 × 100 = 400 000, soit cent fois le coût non salé ; l'unicité du sel détruit en outre tout l'intérêt des tables précalculées."
  },
  {
    "id": "cr3-c4-e1",
    "chapter": 4,
    "level": "n1",
    "language": "analyse",
    "title": "Le déchiffrement affine du journal du club",
    "exampleTitle": "Exemple résolu — le cryptogramme du ciné-club",
    "goal": "Calculer un pgcd par l'algorithme d'Euclide, vérifier l'inversibilité d'une clé affine et déchiffrer une lettre à la main.",
    "brief": "<p><strong>Énoncé.</strong> Le club de mathématiques du lycée Pasteur chiffre ses annonces avec le <strong>chiffre affine</strong> C = (a × P + b) mod 26, avec a = 5 et b = 8. Pour déchiffrer, il faut connaître l'inverse de a modulo 26 : ici 21, car 5 × 21 = 105 = 4 × 26 + 1, et l'on retrouve alors P = 21 × (C − b) mod 26. Avant de déchiffrer l'annonce, le club vérifie quelques prérequis d'arithmétique.</p><ol><li>Calculez le pgcd(48, 18) avec l'algorithme d'Euclide.</li><li>La valeur a = 4 ne peut pas servir de clé multiplicative : que vaut pgcd(4, 26) ?</li><li>Vérifiez l'inverse annoncé : que vaut (5 × 21) mod 26 ?</li><li>Chiffrez la lettre E (P = 4) avec a = 5 et b = 8. Donnez la lettre chiffrée.</li><li>Déchiffrez la lettre U (C = 20) de l'annonce : P = 21 × (20 − 8) mod 26. Donnez la lettre claire.</li></ol>",
    "starter": "# Exercice — Le déchiffrement affine du journal du club\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 3 : les nombres. Questions 4 et 5 : la lettre seule.\n\n[Question 1 — pgcd(48, 18) par Euclide]\nA_COMPLETER\n\n[Question 2 — pgcd(4, 26)]\nA_COMPLETER\n\n[Question 3 — (5 × 21) mod 26]\nA_COMPLETER\n\n[Question 4 — Chiffrement de la lettre E]\nA_COMPLETER\n\n[Question 5 — Déchiffrement de la lettre U]\nA_COMPLETER\n",
    "hints": [
      "L'algorithme d'Euclide : pgcd(a, b) = pgcd(b, a mod b), jusqu'à un reste nul ; le dernier reste non nul est le pgcd.",
      "Une clé multiplicative a n'est inversible modulo 26 que si pgcd(a, 26) = 1.",
      "1. 48 = 2 × 18 + 12, puis 18 = 1 × 12 + 6, puis 12 = 2 × 6 + 0. 2. 26 = 2 × 13. 3. 105 = 104 + 1. 4. (5 × 4 + 8) mod 26. 5. 21 × 12 = 252, puis 252 − 234."
    ],
    "examples": [
      {
        "stdin": "Le ciné-club utilise le chiffre affine avec a = 7 et b = 3 ; l'inverse de 7 modulo 26 est 15 (7 × 15 = 105 = 4 × 26 + 1).\n1) pgcd(52, 39) : 52 = 1 × 39 + 13 ; 39 = 3 × 13 + 0 : pgcd = 13.\n2) pgcd(2, 26) = 2 : a = 2 serait une clé invalide.\n3) (7 × 15) mod 26 = 105 − 104 = 1.\n4) Chiffrement de E (P = 4) : (7 × 4 + 3) = 31, 31 − 26 = 5 : lettre F.\n5) Déchiffrement de K (C = 10) : 15 × (10 − 3) = 105, 105 mod 26 = 1 : lettre B.",
        "expected": "13 — 2 — 1 — F — B",
        "note": "Sans pgcd(a, 26) = 1, deux lettres différentes peuvent se chiffrer pareil : le déchiffrement devient impossible."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — pgcd(48, 18) par Euclide",
        "stdin": "q:1",
        "expected": "6"
      },
      {
        "label": "Question 2 — pgcd(4, 26)",
        "stdin": "q:2",
        "expected": "2"
      },
      {
        "label": "Question 3 — (5 × 21) mod 26",
        "stdin": "q:3",
        "expected": "1"
      },
      {
        "label": "Question 4 — Chiffrement de la lettre E",
        "stdin": "q:4",
        "expected": "C||la lettre C"
      },
      {
        "label": "Question 5 — Déchiffrement de la lettre U",
        "stdin": "q:5",
        "expected": "S||la lettre S"
      }
    ],
    "solution": "[Question 1 — pgcd(48, 18) par Euclide]\n6\n\n[Question 2 — pgcd(4, 26)]\n2\n\n[Question 3 — (5 × 21) mod 26]\n1\n\n[Question 4 — Chiffrement de la lettre E]\nC\n\n[Question 5 — Déchiffrement de la lettre U]\nS",
    "takeaway": "1) Euclide : 48 = 2 × 18 + 12 ; 18 = 1 × 12 + 6 ; 12 = 2 × 6 + 0 : pgcd(48, 18) = 6.\n2) 26 = 2 × 13 : pgcd(4, 26) = 2, donc 4 n'est pas inversible modulo 26 et ne peut pas servir de clé multiplicative.\n3) 5 × 21 = 105 = 4 × 26 + 1 : (5 × 21) mod 26 = 1, ce qui prouve que 21 est bien l'inverse de 5.\n4) C = (5 × 4 + 8) mod 26 = 28 mod 26 = 2 : la lettre C.\n5) P = 21 × (20 − 8) mod 26 = 21 × 12 mod 26 = 252 mod 26 = 18 : la lettre S.\nContrôle : en rechiffrant S (P = 18) : (5 × 18 + 8) mod 26 = 98 mod 26 = 20, on retrouve la lettre U."
  },
  {
    "id": "cr3-c4-e2",
    "chapter": 4,
    "level": "n2",
    "language": "analyse",
    "title": "L'échange de clés des deux agences de presse",
    "exampleTitle": "Exemple résolu — le lien radio des deux phares",
    "goal": "Dérouler un échange Diffie-Hellman complet avec de petits nombres premiers, puis identifier le problème fondateur et l'attaque de l'homme du milieu.",
    "brief": "<p><strong>Énoncé.</strong> Les agences de presse Aurora et Borée doivent convenir d'un secret commun sur un canal public écouté. Elles utilisent <strong>Diffie-Hellman</strong> avec les paramètres publics p = 29 et g = 2. Aurora choisit secrètement a = 5, Borée choisit secrètement b = 12. Étapes : Aurora envoie A = g^a mod p ; Borée envoie B = g^b mod p ; chacun élève ensuite la valeur reçue à sa puissance secrète.</p><ol><li>Quelle valeur A Aurora calcule-t-elle et envoie publiquement ?</li><li>Quelle valeur B Borée calcule-t-elle et envoie publiquement ?</li><li>Quel secret commun les deux agences obtiennent-elles finalement ?</li><li>Un espion voit p, g, A et B : de quel problème réputé difficile devrait-il résoudre une instance pour retrouver a ou b ?</li><li>L'échange n'étant pas authentifié, quelle attaque classique permet à un tiers de s'interposer et de négocier deux secrets séparés ?</li></ol>",
    "starter": "# Exercice — L'échange de clés des deux agences de presse\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 3 : les nombres. Questions 4 et 5 : un terme.\n\n[Question 1 — Valeur A envoyée par Aurora]\nA_COMPLETER\n\n[Question 2 — Valeur B envoyée par Borée]\nA_COMPLETER\n\n[Question 3 — Secret commun obtenu]\nA_COMPLETER\n\n[Question 4 — Problème difficile que devrait résoudre l'espion]\nA_COMPLETER\n\n[Question 5 — Attaque par interposition sans authentification]\nA_COMPLETER\n",
    "hints": [
      "Pour élever à une puissance modulo p, procédez par carrés successifs : g^2, g^4, g^8, puis combinez les exposants.",
      "Le secret commun se calcule des deux côtés : B^a mod p et A^b mod p doivent coïncider.",
      "1. 2^5 = 32. 2. 2^12 = 2^10 × 2^2, avec 2^10 = (2^5)^2 = 9, puis 9 × 4 = 36. 3. Calculez 7^5 mod 29 : 7^2 = 20, 7^4 = 23, puis 23 × 7. 4. Retrouver l'exposant depuis la puissance. 5. Sans authentification, un tiers peut se faire passer pour chacun devant l'autre."
    ],
    "examples": [
      {
        "stdin": "Deux phares côtiers échangent par Diffie-Hellman avec p = 17 et g = 3 ; secrets a = 4 et b = 6.\n1) A = 3^4 mod 17 = 81 − 68 = 13.\n2) B = 3^6 mod 17 = 117 − 102 = 15.\n3) Secret commun : 15^4 mod 17 = 16, et 13^6 mod 17 = 16 aussi.\n4) L'espion devrait résoudre le logarithme discret.\n5) Sans authentification, l'attaque de l'homme du milieu s'interpose.",
        "expected": "A = 13 — B = 15 — secret = 16 — le logarithme discret — l'homme du milieu",
        "note": "Les deux voies de calcul du secret doivent coïncider : c'est le contrôle de tout échange Diffie-Hellman."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Valeur A envoyée par Aurora",
        "stdin": "q:1",
        "expected": "3||A = 3"
      },
      {
        "label": "Question 2 — Valeur B envoyée par Borée",
        "stdin": "q:2",
        "expected": "7||B = 7"
      },
      {
        "label": "Question 3 — Secret commun obtenu",
        "stdin": "q:3",
        "expected": "16"
      },
      {
        "label": "Question 4 — Problème difficile que devrait résoudre l'espion",
        "stdin": "q:4",
        "expected": "le logarithme discret||logarithme discret||le problème du logarithme discret"
      },
      {
        "label": "Question 5 — Attaque par interposition sans authentification",
        "stdin": "q:5",
        "expected": "l'homme du milieu||l'attaque de l'homme du milieu||man in the middle||man-in-the-middle||mitm"
      }
    ],
    "solution": "[Question 1 — Valeur A envoyée par Aurora]\n3\n\n[Question 2 — Valeur B envoyée par Borée]\n7\n\n[Question 3 — Secret commun obtenu]\n16\n\n[Question 4 — Problème difficile que devrait résoudre l'espion]\nle logarithme discret\n\n[Question 5 — Attaque par interposition sans authentification]\nl'homme du milieu",
    "takeaway": "1) A = 2^5 mod 29 = 32 mod 29 = 3.\n2) 2^10 = (2^5)^2 = 3^2 = 9 ; 2^12 = 2^10 × 2^2 = 9 × 4 = 36 mod 29 = 7 : B = 7.\n3) Secret : 7^5 mod 29 : 7^2 = 49 = 20 ; 7^4 = 20^2 = 400 = 23 ; 7^5 = 23 × 7 = 161 = 16. Vérification par l'autre voie : 3^4 = 81 = 23 ; 3^8 = 23^2 = 529 = 7 ; 3^12 = 3^8 × 3^4 = 7 × 23 = 161 = 16 : secret commun 16.\n4) Le problème du logarithme discret : retrouver a depuis A = g^a mod p.\n5) L'attaque de l'homme du milieu : un attaquant non authentifié négocie un secret avec chaque partie.\nContrôle : B^a = A^b = 16, les deux voies retombent sur le même secret ; il faut authentifier l'échange (signatures, certificats) pour fermer la porte à l'homme du milieu."
  },
  {
    "id": "cr3-c4-e3",
    "chapter": 4,
    "level": "n3",
    "language": "analyse",
    "title": "Le badge RSA pédagogique du fablab",
    "exampleTitle": "Exemple résolu — le passe RSA du conservatoire",
    "goal": "Générer pas à pas une paire de clés RSA miniature, puis chiffrer et déchiffrer un message.",
    "brief": "<p><strong>Énoncé.</strong> Le fablab du lycée protège ses badges électroniques avec un <strong>RSA pédagogique</strong> à petits nombres : nombres premiers p = 11 et q = 13, exposant public e = 7. Le message d'un badge vaut m = 9. Rappels : n = p × q ; φ(n) = (p − 1)(q − 1) ; la clé privée d est l'inverse de e modulo φ(n) ; chiffrement c = m^e mod n ; déchiffrement m = c^d mod n.</p><ol><li>Que vaut le module n ?</li><li>Que vaut φ(n) ?</li><li>Vérifions le choix de l'exposant : que vaut pgcd(7, 120) ?</li><li>Quelle est la clé privée d, inverse de 7 modulo 120 (on rappelle que 7 × 103 = 721) ?</li><li>Chiffrez le message m = 9 : que vaut c = 9^7 mod 143 ?</li><li>Le lecteur déchiffre : que vaut m = 48^103 mod 143 ?</li></ol>",
    "starter": "# Exercice — Le badge RSA pédagogique du fablab\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 6 : les nombres.\n\n[Question 1 — Module n]\nA_COMPLETER\n\n[Question 2 — Indicatrice φ(n)]\nA_COMPLETER\n\n[Question 3 — pgcd(7, 120)]\nA_COMPLETER\n\n[Question 4 — Clé privée d]\nA_COMPLETER\n\n[Question 5 — Chiffré c du message 9]\nA_COMPLETER\n\n[Question 6 — Message déchiffré depuis c = 48]\nA_COMPLETER\n",
    "hints": [
      "n est le produit des deux nombres premiers ; φ(n) se calcule avec (p − 1)(q − 1), pas avec n − 1.",
      "L'exposant e doit être premier avec φ(n) pour que d existe ; d vérifie e × d ≡ 1 (mod φ(n)).",
      "1. 11 × 13. 2. 10 × 12. 3. 120 = 2 × 2 × 2 × 3 × 5, sans facteur 7. 4. 721 = 720 + 1. 5. Élevez par carrés successifs : 9^2 = 81, 9^3 = 729 = 14 (mod 143), 9^6 = 14^2, puis 9^7 = 9^6 × 9. 6. Le déchiffrement doit restituer le message d'origine."
    ],
    "examples": [
      {
        "stdin": "Le conservatoire utilise un RSA miniature : p = 3, q = 11, e = 3, message m = 5.\n1) n = 3 × 11 = 33.\n2) φ(33) = 2 × 10 = 20.\n3) pgcd(3, 20) = 1 : e convient.\n4) d = 7 car 3 × 7 = 21 = 20 + 1.\n5) c = 5^3 mod 33 = 125 − 99 = 26.\n6) Déchiffrement : 26^7 mod 33 = 5, le message d'origine.",
        "expected": "n = 33 — φ = 20 — pgcd = 1 — d = 7 — c = 26 — m = 5",
        "note": "Avec des premiers de cette taille, factoriser n est trivial : le vrai RSA emploie des modules de 2048 bits et plus."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Module n",
        "stdin": "q:1",
        "expected": "143"
      },
      {
        "label": "Question 2 — Indicatrice φ(n)",
        "stdin": "q:2",
        "expected": "120"
      },
      {
        "label": "Question 3 — pgcd(7, 120)",
        "stdin": "q:3",
        "expected": "1"
      },
      {
        "label": "Question 4 — Clé privée d",
        "stdin": "q:4",
        "expected": "103"
      },
      {
        "label": "Question 5 — Chiffré c du message 9",
        "stdin": "q:5",
        "expected": "48"
      },
      {
        "label": "Question 6 — Message déchiffré depuis c = 48",
        "stdin": "q:6",
        "expected": "9"
      }
    ],
    "solution": "[Question 1 — Module n]\n143\n\n[Question 2 — Indicatrice φ(n)]\n120\n\n[Question 3 — pgcd(7, 120)]\n1\n\n[Question 4 — Clé privée d]\n103\n\n[Question 5 — Chiffré c du message 9]\n48\n\n[Question 6 — Message déchiffré depuis c = 48]\n9",
    "takeaway": "1) n = p × q = 11 × 13 = 143.\n2) φ(n) = (11 − 1) × (13 − 1) = 10 × 12 = 120.\n3) 120 = 2^3 × 3 × 5 ne comporte pas le facteur 7 : pgcd(7, 120) = 1.\n4) 7 × 103 = 721 = 6 × 120 + 1, donc d = 103.\n5) 9^2 = 81 ; 9^3 = 729 = 729 − 715 = 14 (mod 143) ; 9^6 = 14^2 = 196 = 53 ; 9^7 = 53 × 9 = 477 = 477 − 429 = 48 : c = 48.\n6) 48^103 mod 143 = 9 : le lecteur retrouve exactement le message d'origine.\nContrôle : le déchiffrement restitue m = 9, preuve que d = 103 est bien l'inverse de e = 7 modulo 120."
  },
  {
    "id": "cr3-c5-e1",
    "chapter": 5,
    "title": "Simulateur de Signature Numérique et Vérification (RSA Sign & Verify)",
    "level": "n1",
    "language": "analyse",
    "goal": "Effectuer un calcul RSA brut jouet, reconnaître ses limites et distinguer une signature RSA-PSS réelle.",
    "brief": "<p>Ce calcul jouet de RSA brut avec un très petit module ne fournit aucune garantie de sécurité. La réduction de SHA-256 modulo <code>n</code> crée facilement des collisions : une égalité ne prouve ni l’authenticité ni l’absence d’altération. En pratique, utiliser une bibliothèque et un schéma standard comme RSA-PSS (RFC 8017).<br><br>\nDans ce modèle pédagogique : <code>h = int(sha256(M), 16) mod n</code>, <code>sig = pow(h, d, n)</code> et <code>h_recupere = pow(sig, e, n)</code>.<br>\n1. <code>SIGN n=&lt;n&gt; d=&lt;d&gt; text=&lt;texte&gt;</code> produit <code>SIGN: n=&lt;n&gt; digest_mod=&lt;h&gt; sig=&lt;sig&gt;</code>.<br>\n2. <code>VERIFY n=&lt;n&gt; e=&lt;e&gt; sig=&lt;sig&gt; text=&lt;texte&gt;</code> :<br>\n   - Si <code>sig &lt; 0</code> ou <code>sig &gt;= n</code> : <code>VERIFY: status=SIGNATURE_OUT_OF_RANGE</code>.<br>\n   - Si les valeurs réduites coïncident : <code>VERIFY: status=TOY_MATCH (no_security_guarantee)</code>.<br>\n   - Sinon : <code>VERIFY: status=TOY_MISMATCH</code>.<br>\nComparer notamment deux messages distincts avec la même signature dans les cas 1 et 4.</p>",
    "starter": "# Grille d'analyse (cr3-c5-e1) — Simulateur de Signature Numérique et Vérification (RSA Sign & Verify)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Égalité des valeurs pour le premier message]\n# Données : VERIFY n=3233 e=17 sig=1706 text=CONTRAT_OFFICIEL\nA_COMPLETER\n\n[Cas 2 — Valeurs réduites différentes]\n# Données : VERIFY n=3233 e=17 sig=1706 text=CONTRAT_FALSIFIE\nA_COMPLETER\n\n[Cas 3 — Signature hors de la plage du module]\n# Données : VERIFY n=3233 e=17 sig=9999 text=CONTRAT_OFFICIEL\nA_COMPLETER\n\n[Cas 4 — Collision avec un autre message]\n# Données : VERIFY n=3233 e=17 sig=1706 text=CONTRAT_COLLISION_13147\nA_COMPLETER\n",
    "hints": [
      "Calculez h = int(hashlib.sha256(text.encode(\"utf-8\")).hexdigest(), 16) % n.",
      "Vérifiez d’abord 0 <= sig < n, puis comparez pow(sig, e, n) à h : une égalité ne prouve pas la sécurité.",
      "Pour signer sur le modèle jouet, élevez le condensat réduit (h % n) à la puissance d modulo n, puis vérifiez sig^e % n == digest_mod en précisant la limite sans bourrage PSS."
    ],
    "examples": [
      {
        "stdin": "SIGN n=3233 d=2753 text=CONTRAT_OFFICIEL",
        "expected": "SIGN: n=3233 digest_mod=566 sig=1706",
        "note": "Calcul jouet avec un petit module, sans garantie de sécurité."
      }
    ],
    "tests": [
      {
        "label": "Égalité des valeurs pour le premier message",
        "stdin": "cas:1",
        "expected": "VERIFY: status=TOY_MATCH (no_security_guarantee)"
      },
      {
        "label": "Valeurs réduites différentes",
        "stdin": "cas:2",
        "expected": "VERIFY: status=TOY_MISMATCH"
      },
      {
        "label": "Signature hors de la plage du module",
        "stdin": "cas:3",
        "expected": "VERIFY: status=SIGNATURE_OUT_OF_RANGE"
      },
      {
        "label": "Collision avec un autre message",
        "stdin": "cas:4",
        "expected": "VERIFY: status=TOY_MATCH (no_security_guarantee)"
      }
    ],
    "solution": "[Exemple]\nSIGN: n=3233 digest_mod=566 sig=1706\n\n[Cas 1 — Égalité des valeurs pour le premier message]\nVERIFY: status=TOY_MATCH (no_security_guarantee)\n\n[Cas 2 — Valeurs réduites différentes]\nVERIFY: status=TOY_MISMATCH\n\n[Cas 3 — Signature hors de la plage du module]\nVERIFY: status=SIGNATURE_OUT_OF_RANGE\n\n[Cas 4 — Collision avec un autre message]\nVERIFY: status=TOY_MATCH (no_security_guarantee)",
    "takeaway": "À retenir : Effectuer un calcul RSA brut jouet, reconnaître ses limites et distinguer une signature RSA-PSS réelle.\nRepère : Calcul jouet avec un petit module, sans garantie de sécurité."
  },
  {
    "id": "cr3-c5-e2",
    "chapter": 5,
    "title": "Contrôle Partiel d’un Nom DNS SAN et des Dates d’un Certificat X.509",
    "level": "n2",
    "language": "analyse",
    "goal": "Contrôler les dates et un nom DNS dans le SAN sans prétendre valider complètement le certificat.",
    "brief": "<p>Ce modèle vérifie uniquement des dates ISO et un nom DNS dans des entrées dNSName du SAN. Selon la RFC 9525, le CN est ignoré pour identifier le service, même s’il correspond au nom demandé. Le SAN contient ici une liste de noms séparés par des virgules, comparés sans tenir compte de la casse ; <code>san=-</code> indique un SAN absent.<br>\nUne entrée <code>*.cloud.corp</code> ne couvre qu’un seul label à gauche : <code>web.cloud.corp</code>, mais ni <code>cloud.corp</code> ni <code>api.dev.cloud.corp</code>.<br>\nContrôle partiel seulement : chaîne : non contrôlée ; les signatures, l’ancre de confiance, les contraintes et usages, ainsi que la révocation restent à vérifier. Le champ <code>is_ca</code> est seulement recopié et n’est pas validé.<br><br>\nRègles :<br>\n1. Si <code>date &lt; not_before</code> : <code>STATUS=INVALID reason=NOT_YET_VALID</code>.<br>\n2. Si <code>date &gt; not_after</code> : <code>STATUS=INVALID reason=CERTIFICATE_EXPIRED</code> ; les deux bornes sont incluses.<br>\n3. Si aucun DNS-ID du SAN ne correspond : <code>STATUS=INVALID reason=HOSTNAME_MISMATCH</code>.<br>\n4. Si ces deux contrôles passent : <code>STATUS=PARTIAL fqdn=&lt;fqdn&gt; valid_until=&lt;not_after&gt; ca=&lt;is_ca&gt; chain=NOT_CHECKED</code>.<br><br>\nParamètres : <code>CERT_VALIDATE fqdn=&lt;fqdn&gt; date=&lt;date&gt; cn=&lt;cn&gt; san=&lt;san&gt; not_before=&lt;date&gt; not_after=&lt;date&gt; is_ca=&lt;bool&gt;</code>.</p>",
    "starter": "# Grille d'analyse (cr3-c5-e2) — Contrôle Partiel d’un Nom DNS SAN et des Dates d’un Certificat X.509\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Correspondance partielle par wildcard SAN]\n# Données : CERT_VALIDATE fqdn=web.cloud.corp date=2026-10-15 cn=cloud.corp san=*.cloud.corp not_before=2026-01-01 not_after=2027-01-01 is_ca=false\nA_COMPLETER\n\n[Cas 2 — CN correspondant mais SAN absent]\n# Données : CERT_VALIDATE fqdn=api.cloud.corp date=2026-10-15 cn=api.cloud.corp san=- not_before=2026-01-01 not_after=2027-01-01 is_ca=false\nA_COMPLETER\n\n[Cas 3 — Rejet certificat expiré]\n# Données : CERT_VALIDATE fqdn=api.cloud.corp date=2028-05-01 cn=api.cloud.corp san=*.cloud.corp not_before=2026-01-01 not_after=2027-01-01 is_ca=false\nA_COMPLETER\n\n[Cas 4 — Rejet certificat pas encore valide]\n# Données : CERT_VALIDATE fqdn=api.cloud.corp date=2025-11-01 cn=api.cloud.corp san=*.cloud.corp not_before=2026-01-01 not_after=2027-01-01 is_ca=false\nA_COMPLETER\n\n[Cas 5 — CN correspondant mais SAN différent]\n# Données : CERT_VALIDATE fqdn=api.cloud.corp date=2026-10-15 cn=api.cloud.corp san=www.cloud.corp not_before=2026-01-01 not_after=2027-01-01 is_ca=false\nA_COMPLETER\n\n[Cas 6 — Wildcard ne couvrant pas deux labels]\n# Données : CERT_VALIDATE fqdn=api.dev.cloud.corp date=2026-10-15 cn=api.dev.cloud.corp san=*.cloud.corp not_before=2026-01-01 not_after=2027-01-01 is_ca=false\nA_COMPLETER\n\n[Cas 7 — Wildcard ne couvrant pas le domaine racine]\n# Données : CERT_VALIDATE fqdn=cloud.corp date=2026-10-15 cn=cloud.corp san=*.cloud.corp not_before=2026-01-01 not_after=2027-01-01 is_ca=false\nA_COMPLETER\n",
    "hints": [
      "Comparez les dates ISO YYYY-MM-DD avec bornes incluses, puis ignorez le CN pour la correspondance du nom.",
      "Un wildcard complet dans le label le plus à gauche couvre exactement un label ; même si les contrôles passent, la chaîne reste non contrôlée.",
      "Comparez le FQDN cible aux entrées SAN exactes ou wildcard autorisées, et vérifiez que la date courante se situe bien entre NotBefore et NotAfter."
    ],
    "examples": [
      {
        "stdin": "CERT_VALIDATE fqdn=api.cloud.corp date=2026-10-15 cn=api.cloud.corp san=*.cloud.corp,cloud.corp not_before=2026-01-01 not_after=2027-01-01 is_ca=false",
        "expected": "STATUS=PARTIAL fqdn=api.cloud.corp valid_until=2027-01-01 ca=false chain=NOT_CHECKED",
        "note": "Dates et wildcard SAN correspondent ; la chaîne n’est pas vérifiée."
      }
    ],
    "tests": [
      {
        "label": "Correspondance partielle par wildcard SAN",
        "stdin": "cas:1",
        "expected": "STATUS=PARTIAL fqdn=web.cloud.corp valid_until=2027-01-01 ca=false chain=NOT_CHECKED"
      },
      {
        "label": "CN correspondant mais SAN absent",
        "stdin": "cas:2",
        "expected": "STATUS=INVALID reason=HOSTNAME_MISMATCH"
      },
      {
        "label": "Rejet certificat expiré",
        "stdin": "cas:3",
        "expected": "STATUS=INVALID reason=CERTIFICATE_EXPIRED"
      },
      {
        "label": "Rejet certificat pas encore valide",
        "stdin": "cas:4",
        "expected": "STATUS=INVALID reason=NOT_YET_VALID"
      },
      {
        "label": "CN correspondant mais SAN différent",
        "stdin": "cas:5",
        "expected": "STATUS=INVALID reason=HOSTNAME_MISMATCH"
      },
      {
        "label": "Wildcard ne couvrant pas deux labels",
        "stdin": "cas:6",
        "expected": "STATUS=INVALID reason=HOSTNAME_MISMATCH"
      },
      {
        "label": "Wildcard ne couvrant pas le domaine racine",
        "stdin": "cas:7",
        "expected": "STATUS=INVALID reason=HOSTNAME_MISMATCH"
      }
    ],
    "solution": "[Exemple]\nSTATUS=PARTIAL fqdn=api.cloud.corp valid_until=2027-01-01 ca=false chain=NOT_CHECKED\n\n[Cas 1 — Correspondance partielle par wildcard SAN]\nSTATUS=PARTIAL fqdn=web.cloud.corp valid_until=2027-01-01 ca=false chain=NOT_CHECKED\n\n[Cas 2 — CN correspondant mais SAN absent]\nSTATUS=INVALID reason=HOSTNAME_MISMATCH\n\n[Cas 3 — Rejet certificat expiré]\nSTATUS=INVALID reason=CERTIFICATE_EXPIRED\n\n[Cas 4 — Rejet certificat pas encore valide]\nSTATUS=INVALID reason=NOT_YET_VALID\n\n[Cas 5 — CN correspondant mais SAN différent]\nSTATUS=INVALID reason=HOSTNAME_MISMATCH\n\n[Cas 6 — Wildcard ne couvrant pas deux labels]\nSTATUS=INVALID reason=HOSTNAME_MISMATCH\n\n[Cas 7 — Wildcard ne couvrant pas le domaine racine]\nSTATUS=INVALID reason=HOSTNAME_MISMATCH",
    "takeaway": "À retenir : Contrôler les dates et un nom DNS dans le SAN sans prétendre valider complètement le certificat.\nRepère : Dates et wildcard SAN correspondent ; la chaîne n’est pas vérifiée."
  },
  {
    "id": "cr3-c5-e3",
    "chapter": 5,
    "title": "Contrôle Partiel de Chaîne PKI et de Liste de Révocation Fictive",
    "level": "n3",
    "language": "analyse",
    "goal": "Effectuer un contrôle partiel des noms et d’une liste de révocation fictive, sans valider une chaîne PKI réelle.",
    "brief": "<p>Ce modèle contrôle uniquement des chaînes de noms et des numéros de série dans une liste fictive. Les signatures des certificats et de la liste sont non vérifiées ; les dates, contraintes complètes, usages, identité du service, authenticité de l’ancre et fraîcheur de révocation ne sont pas vérifiés non plus. Il ne valide pas une chaîne PKI réelle et n’interroge pas OCSP. Tous les diagnostics, même négatifs, ne concernent que les données fictives et ne certifient pas le statut réel.<br>\nUn sujet égal à l’émetteur indique ici un certificat auto-émis, pas la preuve qu’il est auto-signé. <code>trust_root</code> est seulement un nom attendu, non une ancre cryptographique vérifiée.<br><br>\nLigne d’en-tête : <code>PKI_CHAIN trust_root=&lt;root&gt; crl_revoked=&lt;s1,s2,...&gt;</code>.<br>\nCertificats de la feuille à la racine : <code>CERT subject=&lt;s&gt; issuer=&lt;i&gt; serial=&lt;ser&gt; is_ca=&lt;bool&gt;</code>.<br><br>\nRègles de ce modèle :<br>\n1. Si un numéro de série figure dans la liste : <code>CHAIN: INVALID reason=REVOKED_CERTIFICATE serial=&lt;ser&gt; subject=&lt;s&gt;</code>.<br>\n2. Pour tout certificat i &lt; N-1, comparer <code>cert[i].issuer == cert[i+1].subject</code> ; sinon <code>CHAIN: INVALID reason=BROKEN_ISSUER_CHAIN at_cert=&lt;cert[i].subject&gt;</code>.<br>\n3. Vérifier l’indicateur déclaré <code>cert[i+1].is_ca == true</code> ; sinon <code>CHAIN: INVALID reason=INTERMEDIATE_NOT_CA subject=&lt;cert[i+1].subject&gt;</code>.<br>\n4. Le dernier sujet doit égaler son émetteur et <code>trust_root</code> ; sinon <code>CHAIN: INVALID reason=UNTRUSTED_ROOT root=&lt;root&gt;</code>.<br>\n5. Si ces seuls contrôles passent : <code>CHAIN: PARTIAL depth=&lt;N&gt; root=&lt;root&gt; leaf=&lt;leaf&gt; signatures=NOT_CHECKED</code>.</p>",
    "starter": "# Grille d'analyse (cr3-c5-e3) — Contrôle Partiel de Chaîne PKI et de Liste de Révocation Fictive\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Numéro de série présent dans la liste fictive]\n# Données : PKI_CHAIN trust_root=DigiTrust_Root_CA crl_revoked=SN-1001\n# Données : CERT subject=api.bank.com issuer=DigiTrust_Intermediate_CA serial=SN-1001 is_ca=false\n# Données : CERT subject=DigiTrust_Intermediate_CA issuer=DigiTrust_Root_CA serial=SN-2001 is_ca=true\n# Données : CERT subject=DigiTrust_Root_CA issuer=DigiTrust_Root_CA serial=SN-3001 is_ca=true\nA_COMPLETER\n\n[Cas 2 — Rupture de liaison des noms d’émetteur]\n# Données : PKI_CHAIN trust_root=DigiTrust_Root_CA crl_revoked=SN-999\n# Données : CERT subject=api.bank.com issuer=Rogue_Intermediate serial=SN-1001 is_ca=false\n# Données : CERT subject=DigiTrust_Intermediate_CA issuer=DigiTrust_Root_CA serial=SN-2001 is_ca=true\n# Données : CERT subject=DigiTrust_Root_CA issuer=DigiTrust_Root_CA serial=SN-3001 is_ca=true\nA_COMPLETER\n\n[Cas 3 — Nom de racine différent du nom attendu]\n# Données : PKI_CHAIN trust_root=Official_Root_CA crl_revoked=none\n# Données : CERT subject=api.bank.com issuer=DigiTrust_Intermediate_CA serial=SN-1001 is_ca=false\n# Données : CERT subject=DigiTrust_Intermediate_CA issuer=Fake_Root_CA serial=SN-2001 is_ca=true\n# Données : CERT subject=Fake_Root_CA issuer=Fake_Root_CA serial=SN-3001 is_ca=true\nA_COMPLETER\n\n[Cas 4 — Noms cohérents mais signatures non contrôlées]\n# Données : PKI_CHAIN trust_root=DigiTrust_Root_CA crl_revoked=SN-999\n# Données : CERT subject=api.bank.com issuer=DigiTrust_Intermediate_CA serial=SN-1001 is_ca=false\n# Données : CERT subject=DigiTrust_Intermediate_CA issuer=DigiTrust_Root_CA serial=SN-2001 is_ca=true\n# Données : CERT subject=DigiTrust_Root_CA issuer=DigiTrust_Root_CA serial=SN-3001 is_ca=true\nA_COMPLETER\n\n[Cas 5 — Émetteur intermédiaire sans indicateur CA]\n# Données : PKI_CHAIN trust_root=DigiTrust_Root_CA crl_revoked=SN-999\n# Données : CERT subject=api.bank.com issuer=DigiTrust_Intermediate_CA serial=SN-1001 is_ca=false\n# Données : CERT subject=DigiTrust_Intermediate_CA issuer=DigiTrust_Root_CA serial=SN-2001 is_ca=false\n# Données : CERT subject=DigiTrust_Root_CA issuer=DigiTrust_Root_CA serial=SN-3001 is_ca=true\nA_COMPLETER\n",
    "hints": [
      "Comparez les numéros de série à la liste fictive avant de vérifier les noms et les indicateurs CA.",
      "Des noms cohérents ne vérifient pas les signatures ni l’ancre de confiance : le verdict positif reste partiel.",
      "Parcourez la chaîne du certificat feuille jusqu à la racine, vérifiez le lien issuer/subject et contrôlez l absence du numéro de série dans la CRL fictive."
    ],
    "examples": [
      {
        "stdin": "PKI_CHAIN trust_root=DigiTrust_Root_CA crl_revoked=SN-999\nCERT subject=api.bank.com issuer=DigiTrust_Intermediate_CA serial=SN-1001 is_ca=false\nCERT subject=DigiTrust_Intermediate_CA issuer=DigiTrust_Root_CA serial=SN-2001 is_ca=true\nCERT subject=DigiTrust_Root_CA issuer=DigiTrust_Root_CA serial=SN-3001 is_ca=true",
        "expected": "CHAIN: PARTIAL depth=3 root=DigiTrust_Root_CA leaf=api.bank.com signatures=NOT_CHECKED",
        "note": "Contrôles de noms et liste fictive seulement ; les signatures et la confiance réelle ne sont pas vérifiées."
      }
    ],
    "tests": [
      {
        "label": "Numéro de série présent dans la liste fictive",
        "stdin": "cas:1",
        "expected": "CHAIN: INVALID reason=REVOKED_CERTIFICATE serial=SN-1001 subject=api.bank.com"
      },
      {
        "label": "Rupture de liaison des noms d’émetteur",
        "stdin": "cas:2",
        "expected": "CHAIN: INVALID reason=BROKEN_ISSUER_CHAIN at_cert=api.bank.com"
      },
      {
        "label": "Nom de racine différent du nom attendu",
        "stdin": "cas:3",
        "expected": "CHAIN: INVALID reason=UNTRUSTED_ROOT root=Fake_Root_CA"
      },
      {
        "label": "Noms cohérents mais signatures non contrôlées",
        "stdin": "cas:4",
        "expected": "CHAIN: PARTIAL depth=3 root=DigiTrust_Root_CA leaf=api.bank.com signatures=NOT_CHECKED"
      },
      {
        "label": "Émetteur intermédiaire sans indicateur CA",
        "stdin": "cas:5",
        "expected": "CHAIN: INVALID reason=INTERMEDIATE_NOT_CA subject=DigiTrust_Intermediate_CA"
      }
    ],
    "solution": "[Exemple]\nCHAIN: PARTIAL depth=3 root=DigiTrust_Root_CA leaf=api.bank.com signatures=NOT_CHECKED\n\n[Cas 1 — Numéro de série présent dans la liste fictive]\nCHAIN: INVALID reason=REVOKED_CERTIFICATE serial=SN-1001 subject=api.bank.com\n\n[Cas 2 — Rupture de liaison des noms d’émetteur]\nCHAIN: INVALID reason=BROKEN_ISSUER_CHAIN at_cert=api.bank.com\n\n[Cas 3 — Nom de racine différent du nom attendu]\nCHAIN: INVALID reason=UNTRUSTED_ROOT root=Fake_Root_CA\n\n[Cas 4 — Noms cohérents mais signatures non contrôlées]\nCHAIN: PARTIAL depth=3 root=DigiTrust_Root_CA leaf=api.bank.com signatures=NOT_CHECKED\n\n[Cas 5 — Émetteur intermédiaire sans indicateur CA]\nCHAIN: INVALID reason=INTERMEDIATE_NOT_CA subject=DigiTrust_Intermediate_CA",
    "takeaway": "À retenir : Effectuer un contrôle partiel des noms et d’une liste de révocation fictive, sans valider une chaîne PKI réelle.\nRepère : Contrôles de noms et liste fictive seulement ; les signatures et la confiance réelle ne sont pas vérifiées."
  },
  {
    "id": "cr3-c6-e1",
    "chapter": 6,
    "title": "Analyseur de Suite Cryptographique TLS (Cipher Suite Parser)",
    "level": "n1",
    "language": "analyse",
    "goal": "Analyser une suite et les paramètres TLS négociés sans déduire la PFS du seul nom TLS 1.3.",
    "brief": "<p>En TLS 1.3, la suite indique l’AEAD et la fonction de hachage HKDF ; elle ne détermine ni le mode d’échange, ni le groupe, ni la PFS. Le mode, le groupe et la phase doivent être connus séparément. Ce modèle traite les paramètres des cas sans vérifier une négociation réelle ni la sécurité globale. <code>dhe</code> désigne ici un échange éphémère sans PSK ; ce n’est pas un mode PSK TLS.<br><br>\nPour les suites TLS 1.3 du modèle, analyser <code>PARSE_SUITE suite=&lt;nom&gt; mode=&lt;mode&gt; group=&lt;groupe&gt; phase=&lt;phase&gt;</code>. Pour chaque paramètre absent, afficher <code>UNKNOWN</code> ; si des informations nécessaires manquent, afficher <code>pfs=UNKNOWN status=PARAMETERS_REQUIRED</code>.<br>\nEn <code>phase=1-rtt</code>, <code>mode=psk_ke group=none</code> donne <code>pfs=NO</code> dans ce modèle ; <code>mode=dhe</code> ou <code>mode=psk_dhe_ke</code> avec un groupe éphémère donne <code>pfs=CONDITIONAL</code>, sous réserve d’authentification et d’effacement des secrets éphémères. En <code>phase=0-rtt</code>, la PFS est <code>NOT_GUARANTEED</code>, quel que soit le mode ultérieur ; les données anticipées présentent un risque de rejeu. Lorsque ces paramètres sont indiqués, <code>status=PARAMETERS_ONLY</code> n’est pas une certification de sécurité.<br>\nPour les suites avec <code>_WITH_</code>, on suppose TLS 1.2 : leur nom ne prouve pas la version négociée. Extraire échange, chiffrement et hachage. Un échange ECDHE/DHE indique <code>pfs=CONDITIONAL status=PARAMETERS_ONLY</code> ; RSA statique indique <code>pfs=NO status=WEAK_NO_PFS</code>. RC4, DES, 3DES, NULL ou EXPORT conduit à <code>status=INSECURE</code>.<br><br>\nFormat TLS 1.3 : <code>SUITE: &lt;nom&gt; ver=TLS1.3 kex=&lt;mode&gt; group=&lt;groupe&gt; phase=&lt;phase&gt; enc=&lt;algorithme&gt; hash=&lt;hachage&gt; pfs=&lt;pfs&gt; status=&lt;statut&gt;</code>.<br>\nFormat TLS 1.2 : <code>SUITE: &lt;nom&gt; ver=TLS1.2 kex=&lt;échange&gt; enc=&lt;algorithme&gt; hash=&lt;hachage&gt; pfs=&lt;pfs&gt; status=&lt;statut&gt;</code>.</p>",
    "starter": "# Grille d'analyse (cr3-c6-e1) — Analyseur de Suite Cryptographique TLS (Cipher Suite Parser)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Suite TLS 1.3 sans paramètres négociés]\n# Données : PARSE_SUITE suite=TLS_AES_256_GCM_SHA384\nA_COMPLETER\n\n[Cas 2 — Suite TLS 1.2 sans confidentialité persistante]\n# Données : PARSE_SUITE suite=TLS_RSA_WITH_AES_256_CBC_SHA256\nA_COMPLETER\n\n[Cas 3 — Suite TLS avec chiffrement déprécié]\n# Données : PARSE_SUITE suite=TLS_RSA_WITH_RC4_128_SHA\nA_COMPLETER\n\n[Cas 4 — TLS 1.3 avec PSK seul en 1-RTT]\n# Données : PARSE_SUITE suite=TLS_AES_256_GCM_SHA384 mode=psk_ke group=none phase=1-rtt\nA_COMPLETER\n\n[Cas 5 — TLS 1.3 avec PSK et échange éphémère en 1-RTT]\n# Données : PARSE_SUITE suite=TLS_AES_256_GCM_SHA384 mode=psk_dhe_ke group=x25519 phase=1-rtt\nA_COMPLETER\n\n[Cas 6 — Même suite et échange, données anticipées 0-RTT]\n# Données : PARSE_SUITE suite=TLS_AES_256_GCM_SHA384 mode=psk_dhe_ke group=x25519 phase=0-rtt\nA_COMPLETER\n\n[Cas 7 — Handshake initial TLS 1.3 avec échange éphémère]\n# Données : PARSE_SUITE suite=TLS_AES_256_GCM_SHA384 mode=dhe group=x25519 phase=1-rtt\nA_COMPLETER\n",
    "hints": [
      "Le nom TLS 1.3 indique l’AEAD et le hachage, mais ne révèle pas le mode d’échange ni le groupe.",
      "Distinguez les données 0-RTT, le mode PSK seul et le mode PSK avec échange éphémère en 1-RTT ; ne concluez pas à une sécurité globale.",
      "Extrayez échange de clés, authentification, chiffrement symétrique et condensat depuis le nom de la suite ; ne concluez à la PFS qu en présence explicite d ECDHE/DHE."
    ],
    "examples": [
      {
        "stdin": "PARSE_SUITE suite=TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256",
        "expected": "SUITE: TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256 ver=TLS1.2 kex=ECDHE_RSA enc=AES_128_GCM hash=SHA256 pfs=CONDITIONAL status=PARAMETERS_ONLY",
        "note": "L’échange ECDHE permet la PFS sous hypothèses ; la configuration complète n’est pas auditée."
      }
    ],
    "tests": [
      {
        "label": "Suite TLS 1.3 sans paramètres négociés",
        "stdin": "cas:1",
        "expected": "SUITE: TLS_AES_256_GCM_SHA384 ver=TLS1.3 kex=UNKNOWN group=UNKNOWN phase=UNKNOWN enc=AES_256_GCM hash=SHA384 pfs=UNKNOWN status=PARAMETERS_REQUIRED"
      },
      {
        "label": "Suite TLS 1.2 sans confidentialité persistante",
        "stdin": "cas:2",
        "expected": "SUITE: TLS_RSA_WITH_AES_256_CBC_SHA256 ver=TLS1.2 kex=RSA enc=AES_256_CBC hash=SHA256 pfs=NO status=WEAK_NO_PFS"
      },
      {
        "label": "Suite TLS avec chiffrement déprécié",
        "stdin": "cas:3",
        "expected": "SUITE: TLS_RSA_WITH_RC4_128_SHA ver=TLS1.2 kex=RSA enc=RC4_128 hash=SHA pfs=NO status=INSECURE"
      },
      {
        "label": "TLS 1.3 avec PSK seul en 1-RTT",
        "stdin": "cas:4",
        "expected": "SUITE: TLS_AES_256_GCM_SHA384 ver=TLS1.3 kex=psk_ke group=none phase=1-rtt enc=AES_256_GCM hash=SHA384 pfs=NO status=PARAMETERS_ONLY"
      },
      {
        "label": "TLS 1.3 avec PSK et échange éphémère en 1-RTT",
        "stdin": "cas:5",
        "expected": "SUITE: TLS_AES_256_GCM_SHA384 ver=TLS1.3 kex=psk_dhe_ke group=x25519 phase=1-rtt enc=AES_256_GCM hash=SHA384 pfs=CONDITIONAL status=PARAMETERS_ONLY"
      },
      {
        "label": "Même suite et échange, données anticipées 0-RTT",
        "stdin": "cas:6",
        "expected": "SUITE: TLS_AES_256_GCM_SHA384 ver=TLS1.3 kex=psk_dhe_ke group=x25519 phase=0-rtt enc=AES_256_GCM hash=SHA384 pfs=NOT_GUARANTEED status=PARAMETERS_ONLY"
      },
      {
        "label": "Handshake initial TLS 1.3 avec échange éphémère",
        "stdin": "cas:7",
        "expected": "SUITE: TLS_AES_256_GCM_SHA384 ver=TLS1.3 kex=dhe group=x25519 phase=1-rtt enc=AES_256_GCM hash=SHA384 pfs=CONDITIONAL status=PARAMETERS_ONLY"
      }
    ],
    "solution": "[Exemple]\nSUITE: TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256 ver=TLS1.2 kex=ECDHE_RSA enc=AES_128_GCM hash=SHA256 pfs=CONDITIONAL status=PARAMETERS_ONLY\n\n[Cas 1 — Suite TLS 1.3 sans paramètres négociés]\nSUITE: TLS_AES_256_GCM_SHA384 ver=TLS1.3 kex=UNKNOWN group=UNKNOWN phase=UNKNOWN enc=AES_256_GCM hash=SHA384 pfs=UNKNOWN status=PARAMETERS_REQUIRED\n\n[Cas 2 — Suite TLS 1.2 sans confidentialité persistante]\nSUITE: TLS_RSA_WITH_AES_256_CBC_SHA256 ver=TLS1.2 kex=RSA enc=AES_256_CBC hash=SHA256 pfs=NO status=WEAK_NO_PFS\n\n[Cas 3 — Suite TLS avec chiffrement déprécié]\nSUITE: TLS_RSA_WITH_RC4_128_SHA ver=TLS1.2 kex=RSA enc=RC4_128 hash=SHA pfs=NO status=INSECURE\n\n[Cas 4 — TLS 1.3 avec PSK seul en 1-RTT]\nSUITE: TLS_AES_256_GCM_SHA384 ver=TLS1.3 kex=psk_ke group=none phase=1-rtt enc=AES_256_GCM hash=SHA384 pfs=NO status=PARAMETERS_ONLY\n\n[Cas 5 — TLS 1.3 avec PSK et échange éphémère en 1-RTT]\nSUITE: TLS_AES_256_GCM_SHA384 ver=TLS1.3 kex=psk_dhe_ke group=x25519 phase=1-rtt enc=AES_256_GCM hash=SHA384 pfs=CONDITIONAL status=PARAMETERS_ONLY\n\n[Cas 6 — Même suite et échange, données anticipées 0-RTT]\nSUITE: TLS_AES_256_GCM_SHA384 ver=TLS1.3 kex=psk_dhe_ke group=x25519 phase=0-rtt enc=AES_256_GCM hash=SHA384 pfs=NOT_GUARANTEED status=PARAMETERS_ONLY\n\n[Cas 7 — Handshake initial TLS 1.3 avec échange éphémère]\nSUITE: TLS_AES_256_GCM_SHA384 ver=TLS1.3 kex=dhe group=x25519 phase=1-rtt enc=AES_256_GCM hash=SHA384 pfs=CONDITIONAL status=PARAMETERS_ONLY",
    "takeaway": "À retenir : Analyser une suite et les paramètres TLS négociés sans déduire la PFS du seul nom TLS 1.3.\nRepère : L’échange ECDHE permet la PFS sous hypothèses ; la configuration complète n’est pas auditée."
  },
  {
    "id": "cr3-c6-e2",
    "chapter": 6,
    "title": "Analyse illustrative des phases TLS 1.3 et de la confidentialité persistante (PFS)",
    "level": "n2",
    "language": "analyse",
    "goal": "Comparer les phases TLS 1.3 et calculer un identifiant public purement illustratif, sans dériver de secret TLS.",
    "brief": "<p>TLS 1.3 (RFC 9846 ; RFC 8446 historique) peut transmettre des données 0-RTT avant la fin de la poignée de mains : leur confidentialité persistante n’est pas garantie par le protocole et elles peuvent être rejouées. En 1-RTT, un échange éphémère authentifié peut fournir la PFS si les secrets éphémères sont effacés ; le mode PSK seul ne la fournit pas par son échange. Le serveur peut refuser les données anticipées.<br><br>\nCe modèle ne simule pas le protocole réel, ni la validation des pairs. Les cas 0-RTT supposent un PSK ; <code>dhe</code> désigne ici un échange éphémère sans PSK, pas un mode PSK TLS. TLS dérive ses secrets avec HKDF à partir notamment du PSK et/ou d’un secret d’échange, selon la phase et le transcript. On calcule ici seulement <code>demo_id = sha256(client_share:server_share:group)[:16]</code> sur la chaîne encodée en UTF-8, puis en conservant les 16 premiers caractères hexadécimaux. Il n’est pas un secret, une clé ou une dérivation TLS ; les valeurs sont publiques et synthétiques. En 0-RTT, les parts éventuelles sont données après coup pour cet identifiant, pas pour dériver les données anticipées.<br><br>\nRègles du modèle :<br>\n- Pour un handshake initial TLSv1.2, <code>mode=dhe</code> donne <code>pfs=CONDITIONAL</code> sous les hypothèses ci-dessus ; <code>mode=rsa</code> (RSA statique) donne <code>pfs=NO</code>, sinon <code>pfs=UNKNOWN</code>. Format : <code>TLS1.2: rtt=2-RTT pfs=&lt;pfs&gt; status=MODEL_ONLY</code>.<br>\n- Pour une autre version que TLSv1.2 ou TLSv1.3 : <code>STATUS=REJECTED (TLS version unsupported: &lt;v&gt;)</code>.<br>\n- Pour TLSv1.3 en mode <code>dhe</code> ou <code>psk_dhe_ke</code>, accepter seulement <code>x25519</code>, <code>secp256r1</code>, <code>secp384r1</code> ; sinon <code>STATUS=REJECTED (unsupported elliptic group: &lt;grp&gt;)</code>. En mode <code>psk_ke</code>, il n’y a ni groupe ni parts : utiliser <code>none</code>.<br>\n- En <code>phase=0-rtt</code>, afficher <code>pfs=NOT_GUARANTEED</code>. En <code>phase=1-rtt</code>, afficher <code>pfs=NO</code> pour <code>psk_ke</code>, sinon <code>pfs=CONDITIONAL</code> sous les hypothèses ci-dessus.<br>\nFormat : <code>TLS1.3: phase=&lt;phase&gt; mode=&lt;mode&gt; group=&lt;grp&gt; pfs=&lt;pfs&gt; demo_id=&lt;id&gt; status=MODEL_ONLY</code>.</p>",
    "starter": "# Grille d'analyse (cr3-c6-e2) — Analyse illustrative des phases TLS 1.3 et de la confidentialité persistante (PFS)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Données anticipées 0-RTT avec PSK et échange ultérieur]\n# Données : TLS_HANDSHAKE client_version=TLSv1.3 server_version=TLSv1.3 group=x25519 client_share=A1B2 server_share=C3D4 mode=psk_dhe_ke phase=0-rtt\nA_COMPLETER\n\n[Cas 2 — Handshake initial TLS 1.2 avec RSA statique]\n# Données : TLS_HANDSHAKE client_version=TLSv1.2 server_version=TLSv1.2 group=none client_share=none server_share=none mode=rsa phase=1-rtt\nA_COMPLETER\n\n[Cas 3 — Rejet version obsolète TLS 1.0]\n# Données : TLS_HANDSHAKE client_version=TLSv1.0 server_version=TLSv1.0 group=none client_share=none server_share=none mode=none phase=1-rtt\nA_COMPLETER\n\n[Cas 4 — Données 1-RTT avec PSK et échange éphémère]\n# Données : TLS_HANDSHAKE client_version=TLSv1.3 server_version=TLSv1.3 group=x25519 client_share=A1B2 server_share=C3D4 mode=psk_dhe_ke phase=1-rtt\nA_COMPLETER\n\n[Cas 5 — Données 1-RTT avec PSK seul]\n# Données : TLS_HANDSHAKE client_version=TLSv1.3 server_version=TLSv1.3 group=none client_share=none server_share=none mode=psk_ke phase=1-rtt\nA_COMPLETER\n\n[Cas 6 — Données anticipées 0-RTT avec PSK seul]\n# Données : TLS_HANDSHAKE client_version=TLSv1.3 server_version=TLSv1.3 group=none client_share=none server_share=none mode=psk_ke phase=0-rtt\nA_COMPLETER\n\n[Cas 7 — Groupe non pris en charge par le modèle]\n# Données : TLS_HANDSHAKE client_version=TLSv1.3 server_version=TLSv1.3 group=legacy1024 client_share=A1B2 server_share=C3D4 mode=dhe phase=1-rtt\nA_COMPLETER\n",
    "hints": [
      "Distinguez la phase des données du mode d’échange négocié ; 0-RTT ne termine pas le handshake et ne garantit pas la PFS.",
      "Pour l’identifiant public uniquement, concaténez client_share, server_share et group avec « : », puis prenez les 16 premiers caractères hexadécimaux de SHA-256.",
      "Vérifiez la combinaison version/mode/groupe (TLS 1.3 n impose PFS que si PSK-only n est pas utilisé seul) et respectez le format exact de la ligne illustrative."
    ],
    "examples": [
      {
        "stdin": "TLS_HANDSHAKE client_version=TLSv1.3 server_version=TLSv1.3 group=x25519 client_share=A1B2 server_share=C3D4 mode=dhe phase=1-rtt",
        "expected": "TLS1.3: phase=1-rtt mode=dhe group=x25519 pfs=CONDITIONAL demo_id=f91a13a53fa8daae status=MODEL_ONLY",
        "note": "Échange éphémère illustratif ; le hachage public n’est pas un secret TLS."
      }
    ],
    "tests": [
      {
        "label": "Données anticipées 0-RTT avec PSK et échange ultérieur",
        "stdin": "cas:1",
        "expected": "TLS1.3: phase=0-rtt mode=psk_dhe_ke group=x25519 pfs=NOT_GUARANTEED demo_id=f91a13a53fa8daae status=MODEL_ONLY"
      },
      {
        "label": "Handshake initial TLS 1.2 avec RSA statique",
        "stdin": "cas:2",
        "expected": "TLS1.2: rtt=2-RTT pfs=NO status=MODEL_ONLY"
      },
      {
        "label": "Rejet version obsolète TLS 1.0",
        "stdin": "cas:3",
        "expected": "STATUS=REJECTED (TLS version unsupported: TLSv1.0)"
      },
      {
        "label": "Données 1-RTT avec PSK et échange éphémère",
        "stdin": "cas:4",
        "expected": "TLS1.3: phase=1-rtt mode=psk_dhe_ke group=x25519 pfs=CONDITIONAL demo_id=f91a13a53fa8daae status=MODEL_ONLY"
      },
      {
        "label": "Données 1-RTT avec PSK seul",
        "stdin": "cas:5",
        "expected": "TLS1.3: phase=1-rtt mode=psk_ke group=none pfs=NO demo_id=882e45d0b744de68 status=MODEL_ONLY"
      },
      {
        "label": "Données anticipées 0-RTT avec PSK seul",
        "stdin": "cas:6",
        "expected": "TLS1.3: phase=0-rtt mode=psk_ke group=none pfs=NOT_GUARANTEED demo_id=882e45d0b744de68 status=MODEL_ONLY"
      },
      {
        "label": "Groupe non pris en charge par le modèle",
        "stdin": "cas:7",
        "expected": "STATUS=REJECTED (unsupported elliptic group: legacy1024)"
      }
    ],
    "solution": "[Exemple]\nTLS1.3: phase=1-rtt mode=dhe group=x25519 pfs=CONDITIONAL demo_id=f91a13a53fa8daae status=MODEL_ONLY\n\n[Cas 1 — Données anticipées 0-RTT avec PSK et échange ultérieur]\nTLS1.3: phase=0-rtt mode=psk_dhe_ke group=x25519 pfs=NOT_GUARANTEED demo_id=f91a13a53fa8daae status=MODEL_ONLY\n\n[Cas 2 — Handshake initial TLS 1.2 avec RSA statique]\nTLS1.2: rtt=2-RTT pfs=NO status=MODEL_ONLY\n\n[Cas 3 — Rejet version obsolète TLS 1.0]\nSTATUS=REJECTED (TLS version unsupported: TLSv1.0)\n\n[Cas 4 — Données 1-RTT avec PSK et échange éphémère]\nTLS1.3: phase=1-rtt mode=psk_dhe_ke group=x25519 pfs=CONDITIONAL demo_id=f91a13a53fa8daae status=MODEL_ONLY\n\n[Cas 5 — Données 1-RTT avec PSK seul]\nTLS1.3: phase=1-rtt mode=psk_ke group=none pfs=NO demo_id=882e45d0b744de68 status=MODEL_ONLY\n\n[Cas 6 — Données anticipées 0-RTT avec PSK seul]\nTLS1.3: phase=0-rtt mode=psk_ke group=none pfs=NOT_GUARANTEED demo_id=882e45d0b744de68 status=MODEL_ONLY\n\n[Cas 7 — Groupe non pris en charge par le modèle]\nSTATUS=REJECTED (unsupported elliptic group: legacy1024)",
    "takeaway": "À retenir : Comparer les phases TLS 1.3 et calculer un identifiant public purement illustratif, sans dériver de secret TLS.\nRepère : Échange éphémère illustratif ; le hachage public n’est pas un secret TLS."
  },
  {
    "id": "cr3-c6-e3",
    "chapter": 6,
    "level": "n3",
    "language": "analyse",
    "title": "Préparer la migration post-quantique du groupe Meridor",
    "exampleTitle": "Exemple résolu — le plan post-quantique du ministère",
    "goal": "Évaluer l'impact des algorithmes quantiques de Shor et de Grover et proposer des mesures de migration post-quantique.",
    "brief": "<p><strong>Énoncé.</strong> Le RSSI du groupe industriel Meridor prépare la migration cryptographique post-quantique. Le comité de sécurité rappelle deux faits : l'algorithme de <strong>Shor</strong> factorise les entiers et résout les logarithmes discrets, mettant RSA, DH et ECC à terre dès qu'un ordinateur quantique suffisant existera ; l'algorithme de <strong>Grover</strong> accélère la recherche exhaustive d'un facteur racine carrée, affaiblissant le symétrique de moitié en bits de sécurité. Le groupe chiffre aujourd'hui ses liaisons en RSA-2048 et ses archives en AES-128.</p><ol><li>Quel algorithme quantique menace directement RSA-2048 et ECC ?</li><li>Quel algorithme quantique réduit la sécurité des clés symétriques ?</li><li>Sous Grover, la sécurité effective d'AES-128 tombe à environ combien de bits ?</li><li>Quelle famille d'algorithmes, standardisée par le NIST en 2024 pour remplacer les échanges de clés RSA et ECC, porte un nom en ML- (un nom suffit) ?</li><li>Quel risque, résumé par la formule « harvest now, decrypt later », impose de migrer avant l'arrivée de l'ordinateur quantique ?</li><li>Quelle mesure simple, côté symétrique, conserve une marge post-quantique confortable pour les archives ?</li></ol>",
    "starter": "# Exercice — Préparer la migration post-quantique du groupe Meridor\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 3 : le nom ou le nombre. Questions 4 à 6 : quelques mots.\n\n[Question 1 — Algorithme quantique menaçant RSA et ECC]\nA_COMPLETER\n\n[Question 2 — Algorithme quantique affaiblissant le symétrique]\nA_COMPLETER\n\n[Question 3 — Sécurité effective d'AES-128 sous Grover]\nA_COMPLETER\n\n[Question 4 — Famille post-quantique standardisée par le NIST en 2024]\nA_COMPLETER\n\n[Question 5 — Risque résumé par harvest now, decrypt later]\nA_COMPLETER\n\n[Question 6 — Mesure symétrique simple pour la marge post-quantique]\nA_COMPLETER\n",
    "hints": [
      "Shor s'attaque aux problèmes structurels (factorisation, logarithme discret) ; Grover accélère la recherche exhaustive d'un facteur racine carrée.",
      "Un standard du NIST publié en 2024 pour l'échange de clés, issu de la soumission Kyber, porte un nom commençant par ML-.",
      "1. La factorisation est le talon d'Achille de RSA. 2. La recherche exhaustive concerne les clés symétriques. 3. 128 / 2. 4. Le standard s'appelle ML-KEM. 5. Des captures réseau sont stockées en attendant le calculateur capable de les ouvrir. 6. Doubler la taille de clé annule l'effet de Grover."
    ],
    "examples": [
      {
        "stdin": "Un ministère dresse le même plan : liaisons en RSA-3072, archives en AES-192, condensés en SHA-256.\n1) RSA-3072 tombe sous l'algorithme de Shor.\n2) Le symétrique est affaibli par l'algorithme de Grover.\n3) AES-192 sous Grover : environ 96 bits de sécurité.\n4) Le NIST a standardisé ML-KEM (issu de Kyber) pour les échanges de clés.\n5) « Harvest now, decrypt later » : les captures d'aujourd'hui seront ouvertes demain.\n6) Mesure symétrique : passer à AES-256 (doubler la marge).",
        "expected": "Shor — Grover — 96 bits — ML-KEM — les captures stockées seront déchiffrées plus tard — AES-256",
        "note": "Grover enlève la moitié des bits de sécurité : doubler les clés symétriques suffit à le neutraliser, contrairement à Shor qui impose de changer de famille."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Algorithme quantique menaçant RSA et ECC",
        "stdin": "q:1",
        "expected": "Shor||l'algorithme de Shor||shor"
      },
      {
        "label": "Question 2 — Algorithme quantique affaiblissant le symétrique",
        "stdin": "q:2",
        "expected": "Grover||l'algorithme de Grover||grover"
      },
      {
        "label": "Question 3 — Sécurité effective d'AES-128 sous Grover",
        "stdin": "q:3",
        "expected": "64||64 bits"
      },
      {
        "label": "Question 4 — Famille post-quantique standardisée par le NIST en 2024",
        "stdin": "q:4",
        "expected": "ML-KEM||ml-kem||Kyber||kyber||ML-KEM (Kyber)"
      },
      {
        "label": "Question 5 — Risque résumé par harvest now, decrypt later",
        "stdin": "q:5",
        "expected": "les captures actuelles seront déchiffrées plus tard||des adversaires enregistrent les communications chiffrées aujourd'hui pour les déchiffrer plus tard||l'enregistrement des communications chiffrées pour déchiffrement futur||harvest now decrypt later||récolter maintenant, déchiffrer plus tard"
      },
      {
        "label": "Question 6 — Mesure symétrique simple pour la marge post-quantique",
        "stdin": "q:6",
        "expected": "passer à AES-256||AES-256||aes-256||doubler la taille de clé||utiliser AES-256"
      }
    ],
    "solution": "[Question 1 — Algorithme quantique menaçant RSA et ECC]\nShor\n\n[Question 2 — Algorithme quantique affaiblissant le symétrique]\nGrover\n\n[Question 3 — Sécurité effective d'AES-128 sous Grover]\n64\n\n[Question 4 — Famille post-quantique standardisée par le NIST en 2024]\nML-KEM\n\n[Question 5 — Risque résumé par harvest now, decrypt later]\nles captures actuelles seront déchiffrées plus tard\n\n[Question 6 — Mesure symétrique simple pour la marge post-quantique]\npasser à AES-256",
    "takeaway": "1) L'algorithme de Shor, qui factorise les entiers et résout les logarithmes discrets.\n2) L'algorithme de Grover, qui accélère la recherche exhaustive d'un facteur racine carrée.\n3) 128 / 2 = 64 bits de sécurité effective.\n4) ML-KEM (Module-Lattice Key Encapsulation Mechanism, issu de Kyber), standardisé par le NIST en 2024 pour l'échange de clés.\n5) Des adversaires enregistrent aujourd'hui les communications chiffrées pour les déchiffrer dès qu'un ordinateur quantique suffisant existera : les données à longue durée de vie sont déjà exposées.\n6) Passer à AES-256 : doubler la taille de clé restaure la marge face à Grover.\nContrôle : Shor impose de changer de famille (RSA vers ML-KEM) ; Grover se neutralise en doublant les clés (AES-128 vers AES-256)."
  }
];
