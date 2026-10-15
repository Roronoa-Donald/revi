#include <stdio.h>
#include <stdlib.h>
#include <stdio.h>

int main() {
    int n;
    int fact = 1;

    printf("Veuillez saisir un entier positif : \n");
    scanf("%d", &n);

    if (n >= 0) {
        for (int i = 1; i <= n; i++) {
            fact = fact * i;
        }
        printf("La factorielle de %d est : %lld\n", n, fact);
    } else {
        printf("Veuillez saisir un nombre positif.\n");
    }

    return 0;
}
