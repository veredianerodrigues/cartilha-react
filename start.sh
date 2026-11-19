#!/bin/sh
# Sobe a API (Node) e o Nginx; se um dos dois cair, o contêiner encerra e é reiniciado.
node /app/api/server.mjs &
nginx -g "daemon off;" &
wait -n
exit $?
