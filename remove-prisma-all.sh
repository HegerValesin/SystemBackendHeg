cd /c/www/logistica/Backend

# Para cada microserviço, execute:
services=("auth-service" "registry-service" "operations-service" "documents-service" "notifications-service")

for service in "${services[@]}"; do
  if [ -d "$service" ]; then
    echo "🗑️  Removendo Prisma de $service..."
    cd "$service"
    
    # Remover dependências do Prisma
    npm uninstall prisma @prisma/client
    
    # Deletar arquivos e pastas do Prisma
    rm -rf prisma/
    rm -rf node_modules/.prisma/
    rm -f prisma.config.ts
    
    # Deletar arquivos de serviço do Prisma
    rm -f src/database/prisma.service.ts
    rm -f src/database/prisma.module.ts
    
    cd ..
  fi
done

echo "✅ Prisma removido de todos os microserviços!"