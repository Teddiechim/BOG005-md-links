<br />
<div align="center">

<h1 align="center">MARKDOWN LINKS </h1>
<h3 align="center">

</h3>

![mdlinks](https://user-images.githubusercontent.com/107264908/205238220-79a7b288-82f9-4f15-964f-56049ef058cd.png)
</div>

- [:notebook_with_decorative_cover: Tabla de contenido](#notebook_with_decorative_cover-tabla-de-contenido)
  - [:star2: Introducción](#star2-introducción)
    - [:space_invader: Tech Stack](#space_invader-tech-stack)
  - [:page_facing_up: Instalación](#page_facing_up-instalación)
  - [:computer: ¿Cómo funciona?](#computer-cómo-funciona)
  - [:hammer: Diagrama de flujo](#hammer-diagrama-de-flujo)
  - [:high_brightness: Javascript API](#high_brightness-javascript-api)
  - [:handshake: Contacto](#handshake-contacto)
  
  ## :star2: INTRODUCCIÓN
La librería md-links nos permite leer archivos de extensión “.md” y directorios que contengan estos tipos de archivos para extraer todos sus enlaces. Además de realizar consultas HTTP en caso de que los enlaces estés rotos, por último, nos muestra algunas estadísticas básicas como el total y los enlaces únicos del archivo.

Esta librería fue realizada en node.js mediante una función de recursividad para la lectura de los diferentes directorios y archivos Markdown utilizando Axios. También se implementó una  CLI que utiliza Inquirer, Chalk y Figlet para una interacción más dinámica con el usuario.


### :space_invader: Tech Stack

<details>
  <summary>Client</summary>

![Node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
    
![Node](https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white)

![axios](https://user-images.githubusercontent.com/107264908/205248292-f86e5f82-4d97-41a1-9a67-953e27bb67bc.svg)

![inquirer](https://user-images.githubusercontent.com/107264908/205246548-70ffb702-c021-4eb1-87ee-afa796bd64ed.svg)

![chalk](https://user-images.githubusercontent.com/107264908/205246716-c9ebc80e-5f37-4ea8-a722-8c1760824826.svg)

![figlet](https://user-images.githubusercontent.com/107264908/205246860-c960bad5-fa7b-4031-b641-6c91db19574e.svg)

</details>
<details>
<summary>Deploy</summary>
  
  ![npm](https://user-images.githubusercontent.com/107264908/205245696-233e286a-4a1b-4593-859d-4c0f7f0e8e01.svg)

<!-- Features -->

</details>

  ## :page_facing_up: INSTALACIÓN

### 1.	Para la instalación necesitaremos de los siguientes comandos:

`npm i @teddiechim/md-links` <br>
`npm link`

Estos para la ejecución de la librería y el CLI.

### 2.	 Importaremos también

`const {mdLinks} = require(“@teddiechim/md-links”)`

## :computer: ¿CÓMO FUNCIONA?

Desde la terminal escribiremos el comando `md-links`, el cual nos mostrará un mensaje donde nos indicará que debemos escribir una ruta (absoluta o relativa) para mostrar los links del directorio o archivo. 

También se desplegarán una serie de opciones que el usuario podrá elegir, en éstas están `Validate`, `Stats` y `Validate and Stats`. 

`Validate` nos muestra el estado de los links mediante una consulta HTTP

`Stats` nos muestra algunas estadísticas básicas sobre nuestros links, en los que se encuentran el total de links y los links únicos que existen en el archivo o directorio 
`Validate and Stats` nos muestra todo lo anterior en la opción de “Stats” y la cantidad de links rotos de hay.


## :hammer: DIAGRAMA DE FLUJO

Estos diagramas de flujo se tuvieron en cuenta antes de empezar el código del proyecto

### Función mdLinks

![md-links](https://user-images.githubusercontent.com/107264908/205252759-115eab66-d462-4605-95e4-0ca7e4ee4c16.jpg)

### CLI

![CLI](https://user-images.githubusercontent.com/107264908/205252778-b5190506-d593-48f2-ac6b-bd97ee4b6cd3.jpg)

## :high_brightness: JavaScript API

El módulo debe poder **importarse** en otros scripts de Node.js y debe ofrecer la
siguiente interfaz:

#### `mdLinks(path, options)`

##### Argumentos

* `path`: Ruta **absoluta** o **relativa** al **archivo** o **directorio**.
Si la ruta pasada es relativa, debe resolverse como relativa al directorio
desde donde se invoca node - _current working directory_).
* `options`: Un objeto con **únicamente** la siguientes propiedad:
  - `validate`: Booleano que determina si se desea validar los links
    encontrados.
    
##### Valor de retorno

La función debe **retornar una promesa** (`Promise`) que **resuelva a un arreglo**
(`Array`) de objetos (`Object`), donde cada objeto representa un link y contiene
las siguientes propiedades

Con `validate:false` :

* `href`: URL encontrada.
* `text`: Texto que aparecía dentro del link (`<a>`).
* `file`: Ruta del archivo donde se encontró el link.

Con `validate:true` :

* `href`: URL encontrada.
* `text`: Texto que aparecía dentro del link (`<a>`).
* `file`: Ruta del archivo donde se encontró el link.
* `status`: Código de respuesta HTTP.
* `ok`: Mensaje `fail` en caso de fallo u `ok` en caso de éxito.

#### Ejemplo (resultados como comentarios)

```js
const mdLinks = require("md-links");

mdLinks("./some/example.md")
  .then(links => {
    // => [{ href, text, file }, ...]
  })
  .catch(console.error);

mdLinks("./some/example.md", { validate: true })
  .then(links => {
    // => [{ href, text, file, status, ok }, ...]
  })
  .catch(console.error);

mdLinks("./some/dir")
  .then(links => {
    // => [{ href, text, file }, ...]
  })
  .catch(console.error);
```

### 2) CLI (Command Line Interface - Interfaz de Línea de Comando)

El ejecutable de nuestra aplicación debe poder ejecutarse de la siguiente
manera a través de la **terminal**:

`md-links <path-to-file> [options]`

Por ejemplo:

```sh
$ md-links ./some/example.md
./some/example.md http://algo.com/2/3/ Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html algún doc
./some/example.md http://google.com/ Google
```

El comportamiento por defecto no debe validar si las URLs responden ok o no,
solo debe identificar el archivo markdown (a partir de la ruta que recibe como
argumento), analizar el archivo Markdown e imprimir los links que vaya
encontrando, junto con la ruta del archivo donde aparece y el texto
que hay dentro del link (truncado a 50 caracteres).

#### Options

##### `--validate`

Si pasamos la opción `--validate`, el módulo debe hacer una petición HTTP para
averiguar si el link funciona o no. Si el link resulta en una redirección a una
URL que responde ok, entonces consideraremos el link como ok.

Por ejemplo:

```sh
$ md-links ./some/example.md --validate
./some/example.md http://algo.com/2/3/ ok 200 Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html fail 404 algún doc
./some/example.md http://google.com/ ok 301 Google
```

Vemos que el _output_ en este caso incluye la palabra `ok` o `fail` después de
la URL, así como el status de la respuesta recibida a la petición HTTP a dicha
URL.

##### `--stats`

Si pasamos la opción `--stats` el output (salida) será un texto con estadísticas
básicas sobre los links.

```sh
$ md-links ./some/example.md --stats
Total: 3
Unique: 3
```

También podemos combinar `--stats` y `--validate` para obtener estadísticas que
necesiten de los resultados de la validación.

```sh
$ md-links ./some/example.md --stats --validate
Total: 3
Unique: 3
Broken: 1
```

## :handshake: CONTACTO

Outlook: valen.1540@outlook.com <br>
G-mail: teddiechim@gmail.com
