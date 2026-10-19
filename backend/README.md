# API Hikvision - Controle de Portas

API para abertura remota de portas Hikvision utilizando autenticação Digest.

## Instalação

Clone o projeto:

```bash
git clone <repositorio>
cd api-hikvision
```

Instale as dependências:

```bash
npm install
```

## Configuração

Crie o arquivo `.env`:

```env
SP_SHAAR_USUARIO=teste
SP_SHAAR_SENHA=password123
SP_SHAAR_IP=192.168.170.30

SP_RUACH_HAKODESH_USUARIO=teste
SP_RUACH_HAKODESH_SENHA=password1234
SP_RUACH_HAKODESH_IP=192.168.140.10
```

## Executando

```bash
node server.js
```

Saída esperada:

```text
Servidor iniciado na porta 3001
```

---

# Endpoint

## Abrir Porta

### URL

```http
POST /api/desbloquear
```

### Headers

```http
Content-Type: application/json
```

### Body

```json
{
  "local": "RUACH_HAKODESH"
}
```

### Locais Disponíveis

| Local |
|---------|
| SHAAR |
| COPA |
| BOARD |
| ALFOLI |
| YESHUA |
| REUNIAO_TETELESTAI_ENTRADA_A |
| REUNIAO_TETELESTAI_ENTRADA_B |
| CFO |
| CGH |
| RUACH_HAKODESH |

### Exemplo CURL

```bash
curl -X POST http://localhost:3001/api/desbloquear \
-H "Content-Type: application/json" \
-d '{"local":"RUACH_HAKODESH"}'
```

### Exemplo de sucesso

```xml
<ResponseStatus version="2.0">
    <requestURL>/ISAPI/AccessControl/RemoteControl/door/1</requestURL>
    <statusCode>1</statusCode>
    <statusString>OK</statusString>
</ResponseStatus>
```

### Possíveis erros

#### Local não informado

```json
{
  "erro": "Local não informado"
}
```

#### Local inválido

```json
{
  "erro": "Local XYZ não encontrado"
}
```

#### Erro de comunicação

```json
{
  "erro": "connect ETIMEDOUT"
}
```