# Configurar acesso à API do GA4 para o dashboard `/relatorio`

Este guia cria as credenciais que `/api/analytics-report.js` usa para
puxar dados reais do Google Analytics 4. Precisa ser feito por alguém com
acesso de administrador ao GA4 do Thiago (ou pelo próprio Thiago).

As credenciais **nunca** vão para o repositório — só para as variáveis de
ambiente da Vercel (passo 8).

## 1. Google Cloud Console

1. Acesse [console.cloud.google.com](https://console.cloud.google.com) com
   a conta Google que administra o GA4 da Cazarini.
2. Crie um projeto novo (ou reuse um existente) — ex: `cazarini-analytics`.
3. No menu **APIs & Services > Library**, busque **Google Analytics Data
   API** e clique em **Enable**.

## 2. Criar a Service Account

4. Vá em **IAM & Admin > Service Accounts > Create Service Account**.
   - Nome sugerido: `cazarini-ga4-dashboard`.
   - Não precisa conceder nenhum papel de projeto do Google Cloud — o
     acesso de leitura é dado dentro do próprio GA4 (passo 6).
5. Na aba **Keys** da Service Account criada, clique em **Add Key > Create
   new key > JSON**. Isso baixa um arquivo `.json` — guarde-o em local
   seguro, fora do repositório.

## 3. Dar acesso de leitura no GA4

6. Acesse [analytics.google.com](https://analytics.google.com), abra a
   propriedade do site da Cazarini.
7. Vá em **Admin > Property Access Management > +  > Add users**.
   - Cole o `client_email` do arquivo JSON (algo como
     `cazarini-ga4-dashboard@SEU-PROJETO.iam.gserviceaccount.com`).
   - Papel: **Viewer** (Leitor) é suficiente.
8. Ainda em **Admin > Property Settings**, anote o **Property ID**
   numérico (ex: `123456789`). Ele é diferente do Measurement ID
   (`G-Y4WBNLRXHM`) que já está no `index.html` do site.

## 4. Configurar as variáveis de ambiente na Vercel

9. No painel da Vercel, abra o projeto do site → **Settings > Environment
   Variables** e adicione (marcando "Production" e "Preview" se quiser
   testar antes):

   | Nome | Valor |
   |---|---|
   | `GA4_PROPERTY_ID` | o número do passo 8 |
   | `GA4_CLIENT_EMAIL` | o `client_email` do arquivo JSON do passo 5 |
   | `GA4_PRIVATE_KEY` | o `private_key` do arquivo JSON do passo 5 (cole como está, com os `\n`) |
   | `DASHBOARD_ACCESS_TOKEN` | uma string longa e aleatória — gere com `openssl rand -hex 32` |

10. Faça um novo deploy (as env vars só valem a partir do próximo build).

## 5. Testar

11. Acesse `https://www.cazarini.com/relatorio`, informe o token gerado
    no passo 9 e confira se os gráficos carregam com dados reais dos
    últimos 60 dias.

## 6. Uso do dashboard

- **Link mágico**: para o Thiago não precisar digitar o token toda vez,
  gere o link `https://www.cazarini.com/relatorio?token=SEU_TOKEN` e peça
  para ele salvar como favorito. O token é lido da URL, guardado na
  sessão do navegador e removido da barra de endereço automaticamente.
- **Auto-bloqueio**: a página tranca sozinha após 2m30s sem interação
  (mouse, scroll, teclado ou clique) — reabrir pelo link mágico
  reautentica em um passo só.
- **Período**: os botões de 7/30/60/90 dias trocam o período rapidamente;
  os campos de data ao lado permitem qualquer intervalo customizado.
- **Exportar**: os botões CSV e PDF (impressão do navegador) exportam o
  período selecionado, com os dados já carregados na tela.
