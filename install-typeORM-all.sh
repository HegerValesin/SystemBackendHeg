services=("auth-service" "registry-service" "operations-service" "documents-service" "notifications-service")

for service in "${services[@]}"; do
  if [ -d "$service" ]; then
    echo "📦 Instalando TypeORM em $service..."
    cd "$service"
    npm install @nestjs/typeorm typeorm pg
    cd ..
  fi
done