# Introduccion a NodeJS, CRUD; TDD; creacion y consulta de API y API RESTful.
<hr>
<h3>Modulo 4 Introduccion a NodeJS, consiste en 10 Desafios(2 por seccion) y 1 prueba de Modulo.</h3>
<h4>Orientado completamente a masterizar la creacion de un servidor CRUD, consumo de APIs y creacion de API Restful haciendo uso de una de base de datos para la preservacion de la data.</h4>
<hr>
<h5>■ SECCION 1: INTRODUCCION A NODE</h5>
<p><i>Introduce el termino CRUD y la utilizacion de modulos nativos de node creando un servidor con HTTP, haciendo un CRUD con fileSystem, consumo de APIs, verbos de consulta HTTP y lectura de html para el front del sitio.</i></p>
    <h4>» DESAFIO Cotiza con BlueMoney «</h4>
      <p>Se construye una aplicación en Node que reciba los datos para la cotización por la línea
      de comandos, como argumentos y consulte la API "mindicador" para los cálculos
      correspondientes.</p>
      <ul>
        <li>Debe recibir comandos por linea de comandos desde un archivo externo.</li>
        <li>Fecha debe ser dinamica.</li>
      </ul>
se debe conseguir este resultado en un archivo .txt de preferencia.

![image](https://user-images.githubusercontent.com/40929118/152690180-584d2c21-49b7-4263-bb98-3cc5d170495a.png)

<h4>» DESAFIO Servidores Welcome World «</h4>
      <p>Se crea un servidor en Node que permite crear, leer, renombrar y eliminar archivos
        alojados en el servidor por medio de las rutas correspondientes.
        Se envian los datos como parámetros en una consulta GET por medio de formularios
        HTML.
      </p>
      <ul>
        <li>Se recibe un HTML listo para ser usado, el cual contiene consultas GET al servidor local y se debe disponibilizar la ruta</li>
      </ul>
      
![image](https://user-images.githubusercontent.com/40929118/152690933-8d7ff10a-2866-4fe1-aa55-d2e83c8f35e5.png)
```      
  <!-- Renombrar -->
  <div class="col-12 col-sm-3 contaienr p-5">
    <h3>Renombrar un archivo</h3>
    <form action="http://localhost:8080/renombrar">
      <div class="form-group">
        Nombre del archivo
        <input name="nombre" class="form-control" id="archivo" />
      </div>
      <div class="form-group">
        Nuevo nombre del archivo
        <input name="nuevoNombre" class="form-control" id="archivo" />
      </div>  
```
<hr>
<h5>■ SECCION 2: NODE Y EL GESTOR DE PAQUETES NPM</h5>
<p><i>Se introduce el termino NPM (Node Package Management) y se comienza a utilizar para importar modulos externos para ser utilizados en ejercicios practicos, usando dependencias y devolviendo sitios estaticos.</i></p>
<h4>» DESAFIO Citas Medicas «</h4>
      <p>Se crea un servidor que utiliza las dependencias Axios, Nodemon, Chalk, Moment, uuid y Lodash que consume la API "Random User". Se disponibiliza una ruta para la consulta y se obtiene finalmente un archivo txt con informacion parecida a la siguiente</p>
      
![image](https://user-images.githubusercontent.com/40929118/152691458-16ff12d3-5268-49ea-a517-a56a3b4c7223.png)

<h4>» DESAFIO Black & White «</h4>
      <p>Se crea un servidor que disponibiliza una ruta raíz que devuelve un HTML con el
formulario para ingresar la URL de la imagen con estilos CSS de un documento interno en
los archivos del servidor. El formulario redirige a otra ruta del servidor, procesa la
imagen y la devuelva en blanco y negro. Como muestran las siguientes imágenes:
</p>

  <ul>
    <li>Se utilizan las dependencias Jimp y Yargs para la edicion de la image y el acceso al servidor con una Key.</li>
  </ul>

![image](https://user-images.githubusercontent.com/40929118/152691569-15a5d1d5-8690-46c4-b0f2-61654629b670.png)

<hr>
<h5>■ SECCION 3: LLAMADAS ASINCRONAS</h5>
<p><i>Se integra el concepto de callbacks, asincronismo y promesas en NODE. Se integra el concepto de "Protocolo SMTP" junto al paquete "NodeMailer" para enviar Emails desde el servidor</i></p>
<h4>» DESAFIO Galeria de Pokemones «</h4>
      <p>Se crea un servidor que consume la API "Pokeapi" para consultar distintos EndPoints y unirlas en un mismo arreglo para que pueda ser devuelto por un
único endpoint como un JSON hacia un HTML cliente el cual mostrará de forma ordenada cada uno de los pokemones con su respectivo sprite y nombre, tal como muestra la siguiente imagen.
</p>

![image](https://user-images.githubusercontent.com/40929118/152691963-43b64cd2-810c-4aa5-81bc-04b4c8546e53.png)

<h4>» DESAFIO Spam Economy Spa «</h4>
      <p>Se crea un servidor que devuelve en su ruta raiz un html con un formulario para enviar Mails masivos a travez de la dependencia NodeMailer bajo el protocolo SMTP, esta aplicacion consume la API "Mindicador" para enviar un mail con informacion del valor actual de ciertas divisas tal como muestra la imagen a continuacion
</p>

![image](https://user-images.githubusercontent.com/40929118/152692123-b1c4f7aa-0c56-4e41-8785-ba2084108ad3.png)

<hr>
<h5>■ SECCION 4: API REST y Testing</h5>
<p><i>Se introduce el concepto de TDD(Test-Driven Development) y la arquitectura REST</i></p>
<h4>» DESAFIO Club deportivo «</h4>
      <p>Se crea un servidor tipo CRUD que persiste la información en un archivo JSON
correspondiente a los deportes que ofrece este club deportivo, el cual permite crear, leer, editar y eliminar un deporte a eleccion, pero con el verbo GET
</p>



<h4>» DESAFIO Club deportivo 2.0 «</h4>
      <p>Se debe tomar el desafio anterior y utilizar los mismos metodos con el verbo correspondiente esta vez leyendo la payload data y el body de la informacion enviada, ademas, se debe realizar un testing de la aplicacion.
</p>

<hr>
<h5>■ SECCION 5: IMPLEMENTACION Y GESTION DE UNA BASE DE DATOS</h5>

<p><i>VUELVO ENSEGUIDA CON MAS...</i></p>
