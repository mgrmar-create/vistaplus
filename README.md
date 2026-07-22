# MÉTODO VISTA+ — Plataforma ICV+ (Deploy Vercel)

Pacote pronto para publicar a Plataforma de Diagnóstico por IA (v17 — 14 critérios + IMI) na web, com a chave de API protegida no servidor.

## Estrutura
```
vistaplus-app/
├── public/
│   └── index.html       ← A plataforma completa (front-end)
├── api/
│   └── diagnostico.js   ← Proxy serverless (protege sua chave de API)
├── vercel.json           ← Configuração de rotas
└── README.md
```

## Passo a passo para publicar

### 1. Criar conta no Vercel (se ainda não tiver)
Acesse https://vercel.com/signup e crie uma conta — pode usar login com GitHub.

### 2. Criar um repositório no GitHub
- Acesse https://github.com/new
- Nome sugerido: `vistaplus-plataforma`
- Pode deixar privado
- Faça upload de TODOS os arquivos desta pasta (`vistaplus-app/`) mantendo a estrutura de subpastas `public/` e `api/`

### 3. Conectar o repositório ao Vercel
- No painel do Vercel, clique em "Add New" → "Project"
- Selecione o repositório `vistaplus-plataforma` que você acabou de criar
- Clique em "Import"

### 4. Configurar a chave de API (PASSO MAIS IMPORTANTE)
Antes de clicar em "Deploy":
- Na tela de configuração do projeto, abra "Environment Variables"
- Adicione:
  - **Name**: `ANTHROPIC_API_KEY`
  - **Value**: sua chave de API da Anthropic (começa com `sk-ant-...`)
  - Se você não tem uma chave ainda, gere em https://console.anthropic.com/settings/keys
- Clique em "Add"

### 5. Deploy
Clique em "Deploy". Em cerca de 1 minuto o Vercel vai gerar uma URL pública, algo como:
`https://vistaplus-plataforma.vercel.app`

Essa é a URL que você pode acessar de qualquer dispositivo (celular, tablet, notebook) — inclusive no Summit Cidades 2026.

## Atualizando para uma nova versão
Sempre que eu (Claude) gerar uma nova versão da plataforma:
1. Baixe o novo arquivo `vistaplus_plataforma_v17.html`
2. Substitua o conteúdo de `public/index.html` no GitHub por esse novo arquivo
3. O Vercel detecta a mudança e republica automaticamente em ~1 minuto

## Segurança
- Sua chave de API NUNCA aparece no navegador do usuário — ela fica só no servidor do Vercel (variável de ambiente).
- O arquivo `api/diagnostico.js` é o único lugar que "sabe" a chave, e ele roda no servidor, não no navegador.

## Problemas comuns
- **"x-api-key header is required"**: você está abrindo o arquivo localmente (`file://`) em vez de acessar a URL do Vercel. Funciona só depois do deploy.
- **Erro 500 ao gerar diagnóstico**: confira se a variável `ANTHROPIC_API_KEY` foi configurada corretamente no painel do Vercel (Settings → Environment Variables).
- **Tela em branco**: confira se o arquivo foi salvo como `public/index.html` (dentro da pasta `public`, não na raiz).
