#include <stdio.h>
#include <stdlib.h>

int main()
{
    printf("Bienvenue dans le terminal!\n\n");
    int A,B;

    printf("Veuillez saisir le premier nombre!\n\n");
    scanf("%d", &A);

    printf("Veuillez saisir le deuxieme nombre!\n\n");
    scanf("%d", &B);

    printf("L'Addition : %d + %d = %d\n\n", A, B, A + B);
    printf("La Soustration : %d - %d = %d\n\n", A, B, A - B);
    printf(" La Multiplication : %d * %d = %d\n\n", A, B, A * B);

    if(B!=0){
    printf("La division: %d / %d = %.2f\n\n", A, B, (float)A / B);
    printf("Le modulo: %d %% %d = %d\n\n", A, B, A % B);

    }else{

    printf("La division et le modulo par 0 (B = 0) ne sont pas possible!");
    }
   return 0;
}
