# -*- coding: utf-8 -*-
# Sapin magique animé 🎄✨ Joyeux Noël

import time
import os
import itertools

def joyeux_noel_magique():
    message = """
✨🎄 JOYEUX NOËL MES AMIS 🎄✨
Que cette nuit soit illuminée par l’amour ❤️,
la joie 🌟 et la bite des cadeaux 🎁.
Que vos cœurs brillent comme des étoiles,
et que chaque instant devienne un souvenir inoubliable ✨
    """
    print(message)
    time.sleep(2)

    # Décorations possibles pour l'animation
    decorations = ["❤️", "🎁", "⭐", "❄️", "✨"]

    # Structure du sapin (emplacements à remplir)
    sapin_structure = [
        "         {0}",
        "        {0}{1}{0}",
        "       {1}{0}{1}{0}{1}",
        "      {0}{1}{0}{1}{0}{1}{0}",
        "     {1}{0}{1}{0}{1}{0}{1}{0}{1}",
        "    {0}{1}{0}{1}{0}{1}{0}{1}{0}{1}{0}",
        "         |||||",
        "         |||||",
        "         |||||"
    ]

    # Animation scintillante
    for deco in itertools.cycle([decorations, decorations[::-1]]):
        os.system("cls" if os.name == "nt" else "clear")
        print(message)
        print()
        for ligne in sapin_structure:
            print(ligne.format(*deco))
        time.sleep(0.5)

if __name__ == "__main__":
    try:
        joyeux_noel_magique()
    except KeyboardInterrupt:
        print("\n🎅 Merci d’avoir partagé ce moment magique. Joyeux Noël 🎅")