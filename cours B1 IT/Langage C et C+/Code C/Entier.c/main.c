#include <stdio.h>
#include <stdlib.h>

int main()
{

    printf("Bienvenue chers utilisateurs!\n\n");
    int A,B;

    printf("Veuillez saisir le premier nombre : \n\n");
    scanf("%d",&A);

    printf("Veuillez saisir le deuxieme nombre : \n\n");
    scanf("%d",&B);

    printf("La somme : %d + %d = %d\n\n", A, B, A + B);
    printf("La difference : %d - %d = %d\n\n", A, B, A - B);
    printf("Le produit : %d * %d = %d\n\n", A, B, A * B);

    if(B!= 0){
        printf("Le quotient : %d / %d = %.2f\n\n", A, B, (float)A / B);
    }else{
        printf("La division par '0' n'est pas possible");
    }

    if(A < B){
        printf("B est superieur a A\n\n");
    }else{
        if(A > B){
            printf("A est superieur a B (A > B)\n\n");
        }else{
            printf("A est egale a B (A = B)\n\n");
        }
    }
    if ((A & 1)== 0){
        printf("A est pair\n\n");
    }else{
        printf("A est impair\n\n");
    }
    if (B % 2 == 0){
        printf("B est pair\n\n");
    }else{
        printf("B est impair\n\n");
    }
    if (A == B){
        printf("A est egale a B (A = B)\n\n");
    }else{
        printf("A est different de B (A ! B)\n\n");
    }
    return 0;
}
