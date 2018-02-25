# Ayuda para Concursos en Instagram

Extensión de Chrome que te ayuda a realizar concursos en Instagram donde eliges aleatoriamente a un ganador entre todos los que comentaron en una publicación o todos los que le hicieron "like".

Autor: Tomás Girardi - https://linkedin.com/in/tomasgirardi - de Turbomarket - https://www.turbomarket.cl/

## Para usar:

Recomendación: ver este video explicativo -> https://youtu.be/EkQ2hw8vYOg

1. Ingresa a tu cuenta de instagram, usando chrome (por ejemplo: https://instagram.com/kafibody/)
2. Busca la publicación (foto o video de tu feed) sobre la que quieres hacer el concurso
3. Haz click sobre la publicación y, cuando haya cargado, RECARGA la página, para asegurarte de que la extensión cargue correctamente
4. Fíjate si en la esquina superior izquierda si aparece un pequeño rectángulo que dice "Contest Helper". Haz click en él para desplegar todas las opciones de la extensión.
5. Haz click sobre el botón "Likes" o "Comments", dependiendo de si quieres hacer un concurso entre quienes hicieron like o quienes dejaron un comentario
6. Deja abierta la pestaña por varios minutos, para que cargue todos los likes o comentarios automáticamente. Nota: PUEDE DEMORAR VARIAS MINUTOS si son muchos comentarios o likes. Debe ser así para evitar que instagram te bloquee y no permita que continues cargando.
7. Una vez que termine, te mostrará la cantidad de participantes y habrá numerado todos los likes o comentarios.
8. Elige un número aleatorio entre el 1 y el último número de participante, para elegir al ganador (Nota: el 1 debería corresponder a tu cuenta. Si quieres lo ignoras y eliges un número desde el 2 en adelante. O, si es elegido ganador, lo "hechas al agua" y vuelves a solicitar un nuevo número aleatorio).

He incluido un botón con un enlace a Random.org. Sitio que puede ayudarte a hacer la selección del número aleatorio.

## Consideraciones importantes y errores conocidos:

1. Esta extensión utiliza técnicas de WEBSCRAPPING y puede dejar de funcionar SI INSTAGRAM CAMBIA SU INTERFAZ WEB. En futuras versiones incluiré algunas opciones para poder resolver este problema si se llega a producir.
2. Para mejorar las posibilidades de éxito al cargar todos los comentarios o likes, es recomendable dejar tranquilo tu computador, cargando todos los items (es decir, es mejor que no lo uses mientras corre la carga). También trata de garantizar que no se vaya a quedar sin conexión a internet. Producto de como funciona la interfaz web de instagram, no es posible reiniciar el proceso ante ciertos tipos de falla de red (intenta conectar el computador a una red de internet estable y configúralo para evitar que hiberne o se apague por el hecho de no estar operando con él).
3. Existe una falla que todavía no logro resolver: al elegir la opción "LIKES", la extensión seguirá funcionando correctamente, pero dejarán de funcionar los botones. Estoy intentando arreglarlo. Cualquier ayuda será bien recibida :-D

## Para Desarrolladores:

### Construcción

```
npm run build
```

### Creación de archivo

```
npm run crx
```

## Licencia (en inglés)

> Copyright (c) 2018, Tomás Girardi <tgirardi@turbomarket.cl>
>
> Permission to use, copy, modify, and/or distribute this software for any
> purpose with or without fee is hereby granted, provided that the above
> copyright notice and this permission notice appear in all copies.
>
> THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
> WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
> MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
> ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
> WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
> ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
> OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
