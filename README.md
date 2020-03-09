# Prueba Backend Resolve Studio

El proyecto se publico en heroku https://backend-resolvestudio.herokuapp.com/; debido al limite que tiene para la respuesta de 30s no resulve el calculo skmeans, requeriria ampliar la capacidad de la instancia. Tambien se creo incompatilidad del codigo al utilizar babel, eslint y prettier.

Por todo lo anterior lo publique en un equipo personal, con el dominio http://backendresolvestudio.tk.

La base de datos se publico en MongoDB Atlas, con lo cual para ejecutar el proyecto solo debe clonarlo y ejecutar:

La version de node utilizada fue la v12.9.1 y npm v6.10.2
npm install
npm start

En el Home encontramos dos opciones:

Datos cargados: Consulta y nos lista los registros cargados a la base, correspondiente a la informacion suministrada en el archivo train_data.csv, a traves de la ruta get /trains.

Login: nos lleva a un formulario de logueo, se creo un usuario test con contraseña test, el cual al loguearse nos lleva a la ruta para realizar la clasificacion; en el textarea esta precargado el contenido de inputTestData, el cual se pasa a la ruta post /train.

La validacion de acceso se realizo utilizando sesiones de express y cookies.
# prueba-backend-resolve-studio
