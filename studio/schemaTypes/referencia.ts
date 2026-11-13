import {defineField, defineType} from 'sanity'

/** Uma obra da página "Referências". O site as ordena em ordem alfabética; a posição é o número da citação. */
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
