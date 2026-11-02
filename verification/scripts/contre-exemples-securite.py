import hashlib
import json
import shutil
import subprocess


message = b'ABC'
key = b'\x00' * len(message)
ciphertext = bytes(clear ^ secret for clear, secret in zip(message, key))

modulus = 3233
private_exponent = 2753
public_exponent = 17
seen = {}
collision = None
for index in range(1000):
    candidate = f'message-exemple-{index}'.encode()
    digest = int.from_bytes(hashlib.sha256(candidate).digest(), 'big') % modulus
    if digest in seen:
        collision = (seen[digest], index, digest)
        break
    seen[digest] = index
assert collision is not None
signature = pow(collision[2], private_exponent, modulus)
verified = pow(signature, public_exponent, modulus) == collision[2]

original = b'montant=10'
modified = b'montant=1000'
original_hash = hashlib.sha256(original).hexdigest()
modified_hash = hashlib.sha256(modified).hexdigest()

packet_port = 443
specified_port = 53
input_matches = packet_port == specified_port
generated_nft_matches = True
translator = shutil.which('iptables-translate')
translation = {'disponible': bool(translator)}
if translator:
    commands = {
        'sans_protocole': [translator, '-A', 'INPUT', '--dport', '53', '-j', 'DROP'],
        'avec_udp': [translator, '-A', 'INPUT', '-p', 'udp', '--dport', '53', '-j', 'DROP'],
    }
    for label, command in commands.items():
        completed = subprocess.run(command, capture_output=True, text=True, timeout=5, check=False)
        translation[label] = {'code_retour': completed.returncode, 'sortie': completed.stdout.strip(), 'erreur': completed.stderr.strip()}
    assert translation['sans_protocole']['code_retour'] != 0 and translation['avec_udp']['code_retour'] == 0

result = {
    'otp_longueur_sans_aleatoire': {
        'longueur_cle_egale_au_message': len(key) == len(message),
        'cle_zero_donne_chiffre_identique_au_clair': ciphertext == message,
        'limite': 'clé synthétique déterministe ; aucune propriété de hasard ne découle de la longueur',
    },
    'signature_rsa_modele_tres_petit_modulo': {
        'messages_synthetiques_distincts': collision[0] != collision[1],
        'indices_messages': [collision[0], collision[1]],
        'condensat_reduit_commun': collision[2],
        'une_signature_valide_pour_les_deux': verified,
        'limite': 'contre-exemple du jouet pédagogique, pas une attaque sur RSA-PSS avec paramètres réels',
    },
    'hachage_sans_reference_authentifiee': {
        'message_modifie': original != modified,
        'empreintes_differentes': original_hash != modified_hash,
        'controle_passe_si_message_et_reference_sont_remplaces': hashlib.sha256(modified).hexdigest() == modified_hash,
    },
    'conversion_regle_port_sans_protocole': {
        'port_demande': specified_port,
        'port_paquet_synthetique_tcp': packet_port,
        'paquet_concerne_par_le_port_demande': input_matches,
        'paquet_concerne_si_filtre_de_port_omis': generated_nft_matches,
        'traduction_sans_application_de_regle': translation,
        'limite': 'évaluation logique des clauses prescrites, aucune règle pare-feu appliquée',
    },
}
assert ciphertext == message and verified and original_hash != modified_hash
assert not input_matches and generated_nft_matches
print(json.dumps(result, ensure_ascii=False, indent=2))
