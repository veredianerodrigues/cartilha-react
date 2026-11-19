import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Cartilha')
    .items([
      // Arraste as seções para mudar a ordem da cartilha.
      orderableDocumentListDeskItem({type: 'secao', title: 'Seções (arraste para ordenar)', S, context}),
      // Lista comum, com campo de busca, para localizar uma seção pelo título.
      S.documentTypeListItem('secao')
        .title('Buscar seções')
        .child(
          S.documentTypeList('secao')
            .title('Buscar seções')
            .defaultOrdering([{field: 'orderRank', direction: 'asc'}]),
        ),
      S.divider(),
      S.documentTypeListItem('referencia').title('Referências (obras)'),
    ])
