# Projet Red/Blue Team

## En cas de rebuild
- Vérifier le .htaccess
- Il doit être comme suit :
    RewriteEngine On
    RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -f [OR]
    RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -d
    RewriteRule ^ - [L]
    RewriteRule ^ ./index.html