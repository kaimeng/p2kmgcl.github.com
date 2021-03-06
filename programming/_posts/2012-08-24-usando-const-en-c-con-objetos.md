---
layout: post
title: Usando const en C++ con objetos
image: Logo de C++ con una función que devuelve una referencia constante
tags: [Análisis, C, C++, Const, Programación]
---

Hace una semana y pico [David](https://plus.google.com/u/0/112373452810480328056/) me comentó que había estado debatiendo con [Soraya](https://plus.google.com/u/0/110730426033836231511/) el uso que tenía el **const** dentro de c++, y si realmente funcionaría bien con objetos en lugar de tipos simples. Para los que no lo sepáis, en el lenguaje c++ y en c los objetos por defecto se "pasan" por copia, es decir, cuando ponemos como parámetro de una función una variable, la función usará una copia de ésta y no la original, dejando a la primera intacta.
Como he dicho, este comportamiento es solo por defecto y podemos alterarlo usando punteros (una variable que sólo guarda una dirección de memoria, lo cual ocupa bastante menos espacio que la mayoría de los objetos), o, en c++, una referencia, que nos es más que indicar que la variable que queremos proporcionar es la original y no una copia. Como podéis imaginar, estos dos métodos **son mucho más eficientes que el paso por copia**, en el sentido de que cuesta mucho menos computacionalmente hablando copiar una dirección de memoria o usar el mismo objeto que generar uno nuevo similar.

## Usando el const

En este punto es donde entra el uso de const, esta palabra usada junto a una variable **impide que sea modificada a lo largo del código**, pudiendo pasar esta variable mediante un puntero a ella o por referencia pero con la seguridad de que no será modificada. Un ejemplo:

    function ordenaVector (int* v, const int& tam) {
        // Intentamos modificar la variable tam
        tam = 20;
    }

En este código el cometido de la variable tam es proporcionarnos el número de elementos que se guardan en el vector v, por ello no tendría sentido modificar la variable. Al usar const se nos asegura que la variable no será modificada, de hecho, sin intentamos compilar el código anterior el propio compilador nos dirá que no podemos modificar una variable constante y abortará la ejecución.

## Const y objetos como parámetros

Y en este punto es donde surge la pregunta: ¿cómo se comporta un objeto constante cuando llamamos a sus métodos? Pues bien, la respuesta es sencilla y compleja a la vez: el compilador se comporta de una forma bastante inteligente en estos casos, ya que sólo nos impedirá llamar a los métodos de un objeto constante si éstos son modificadores, es decir, si alteran el contenido de los atributos del objeto. De esta forma, en el siguiente objeto:

    class Pelota {
    public:
        Pelota(): tam(10) {};
        void setTam(int tam) { this->tam = tam; };
        int getTam() { return this->tam; };
    private:
        int tam;
    };
     
    int main () {
        const Pelota p1;
        return 0;
    }

Se nos permitirá llamar al método `getTam()` de `p1`, pero no al método `setTam()`, ya que éste último modifica el valor del atributo `tam`.

## Conclusión

Seguramente alguno habrá pensado que el uso de const es opcional ya que podemos usar punteros y referencias y esperando que los métodos llamados no modifiquen el valor de las variables, pero es una forma más de añadir consistencia a nuestro código eliminando algunas posibles fugas que nos pueden provocar un quebradero de cabeza.
