# Pendências — migração para o Sanity

Atualizado em 12/11/2026. Veja o que já foi feito em `docs/migracao-sanity.md`.

## Antes de publicar

- [ ] **Commitar.** Nada foi commitado ainda. Sugestão: dois commits separados, (1) troca para o Sanity (Studio + frontend + Docker) e (2) remoção do legado.
- [ ] **Criar o conteúdo no Studio** (o dataset `production` está vazio):
  - seção de endereço **`referencias`** (sem blocos, ordem por último), para aparecer no sumário e receber os links das citações;
  - documento **"Referências (ordem)"** com as obras na ordem desejada;
  - as 17 seções, seguindo a nova proposta do cliente (PDF `Cartilha.pdf`): Tanner unificado depois das meninas, cortes em métodos hormonais, mais imagens com legenda e fonte.
- [ ] **Revisar o texto da proposta antes de digitar:** erros como "mentrual", "nocorpo", "feira por um médico", "etonorgestrel" e "Voce". Anotações internas do PDF ("VERE NA CARTILHA…", "CHAT", "CANVA", "AJUSTADA PELO CHAT", "Banco gemini") não entram no conteúdo. Padronizar as fontes das imagens geradas por IA.
- [ ] **Publicar o Studio:** `npx sanity deploy` dentro de `studio/` (escolher o endereço `*.sanity.studio`) e convidar as editoras no painel do Sanity.
- [ ] **Testar o clique das setas do carrossel** em um navegador real. A rolagem animada não funciona no navegador automatizado, então só o encaixe foi confirmado.
- [ ] **Testar o build da imagem Docker** (`docker build`) e uma rota profunda como `/secao/x`. O Docker não estava rodando quando foi montado.
- [ ] **Confirmar como a imagem é publicada.** O compose usa `ghcr.io/veredianerodrigues/cartilha-react:latest`, mas este repositório não tem workflow de build/push. Definir onde a imagem é construída e como o deploy acontece.

## Decisões em aberto

- [ ] **Dados locais não versionados:** `server/data/` (banco SQLite, 4 MB) e `server/uploads/` (4,8 MB de imagens) continuam no disco, fora do git. Guardar as imagens que servirem como original e apagar o restante da pasta `server/`.
- [ ] **`.env` antigo:** remover as chaves que não são mais usadas (banco, Supabase, JWT, admin).
- [ ] **`src/assets/` órfão:** boa parte das imagens por página deixou de ser usada. Listar e remover o que não for da capa, contracapa e ficha.
- [ ] **Texto alternativo das imagens:** hoje é só um aviso; tornar obrigatório, se for desejado (acessibilidade).
- [ ] **Novos tipos de bloco ou de caixa:** a lista atual (normal, Saiba mais, Você sabia, Fique atenta, Importante, Olha só, Dica) pode precisar de ajuste conforme o conteúdo novo. Cada tipo novo exige alterar o schema do Studio e o mapa de estilos em `BlocoTexto.jsx`.

## Etapa futura: PWA / offline (adiada a pedido)

- [ ] Trocar as regras de cache de `vite.config.js`: a de `/api/sections` e a do Supabase não existem mais. Criar regras para `*.apicdn.sanity.io` (conteúdo) e `cdn.sanity.io/images/*` (imagens).
- [ ] Reintroduzir o pré-carregamento offline do conteúdo, agora com uma única consulta (não N requisições).
- [ ] Revisar `navigateFallbackDenylist` e o comentário do `workbox` sobre "páginas legado".

## Ambiente e acessos

- [ ] **Node do Studio:** uma dependência pede Node >= 22.20 e a máquina tem 22.14. O `npm install` funcionou, mas atualizar o Node antes de rodar `sanity dev` com frequência.
- [ ] **Sanity MCP:** está autenticado em outra organização (Brasil Terminal Portuário). Não usar para este projeto. Gravações pelo CLI funcionam porque o `sanity login` atual é de uma conta com acesso ao projeto `0gjumgjk`.
- [ ] **CORS:** se houver ambiente de homologação ou outro domínio, adicionar com `npx sanity cors add <origem> --no-credentials`.
- [ ] **README:** documentar a nova stack e o `.env.local` (o README antigo não foi revisado).
