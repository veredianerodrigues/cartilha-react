import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Cartilha')
    .items([
      S.listItem()
        .title('Seções')
        .child(
          S.documentList()
            .title('Seções (na ordem da cartilha)')
            .filter('_type == "secao"')
            .defaultOrdering([{field: 'ordem', direction: 'asc'}]),
        ),
      S.divider(),
      // Singleton: define a ordem da lista (a posição = o número mostrado na citação).
      S.listItem()
        .title('Referências (ordem)')
        .child(S.document().schemaType('listaReferencias').documentId('lista-referencias')),
      S.documentTypeListItem('referencia').title('Referências (obras)'),
    ])
