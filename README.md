# Conecta 4

Misión M1 · El Despertar del DOM — Web Development I.

## Cómo probarlo

Abre el index.html en el navegador o con Live Server. Pulsa cualquier casilla para colocar una ficha en esa columna.

## Uso de IA

Usé Github Copilot como ayuda de programación, fase a fase.
Ejemplo de prompt: "Voy a construir un conecta 4 con HTML, CSS y JavaScript puro, sin
frameworks ni librerías. Antes de escribir código: propón 4 o 5 fases pequeñas para construirlo, cada una
con algo visible funcionando al terminarla, y dime qué estado necesito guardar en JavaScript y por qué."
La IA verifico que funcionase todo el tablero bien, y luego yo lo comprobe haciendo casos límite.

## Autopsia

1. Decidi crear una clase para toda la cuadricula y luego hacer un array de todos ellos en vez de crear un id para cada uno de ellos y hacer la logica de moverse.