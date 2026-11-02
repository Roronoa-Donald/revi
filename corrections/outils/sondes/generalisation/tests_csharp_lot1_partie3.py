import copy
import importlib.util
import json
import shutil
import subprocess
import tempfile
import unittest
from pathlib import Path


PACKAGE = Path(__file__).resolve().parent
ROOT = PACKAGE.parents[3]


def charger(nom, chemin):
    spec = importlib.util.spec_from_file_location(nom, chemin)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


ORACLE = charger('oracle_csharp_test', PACKAGE / 'csharp_lot1_partie3.py')
BANC = charger('banc_csharp_test', PACKAGE / 'banc_csharp_lot1_partie3.py')
FIXTURES = json.loads((PACKAGE / 'cas_csharp_lot1_partie3.json').read_text(encoding='utf8'))['exercices']


class ReferenceEtComparateur(unittest.TestCase):
    def test_36_attendus_manuels_et_conditionnels(self):
        self.assertEqual(BANC.verifier_attendus(FIXTURES, ORACLE), 36)

    def test_attendu_altere_est_rejete(self):
        donnees = copy.deepcopy(FIXTURES[:1])
        donnees[0]['cas'][0]['attendu'] += ' FAUX'
        with self.assertRaises(RuntimeError):
            BANC.verifier_attendus(donnees, ORACLE)

    def test_attendu_conditionnel_altere_est_rejete(self):
        donnees = copy.deepcopy([exercice for exercice in FIXTURES if exercice['id'] == 'csb2-c2-e2'])
        donnees[0]['sondes_conditionnelles'][0]['attendu'] += ' FAUX'
        with self.assertRaises(RuntimeError):
            BANC.verifier_attendus(donnees, ORACLE)

    def test_division_et_reste_csharp(self):
        lire = lambda nom: {'valeur': -17}[nom]
        self.assertEqual(ORACLE.expression_entiere('valeur / 4', lire), -4)
        self.assertEqual(ORACLE.expression_entiere('valeur % 4', lire), -1)
        self.assertEqual(ORACLE.expression_entiere('17 % -4', lire), 1)
        self.assertEqual(ORACLE.expression_entiere('(3+5)*2-7/3', lire), 14)

    def test_alias_entre_ref_et_out(self):
        entree = ('INIT x=2, y=5\nMETHOD Mix(ref premier, out second, val copie)\n'
                  'BODY second=premier+copie; premier=premier+1\nCALL Mix(ref x, out x, y)')
        attendu = 'ETAT_INITIAL: x=2, y=5\nMETHODE: Mix\nETAT_FINAL: x=8, y=5'
        self.assertEqual(ORACLE.arguments(entree), attendu)

    def test_dimensions_egales_malgre_format_different(self):
        entree = 'Rectangle Width=4.0 Height=4.00'
        self.assertEqual(ORACLE.formes(entree), 'Rectangle (4.0x4.00) => Carre | Aire=16.00')

    def test_decimal_sans_zero_et_virgule_dans_nom(self):
        entree = 'NEW Article("A-7", "Cle, plate", .25)'
        attendu = ('Article("A-7", "Cle, plate", .25) => Chaine: ctor(r, nom, prix) | '
                   'Objet: [Ref=A-7, Nom=Cle, plate, Prix=0.25]')
        self.assertEqual(ORACLE.constructeurs(entree), attendu)

    def test_contraintes_legales_et_ordre_des_violations(self):
        entree = ('CONSTRAINT where T : class, IComparable, new()\n'
                  'Candidate Nom=Objet IsClass=True HasDefaultCtor=False ImplementsComparable=False')
        attendu = 'Type Objet: REJETE [Violation: pas de constructeur sans argument new(), n implemente pas IComparable]'
        self.assertEqual(ORACLE.contraintes(entree), attendu)
        with self.assertRaises(ValueError):
            ORACLE.contraintes(entree.replace('class, IComparable, new()', 'class, new(), IComparable'))
        with self.assertRaises(ValueError):
            ORACLE.contraintes(entree.replace('class, IComparable, new()', 'struct, new()'))

    def test_limite_explicite_de_collation(self):
        with self.assertRaises(ValueError):
            ORACLE.groupes_linq('Ada Étude 2')
        with self.assertRaises(ValueError):
            ORACLE.groupes_linq('Ada Amande 2\nBob Atlas 3')

    def test_evenements_dernier_abonnement_et_nom_exact(self):
        entree = ('SUBSCRIBE Ada\nSUBSCRIBE Anne\nSUBSCRIBE Ada\nUNSUBSCRIBE Ada\n'
                  'EMIT "premier"\nUNSUBSCRIBE Ad\nEMIT "second"')
        attendu = ('EVENT "premier" => Ada recoit la notification\nEVENT "premier" => Anne recoit la notification\n'
                   'EVENT "second" => Ada recoit la notification\nEVENT "second" => Anne recoit la notification')
        self.assertEqual(ORACLE.evenements(entree), attendu)

    def test_temps_sans_borne_int64(self):
        sortie = ORACLE.taches_sequentielles('TASK Debut Duree=9223372036854775807ms\nTASK Fin Duree=1ms')
        self.assertTrue(sortie.endswith('Duree totale=9223372036854775808ms'))

    def test_comparateur_et_non_evaluation(self):
        self.assertEqual(BANC.normaliser_sortie(' A  \r\n\n'), ' A  ')
        self.assertNotEqual(BANC.normaliser_sortie(' A '), BANC.normaliser_sortie(' A'))
        cellule = {'etat': 'a_comparer', 'stdout': 'valeur \n', 'stdout_sha256': 'sortie', 'stderr_sha256': 'erreur'}
        self.assertEqual(BANC.comparer(cellule, 'valeur')['etat'], 'sortie_incorrecte')
        self.assertEqual(BANC.comparer({'etat': 'non_evalue', 'execute': False}, 'x')['etat'], 'non_evalue')


class Nouveaute(unittest.TestCase):
    SOURCES = (
        'server/exercises/csharp.js',
        'server/exercises/grading-policy.js',
        'server/exercises/grading-evidence.json',
        'server/exercises/grading-runtime-evidence.json',
        'tests/csharp-lot1.test.js',
        'corrections/resultats/generalisation-lot1-partie2-complement.json',
        'corrections/outils/sondes/sondes-sept-restants.js',
        'corrections/outils/sondes/nouvelles-fixtures-suspendus/fixtures/csharp.json',
        'corrections/outils/sondes/generalisation/cas.json',
        'corrections/outils/sondes/generalisation/cas_csharp_lot1_partie3.json',
    )

    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory(prefix='csharp-garde-')
        self.snapshot = Path(self.temporary.name)
        for nom in self.SOURCES:
            cible = self.snapshot / nom
            cible.parent.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(ROOT / nom, cible)
        self.fixture_path = self.snapshot / 'corrections/outils/sondes/generalisation/cas_csharp_lot1_partie3.json'
        self.fixture_data = json.loads(self.fixture_path.read_text(encoding='utf8'))

    def tearDown(self):
        self.temporary.cleanup()

    def extraire(self):
        return subprocess.run(['node', str(PACKAGE / 'extraire_csharp_lot1_partie3.js'), str(self.snapshot)],
                              capture_output=True, text=True, timeout=30, check=False)

    def enregistrer(self):
        self.fixture_path.write_text(json.dumps(self.fixture_data, ensure_ascii=False), encoding='utf8')

    def test_fixtures_retenues_nouvelles(self):
        resultat = self.extraire()
        self.assertEqual(resultat.returncode, 0, resultat.stderr)
        donnees = json.loads(resultat.stdout)
        self.assertEqual(sum(preuve['valide'] for exercice in donnees['exercices'] for preuve in exercice['nouveaute']), 34)
        self.assertEqual(sum(sonde['nouveaute']['valide'] for exercice in donnees['exercices']
                             for sonde in exercice['sondes_conditionnelles']), 2)

    def test_ancien_temoignage_reformate_refuse(self):
        ancien = json.loads((self.snapshot / 'corrections/outils/sondes/nouvelles-fixtures-suspendus/fixtures/csharp.json')
                            .read_text(encoding='utf8'))['csb2-c1-e2']['stdin']
        self.fixture_data['exercices'][0]['cas'][0]['entree'] = ' \r\n' + ancien.replace('\n', '\r\n') + '\n'
        self.enregistrer()
        resultat = self.extraire()
        self.assertEqual(resultat.returncode, 0, resultat.stderr)
        preuve = json.loads(resultat.stdout)['exercices'][0]['nouveaute'][0]
        self.assertFalse(preuve['valide'])
        self.assertTrue(any(element['origine'] == 'fixture_partie2' for element in preuve['doublons']))

    def test_deux_nouveaux_cas_identiques_refuses(self):
        self.fixture_data['exercices'][0]['cas'][1]['entree'] = self.fixture_data['exercices'][0]['cas'][0]['entree']
        self.enregistrer()
        resultat = self.extraire()
        self.assertEqual(resultat.returncode, 0, resultat.stderr)
        preuves = json.loads(resultat.stdout)['exercices'][0]['nouveaute']
        self.assertFalse(preuves[0]['valide'])
        self.assertFalse(preuves[1]['valide'])

    def test_chaine_encodee_dans_sonde_precedente_refusee(self):
        entree = 'VALEUR_SONDE_ALPHA\nVALEUR_SONDE_BETA'
        self.fixture_data['exercices'][0]['cas'][0]['entree'] = entree
        self.enregistrer()
        sonde = self.snapshot / 'corrections/outils/sondes/sondes-sept-restants.js'
        with sonde.open('a', encoding='utf8') as flux:
            flux.write('\nconst exempleSupplementaire = ' + json.dumps(entree) + ';\n')
        resultat = self.extraire()
        self.assertEqual(resultat.returncode, 0, resultat.stderr)
        preuve = json.loads(resultat.stdout)['exercices'][0]['nouveaute'][0]
        self.assertFalse(preuve['valide'])
        self.assertIn('sonde', preuve['entree_integrale_dans_sources'])

    def test_profil_historique_modifie_invalide_lextraction(self):
        ancien_test = self.snapshot / 'tests/csharp-lot1.test.js'
        with ancien_test.open('a', encoding='utf8') as flux:
            flux.write('\nvoid 0;\n')
        resultat = self.extraire()
        self.assertNotEqual(resultat.returncode, 0)
        self.assertIn('Profil des tests historiques modifié', resultat.stderr)


if __name__ == '__main__':
    unittest.main(verbosity=2)
