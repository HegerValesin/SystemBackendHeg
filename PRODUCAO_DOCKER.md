# Produção com Docker Compose

## Arquivos

- `docker-compose.yml`: ambiente de desenvolvimento
- `docker-compose.prod.yml`: ambiente de produção
- `Dockerfile.prod`: build de produção dos microserviços
- `.env.prod.example`: exemplo de variáveis de ambiente

## 1) Preparar variáveis

```bash
cp .env.prod.example .env
```

Ajuste as senhas antes de subir em produção.

## 2) Validar configuração

```bash
docker compose -f docker-compose.prod.yml config
```

## 3) Build de produção

```bash
docker compose -f docker-compose.prod.yml build
```

## 4) Subir stack

```bash
docker compose -f docker-compose.prod.yml up -d
```

## 5) Acompanhar logs

```bash
docker compose -f docker-compose.prod.yml logs -f gateway
```

## 6) Parar stack

```bash
docker compose -f docker-compose.prod.yml down
```

## Observações

- O serviço `gateway` é exposto em `3000`.
- Bancos PostgreSQL, Redis e MinIO ficam internos à rede Docker, com persistência em volumes nomeados.
- Para limpar tudo (incluindo volumes):

```bash
docker compose -f docker-compose.prod.yml down -v
```
