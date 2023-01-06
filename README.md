# Around the U.S. Back End

## Directories

`/data` — JSON files to temporarily emulate database integration.

`/routes` — routing files.

All other directories are optional and may be created by the developer if necessary.

## Running the Project

`npm run start` — to launch the server.

`npm run dev` — to launch the server with the hot reload feature.

Proyecto realizado para el bootcamp Practicum de Yandex. Este proyecto es del sprint 12 y 13, iniciación a Node.js y a mongoDB.
Se utiliza el framework Express.js para desarrollar una API de un servicio de la red social trabajada en sprints anteriores: Around the U.S.
Se usa mongoose para generar un vínculo con una base de datos construida con mongoDB.

Se puede acceder a las siguientes rutas con sus respectivas HTTP requests:

GET /users - regresa un JSON con un array con diferentes usuarios.

GET /users/:userId - regresa un JSON con info de un usuario específico.

POST /users - toma en el body de request un JSON con un campo "name" que lleva el nombre del usuario y un campo "about" que lleva información de éste, ambos requeridos, de entre 2 y 30 caracteres, para generar un nuevo usuario.

PATCH /users/me - toma en el body de request un JSON con un campo "name" que lleva el nombre del usuario y un campo "about" que lleva información de éste, ambos requeridos, de entre 2 y 30 caracteres, para cambiar el usuario actual.

GET /cards - regresa un JSON con un array con varias cartas.

POST /cards - toma en el body de request un JSON con un campo "name" que lleva el nombre de la tarjeta y un campo "link" que lleva un link a una imagen, ambos requeridos. Con esta data genera una nueva tarjeta.

DELETE /cards/:cardId - elimina una tarjeta a partir de la ID insertada.

PUT /cards/:cardId/likes - agrega el usuario actual a un array de likes dentro de la tarjeta definida por el ID.

DELETE /cards/:cardID/likes - elimina el usuario actual a un array de likes dentro de la tarjeta definida por el ID.

Existe manejo de errores en las diferentes rutas y requests.

El usuario actual está hardcoded, próximamente se modificara esto.
