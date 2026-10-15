#include <stdio.h>
#include <stdlib.h>

int main()
{
    printf("Bienvenue dans le programme\n\n");
    int n;

    printf("Combien de nombres souhaitez-vous entrer ?\n\n");
    scanf("%d", &n);

    int nombre, max;

    printf("Veuillez entrer les nombres : \n\n");

    for (int i = 0; i < n; i++) {
        scanf("%d", &nombre);

        if (i == 0) {
            max = nombre;
        } else {
            if (nombre > max) {
                max = nombre;
            }
        }
    }

    printf("Le plus grand nombre est : %d\n\n", max);

    return 0;
}

