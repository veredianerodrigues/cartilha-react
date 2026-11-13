import {defineField, defineType} from 'sanity'

/** Uma obra da página "Referências". A ordem de exibição fica em `listaReferencias`. */
export const referencia = defineType({
  name: 'referencia',
  title: 'Referência',
  type: 'document',
  fields: [
    defineField({
      name: 'texto',
      title: 'Referência completa',
      type: 'portableText',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {blocks: 'texto'},
    prepare({blocks}) {
      const first = (blocks ?? []).find((b: {_type: string}) => b._type === 'block') as
        | {children?: {text?: string}[]}
        | undefined
      return {title: (first?.children ?? []).map((c) => c.text ?? '').join('').slice(0, 90)}
    },
  },
})

/** Singleton: define a ORDEM da lista (a posição = o número mostrado na citação). */
export const listaReferencias = defineType({
  name: 'listaReferencias',
  title: 'Referências (ordem)',
  type: 'document',
  fields: [
    defineField({
      name: 'itens',
      title: 'Referências, em ordem alfabética',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'referencia'}]}],
      validation: (rule) => rule.unique(),
    }),
  ],
  preview: {prepare: () => ({title: 'Referências (ordem)'})},
})
