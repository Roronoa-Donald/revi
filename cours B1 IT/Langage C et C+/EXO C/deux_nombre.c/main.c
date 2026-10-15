#include <stdio.h>
#include <stdlib.h>

int main()
{
    int A,B;
    printf("Bienvenue dans le programme de Parfait !\n\n");


    printf("Veuillez saisir deux nombres\n\n");
    scanf("%d%d",&A,&B);

    //Opérations arithmétiques

    printf("\n\nLa somme : %d + %d = %d\n\n", A, B, A + B);
    printf("La difference : %d - %d = %d\n\n", A, B, A - B);
    printf("Le produit : %d * %d = %d\n\n", A, B, A * B);

    if(B!=0){
        printf("Le quotient : %d / %d = %.3f\n\n", A, B, (float)A / B);
        printf("Le modulo : %d %% %d = %d\n\n", A, B, A % B);
    }else{
        printf("ERREUR!!! La divison par zero n'est pas possible.\n\n");
    }
    //Comparaison des deux nombres

    if(A > B){
        printf("A est superieur a B.\n\n");
    }else if(A < B){
        printf("A est inferieur a B.\n\n");
    }else{
        printf("A est egale a B.\n\n");
    }
    //   Vérification de la parité

    if((A % 2 == 0)&&(B % 2 == 0)){
        printf("A et B sont pairs.\n\n");

    }else if ((A % 2 != 0)&&(B % 2 == 0)){
        printf("A est impair et B est pair.\n\n");


    }else if ((A % 2 == 0)&&(B % 2 != 0)){
        printf("A est pair  et B est impair.\n\n");

    }else{
        printf("A et B sont impairs.\n\n");

    }

    return 0;
}
