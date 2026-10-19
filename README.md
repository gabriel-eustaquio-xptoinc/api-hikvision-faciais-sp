# API Hikvision Faciais SP

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Express](https://img.shields.io/badge/Express-5.x-black)
![License](https://img.shields.io/badge/license-Internal-blue)

API REST desenvolvida para integração com controladoras Hikvision através da interface ISAPI utilizando autenticação Digest.

A solução permite realizar o desbloqueio remoto de portas de forma centralizada, segura e configurável através de variáveis de ambiente.

---

## Principais Funcionalidades

✅ Abertura remota de portas Hikvision

✅ Suporte a múltiplas controladoras

✅ Autenticação Digest

✅ Configuração via arquivo `.env`

✅ API REST simples para integração

✅ Compatível com aplicações Web, Mobile e Sistemas Corporativos

✅ Arquitetura leve baseada em Node.js

---

## Arquitetura

```text
┌─────────────┐
│ Frontend    │
│ Web/Mobile  │
└──────┬──────┘
       │ HTTP REST
       ▼
┌──────────────────┐
│ API Node.js      │
│ Express          │
└──────┬───────────┘
       │ ISAPI
       ▼
┌──────────────────┐
│ Hikvision ACS    │
│ Face Terminal    │
│ Door Controller  │
└──────────────────┘
```

---

## Estrutura do Projeto

```text
.
└── backend
    ├── server.js
    ├── package.json
    ├── package-lock.json
    ├── .env.example
    ├── README.md
    └── node_modules
```

---

## Documentação Completa

Toda a documentação técnica encontra-se em:

📄 **backend/README.md**

Lá você encontrará:

- Instalação
- Configuração
- Variáveis de ambiente
- Endpoints disponíveis
- Exemplos CURL
- Exemplo PowerShell
- Exemplo JavaScript
- Tratamento de erros

---

## Instalação Rápida

Clone o projeto:

```bash
git clone https://github.com/gabriel-eustaquio-xptoinc/api-hikvision-faciais-sp.git
```

Entre na pasta:

```bash
cd api-hikvision-faciais-sp/backend
```

Instale as dependências:

```bash
npm install
```

Crie o arquivo de configuração:

```bash
cp .env.example .env
```

Inicie a aplicação:

```bash
node server.js
```

---

## Exemplo de Utilização

### Requisição

```bash
curl -X POST http://localhost:3001/api/desbloquear \
-H "Content-Type: application/json" \
-d '{"local":"RUACH_HAKODESH"}'
```

### Body

```json
{
  "local": "RUACH_HAKODESH"
}
```

---

## Locais Configurados

Atualmente a API possui suporte para:

- SHAAR
- COPA
- BOARD
- ALFOLI
- YESHUA
- REUNIAO_TETELESTAI_ENTRADA_A
- REUNIAO_TETELESTAI_ENTRADA_B
- CFO
- CGH
- RUACH_HAKODESH

---

## Tecnologias

- Node.js
- Express
- Digest Fetch
- CORS
- Dotenv
- Hikvision ISAPI

---

## Segurança

- Não versionar arquivos `.env`
- Utilizar senhas fortes
- Restringir acesso por firewall
- Utilizar HTTPS quando exposto externamente
- Preferir acesso via VPN em ambientes de produção

---


## Contribuição

Caso identifique alguma melhoria ou correção, abra uma Issue ou envie um Pull Request.

---

## Autor

**Gabriel da Silva Eustaquio**

XPTO INC

---

## Licença

Projeto destinado para uso interno e integrações corporativas.
