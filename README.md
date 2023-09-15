# Service: Tokenización de Tarjetas

## Objetivo

Este proyecto se desarrollo para completar con la prueba tecnica y demostrar mis capacidades como desarrollador

## Requisitos previos

1. Instalar node-v18.16.0
2. Instalar npm
* npm
  ```sh
  npm install npm@latest -g
  ```

## Instalación

_A continuación, se muestra un ejemplo de cómo instalar y configurar la aplicación._

1. Clona el repositorio
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
7. Para levantar en local tenemos que ejecutar:
   ```
   sls offline
   ```
    
    
## Uso

### endpoints:


  POST - https://7hrff9sao3.execute-api.us-east-1.amazonaws.com/dev/tokenization

  POST - https://7hrff9sao3.execute-api.us-east-1.amazonaws.com/dev/findData

### functions:

  tokenization: tokenization-ts-dev-tokenization
  findData: tokenization-ts-dev-findData

### Paso 1 - tokenization:
Para uso del endpoint es necesario que tengamos una tarjeta registrada en la base de datos Postgresql. Puedes usar mi tarjeta, pero no gastes mucho:

```body
{
  'email': 'canchayhuar@uni.pe',
  'card_number': 4111111111111111,
  'cvv': 123,
  'expiration_year': 2026,
  'expiration_month': 10
}
``` 

Para la autorización tienes que agregarle lo siguiente:

```header
pk_test_LsRBKejzCOEEWOsw
``` 

Esto nos trae como respuesta un token el cúal podemos usar luego para obtener los datos de la tarjeta menos el cvv

### Paso 2 - findData:
Para uso  del endpoint es necesario que tengamos el token para identificar la tarjeta:

```body
{
    'token': 'token generado de la tokenización'
}
``` 

Para la autorización tienes que agregarle lo siguiente:

```header
pk_test_LsRBKejzCOEEWOsw
``` 

Esto nos trae como respuesta los datos de la tarjeta menos el cvv


