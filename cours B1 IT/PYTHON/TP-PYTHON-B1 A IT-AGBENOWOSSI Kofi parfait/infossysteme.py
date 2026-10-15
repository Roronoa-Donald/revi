#Demande du nom utilisateur
nom_utilisateur = input("Entrez votre nom : ")

# Demande de la version du système d'exploitation
versionos = input("Entrez la version de votre OS (ex: Windows 11, Ubuntu 22.04) : ")

# Bloc principal
if __name__ == "__main__":
    print(f"\nBienvenue {nom_utilisateur} !")
    print(f"Vous avez indiqué que votre système est : {versionos}")
    print("Fin du script. Merci d'avoir utilisé ce programme.")