# Pendências — migração para o Sanity

Atualizado em 12/11/2026. Veja o que já foi feito em `docs/migracao-sanity.md`.

## Antes de publicar

- [ ] **Commitar.** Nada foi commitado ainda. Sugestão: dois commits separados, (1) troca para o Sanity (Studio + frontend + Docker) e (2) remoção do legado.
- [x] **Seções 04 a 20 cadastradas em `production`** a partir do PDF do cliente (17 seções, 47 imagens, texto revisado). Falta revisar no Studio o que está listado em "Revisar no conteúdo cadastrado" abaixo.
- [x] **Referências cadastradas:** 33 obras (as 26 do site atual, com os mesmos ids, mais as 7 novas do fim do PDF), a lista "Referências (ordem)" em ordem alfabética e a seção de endereço `referencias` (página 21, última). As duas citações do PDF foram inseridas (Estágios de Tanner e Anticoncepcional injetável).
- [ ] **Conferir as referências:**
  - Os números exibidos mudam, porque a lista cresceu: a citação do Tanner aparece como **22,23** (no PDF era 18,19) e a do injetável como **30** (no PDF era 25). Se o cliente quiser os números do PDF, a ordem da lista precisa mudar.
  - Nas 7 novas, o itálico dos títulos foi aplicado por mim, seguindo o padrão das antigas.
  - Corrigi "em la adolescencia" para "en la adolescencia" na referência de Favier Torres (o título do artigo é em espanhol).
  - Confirmar as datas de acesso: Pinheiro ("18 de out. 2020") e Favier Torres ("05 set. 2020") estão com 2020 no PDF, enquanto as demais novas têm 2026.
- [ ] **Tamanho e alinhamento das imagens:** as 47 imagens foram ajustadas por mim (4 pequenas, 10 médias, 33 automáticas, todas centralizadas). Revisar no Studio, no bloco de imagem.
- [ ] **Revisar o texto da proposta antes de digitar:** erros como "mentrual", "nocorpo", "feira por um médico", "etonorgestrel" e "Voce". Anotações internas do PDF ("VERE NA CARTILHA…", "CHAT", "CANVA", "AJUSTADA PELO CHAT", "Banco gemini") não entram no conteúdo. Padronizar as fontes das imagens geradas por IA.
- [ ] **Publicar o Studio:** `npx sanity deploy` dentro de `studio/` (escolher o endereço `*.sanity.studio`) e convidar as editoras no painel do Sanity.
- [ ] **Testar o clique das setas do carrossel** em um navegador real. A rolagem animada não funciona no navegador automatizado, então só o encaixe foi confirmado.
- [ ] **Testar o build da imagem Docker** (`docker build`) e uma rota profunda como `/secao/x`. O Docker não estava rodando quando foi montado.
- [ ] **Confirmar como a imagem é publicada.** O compose usa `ghcr.io/veredianerodrigues/cartilha-react:latest`, mas este repositório não tem workflow de build/push. Definir onde a imagem é construída e como o deploy acontece.

## Revisar no conteúdo cadastrado

- [ ] **Posição das imagens:** foram colocadas na ordem em que aparecem no PDF, mas o layout das páginas não era visível na extração. Ajustar a posição no Studio, se preciso.
- [ ] **Fontes (créditos) das imagens:** todas começam com "Fonte:". Interpretações minhas a confirmar: "CHAT" virou "Imagem gerada por inteligência artificial (ChatGPT)", "Banco gemini" virou "(Gemini)" e "CANVA" virou "Banco de imagens Canva". A anotação "AJUSTADA PELO CHAT" foi removida. Os créditos de Tanner (meninas) e Fecundação vieram do site publicado, porque o PDF não os traz.
- [ ] **Imagens sem fonte no PDF:** páginas 5 (ícones do menino), 7 (meninas sorrindo), 10 (crianças na grama), 21 (balões "Para pensar"), 24 ("A dica é…"), 26 ("Já parou para pensar?"), 27 ("Você sabia?"), 30 ("Sexo só com consentimento"), 31 (menores de 14 anos) e 36 ("Guarde essa informação").
- [ ] **Texto alternativo:** escrito a partir da leitura das imagens. Conferir, principalmente, os infográficos de gestação (páginas 33 a 35) e de DIU e Implanon (páginas 22 e 23).
- [ ] **Caixas que são imagem com texto** (Dignidade Menstrual, Guarde essa informação, A dica é…, Você sabia?, entre outras) ficaram como imagem, fiéis ao PDF, com o texto no texto alternativo. Podem virar blocos de texto, como foi feito na Apresentação, se o cliente quiser texto editável.
- [ ] **Títulos escolhidos por mim** (o PDF não traz): "Estágios de Tanner" (página unificada de meninos e meninas) e "E na suspeita de gravidez..." (o PDF só tem o subtítulo "E se a gravidez aconteceu...").
- [ ] **Ícone da barra de ouro** (página 35) não foi cadastrado como imagem; o título do bloco ficou "Então vai mais uma dica de ouro".

## Imagens com texto dentro → HTML (Design System "Cartilha")

Script `studio/scripts/migrar-infograficos.ts` troca os da página 14 (Fique ligado!!, como usar os preservativos externo e interno) e o da Fecundação (pág. 11) por caixa e bloco "Passo a passo", com os desenhos recortados em `studio/scripts/infograficos/`. Os demais seguem como imagem:

- [ ] **Viram caixa (bloco de texto):** Dignidade Menstrual (pág. 10), "Importante!" (12), "É importante saber" (13), "Quais são suas vantagens?" (15), "A dica é…" (15), "Para o sucesso da pílula…" (16), "Você sabia" (16), Seus direitos (18), "Você sabia…" (18), "E tem mais…" (18), "Guarde essa informação" (19), "Diante da confirmação da gravidez…" (19), as perguntas de "Dá para engravidar…?" e "Pode acontecer ciclo…?" (10).
- [ ] **Viram "Passo a passo":** ciclo menstrual (10), DIU (15), Implanon (15), 1º/2º/3º trimestre e Puerpério (19), tipos de anticoncepcionais hormonais (16), anel/adesivo/injetável (16).
- [ ] **Ficam como imagem em "Página inteira":** fluxo hormonal (5 e 8), estágios de Tanner (9), marcos do desenvolvimento (8).

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
