#include <stdio.h>

int main(){

    int num1, num2, res;

    printf("Ingrese el primer valor: ");
    scanf("%d", &num1);
    printf("Ingrese el segundo valor: ");
    scanf("%d", &num2);
    res = num1 + num2;
    printf("El resuldato es: %d", res);
    return 0;
}