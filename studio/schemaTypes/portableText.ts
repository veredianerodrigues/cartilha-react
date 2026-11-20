import {defineArrayMember, defineField, defineType} from 'sanity'
import {VARIANTES_TEXTO} from './blocos'

/**
 * Texto rico da cartilha. Substitui o HTML do Tiptap.
 *
 * - `citacao` (objeto inline): substitui <sup data-citation data-n="9,19">. Aponta para
 *   documentos `referencia` (id estável do Sanity), nunca para a posição na lista. O número
 *   exibido é calculado no frontend pela ordem atual da lista de referências.
 */
export const portableText = defineType({
  name: 'portableText',
  title: 'Texto',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      // O Portable Text não tem alinhamento por parágrafo: cada alinhamento é um estilo.
      styles: [
        {title: 'Parágrafo', value: 'normal'},
        {title: 'Parágrafo centralizado', value: 'centro'},
        {title: 'Parágrafo à direita', value: 'direita'},
        {title: 'Parágrafo justificado', value: 'justificado'},
        {title: 'Subtítulo', value: 'h3'},
        {title: 'Subtítulo menor', value: 'h4'},
        {title: 'Destaque (frase em evidência)', value: 'blockquote'},
      ],
      lists: [
        {title: 'Marcadores', value: 'bullet'},
        {title: 'Numerada', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Negrito', value: 'strong'},
          {title: 'Itálico', value: 'em'},
          {title: 'Sublinhado', value: 'underline'},
        ],
        annotations: [
          defineArrayMember({
            name: 'link',
            title: 'Link',
            type: 'object',
            fields: [
              defineField({
                name: 'href',
                title: 'Endereço',
                type: 'url',
                validation: (rule) => rule.uri({scheme: ['http', 'https']}),
              }),
            ],
          }),
        ],
      },
      // Citação como objeto inline (menu "Inserir"): não exige selecionar texto.
      of: [
        defineArrayMember({
          name: 'citacao',
          title: 'Citação (nº sobrescrito)',
          type: 'object',
          fields: [
            defineField({
              name: 'referencias',
              title: 'Referências citadas',
              type: 'array',
              of: [defineArrayMember({type: 'reference', to: [{type: 'referencia'}]})],
              validation: (rule) => rule.required().min(1),
            }),
          ],
          preview: {
            select: {refs: 'referencias'},
            prepare: ({refs}) => ({title: `Citação (${(refs ?? []).length} ref.)`}),
          },
        }),
      ],
    }),
    // Blocos dentro do texto (menu "Inserir").
    defineArrayMember({
      name: 'aviso',
      title: 'Caixa (Você sabia, Dica…)',
      type: 'object',
      fields: [
        defineField({
          name: 'variante',
          title: 'Tipo de caixa',
          type: 'string',
          options: {list: VARIANTES_TEXTO.filter((v) => v.value !== 'normal'), layout: 'dropdown'},
          initialValue: 'voceSabia',
          validation: (rule) => rule.required(),
        }),
        defineField({name: 'titulo', title: 'Título (opcional)', type: 'string'}),
        defineField({name: 'texto', title: 'Texto', type: 'text', rows: 4, validation: (rule) => rule.required()}),
      ],
      preview: {
        select: {titulo: 'titulo', texto: 'texto', variante: 'variante'},
        prepare: ({titulo, texto, variante}) => ({
          title: titulo || (texto ?? '').slice(0, 70) || 'Caixa',
          subtitle: VARIANTES_TEXTO.find((v) => v.value === variante)?.title,
        }),
      },
    }),
    defineArrayMember({
      name: 'separador',
      title: 'Separador',
      type: 'object',
      fields: [
        defineField({
          name: 'estilo',
          title: 'Estilo',
          type: 'string',
          options: {
            list: [
              {title: 'Linha', value: 'linha'},
              {title: 'Espaço em branco', value: 'espaco'},
            ],
            layout: 'radio',
          },
          initialValue: 'linha',
          validation: (rule) => rule.required(),
        }),
      ],
      preview: {
        select: {estilo: 'estilo'},
        prepare: ({estilo}) => ({title: estilo === 'espaco' ? 'Separador (espaço)' : 'Separador (linha)'}),
      },
    }),
    defineArrayMember({name: 'imagem', title: 'Imagem', type: 'imagemItem'}),
  ],
})
