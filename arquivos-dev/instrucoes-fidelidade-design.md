# Instruções — Fidelidade visual ao Figma + Design System responsivo

## Diagnóstico (já verificado no código)

Hoje existem **dois sistemas visuais diferentes** convivendo no projeto:

1. **Páginas legado fiéis ao Figma** (`Page00`–`Page16`, `Page19`): canvas fixo `w-[595px] h-[842px]`, tudo em `position: absolute` com coordenadas em px copiadas do Figma. Fiel ao design, mas **não responsivo** — não existe nenhum breakpoint dentro dessas páginas.
2. **Blocos novos do banco** (`Heading`, `Paragraph`, `Callout`, `QuoteGrid`, `ListBlock`, `ImageBlock`, usados pelo `SectionView`): responsivos (`max-w-3xl`, `sm:`/`md:` breakpoints), mas com **estilo genérico**, divergente da identidade visual do Figma:
   - `Callout`: `border-2 rounded-2xl` — no Figma o card é `bg-[rgba(29,67,85,0.05)] rounded-[50px]` **sem borda**, com `shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15)]`.
   - `QuoteGrid`: usa a cor `#349a95`, que **não existe** na paleta de marca.
   - `Paragraph`: usa `text-slate-800` em vez da cor de texto do design (`#000` corpo / `#1D4355` títulos / `#163341` números de página).

**Não é só "faltou copiar mais Figma".** Copiar o padrão das páginas 00-16 (canvas fixo + absolute) pioraria a responsividade. O caminho é o oposto: levar a identidade visual do Figma para dentro do sistema de blocos responsivo, e depois migrar tudo (inclusive as páginas 00-16) para esse único sistema.

## Tokens de design extraídos do Figma (usar como fonte da verdade)

```
Cores:
  --brand-dark:    #1D4355  (títulos)
  --brand-darker:  #163341  (números de página, títulos secundários)
  --brand-blue:    #289DD2  (destaques "Atenção...", "Importante!")
  Corpo de texto:  #000000
  Card de destaque: rgba(29, 67, 85, 0.05)  — fundo, sem borda

Tipografia:
  Títulos de seção: Poppins, 32px (light + trecho semibold em destaque), line-height 1.44
  Subtítulos ("Atenção...", "Fique ligado!!"): Poppins bold, 16px, cor --brand-blue
  Corpo:  Work Sans 14px, justificado, line-height 22px, letter-spacing 0.14px
  Citação/fonte: Work Sans 12px

Card padrão (usado em "Atenção", "Importante", blocos de destaque):
  background: rgba(29,67,85,0.05)
  border-radius: 50px (reduzir pra ~24px em mobile — 50px fica desproporcional em telas pequenas)
  box-shadow: 0px 2px 2px 0px rgba(0,0,0,0.15)
  sem borda

Decoração: SVG de fundo (blob/formas) no canto superior direito de cada página — manter, mas
  posicionar com % relativo ao container, não px absoluto fixo.

Imagens/ilustrações: cantos arredondados assimétricos (ex: rounded-r-[50px] quando a imagem
  encosta na borda esquerda) — preservar esse detalhe, ele é característico do design.
```

## O que fazer (nessa ordem)

1. **Reescrever os componentes de bloco** (`Callout.jsx`, `QuoteGrid.jsx`, `Heading.jsx`, `Paragraph.jsx`, `ListBlock.jsx`, `ImageBlock.jsx`) usando os tokens acima. Trocar `border-2` por fundo `rgba(29,67,85,0.05)` sem borda, arredondamento maior, sombra sutil. Remover a cor `#349a95` — não existe no design.
2. **Criar 2 componentes novos reutilizáveis**, responsivos:
   - `PageDecoration`: o SVG decorativo de canto, posicionado por container (não canvas fixo).
   - `IllustrationFrame`: wrapper de imagem com o corte assimétrico de canto (`rounded-r-[50px]` no desktop, reduzir em mobile).
3. **Baixar as imagens que faltam direto do Figma** (não recriar): página 20 (camisinha feminina) e página 21 (DIU/implante). Isso é ilustração real, não dá pra aproximar — vale a chamada ao Figma MCP especificamente pra essas duas.
4. **Migrar as 17 seções legadas** (`Page17`, `Page18`, `Page20`–`Page34`) para o modelo de blocos do banco, usando os componentes já corrigidos no passo 1 — em vez de tentar deixá-las pixel-perfect em canvas fixo. Isso resolve fidelidade e responsividade ao mesmo tempo e evita manter dois sistemas.
5. **Por último**, migrar também `Page00`–`Page16` e `Page19` para o mesmo modelo (elas já têm o conteúdo certo, só precisam trocar o container fixo pelos blocos responsivos) e aposentar de vez os `Page*.jsx`.

## Fora de escopo por agora
Não tentar replicar posição pixel a pixel do Figma nas páginas migradas — o objetivo é a mesma "voz visual" (cores, tipografia, tratamento de card, decoração), não coordenadas idênticas. Isso é o que permite ficar responsivo sem perder identidade.
