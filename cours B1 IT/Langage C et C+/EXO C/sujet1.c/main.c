#include <stdio.h>
#include <stdlib.h>

int main()
{
    printf("Bienvenue dans le programme de calcule de moyenne!\n\n");
    int n,sum,note;
    float moyenne;

    printf("Combien de notes voulez-vous entrer ?\n\n ");
    scanf("%d",&n);


    for(int i=1;i<=n;i++){
        printf("Veuillez entrer les notes\n\n");
        scanf("%d",&note);
        i= note + note;
        sum = i + i ;
        scanf("%d",&note);

        moyenne = sum / n;
        scanf("%f",&moyenne);

        printf("La moyenne est : %.2f\n\n", (float)moyenne);

    }

    return 0;
}
