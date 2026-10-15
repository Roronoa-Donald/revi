#include <stdio.h>
#include <stdlib.h>

int main()
{
    int n,n1,i;
    printf("Bienvenue dans la table de multication\n\n");

    printf("Veuillez entrer le nombre : \n\n");
    scanf("%d",&n1);

    printf("Jusqu'a combien voulez-vous vous arretez\n\n");
    scanf("%d",&n);

    for(int i=1;i<=n;i++)
    {

        printf("La multiplication : %d x %d = %d\n\n", n1,i,n1 * i);
    }

    return 0;
}
