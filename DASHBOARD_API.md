# Dashboard API - Guia de Uso

## Endpoint Principal

### GET /dashboard

Retorna todos os dados necessários para o dashboard do frontend.

**URL**: `http://localhost:3000/dashboard`

**Método**: `GET`

**Headers**:
```
Authorization: Bearer {seu_token_jwt}
```

## Resposta

```json
{
  "cards": [
    {
      "title": "Ocorrências Ativas",
      "value": "24",
      "icon": "pi pi-box",
      "color": "bg-blue-500",
      "trend": "+12%",
      "percentage": 12
    },
    {
      "title": "Motoristas Disponíveis",
      "value": "8",
      "icon": "pi pi-users",
      "color": "bg-green-500",
      "trend": "+5%",
      "percentage": 5
    },
    {
      "title": "Veículos em Uso",
      "value": "15",
      "icon": "pi pi-car",
      "color": "bg-orange-500",
      "trend": "-3%",
      "percentage": -3
    },
    {
      "title": "CT-e Emitidos (mês)",
      "value": "156",
      "icon": "pi pi-file",
      "color": "bg-purple-500",
      "trend": "+18%",
      "percentage": 18
    }
  ],
  "chartData": {
    "labels": ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
    "datasets": [
      {
        "label": "Ocorrências",
        "data": [65, 59, 80, 81, 56, 55],
        "fill": false,
        "borderColor": "#0ea5e9",
        "tension": 0.4
      }
    ]
  },
  "activities": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "description": "Container TCNU8806960 coletado",
      "timestamp": "2026-02-02T14:30:00.000Z",
      "type": "operation",
      "icon": "pi pi-check-circle"
    }
  ]
}
```

## Estrutura dos Dados

### Cards
Array com 4 objetos contendo:
- `title`: Título do card
- `value`: Valor atual (string)
- `icon`: Classe do ícone PrimeReact
- `color`: Classe de cor Tailwind
- `trend`: Tendência em formato de string (ex: "+12%")
- `percentage`: Valor numérico da tendência

### Chart Data
Dados para o gráfico de linha dos últimos 6 meses:
- `labels`: Array com nomes dos meses
- `datasets`: Array com os datasets do gráfico

### Activities
Array com as 5 atividades mais recentes:
- `id`: ID único da atividade
- `description`: Descrição da atividade
- `timestamp`: Data/hora da atividade
- `type`: Tipo da atividade
- `icon`: Ícone para exibição

## Exemplo de Uso no Frontend

### Usando Fetch

```typescript
import { useAuth } from '@/hooks/useAuth';

const DashboardPage = () => {
  const { token } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await fetch('http://localhost:3000/dashboard', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        
        const data = await response.json();
        setDashboardData(data);
      } catch (error) {
        console.error('Erro ao buscar dados do dashboard:', error);
      }
    };

    fetchDashboard();
  }, [token]);

  if (!dashboardData) return <div>Carregando...</div>;

  return (
    <div>
      {/* Renderizar cards */}
      {dashboardData.cards.map((card, index) => (
        <Card key={index}>
          <h3>{card.title}</h3>
          <p>{card.value}</p>
          <span>{card.trend}</span>
        </Card>
      ))}

      {/* Renderizar gráfico */}
      <Chart type="line" data={dashboardData.chartData} />

      {/* Renderizar atividades */}
      {dashboardData.activities.map((activity) => (
        <div key={activity.id}>
          <i className={activity.icon}></i>
          <p>{activity.description}</p>
          <span>{new Date(activity.timestamp).toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
};
```

### Usando Axios

```typescript
import axios from 'axios';
import { useAuth } from '@/hooks/useAuth';

const DashboardPage = () => {
  const { token } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/dashboard', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        setDashboardData(data);
      } catch (error) {
        console.error('Erro ao buscar dados do dashboard:', error);
      }
    };

    fetchDashboard();
  }, [token]);

  // ... resto do código
};
```

## Microserviços Envolvidos

O endpoint de dashboard agrega dados de múltiplos microserviços:

1. **operations-service** (porta 3003):
   - Ocorrências ativas
   - Gráfico de ocorrências dos últimos 6 meses
   - Atividades recentes

2. **registry-service** (porta 3002):
   - Motoristas disponíveis
   - Veículos em uso

3. **documents-service** (porta 3004):
   - CT-e emitidos no mês

## Arquitetura

```
Frontend (React)
    ↓
Gateway (porta 3000)
    ↓ /dashboard
DashboardService
    ↓ ↓ ↓ ↓
    │ │ │ └→ Documents Service (CT-e)
    │ │ └──→ Registry Service (Veículos)
    │ └────→ Registry Service (Motoristas)
    └──────→ Operations Service (Ocorrências, Gráfico, Atividades)
```

## Observações

- **Autenticação**: O endpoint requer autenticação JWT válida
- **Performance**: Os dados são buscados em paralelo usando `Promise.all()`
- **Fallback**: Se algum serviço falhar, valores padrão são retornados para não quebrar a interface
- **Caching**: Considere implementar cache no frontend para reduzir chamadas desnecessárias

## Próximos Passos

1. Adicionar autenticação ao endpoint (se ainda não estiver protegido)
2. Implementar cache no gateway para melhorar performance
3. Adicionar filtros por transportadora se necessário
4. Implementar websockets para atualizações em tempo real
5. Ajustar os cálculos de tendência conforme as regras de negócio
