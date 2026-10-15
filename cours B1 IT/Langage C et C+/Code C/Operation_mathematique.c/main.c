#include <stdio.h>
#include <stdlib.h>

int main()
{
    int A,B;
    int choix;
    do
    {
        printf("Bienvenue dans le menu!\n\n");
        printf(" 1. Additioin\n");
        printf(" 2. Soustraction\n");
        printf(" 3. Multiplication\n");
        printf(" 4. Division\n");
        printf(" 5. Quitter\n\n");
        printf("Veuillez choisir entre (1-5)\n\n");

        if(scanf("%d", &choix) != 1)
        {
            printf("ERREUR : veuillez faire un choix unique!, reessayer.\n\n");
        }
        switch(choix)
        {
            case 1:
            case 2:
            case 3:
            case 4:

            printf("Veuillez saisir le premier nombre : \n\n");
            scanf("%d", &A);

            printf("Veuillez saisir le deuxieme nombre : \n\n");
            scanf("%d", &B);

            if (choix == 1)
            {
                printf(" La somme : %d + %d = %d\n\n", A, B, A + B);

            }else if (choix == 2){

                printf(" La difference : %d - %d = %d\n\n", A, B, A - B);

            }else if (choix == 3){

                printf(" Le produit : %d * %d = %d\n\n", A, B, A * B);

            }else if(choix == 4){
                if(B != 0)
                {
                    printf("Le quotient : %d / %d = %.2f\n\n", A, B, (float)A / B);
                }else{
                    printf("ERREUR : Division par zero impossible!");
                }
            }
            break;

            case 5:

                printf("Merci, Bye bye!\n\n");

            break;
            default:

                printf("ERREUR, votre requete n'est pas possible!\n\n");

            break;
        }
    }while (choix != 5);
    return 0;
}
