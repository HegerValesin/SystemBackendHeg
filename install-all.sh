#!/bin/bash

echo "🧹 Limpando node_modules e package-lock..."
rm -rf */node_modules */package-lock.json

echo "📦 Instalando dependências..."
services=("auth-service" "registry-service" "gateway" "operations-service" "documents-service")

# for service in "${services[@]}"; do
#   if [ -d "$service" ]; then
#     echo "📦 Instalando $service..."
#     cd "$service"
#     npm install reflect-metadata@^0.1.14 --save
#     npm install
#     cd ..
#   fi
# done

echo "🎨 Gerando Prisma Clients..."
for service in "${services[@]}"; do
  if [ -f "$service/prisma/schema.prisma" ]; then
    echo "🎨 Gerando Prisma Client para $service..."
    cd "$service"
    npx prisma generate
    cd ..
  fi
done

echo "✅ Instalação concluída!"
