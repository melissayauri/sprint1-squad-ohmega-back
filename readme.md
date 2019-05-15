# Backend del Assistant de Canvia

Este componente actua como comunicacion entre la página web del cliente y el asistente de Watson, a su vez maneja la conexion a base de datos y la creacion del Log. También es repositorio de las librerias assitant.min.js y assistant.min.css que debe llamar el cliente en su página web.


## Instalación

Luego de haber descargado o descomprimido el repositorio se deben instalar todas las dependencias de node usando npm:

`$ npm i`

Se necesitan tanto NodeJS y NPM para poder ejecutar este comando. 


## Arquitectura

Para ejecutar este sistema debes de tener un componente de Watson Assistant y una base de datos en postgreSQL


## Configuración

Para ejecutar este sistema debes de tener las siguientes variables en el archivo '.env'

CONVERSATION_APIKEY: Apikey del Watson Assistant
CONVERSATION_URL: URL del Watson Assistant
CONVERSATION_VERSION: Version del Watson Assistant 
WORKSPACE_ID: ID del workspace del Watson Assistant
API_KEY: Cadena de caracteres que validan el frontend de origen. Ejemplo: nhuamuhhq8lqLdLL
PG_URI: URI de la conexión a la base de datos en postgreSQL
PORT: Puerto de ambiente de desarrollo. Usar 4000.

Este es un ejemplo para el archivo .env

CONVERSATION_APIKEY=jMxgfQabjhr78tMgqrlPz9kXpb8NwMQwozd_c_Lv-XGC
CONVERSATION_URL=https://gateway-wdc.watsonplatform.net/assistant/api
CONVERSATION_VERSION=2018-01-01
WORKSPACE_ID=79d62c12-1c42-4f53-b20b-86c776e57c85
API_KEY=nhuamuhhq8lqLdLL
PG_URI=postgres://admin:NSOLXNOHVMVHZAEF@sl-us-south-1-portal.34.dblayer.com:55498/compose
PORT=4000


## Ejecucion: 

Para ejecutar este sistema en ambientes de desarrollo local solo se debe ejecutar:

´$ npm start´

Y el sistema estará escuchando en //localhost:4000/
Las librerias que necesita la página web cliente serán:

* //localhost:4000/assistant.js
* //localhost:4000/assistant.css


## Generacion de archivos minificados

Para desplegar en producción se deben generar dos archivos minificados: 

### assistant.min.js:

Para generar el archivo minificado de Javascript se debe tener instalado Webpack y el comando a ejecutar es el siguiente:

´$ npx webpack´

Esto va a generar el archivo assistant.min.js en base SOLO al archivo assistant.js


### assistant.min.css 

Para generar el minificado del CSS se debe usar herramientas como [CSS Minifier](https://cssminifier.com/) y copias y pegar el codigo resultante en assistant.min.css 


## Uso en el cliente

Para que se genere el chatbot en el cliente se debe importar tanto el archivo .js y el .css sea tanto en la version normal o la minificada. Para producción se sugiere usar la minificada. 

También se debe crear un elemento DIV en las paginas donde vaya a estar el chatbot. El elemento DIV debe tener los siguientes atributos:

*	id: 'kiara-conversation'
* env: El ambiente que se esta trabajando: 'local', 'dev' o 'prd'
* key: la llave que se guardo en el archivo .env para validación de cliente
* trigger: la clase HTML (class) que tiene el/los elementos que activan y desactivan el chatbot. 

Ejemplo de elemento DIV de cliente:

<link rel="stylesheet" href="//canvia-assistant-prd.mybluemix.net/assistant.min.css">
<div id="kiara-conversation" env="prd" key="cyaoV02maWP6YPEK" trigger="activarkiara"></div>
<script src="//canvia-assistant-prd.mybluemix.net/assistant.min.js"></script>



