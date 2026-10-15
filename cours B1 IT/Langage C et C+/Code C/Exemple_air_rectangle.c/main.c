#include <stdio.h>
#include <stdlib.h>

int main()
{
    printf("Welcome to my domain extention\n\n");
    int longueur,largeur,aire;

    printf("Veuillez saisir la Longueur : \n\n");
    scanf("%d",&longueur);

    printf("Veuillez saisir la Largeur : \n\n");
    scanf("%d",&largeur);

    aire = longueur * largeur;

    printf("L'aire : %d * %d = %d\n\n", longueur, largeur, aire);
    return 0;
}
