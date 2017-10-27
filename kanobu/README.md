# Kanobu
## About Kanobu App
This is HTML5 game to play Rock/Scissors/Paper online
Multiplaying possible because of PHP-part of the application is hosted on [000webhostapp.com](https://ahotoha.000webhostapp.com/kanobu/)

## How to run localy

    $ ls
    Slim/  kanobu/  run.bat

    $ ls kanobu
    README.md  index.html  js/  restapi/

    $ cat run.bat
    php -S localhost:8000 -d extension=php_sqlite3.dll

Slim php lib from [https://www.slimframework.com/](https://www.slimframework.com/)

Change RestApi.get method in kanobu/js/utils.js to work with localhost.

## Configuring apache
Example of /public_html/.htaccess to work with apache server:

    RewriteEngine on
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^(.*)$ /kanobu/restapi/index.php?path=$1 [NC,L,QSA]

