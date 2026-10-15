#include <stdio.h>
#include <stdlib.h>

int main()
{
    int num;
    printf("Veuillez entrer un numero : \n\n");
    scanf("%d",&num);

     if(num >= 1 && num <=12)
    {
        if(num == 12 || num == 1 || num == 2)
        {
            printf("\n\nNous somme en : HIVER\n\n");

        }else if

                (num == 6 || num == 7 || num == 8){

                    printf("\n\nNous somme en : ETE\n\n");

                }else if

                    (num == 9 || num == 10 || num == 11){

                        printf("\n\nNous somme en : AUTOMNE\n\n");

                }

    }else{

        printf("\n\nNUMERO INVALIDE! Veuillez entrer un numero entre 1 et 12.\n\n");

    }
    return 0;
}
