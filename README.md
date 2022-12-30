# Around the U.S. Back End

## Directories

`/data` — JSON files to temporarily emulate database integration.

`/routes` — routing files.

All other directories are optional and may be created by the developer if necessary.

## Running the Project

`npm run start` — to launch the server.

`npm run dev` — to launch the server with the hot reload feature.

Proyecto realizado para el bootcamp Practicum de Yandex. Este proyecto es del sprint 12, iniciación a Node.js.
Se utiliza el framework Express.js para desarrollar una API de un servicio de la red social trabajada en sprints anteriores: Around the U.S.

Se puede acceder a las siguientes rutas:
/users - regresa un JSON con un array con diferentes usuarios.
/users/:id - si se ingresa un id correcto regresará un JSON con este id, si es incorrecto se anunciará que este usuario no existe.
/cards - regresa un JSON con un array con varias cartas.

Si se ingresa alguna otra ruta, regresará un error.
