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
      S.documentTypeListItem('referencia').title('Referências (obras)'),
    ])
