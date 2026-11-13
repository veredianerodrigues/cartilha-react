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

export const blocoImagem = defineType({
  name: 'blocoImagem',
  title: 'Imagem',
  type: 'object',
  fields: [defineField({name: 'imagem', title: 'Imagem', type: 'imagemItem'})],
  preview: {
    select: {legenda: 'imagem.legenda', fonte: 'imagem.fonte', media: 'imagem.imagem'},
    prepare: ({legenda, fonte, media}) => ({title: legenda || 'Imagem', subtitle: fonte, media}),
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
