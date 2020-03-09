# Prueba Backend Resolve Studio

El proyecto se publico en heroku https://floating-reef-35097.herokuapp.com/; debido al limite que tiene para la respuesta de 30s no resuelve el calculo skmeans, requeriria ampliar la capacidad de la instancia.

Por lo que lo publique tambien en azure con el dominio https://prueba-backend-resolve-studio.azurewebsites.net

La version de node utilizada fue la v12.9.1 y npm v6.10.2
La base de datos se publico en MongoDB Atlas, con lo cual para ejecutar el proyecto solo debe clonarlo y ejecutar:
npm install
npm start

En local, publicarlo requiere mas trabajo sin un sistema de Integracion continua.

La api cuenta con 5 rutas habilitadas:
La primera ruta permite crear un nuevo usuario que podra loguearse y obtener un token para acceder a las rutas protegidas.
Esta ruta responde al metodo post y requiere que se le pase email y password, por medio del "body" como parametros urlencoded.
https://prueba-backend-resolve-studio.azurewebsites.net/signup

La segunda ruta permite loguearse y obtener un token para acceder a las rutas protegidas.
Esta ruta responde al metodo post y requiere que se le pase email y password, por medio del query params.
https://prueba-backend-resolve-studio.azurewebsites.net/signin?email=matias6@prueba.com&password=prueba

Las tres rutas siguientes son protegidas, reciben un token el cual si se utiliza la ruta paramtoken/<ruta_protegida> recibe el token como un query params con el nombre que se haya especificado en las configuraciones .env; si se utiliza la ruta bearertoken/<ruta_protegida> recibe el token a traves de las cabeceras del tipo Bearer Token; el proyecto qudo estructurado de forma que se pueden adicionar mas estrategias de validacion, no adicione otras por dificultades para publicar el proyecto y que corriera sin errores, debido a la utilizacion de codificacion es6 la cual al tener que ser transpilada no corria de forma adecuada al publicarlo; razon por la cual me vi en la obligacion de publicar los proyectos ya transpilados y corregido los errores.

La tercera ruta trae la informacion del usuario logueado, no requiere parametros adicionales ya que utiliza el token para identificar el usuario y consultar sus datos. Esta ruta responde al metodo get
https://prueba-backend-resolve-studio.azurewebsites.net/paramtoken/profile?secret_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVlNjYxMjMxNDYzYTQxMDA0NDEwYWNjMyIsImVtYWlsIjoibWF0aWFzNkBwcnVlYmEuY29tIn0sImlhdCI6MTU4Mzc0NzY4NH0.rGsV64fSFLm1GfzSjuD7O9a1byCsBFMVYE9DM9rajQc

La cuarta ruta es para verificar que se cargaron todos las datos suministrados en el archivo train_data.csv y se pueden tomar muestras adicionales para realizar la clasificacion, solo requiere el token y se puede ejecutar por la ruta padre paramtoken o bearertoken segun como se decee o necesite pasar el token. Esta ruta responde al metodo get
https://prueba-backend-resolve-studio.azurewebsites.net/bearertoken/trains

La ultima ruta corresponde a la ruta de clasificacion. Esta ruta responde al metodo post y requiere que se le pase inputTestData, por medio del "body" como parametros urlencoded, el cual sera un texto con el contenido de la variable inputTestData suministrada o cualquier dato adicional de prueba.
https://prueba-backend-resolve-studio.azurewebsites.net/bearertoken/train

Solo la ruta de clasificacion no responde en heroku.

No se subieron los servicios a google cloud, debido a que la cuenta que tengo activa ya supero el periodo de prueba y consumio todos los creditos al tener dos proyectos publicados por mas de 2 años.

Nota: En la carpeta postman-collection esta la coleccion de todas las rutas para ser probadas en postman.
