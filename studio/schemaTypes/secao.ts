import {defineArrayMember, defineField, defineType} from 'sanity'
import {orderRankField} from '@sanity/orderable-document-list'

/**
 * Uma seção da cartilha = um documento. O conteúdo é uma lista ordenável de blocos:
 * texto, imagem ou grade de imagens.
 */
export const secao = defineType({
  name: 'secao',
  title: 'Seção',
  type: 'document',
  fields: [
    defineField({
      name: 'titulo',
      title: 'Título',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitulo',
      title: 'Subtítulo (opcional)',
      type: 'string',
      description: 'Aparece logo abaixo do título da página.',
    }),
    defineField({
      name: 'slug',
      title: 'Endereço (URL)',
      type: 'slug',
      options: {source: 'titulo', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'numeroPagina',
      title: 'Nº da página',
      type: 'string',
      description: 'Como aparece impresso, ex.: "05".',
    }),
    // Posição na cartilha: definida arrastando as seções na lista (Cartilha → Seções).
    orderRankField({type: 'secao'}),
    defineField({
      name: 'pai',
      title: 'Seção-mãe (opcional)',
      type: 'reference',
      to: [{type: 'secao'}],
      description: 'Use para agrupar seções, ex.: Métodos de barreira dentro de Métodos contraceptivos.',
      options: {filter: ({document}) => ({filter: '_id != $id', params: {id: document._id}})},
    }),
    defineField({
      name: 'blocos',
      title: 'Conteúdo',
      type: 'array',
      of: [
        defineArrayMember({type: 'blocoTexto'}),
        defineArrayMember({type: 'blocoImagem'}),
        defineArrayMember({type: 'blocoGradeImagens'}),
        defineArrayMember({type: 'blocoPassos'}),
      ],
    }),
  ],
  preview: {
    select: {titulo: 'titulo', subtitulo: 'subtitulo', numero: 'numeroPagina'},
    prepare: ({titulo, subtitulo, numero}) => ({
      title: titulo,
      subtitle: [numero ? `Página ${numero}` : null, subtitulo]
        .filter(Boolean)
        .join(' · '),
    }),
  },
})
