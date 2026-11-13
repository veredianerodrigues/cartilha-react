# Migração para o Sanity — o que foi feito

Data: 12/11/2026

## Decisões

| Tema | Decisão |
|---|---|
| Backend | Sanity é o único backend; só o frontend (Vite + React 18, JS) é mantido |
| Texto rico | Portable Text (o HTML do Tiptap deixou de existir) |
| Linguagem | TypeScript no Studio; o frontend continua em JS |
| Conteúdo antigo | **Não migrado.** O cliente vai trocar muito texto, então o conteúdo é digitado do zero no Studio |
| Estrutura | Cada seção é um documento; o conteúdo é uma lista de blocos (texto, imagem, grade de imagens) |
| Hospedagem | Docker + Nginx servindo o build estático |
| Fallbacks | Nenhum código de contingência no frontend |
| PWA | Fora do escopo por enquanto (configuração antiga mantida, sem edições) |

Projeto Sanity: `0gjumgjk`, dataset `production` (público: o site lê sem token, via CDN).

## Studio (`studio/`)

Pacote separado, porque o Sanity 6 exige React 19 e o app está no React 18.

- `schemaTypes/secao.ts` — documento `secao`: `titulo`, `subtitulo`, `slug`, `numeroPagina`, `ordem`, `pai` (seção-mãe, opcional) e `blocos`.
- `schemaTypes/blocos.ts` — três tipos de bloco:
  - **Texto** (`blocoTexto`): tipo de caixa (normal, Saiba mais, Você sabia, Fique atenta, Importante, Olha só, Dica), título opcional e conteúdo em Portable Text.
  - **Imagem** (`blocoImagem`): imagem, texto alternativo, legenda ("Figura: …") e fonte, mais **tamanho** (automático = largura total, média = até 440 px, pequena = até 260 px) e **alinhamento** (esquerda, centro, direita). O alinhamento só se nota quando o tamanho não é automático. A grade de imagens não usa esses campos.
  - **Grade de imagens** (`blocoGradeImagens`): mínimo de 2 imagens, exibidas em grade ou carrossel.
- `schemaTypes/portableText.ts` — negrito, itálico, sublinhado, link, listas e **citação como objeto inline** (menu "Inserir"), que aponta para uma `referencia`.
- `schemaTypes/referencia.ts` — `referencia` (uma obra) e `listaReferencias` (singleton, id `lista-referencias`): a **posição na lista é o número exibido na citação**.
- `structure.ts` — painel com as seções na ordem da cartilha, a ordem das referências e as obras.
- Schema publicado no projeto (`npx sanity schema deploy`) e validado (`sanity schema validate`, `tsc --noEmit`).
- CORS liberado, sem credenciais, para `http://localhost:5173` e `https://gravidezadolescencia.com.br`.

## Frontend

- `src/lib/sanity.js` — cliente (`useCdn: true`) e `urlFor()`; ids vêm de `VITE_SANITY_PROJECT_ID` e `VITE_SANITY_DATASET`.
- `src/lib/queries.js` — **uma única consulta GROQ** traz seções, blocos e referências. Seção sem blocos e lista de referências ausente chegam como lista vazia (normalizado na consulta).
- `src/context/SectionsContext.jsx` — monta a árvore por `pai`, expõe `tree`, `flatSections`, `getSection`, `referencias` e `citationMap` (`_id` da referência → posição na lista).
- `src/components/SectionView.jsx` — título + nº da página, subtítulo e blocos. A seção de endereço `referencias` mostra a lista de referências no lugar dos blocos.
- `src/components/sections/blocos/` — `BlocoTexto` (reaproveita `TextCard` e `HighlightCard`), `BlocoImagem`, `BlocoGradeImagens` (grade ou carrossel com scroll-snap) e `ImagemComLegenda`.
- `src/components/sections/shared/PortableTextView.jsx` — renderiza Portable Text; a citação vira `<sup><a href="/secao/referencias#ref-N">`.
- `src/components/sections/Referencias.jsx` — lista numerada (`id="ref-N"`) que rola até a entrada e a destaca por 2,5 s quando chega por link de citação.
- `src/pages/SectionPage.jsx` — lê do contexto; seção só com subseções mostra o índice; seção inexistente cai em "não encontrada". Sem página legada e sem mensagem de "em preparação".

## Infra

- `Dockerfile` — build do Vite (Node 22) + Nginx. Build args `VITE_SANITY_PROJECT_ID` e `VITE_SANITY_DATASET`, com os ids deste projeto como padrão.
- `nginx.conf` — fallback de SPA, cache longo em `/assets/`, sem cache em `index.html` e no service worker.
- `docker-compose.yml` — porta 80, sem volumes nem segredos do servidor; labels do Traefik mantidos.
- `.dockerignore` — exclui `studio`. `.env.example` com as duas variáveis.

## Limpeza do legado

Removidos: `server/` (Express, Postgres/Supabase, autenticação, upload, scripts de migração), `docker-compose.dev.yml`, admin e editor Tiptap, `AuthContext`, `api.js`, `offlineSync.js`, `legacyPagesMap.js`, os 17 componentes de seção, `blocks/*`, `RichHtml`, `Cite`, `fieldSchemas.js`, `pageCounts.js`, scripts de migração do `package.json` e 151 pacotes. O proxy `/api` saiu do `vite.config.js` e a config `api` saiu do `.claude/launch.json`.

Mantidos: capa, contracapa, ficha, sumário e `ScaledCanvas`; o `sharp` (usado por `scripts/generate-pwa-icons.mjs`).

## Verificação feita

Com um dataset temporário (6 documentos, já apagado) e o app local no navegador:

- os 3 tipos de bloco e as 7 variantes de caixa renderizam;
- as 6 imagens carregam;
- a numeração das citações segue a ordem da lista (invertida a ordem, o número mudou);
- o link da citação rola até a referência e a destaca;
- o índice da seção-mãe e o sumário respeitam `ordem` e `pai`;
- `vite build` passa; `tsc --noEmit` e `sanity schema validate` do Studio passam.

## Como rodar

Frontend (na raiz): criar `.env.local` com `VITE_SANITY_PROJECT_ID=0gjumgjk` e `VITE_SANITY_DATASET=production`, depois `npm install` e `npm run dev`.

Studio (`studio/`): `npm install`, `.env` com `SANITY_STUDIO_PROJECT_ID` e `SANITY_STUDIO_DATASET`, `npm run dev`. Para publicar o schema: `npm run deploy-schema`. É preciso estar logado com `npx sanity login` em uma conta com acesso ao projeto.

## Comportamentos conhecidos

- Citação para uma referência que não está em `listaReferencias` aparece sem número (não há fallback de propósito).
- `variante` do bloco de texto é obrigatória no Studio; no frontend, uma variante inválida gera erro.
- O texto fica alinhado à esquerda (decisão: a cartilha não usa texto justificado); o alinhamento por parágrafo do Tiptap não foi levado.
- Texto alternativo da imagem é só um aviso de validação, não obrigatório.
