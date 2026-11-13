import {defineArrayMember, defineField, defineType} from 'sanity'

/** Variantes visuais de um bloco de texto (o estilo de cada uma fica no frontend). */
export const VARIANTES_TEXTO = [
  {title: 'Texto normal', value: 'normal'},
  {title: 'Saiba mais', value: 'saibaMais'},
  {title: 'Você sabia', value: 'voceSabia'},
  {title: 'Fique atenta / Fique ligado', value: 'fiqueAtento'},
  {title: 'Importante', value: 'importante'},
  {title: 'Olha só', value: 'olhaSo'},
  {title: 'Dica', value: 'dica'},
]

/**
 * Tipo da imagem: define a moldura no site (Design System "Cartilha", seção Imagens).
 * - retrato: 1 ou 2 pessoas, de preferência sem fundo; aparece sobre a forma orgânica verde-água.
 * - cena: grupos, objetos, lugares; recortada em 3:2 com cantos em folha.
 * - ilustracao: anatomia, infográficos, passo a passo; inteira, num cartão branco com borda.
 */
export const TIPOS_IMAGEM = [
  {title: 'Ilustração / infográfico', value: 'ilustracao'},
  {title: 'Retrato (pessoa, de preferência sem fundo)', value: 'retrato'},
  {title: 'Cena (grupo, objetos, lugar)', value: 'cena'},
]

/** Uma imagem com legenda e fonte. Usada em blocoImagem e dentro da grade. */
export const imagemItem = defineType({
  name: 'imagemItem',
  title: 'Imagem',
  type: 'object',
  fields: [
    defineField({
      name: 'imagem',
      title: 'Imagem',
      type: 'image',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tipo',
      title: 'Tipo de imagem',
      type: 'string',
      description:
        'Define a moldura. Retrato: pessoa (envie sem fundo, ou com fundo branco). Cena: foto de grupo, objetos ou lugar. Ilustração: desenhos e infográficos, mostrados inteiros.',
      options: {list: TIPOS_IMAGEM, layout: 'radio'},
      initialValue: 'ilustracao',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Texto alternativo',
      type: 'string',
      description: 'Descreva a imagem para quem não a enxerga (leitores de tela).',
      validation: (rule) => rule.warning('Sem texto alternativo a imagem fica inacessível.'),
    }),
    defineField({
      name: 'legenda',
      title: 'Legenda',
      type: 'string',
      description: 'Ex.: "Figura: Fluxo hormonal na puberdade."',
    }),
    defineField({
      name: 'fonte',
      title: 'Fonte',
      type: 'string',
      description: 'Ex.: "Banco de imagens Canva." ou "Produzida por IA a partir de BRASIL (2018)."',
    }),
  ],
  preview: {
    select: {title: 'legenda', subtitle: 'fonte', media: 'imagem'},
    prepare: ({title, subtitle, media}) => ({title: title || 'Imagem', subtitle, media}),
  },
})

export const blocoTexto = defineType({
  name: 'blocoTexto',
  title: 'Texto',
  type: 'object',
  fields: [
    defineField({
      name: 'variante',
      title: 'Tipo de caixa',
      type: 'string',
      options: {list: VARIANTES_TEXTO, layout: 'dropdown'},
      initialValue: 'normal',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'titulo',
      title: 'Título do bloco (opcional)',
      type: 'string',
    }),
    defineField({
      name: 'conteudo',
      title: 'Conteúdo',
      type: 'portableText',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'fonte',
      title: 'Fonte (opcional)',
      type: 'string',
      description: 'Aparece em letra pequena abaixo da caixa. Ex.: "Fonte: Ministério da Saúde (2022)."',
    }),
  ],
  preview: {
    select: {titulo: 'titulo', variante: 'variante', conteudo: 'conteudo'},
    prepare({titulo, variante, conteudo}) {
      const first = (conteudo ?? []).find((b: {_type: string}) => b._type === 'block') as
        | {children?: {text?: string}[]}
        | undefined
      const text = (first?.children ?? []).map((c) => c.text ?? '').join('')
      const label = VARIANTES_TEXTO.find((v) => v.value === variante)?.title ?? 'Texto'
      return {title: titulo || text.slice(0, 70) || 'Texto', subtitle: label}
    },
  },
})

/**
 * Tamanhos da imagem no site (largura máxima dentro da coluna de texto, que tem ~700px no
 * computador). Escolha pelo tipo de imagem:
 * - auto: ocupa a largura toda. Use em infográficos e caixas com texto, para ficarem legíveis.
 * - media: até 440px. Use em fotos e ilustrações grandes.
 * - pequena: até 260px. Use em fotos pequenas ou de baixa resolução, para não pixelizar.
 * No celular nenhuma passa da largura da tela.
 */
export const TAMANHOS_IMAGEM = [
  {title: 'Página inteira (infográfico com muito texto)', value: 'pagina'},
  {title: 'Automático (largura total)', value: 'auto'},
  {title: 'Média (até 440 px)', value: 'media'},
  {title: 'Pequena (até 260 px)', value: 'pequena'},
]

export const ALINHAMENTOS_IMAGEM = [
  {title: 'Esquerda (texto ao lado)', value: 'esquerda'},
  {title: 'Centro', value: 'centro'},
  {title: 'Direita (texto ao lado)', value: 'direita'},
]

export const blocoImagem = defineType({
  name: 'blocoImagem',
  title: 'Imagem',
  type: 'object',
  fields: [
    defineField({name: 'imagem', title: 'Imagem', type: 'imagemItem'}),
    defineField({
      name: 'tamanho',
      title: 'Tamanho',
      type: 'string',
      description:
        'Página inteira: a imagem ganha uma página só para ela (o texto continua na seguinte); use em infográficos densos. Automático: largura da coluna. Média: fotos e ilustrações. Pequena: fotos pequenas ou de baixa resolução. Se o infográfico é um passo a passo, prefira o bloco "Passo a passo".',
      options: {list: TAMANHOS_IMAGEM, layout: 'radio'},
      initialValue: 'auto',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'alinhamento',
      title: 'Alinhamento',
      type: 'string',
      description: 'Só faz diferença quando o tamanho não é Automático. Esquerda ou Direita: o texto dos blocos seguintes corre ao lado da imagem (no celular, fica embaixo).',
      options: {list: ALINHAMENTOS_IMAGEM, layout: 'radio'},
      initialValue: 'centro',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {legenda: 'imagem.legenda', fonte: 'imagem.fonte', media: 'imagem.imagem', tamanho: 'tamanho'},
    prepare: ({legenda, fonte, media, tamanho}) => ({
      title: legenda || 'Imagem',
      subtitle: [TAMANHOS_IMAGEM.find((t) => t.value === tamanho)?.title, fonte].filter(Boolean).join(' · '),
      media,
    }),
  },
})

/**
 * Passo a passo em HTML (no lugar de infográficos com texto dentro da imagem): passos
 * numerados com título, texto e um desenho opcional, mais lembretes curtos no final.
 * O texto fica legível em qualquer tela, segue a tipografia da cartilha e é editável.
 */
export const passoItem = defineType({
  name: 'passoItem',
  title: 'Passo',
  type: 'object',
  fields: [
    defineField({name: 'titulo', title: 'Título do passo', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'texto', title: 'Texto', type: 'portableText', validation: (rule) => rule.required()}),
    defineField({
      name: 'imagem',
      title: 'Desenho (opcional)',
      type: 'imagemItem',
      description: 'Desenho pequeno do passo, sem texto dentro. Aparece ao lado do texto (abaixo, no celular).',
    }),
  ],
  preview: {
    select: {title: 'titulo', media: 'imagem.imagem'},
  },
})

export const blocoPassos = defineType({
  name: 'blocoPassos',
  title: 'Passo a passo',
  type: 'object',
  fields: [
    defineField({name: 'titulo', title: 'Título', type: 'string', description: 'Ex.: "Como usar o preservativo externo".'}),
    defineField({
      name: 'passos',
      title: 'Passos',
      type: 'array',
      of: [defineArrayMember({type: 'passoItem'})],
      validation: (rule) => rule.required().min(2),
    }),
    defineField({
      name: 'lembretes',
      title: 'Lembretes (opcional)',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      description: 'Frases curtas que aparecem numa faixa "Importante" depois dos passos.',
    }),
    defineField({
      name: 'nota',
      title: 'Nota final (opcional)',
      type: 'portableText',
      description: 'Fecho do passo a passo, ex.: "A fecundação geralmente acontece na tuba uterina…".',
    }),
    defineField({name: 'fonte', title: 'Fonte', type: 'string'}),
  ],
  preview: {
    select: {titulo: 'titulo', passos: 'passos'},
    prepare: ({titulo, passos}) => ({
      title: titulo || 'Passo a passo',
      subtitle: `${(passos ?? []).length} passos`,
    }),
  },
})

export const blocoGradeImagens = defineType({
  name: 'blocoGradeImagens',
  title: 'Grade de imagens',
  type: 'object',
  fields: [
    defineField({
      name: 'imagens',
      title: 'Imagens',
      type: 'array',
      of: [defineArrayMember({type: 'imagemItem'})],
      validation: (rule) => rule.required().min(2),
    }),
    defineField({
      name: 'modo',
      title: 'Exibição',
      type: 'string',
      description: 'Grade lado a lado ou carrossel, quando não couber na página.',
      options: {
        list: [
          {title: 'Grade', value: 'grade'},
          {title: 'Carrossel', value: 'carrossel'},
        ],
        layout: 'radio',
      },
      initialValue: 'grade',
    }),
  ],
  preview: {
    select: {imagens: 'imagens', modo: 'modo', media: 'imagens.0.imagem'},
    prepare: ({imagens, modo, media}) => ({
      title: `Grade de imagens (${(imagens ?? []).length})`,
      subtitle: modo === 'carrossel' ? 'Carrossel' : 'Grade',
      media,
    }),
  },
})
