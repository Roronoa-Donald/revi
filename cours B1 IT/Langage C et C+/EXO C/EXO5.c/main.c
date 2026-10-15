#include <stdio.h>
#include <stdlib.h>

int main()
{
    printf("bienvenue chers utilisateur!");
    int A,B;

    printf("veuillez saisir deux nombres : \n\n");
    scanf("%d%d",&A,&B);

    //Opérations arithmétiques

    printf("La somme : %d + %d = %d\n\n", A, B, A + B);
    printf("La difference : %d - %d = %d\n\n", A, B, A - B);
    printf("Le produit : %d * %d = %d\n\n", A, B, A * B);

    if (B!=0){

        printf("Le quotient : %d / %d = %.3f\n\n", A, B, (float)A / B);
        printf("Le modulo : %d %% %d = %d\n\n", A, B, A % B);
    }else{
        printf("ERREUR!!! La division par zero n'est pas possible.");
    }

    //Comparaison
    return 0;
}
