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
      "Pour le chiffre affine, que faut-il vérifier sur a et 26 avant de chercher l’inverse modulaire ?"
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
    "solution": "[Exemple]\nOUT: ERQMRXU\n\n[Cas 1 — Déchiffrement de César]\nOUT: ATTAQUE A L'AUBE\n\n[Cas 2 — Chiffrement affine valide]\nOUT: UCSPCZ\n\n[Cas 3 — Déchiffrement affine valide]\nOUT: REVI\n\n[Cas 4 — Rejet clé affine non inversible]\nERROR: gcd(a,26)!=1"
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
      "La longueur et le non-réemploi sont nécessaires mais ne prouvent ni le secret, ni l’uniformité, ni l’indépendance de la clé."
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
    "solution": "[Exemple]\nOUT: MIANZOE\n\n[Cas 1 — Déchiffrement de Vigenère]\nOUT: MESSAGE CONFIDENTIEL\n\n[Cas 2 — Conditions nécessaires satisfaites, sécurité non vérifiée]\nOTP: CONDITIONS_NECESSAIRES_OK (perfect secrecy not verified)\n\n[Cas 3 — Clé OTP trop courte]\nOTP: INVALID (key shorter than message)\n\n[Cas 4 — Réutilisation de clé OTP interdite]\nOTP: INVALID (key reused, vulnerable to two-time pad attack)"
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
      "Classez les lettres par nombre d'occurrences décroissant, puis par ordre alphabétique en cas d'égalité."
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
    "solution": "[Exemple]\nN=67 IC=0.0751 TYPE=MONOALPHABETIC TOP=E(11),T(8),O(7)\n\n[Cas 1 — Texte chiffré par César conservant l IC monoalphabétique]\nN=67 IC=0.0751 TYPE=MONOALPHABETIC TOP=H(11),W(8),R(7)\n\n[Cas 2 — Texte aplati polyalphabétique ou aléatoire]\nN=67 IC=0.0294 TYPE=POLYALPHABETIC_OR_RANDOM TOP=Z(5),L(4),M(4)\n\n[Cas 3 — Texte trop court pour le calcul d IC]\nERROR: TEXT_TOO_SHORT"
  }
];
