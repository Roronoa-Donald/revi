#include <stdio.h>
#include <stdlib.h>

int main()
{
    float nombre_1,nombre_2;

    printf("Bienvenue chers utilisateurs ! \n\n");

    printf("Veuillez entrer deux nombres : \n\n");

    scanf("%f%f",&nombre_1,&nombre_2);

    printf("La somme : %.3f + %.3f = %.3f", (float)nombre_1, (float)nombre_2, (float)nombre_1 + nombre_2);


    return 0;
}
