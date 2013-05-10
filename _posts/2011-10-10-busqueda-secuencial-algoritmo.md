---
layout: post
title: Búsqueda Secuencial (algoritmo, explicación e implementación genérica)
image: Muestra de la eficiencia de la búsqueda secuencial
categories: [Programación]
tags: [Destino... C, Destino... Pro, Ordenación y Búsqueda]
---

## Datos

 - Eficiencia lineal.
 - Examina los elementos de uno en uno
 - El conjunto de datos no tiene por qué estar ordenado
 - Es adecuada sólo para conjuntos de datos pequeños
 - Si el elemento no pertenece al conjunto, éste se recorre entero

## Algoritmo

    {% highlight c %}
    Funcion busqueda_Secuencial (x:Telemento; A:Tconjunto; tam:Entero): Entero
    Variables
         i: Entero
    Inicio
         i<-1
         Mientras (i<=tam) hacer
              Si A[i]==x Entonces
                   Devolver i
              Si_No
                   i<-i+1
              Fin_si
         Fin_Mientras
         Devolver -1
    Fin
    {% endhighlight %}

## Implementación en C (enteros)

    {% highlight c %}
    /**
     * @brief Funcion de búsqueda secuencial genérica
     * @param a Elemento a buscar
     * @param vector Vector de elementos donde buscar
     * @param tamv Número de elementos del vector
     * @return Devuelve la posición del elemento si lo encuentra, -1 si no.
     */
    int busqueda_Secuencial(int a, int *vector, int tamv){
        int i;  //< Variable contador

        for(i=0;i<tamv;i++)
            if(vector[i]==a)
                return i;
        return -1;
    }
    {% endhighlight %}

## Implementación en C (genérico)

    {% highlight c %}
    /**
     * @brief Funcion de búsqueda secuencial genérica
     * @param a Elemento a buscar
     * @param vector Vector de elementos donde buscar
     * @param tama Tamaño de los elementos del vector
     * @param tamv Número de elementos del vector
     * @param fcomp Función de comparación de los elementos
     * @return Devuelve la posición del elemento si lo encuentra, -1 si no.
     */
    int busqueda_Secuencial(const void *a, const void *vector, int tama, int tamv, int (*fcomp) (const void *a, const void *b)){
        int i;  //< Variable contador

        for(i=0;i<tamv;i++)
            if(fcomp(a,vector+(i*tama))==0)
                return i;

        return -1;
    }
    {% endhighlight %}
