import {defineArrayMember, defineField, defineType} from 'sanity'

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
      styles: [{title: 'Parágrafo', value: 'normal'}],
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
  ],
})
