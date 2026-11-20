import type {CSSProperties, ReactNode} from 'react'

/**
 * Tutorial de uso do Studio, exibido como ferramenta ("Tutorial") na barra superior.
 * O conteúdo reflete o schema em studio/schemaTypes: ao alterar campos, rótulos ou
 * opções de lá, atualize também este arquivo.
 *
 * Usa apenas elementos simples e `currentColor`/transparências, para herdar o tema
 * (claro ou escuro) do próprio Studio.
 */

const LINHA = '1px solid rgba(128, 128, 128, 0.35)'

const estilos: Record<string, CSSProperties> = {
  raiz: {height: '100%', overflowY: 'auto'},
  pagina: {display: 'grid', gridTemplateColumns: '220px minmax(0, 1fr)', gap: 40, maxWidth: 1100, margin: '0 auto', padding: '32px 24px 96px'},
  indice: {position: 'sticky', top: 24, alignSelf: 'start', display: 'grid', gap: 2, fontSize: 14},
  indiceRotulo: {fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.7, marginBottom: 6},
  indiceBotao: {all: 'unset', cursor: 'pointer', padding: '5px 8px', borderRadius: 6, display: 'flex', gap: 8, lineHeight: 1.35},
  corpo: {display: 'grid', gap: 48, minWidth: 0, fontSize: 15, lineHeight: 1.65},
  capitulo: {display: 'grid', gap: 14, scrollMarginTop: 24},
  h1: {fontSize: 26, fontWeight: 700, lineHeight: 1.25, margin: 0},
  h2: {fontSize: 20, fontWeight: 700, lineHeight: 1.3, margin: 0, paddingBottom: 8, borderBottom: '2px solid currentColor'},
  h3: {fontSize: 16, fontWeight: 600, margin: '8px 0 0'},
  p: {margin: 0, maxWidth: '72ch'},
  lista: {margin: 0, paddingLeft: '1.3em', display: 'grid', gap: 6, maxWidth: '72ch'},
  tabelaCaixa: {overflowX: 'auto', border: LINHA, borderRadius: 8},
  tabela: {borderCollapse: 'collapse', width: '100%', fontSize: 14, minWidth: 480},
  th: {textAlign: 'left', padding: '9px 12px', borderBottom: LINHA, fontSize: 12, letterSpacing: '0.05em', textTransform: 'uppercase', opacity: 0.75},
  td: {textAlign: 'left', padding: '9px 12px', borderBottom: LINHA, verticalAlign: 'top'},
  nota: {padding: '12px 14px', borderLeft: '4px solid #2276d2', background: 'rgba(128, 128, 128, 0.12)', borderRadius: '0 8px 8px 0', maxWidth: '72ch', fontSize: 14},
  aviso: {padding: '12px 14px', borderLeft: '4px solid #e8a33d', background: 'rgba(128, 128, 128, 0.12)', borderRadius: '0 8px 8px 0', maxWidth: '72ch', fontSize: 14},
  ui: {fontWeight: 600, border: LINHA, borderRadius: 5, padding: '0 6px', whiteSpace: 'nowrap', fontSize: '0.93em'},
}

const P = ({children}: {children: ReactNode}) => <p style={estilos.p}>{children}</p>
const H3 = ({children}: {children: ReactNode}) => <h3 style={estilos.h3}>{children}</h3>
const UI = ({children}: {children: ReactNode}) => <span style={estilos.ui}>{children}</span>
const UL = ({children}: {children: ReactNode}) => <ul style={estilos.lista}>{children}</ul>
const OL = ({children}: {children: ReactNode}) => <ol style={estilos.lista}>{children}</ol>
const Nota = ({titulo, children}: {titulo: string; children: ReactNode}) => (
  <div style={estilos.nota}>
    <strong>{titulo}. </strong>
    {children}
  </div>
)
const Aviso = ({titulo, children}: {titulo: string; children: ReactNode}) => (
  <div style={estilos.aviso}>
    <strong>{titulo}. </strong>
    {children}
  </div>
)

function Tabela({cabecalho, linhas}: {cabecalho: string[]; linhas: ReactNode[][]}) {
  return (
    <div style={estilos.tabelaCaixa}>
      <table style={estilos.tabela}>
        <thead>
          <tr>
            {cabecalho.map((c) => (
              <th key={c} style={estilos.th}>
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {linhas.map((linha, i) => (
            <tr key={i}>
              {linha.map((celula, j) => (
                <td key={j} style={estilos.td}>
                  {j === 0 ? <strong>{celula}</strong> : celula}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const Pergunta = ({pergunta, children}: {pergunta: string; children: ReactNode}) => (
  <details style={{border: LINHA, borderRadius: 8, padding: '10px 14px', maxWidth: '72ch'}}>
    <summary style={{cursor: 'pointer', fontWeight: 600}}>{pergunta}</summary>
    <p style={{margin: '8px 0 0', opacity: 0.9}}>{children}</p>
  </details>
)

/** Simula um formulário preenchido: `null` indica campo que deve ficar vazio. */
function Exemplo({origem, campos}: {origem: string; campos: [string, string | null][]}) {
  return (
    <div style={{border: LINHA, borderRadius: 8, padding: 16, display: 'grid', gap: 12, maxWidth: '72ch'}}>
      <div style={{fontSize: 13, opacity: 0.7}}>{origem}</div>
      {campos.map(([nome, valor]) => (
        <div key={nome} style={{display: 'grid', gap: 4}}>
          <span style={{fontWeight: 600, fontSize: 14}}>{nome}</span>
          {valor === null ? (
            <div style={{border: '1px dashed rgba(128, 128, 128, 0.5)', borderRadius: 6, padding: '8px 12px', fontSize: 14, opacity: 0.75}}>
              <strong>Deixar vazio.</strong>
            </div>
          ) : (
            <div style={{border: LINHA, borderRadius: 6, padding: '8px 12px', whiteSpace: 'pre-wrap', overflowWrap: 'anywhere'}}>{valor}</div>
          )}
        </div>
      ))}
    </div>
  )
}

type Capitulo ={id: string; titulo: string; conteudo: ReactNode}

const capitulos: Capitulo[] = [
  {
    id: 'estrutura',
    titulo: 'Estrutura da cartilha',
    conteudo: (
      <>
        <P>
          Cada página da cartilha corresponde a uma <strong>seção</strong>. A seção possui título, número de página e uma lista de{' '}
          <strong>blocos</strong>, exibidos na mesma ordem em que foram cadastrados. Existem quatro tipos de bloco:
        </P>
        <Tabela
          cabecalho={['Bloco', 'Finalidade']}
          linhas={[
            ['Texto', 'Parágrafos, subtítulos, listas e caixas de destaque, como “Saiba mais” e “Dica”. Aceita também caixas, separadores e imagens no meio do texto.'],
            ['Imagem', 'Uma imagem com legenda e fonte, com escolha de tipo, tamanho e alinhamento.'],
            ['Grade de imagens', 'Duas ou mais imagens, exibidas lado a lado ou em carrossel.'],
            ['Passo a passo / lista ilustrada', 'Passos numerados, cartões sem numeração ou grade de itens com foto. Substitui infográficos que traziam texto dentro da imagem.'],
          ]}
        />
        <Nota titulo="Leitura em formato de livro">
          O site divide o conteúdo de cada seção em folhas automaticamente: duas páginas lado a lado em telas grandes e uma página por vez em
          celulares. Não é necessário dividir o conteúdo manualmente. Basta cadastrar os blocos na ordem correta.
        </Nota>
        <P>
          As <strong>referências bibliográficas</strong> são cadastradas separadamente, uma por obra. Nos textos, apenas se indica o ponto em que
          cada citação ocorre; o número é calculado automaticamente (capítulo “Citações e referências”).
        </P>
        <Aviso titulo="Rascunho e publicação">
          Nenhuma alteração aparece no site até ser publicada com o botão <UI>Publish</UI>. Enquanto isso, o conteúdo permanece como rascunho.
        </Aviso>
      </>
    ),
  },
  {
    id: 'acesso',
    titulo: 'Acesso e painel inicial',
    conteudo: (
      <>
        <OL>
          <li>Aceite o convite recebido por e-mail do Sanity (botão <strong>Join project</strong>).</li>
          <li>Entre com a conta indicada no convite.</li>
          <li>Acesse o Studio pelo endereço informado pela equipe do projeto e salve-o nos favoritos do navegador.</li>
        </OL>
        <P>No menu lateral <strong>Cartilha</strong> há dois itens:</P>
        <Tabela
          cabecalho={['Item', 'Finalidade']}
          linhas={[
            ['Seções (arraste para ordenar)', 'Páginas da cartilha, na ordem em que são exibidas. É a área de uso mais frequente.'],
            ['Referências (obras)', 'Cadastro das obras citadas, com o texto completo de cada referência.'],
          ]}
        />
        <P>
          A barra superior contém também a ferramenta <strong>Tutorial</strong>, que reúne este guia, e a ferramenta <strong>Vision</strong>,
          destinada a consultas técnicas e que não precisa ser utilizada na edição de conteúdo.
        </P>
      </>
    ),
  },
  {
    id: 'secao',
    titulo: 'Criar e editar uma seção',
    conteudo: (
      <>
        <OL>
          <li>No menu <strong>Cartilha</strong>, abra <UI>Seções (arraste para ordenar)</UI>.</li>
          <li>Para criar uma seção, clique no botão <UI>+</UI> (criar). Para editar uma existente, selecione-a na lista.</li>
          <li>Preencha os campos descritos na tabela a seguir.</li>
          <li>Monte o conteúdo no campo <strong>Conteúdo</strong>, adicionando blocos (capítulo “Tipos de bloco”).</li>
          <li>Clique em <UI>Publish</UI>.</li>
        </OL>
        <Tabela
          cabecalho={['Campo', 'Preenchimento', 'Exemplo']}
          linhas={[
            ['Título', 'Título da página, conforme a cartilha. Obrigatório.', 'Apresentação'],
            ['Subtítulo (opcional)', 'Linha exibida abaixo do título. Deixar vazio se a página não possuir subtítulo.', '(vazio)'],
            [
              'Endereço (URL)',
              <>
                Nome da página no link do site. Obrigatório. Utilize o botão <UI>Generate</UI>, que o cria a partir do título, ou digite sem
                acentos, sem espaços e sem barra no início.
              </>,
              'apresentacao',
            ],
            ['Nº da página', 'Número impresso na cartilha.', '04'],
            ['Seção-mãe (opcional)', 'Preencher apenas quando a página for subseção de outra (capítulo “Ordem e subseções”).', '(vazio)'],
            ['Conteúdo', 'Lista de blocos da página.', '3 blocos de texto'],
          ]}
        />
        <Aviso titulo="Atenção ao Endereço (URL)">
          Endereços com barra inicial ou acentos impedem que o link do sumário abra a página. Após a publicação, evite alterá-lo: links já
          compartilhados deixam de funcionar.
        </Aviso>
      </>
    ),
  },
  {
    id: 'ordem',
    titulo: 'Ordem e subseções',
    conteudo: (
      <>
        <UL>
          <li>
            <strong>Ordem:</strong> a posição das seções no sumário e na navegação é definida arrastando-as na lista{' '}
            <UI>Seções (arraste para ordenar)</UI>. Não há campo numérico de ordem.
          </li>
          <li>
            <strong>Seção-mãe:</strong> uma seção que possui seção-mãe é exibida como subseção dela. Para criá-la, abra o campo{' '}
            <strong>Seção-mãe (opcional)</strong> e escolha a seção principal na lista. Quando a seção-mãe não tem blocos, sua página
            apresenta o índice das subseções.
          </li>
        </UL>
        <Nota titulo="Exemplo">
          “Métodos contraceptivos” (seção-mãe, sem blocos) com as subseções “Classificação dos métodos”, “Métodos de barreira” e “DIU”, cada
          uma com a seção-mãe “Métodos contraceptivos”.
        </Nota>
      </>
    ),
  },
  {
    id: 'blocos',
    titulo: 'Tipos de bloco',
    conteudo: (
      <>
        <P>
          No campo <strong>Conteúdo</strong> da seção, clique em <UI>Add item</UI> e escolha o tipo de bloco. Os blocos são exibidos na página
          na ordem da lista. Para reordenar, arraste o bloco pelo ícone de pontos à esquerda; para excluir, use o menu <UI>⋯</UI> do bloco.
        </P>

        <H3>Campo comum a todos os blocos: Na paginação</H3>
        <P>
          O site divide o conteúdo em folhas automaticamente, e a divisão varia conforme o tamanho da tela. Para evitar que elementos
          relacionados sejam separados, utilize o campo <strong>Na paginação</strong>, ao final de cada bloco.
        </P>
        <Tabela
          cabecalho={['Opção', 'Efeito', 'Quando usar']}
          linhas={[
            ['Automático', 'O site decide onde virar a folha.', 'Maioria dos blocos. É o valor padrão.'],
            [
              'Manter junto com o bloco seguinte',
              'Este bloco e o seguinte nunca ficam em folhas diferentes. Se o seguinte também estiver marcado, os três permanecem juntos, e assim sucessivamente.',
              'Frase curta que apresenta uma imagem ou um passo a passo; subtítulo seguido do parágrafo correspondente.',
            ],
            ['Começar numa folha nova', 'O bloco sempre inicia uma folha.', 'Novo assunto dentro da seção ou bloco que deve ficar sozinho no alto da folha.'],
          ]}
        />
        <Aviso titulo="Uso moderado">
          Um grupo grande demais não cabe em uma folha e acaba dividido do mesmo modo. Una apenas o que precisa permanecer junto, em geral
          dois blocos, e confira o resultado no computador e no celular.
        </Aviso>

        <H3>Bloco de texto</H3>
        <Tabela
          cabecalho={['Campo', 'Preenchimento']}
          linhas={[
            ['Tipo de caixa', 'Obrigatório. Define o visual do bloco (tabela a seguir).'],
            ['Título do bloco (opcional)', 'Título em destaque no alto da caixa, por exemplo “Saiba mais!!!”. Deixar vazio se não houver.'],
            ['Conteúdo', 'Texto do bloco. É possível colar vários parágrafos de uma só vez; cada linha em branco separa um parágrafo.'],
            ['Fonte (opcional)', 'Crédito em letra pequena abaixo da caixa, por exemplo “Fonte: Ministério da Saúde (2022).”.'],
          ]}
        />
        <Tabela
          cabecalho={['Tipo de caixa', 'Uso recomendado']}
          linhas={[
            ['Texto normal', 'Padrão da maior parte da cartilha: texto corrido, sem caixa. Quando o título do bloco é preenchido, ele passa a ser exibido como subtítulo da página.'],
            ['Saiba mais', 'Informação complementar, como definições e dados.'],
            ['Você sabia', 'Curiosidades.'],
            ['Olha só', 'Destaques em tom de conversa direta com o leitor.'],
            ['Fique atenta / Fique ligado', 'Alertas e cuidados.'],
            ['Dica', 'Sugestões práticas.'],
            ['Importante', 'Informações que não podem passar despercebidas.'],
          ]}
        />
        <Nota titulo="Primeiro bloco da página">
          Quando o primeiro bloco da seção é um texto, seu primeiro parágrafo é exibido em tamanho ligeiramente maior, como abertura da página.
          Utilize esse recurso para a frase de abertura.
        </Nota>

        <H3>Bloco de imagem</H3>
        <OL>
          <li>Em <strong>Imagem</strong>, envie o arquivo (<UI>Upload</UI> ou arrastando-o) e escolha a foto ou ilustração.</li>
          <li>Escolha o <strong>Tipo de imagem</strong>, que define a moldura (tabela a seguir).</li>
          <li>
            Preencha o <strong>Texto alternativo</strong>: frase que descreve a imagem para pessoas que não podem vê-la. Se a imagem contiver
            texto, reproduza-o aqui. O Studio emite um aviso quando o campo fica vazio.
          </li>
          <li>Preencha a <strong>Legenda</strong> (opcional), por exemplo “Figura: Fluxo hormonal na puberdade.”.</li>
          <li>Preencha a <strong>Fonte</strong> (opcional), por exemplo “Banco de imagens Canva.”. Ela é exibida em itálico abaixo da imagem.</li>
          <li>Escolha o <strong>Tamanho</strong> e o <strong>Alinhamento</strong>.</li>
        </OL>
        <Tabela
          cabecalho={['Tipo de imagem', 'Moldura no site', 'Indicado para']}
          linhas={[
            ['Ilustração / infográfico', 'Imagem inteira em cartão branco com borda.', 'Anatomia, infográficos e desenhos. Nada é cortado. É o valor padrão.'],
            [
              'Retrato (pessoa, de preferência sem fundo)',
              'Pessoa sobre uma forma verde-água, ligeiramente mais baixa que as demais imagens.',
              'Apenas fotos de pessoa já recortada, sem fundo (ou com fundo branco). Se a foto tem cenário ou fundo colorido, use Cena.',
            ],
            ['Cena (grupo, objetos, lugar)', 'Foto inteira, sem borda e sem espaço ao redor, com cantos em forma de folha. A proporção é mantida.', 'Fotos em geral: pessoas com fundo, grupos, objetos e lugares.'],
          ]}
        />
        <Tabela
          cabecalho={['Tamanho', 'Largura na página', 'Indicado para']}
          linhas={[
            ['Página inteira', 'A imagem ocupa uma folha inteira; o texto termina antes e continua na folha seguinte.', 'Infográficos com muito texto, que precisam de espaço para ficar legíveis.'],
            ['Automático (largura total)', 'Toda a coluna de texto.', 'Imagens que cabem na largura da página. É o valor padrão.'],
            ['Média (até 440 px)', 'Até 440 px; metade da coluna quando posicionada ao lado do texto.', 'Fotos e ilustrações.'],
            ['Pequena (até 260 px)', 'Até 260 px; 40% da coluna quando posicionada ao lado do texto.', 'Fotos pequenas ou de baixa resolução, para evitar perda de qualidade.'],
          ]}
        />
        <Tabela
          cabecalho={['Alinhamento', 'Resultado']}
          linhas={[
            ['Esquerda (texto ao lado)', 'A imagem fica à esquerda e o texto dos blocos seguintes corre ao lado dela.'],
            ['Centro', 'A imagem é centralizada, com texto acima e abaixo. É o valor padrão.'],
            ['Direita (texto ao lado)', 'Igual ao alinhamento à esquerda, com a imagem à direita.'],
          ]}
        />
        <Nota titulo="Texto ao lado da imagem">
          Posicione o bloco de imagem imediatamente antes do bloco de texto que deve acompanhá-la, com tamanho Média ou Pequena. Em celulares, a
          imagem ocupa sempre a linha inteira, com o texto abaixo. No tamanho Automático, o alinhamento não tem efeito.
        </Nota>

        <H3>Bloco de passo a passo / lista ilustrada</H3>
        <P>
          Recomendado no lugar de infográficos com texto dentro da imagem: o texto é digitado no Studio, permanece legível em qualquer tela e
          pode ser corrigido sem refazer a imagem.
        </P>
        <OL>
          <li>
            Em <strong>Título</strong> (opcional), informe o nome do bloco. Não repita o título da página: se o bloco vem logo abaixo dele,
            deixe o campo vazio.
          </li>
          <li>Em <strong>Estilo</strong>, escolha como os itens são exibidos (tabela a seguir).</li>
          <li>
            Em <strong>Passos</strong> (mínimo de dois), adicione um item para cada passo, com <strong>Título do passo</strong> (obrigatório),{' '}
            <strong>Texto</strong> e <strong>Desenho (opcional)</strong>. O desenho deve ser pequeno e não conter texto.
          </li>
          <li>
            Somente no estilo Grade, o campo <strong>Imagem ao lado (opcional)</strong> posiciona uma imagem na primeira coluna (25% da
            largura), com a grade ao lado. Prefira imagem em pé, sem fundo ou com fundo branco.
          </li>
          <li>Em <strong>Lembretes (opcional)</strong>, escreva frases curtas, exibidas em uma faixa “Importante” após os passos.</li>
          <li>Em <strong>Nota final (opcional)</strong>, escreva o fecho do bloco, exibido em caixa azul-clara. Em <strong>Fonte</strong>, informe o crédito, se houver.</li>
        </OL>
        <Tabela
          cabecalho={['Estilo', 'Apresentação', 'Quando usar']}
          linhas={[
            ['Passos numerados (sequência)', 'Cartões coloridos com número em um círculo e o desenho ao lado do texto.', 'Quando a ordem importa: uso de um método, etapas da fecundação, puerpério.'],
            ['Lista de cartões (sem número)', 'Os mesmos cartões, sem numeração.', 'Itens sem ordem definida: tipos de DIU, comparação de métodos, direitos.'],
            ['Grade de itens com foto (ex.: sintomas)', 'Fotos redondas pequenas com legenda, três ou mais por linha.', 'Listas curtas e visuais, como sintomas. O Título do passo serve de legenda e o Texto pode ficar vazio.'],
          ]}
        />

        <H3>Bloco de grade de imagens</H3>
        <OL>
          <li>
            Em <strong>Imagens</strong>, adicione um item para cada imagem (mínimo de duas). Cada item possui imagem, tipo, texto alternativo,
            legenda e fonte, como no bloco de imagem.
          </li>
          <li>
            Em <strong>Exibição</strong>, escolha <strong>Grade</strong> (imagens lado a lado) ou <strong>Carrossel</strong> (as imagens são
            passadas com as setas ou arrastando).
          </li>
        </OL>
        <Nota titulo="Como escolher">
          Use Grade para poucas imagens que cabem juntas e Carrossel quando houver várias imagens ou quando elas ficariam pequenas demais lado
          a lado.
        </Nota>
      </>
    ),
  },
  {
    id: 'formatacao',
    titulo: 'Formatação do texto',
    conteudo: (
      <>
        <P>No campo <strong>Conteúdo</strong> de um bloco de texto, a barra de ferramentas do editor oferece:</P>
        <Tabela
          cabecalho={['Recurso', 'Como usar']}
          linhas={[
            ['Negrito, itálico e sublinhado', 'Selecione o trecho e clique no botão correspondente (ou use Ctrl+B, Ctrl+I e Ctrl+U).'],
            ['Link', 'Selecione o trecho, clique em Link e informe o endereço completo, iniciado por http:// ou https://.'],
            ['Lista com marcadores ou numerada', 'Clique no botão da lista e escreva um item por linha.'],
            ['Citação (número sobrescrito)', 'Veja o capítulo “Citações e referências”.'],
          ]}
        />

        <H3>Estilos de parágrafo</H3>
        <P>
          Coloque o cursor no parágrafo e escolha o estilo no menu suspenso à esquerda da barra (ele mostra <UI>Parágrafo</UI>). O estilo
          vale para o parágrafo inteiro.
        </P>
        <Tabela
          cabecalho={['Estilo', 'Quando usar']}
          linhas={[
            ['Parágrafo', 'Texto corrido, alinhado à esquerda. É o padrão e serve para quase tudo.'],
            ['Parágrafo centralizado / à direita / justificado', 'Muda só o alinhamento do parágrafo. Use com moderação: na cartilha, o texto alinhado à esquerda é o mais fácil de ler.'],
            ['Subtítulo', 'Divide um texto longo em partes, dentro do mesmo bloco. Fica abaixo do Título do bloco na hierarquia.'],
            ['Subtítulo menor', 'Um nível abaixo do Subtítulo, para subdivisões dentro de uma parte.'],
            ['Destaque (frase em evidência)', 'Uma frase curta que merece atenção, como um depoimento ou uma ideia-chave. Aparece maior, em itálico, com um fio azul à esquerda.'],
          ]}
        />
        <P>Subtítulos e destaque ficam sempre alinhados à esquerda; o alinhamento existe apenas para parágrafos.</P>

        <H3>Itens inseridos no meio do texto</H3>
        <P>
          Coloque o cursor numa linha vazia, abra o menu <UI>Insert</UI> da barra do editor e escolha o item. Para editar depois, clique
          sobre ele; para remover, use o menu <UI>⋯</UI> do item.
        </P>
        <Tabela
          cabecalho={['Item', 'Quando usar']}
          linhas={[
            ['Caixa (Você sabia, Dica…)', 'Uma caixa curta no meio do texto, com o mesmo visual das caixas do bloco de texto. Escolha o tipo, um título opcional e o texto (sem negrito nem links). Para uma caixa longa ou com formatação, prefira um bloco de texto próprio com o Tipo de caixa.'],
            ['Separador', 'Linha: separa assuntos dentro do texto. Espaço em branco: apenas afasta os trechos.'],
            ['Imagem', 'Uma imagem no meio do texto, com os mesmos campos do bloco de imagem (tipo, texto alternativo, legenda e fonte). Ocupa a largura do texto. Para escolher tamanho, alinhamento ou página inteira, use o bloco de imagem.'],
          ]}
        />
        <UL>
          <li>Ao colar texto de um arquivo do Word, confira o resultado: podem surgir parágrafos vazios entre os trechos, que devem ser apagados.</li>
          <li>O título de uma caixa (por exemplo, “Saiba mais!!!”) deve ser informado no campo <strong>Título do bloco</strong>, e não dentro do texto.</li>
          <li>Os mesmos recursos aparecem no texto das referências, mas lá use apenas parágrafo, itálico e link, para manter o formato ABNT.</li>
        </UL>
      </>
    ),
  },
  {
    id: 'referencias',
    titulo: 'Citações e referências',
    conteudo: (
      <>
        <P>
          O número exibido no texto (por exemplo, <sup>3</sup>) corresponde à posição da obra na lista final de referências, que é organizada
          automaticamente em <strong>ordem alfabética</strong>. Por isso, o procedimento tem duas etapas: cadastrar a obra e, em seguida,
          indicar a citação no texto.
        </P>

        <H3>Cadastrar uma nova referência</H3>
        <OL>
          <li>No menu <strong>Cartilha</strong>, abra <UI>Referências (obras)</UI> e clique em <UI>+</UI>.</li>
          <li>
            Em <strong>Referência completa</strong>, cole o texto da referência. Aplique itálico ao título da obra ou do periódico, como nas
            demais referências, e transforme endereços eletrônicos em link.
          </li>
          <li>Clique em <UI>Publish</UI>. Não é necessário informar a posição: a obra entra na lista na ordem alfabética.</li>
        </OL>

        <H3>Indicar uma citação no texto</H3>
        <OL>
          <li>No bloco de texto, posicione o cursor no ponto exato em que o número deve aparecer, normalmente logo após o ponto final da frase.</li>
          <li>Na barra do editor, abra o menu <UI>Insert</UI> e escolha <UI>Citação (nº sobrescrito)</UI>.</li>
          <li>Em <strong>Referências citadas</strong>, adicione a obra. Para citar duas ou mais obras no mesmo ponto (por exemplo, 22,23), adicione cada uma delas.</li>
          <li>Feche a janela e publique. O número aparece no site e, ao ser clicado, leva o leitor à lista de referências.</li>
        </OL>
        <Aviso titulo="Numeração automática">
          Ao incluir uma obra ou alterar o texto de uma referência existente, a ordem alfabética é recalculada e os números de todas as
          citações são atualizados. Não digite números manualmente no texto.
        </Aviso>
        <Nota titulo="Página de Referências">
          A seção “Referências” (endereço <strong>referencias</strong>) exibe a lista completa e não precisa ser editada: ela acompanha as obras
          cadastradas.
        </Nota>
      </>
    ),
  },
  {
    id: 'exemplo',
    titulo: 'Exemplo de preenchimento (dados fictícios)',
    conteudo: (
      <>
        <P>
          O exemplo a seguir usa <strong>dados fictícios</strong>, apenas para ilustrar como cada campo deve ser preenchido. Os textos não
          pertencem à cartilha e não devem ser copiados para o conteúdo real.
        </P>

        <H3>Campos da seção</H3>
        <Exemplo
          origem="Cartilha → Seções (arraste para ordenar) → +"
          campos={[
            ['Título', 'Cuidados na primeira consulta'],
            ['Subtítulo (opcional)', null],
            ['Endereço (URL)', 'cuidados-primeira-consulta'],
            ['Nº da página', '12'],
            ['Seção-mãe (opcional)', null],
          ]}
        />

        <H3>Bloco 1: texto de abertura</H3>
        <Exemplo
          origem="Conteúdo → Add item → Texto"
          campos={[
            ['Tipo de caixa', 'Texto normal'],
            ['Título do bloco (opcional)', null],
            ['Conteúdo', 'A primeira consulta é um momento para tirar dúvidas e conhecer o serviço de saúde.\n\nNão é preciso ter pressa nem medo de perguntar.'],
            ['Fonte (opcional)', null],
            ['Na paginação', 'Automático'],
          ]}
        />

        <H3>Bloco 2: caixa de destaque</H3>
        <Exemplo
          origem="Conteúdo → Add item → Texto"
          campos={[
            ['Tipo de caixa', 'Dica'],
            ['Título do bloco (opcional)', 'Dica!'],
            ['Conteúdo', 'Leve a caderneta de vacinação e anote as perguntas antes da consulta.'],
            ['Fonte (opcional)', 'Fonte: texto ilustrativo, sem valor informativo.'],
            ['Na paginação', 'Manter junto com o bloco seguinte'],
          ]}
        />

        <H3>Bloco 3: imagem</H3>
        <Exemplo
          origem="Conteúdo → Add item → Imagem"
          campos={[
            ['Imagem', '(arquivo enviado pelo botão Upload)'],
            ['Tipo de imagem', 'Cena (grupo, objetos, lugar)'],
            ['Texto alternativo', 'Duas pessoas conversando em uma sala de atendimento.'],
            ['Legenda', 'Figura: Atendimento na unidade de saúde.'],
            ['Fonte', 'Banco de imagens (exemplo).'],
            ['Tamanho', 'Média (até 440 px)'],
            ['Alinhamento', 'Direita (texto ao lado)'],
            ['Na paginação', 'Automático'],
          ]}
        />

        <H3>Bloco 4: passo a passo</H3>
        <Exemplo
          origem="Conteúdo → Add item → Passo a passo / lista ilustrada"
          campos={[
            ['Título', null],
            ['Estilo', 'Passos numerados (sequência)'],
            ['Passos', 'Passo 1: Agendar. Passo 2: Comparecer no dia marcado. Passo 3: Retornar para buscar resultados.'],
            ['Lembretes (opcional)', 'Levar documento com foto.'],
            ['Nota final (opcional)', null],
          ]}
        />

        <H3>Referência (obra)</H3>
        <Exemplo
          origem="Cartilha → Referências (obras) → +"
          campos={[['Referência completa', 'SOBRENOME, Nome. Título da obra fictícia. Cidade: Editora, 2020.']]}
        />
        <P>
          Em seguida, no bloco de texto, insira a citação pelo menu <UI>Insert</UI> → <UI>Citação (nº sobrescrito)</UI> e selecione a obra
          cadastrada. Por fim, clique em <UI>Publish</UI> e confira a página no site.
        </P>
      </>
    ),
  },
  {
    id: 'publicar',
    titulo: 'Publicar e conferir',
    conteudo: (
      <>
        <OL>
          <li>Ao concluir a edição, clique em <UI>Publish</UI> no rodapé da janela do documento. Enquanto o botão estiver ativo, há alterações que ainda não estão no site.</li>
          <li>Aguarde alguns segundos e abra a página no site para conferir título, número da página, blocos, imagens, legendas e citações.</li>
          <li>Se a alteração não aparecer, atualize a página do navegador (Ctrl+F5) antes de investigar outra causa.</li>
        </OL>
        <Nota titulo="Correção após a publicação">
          Edite o conteúdo e publique novamente. A versão anterior permanece disponível no histórico do documento (ícone de relógio), caso seja
          necessário restaurá-la.
        </Nota>

        <H3>Como folhear a cartilha para conferir</H3>
        <Tabela
          cabecalho={['Para', 'Como fazer']}
          linhas={[
            ['Virar a página', 'Botões Anterior e Próximo na barra inferior, setas ← → do teclado ou deslizar o dedo para o lado em celulares.'],
            ['Saber a posição', 'O contador na barra indica a folha da seção (por exemplo, “2 de 4”). A linha azul acima dele mostra o avanço na cartilha inteira.'],
            ['Ir para outra seção', 'Na última folha, Próximo abre a seção seguinte; o botão ☰ abre o sumário.'],
          ]}
        />
        <Nota titulo="Confira em mais de um tamanho de tela">
          No computador são exibidas duas páginas lado a lado; no celular, uma por vez, e por isso a mesma seção tem mais folhas. Se algum
          elemento ficou separado daquilo que deveria acompanhar, utilize o campo <strong>Na paginação</strong> do bloco.
        </Nota>
      </>
    ),
  },
  {
    id: 'checklist',
    titulo: 'Lista de verificação antes de concluir',
    conteudo: (
      <UL>
        <li>Endereço (URL) sem barra e sem acentos.</li>
        <li>Nº da página igual ao da cartilha impressa.</li>
        <li>Cada bloco de texto com o tipo de caixa adequado.</li>
        <li>Tipo de imagem escolhido em todas as imagens (fotos com fundo como Cena).</li>
        <li>Nenhum infográfico com texto pequeno demais: refeito como Passo a passo ou configurado como Página inteira.</li>
        <li>Nenhum título repetido logo abaixo do título da página.</li>
        <li>Texto alternativo preenchido em todas as imagens.</li>
        <li>Fonte preenchida nas imagens que exigem crédito.</li>
        <li>Citações indicadas e obras cadastradas e publicadas.</li>
        <li>Todas as alterações publicadas.</li>
      </UL>
    ),
  },
  {
    id: 'duvidas',
    titulo: 'Perguntas frequentes',
    conteudo: (
      <>
        <Pergunta pergunta="Editei o conteúdo, mas o site não mudou.">
          Confirme que o botão Publish foi acionado. Em seguida, atualize a página do site com Ctrl+F5. Se persistir, aguarde cerca de um minuto e tente novamente.
        </Pergunta>
        <Pergunta pergunta="O link do sumário não abre a seção.">
          Em geral, a causa é o Endereço (URL) da seção, que não pode ter barra inicial, acentos ou espaços. Corrija o campo e publique.
        </Pergunta>
        <Pergunta pergunta="A imagem ficou grande ou pequena demais.">
          Altere o Tamanho no bloco de imagem (Automático, Média ou Pequena). Para que o texto corra ao lado, utilize também o alinhamento Esquerda ou Direita.
        </Pergunta>
        <Pergunta pergunta="O texto não ficou ao lado da imagem.">
          O tamanho deve ser Média ou Pequena, o alinhamento Esquerda ou Direita, e o bloco de texto deve vir imediatamente após o bloco de
          imagem. Caixas coloridas (Saiba mais, Dica etc.) ficam ao lado da imagem, sem passar por baixo dela; se não houver largura suficiente, descem para depois da imagem.
        </Pergunta>
        <Pergunta pergunta="Uma imagem ficou sozinha em uma folha.">
          É o comportamento do tamanho Página inteira. Se não for a intenção, altere o tamanho para Automático.
        </Pergunta>
        <Pergunta pergunta="A imagem aparece com a moldura errada.">
          Altere o Tipo de imagem: Ilustração para desenhos e infográficos, Retrato para pessoas recortadas sem fundo e Cena para as demais fotos.
        </Pergunta>
        <Pergunta pergunta="A foto aparece dentro de um cartão com borda.">
          O Tipo de imagem está como Ilustração. Para fotos, escolha Cena: a foto fica sem borda e sem espaço ao redor.
        </Pergunta>
        <Pergunta pergunta="Sobrou espaço em branco no fim de uma folha.">
          Caixas coloridas, imagens, passos e grades não se dividem entre duas folhas. Quando não cabem no espaço restante, passam inteiros
          para a folha seguinte. Trata-se do comportamento normal; se o espaço for excessivo, altere a ordem dos blocos ou reduza o tamanho da imagem.
        </Pergunta>
        <Pergunta pergunta="Um parágrafo ou frase ficou sozinho em uma folha, longe do que deveria acompanhar.">
          No bloco que deve ficar junto do seguinte, altere Na paginação para “Manter junto com o bloco seguinte”, publique e confira em mais
          de um tamanho de tela.
        </Pergunta>
        <Pergunta pergunta="Um assunto deve começar no alto de uma folha.">
          No primeiro bloco do assunto, altere Na paginação para “Começar numa folha nova”.
        </Pergunta>
        <Pergunta pergunta="O texto de um infográfico ficou pequeno demais para ler.">
          A melhor solução é refazê-lo com o bloco Passo a passo / lista ilustrada. Se o infográfico precisar continuar como imagem (um
          diagrama com rótulos, por exemplo), utilize o tamanho Página inteira.
        </Pergunta>
        <Pergunta pergunta="Qual estilo escolher no passo a passo?">
          Passos numerados quando a ordem importa; Lista de cartões para itens sem ordem, como tipos ou opções; Grade para vários itens curtos com foto, como sintomas.
        </Pergunta>
        <Pergunta pergunta="O título aparece duas vezes seguidas.">
          O título do bloco é igual ao título da página. Apague o campo Título do bloco e publique.
        </Pergunta>
        <Pergunta pergunta="A citação aparece sem número ou com número errado.">
          A obra citada precisa estar cadastrada e publicada em Referências (obras). O número é a posição dela na lista alfabética e muda
          quando obras são incluídas ou alteradas.
        </Pergunta>
        <Pergunta pergunta="Apareceu um parágrafo vazio no meio do texto.">
          Costuma ocorrer ao colar texto de outro arquivo. Clique no parágrafo vazio e apague-o.
        </Pergunta>
        <Pergunta pergunta="Um conteúdo foi apagado por engano.">
          Use Ctrl+Z imediatamente. Se já houve publicação, abra o histórico do documento (ícone de relógio) e restaure a versão anterior.
        </Pergunta>
      </>
    ),
  },
]

export function TutorialTool() {
  const ir = (id: string) => document.getElementById(`tutorial-${id}`)?.scrollIntoView({behavior: 'smooth', block: 'start'})

  return (
    <div style={estilos.raiz}>
      <div style={estilos.pagina}>
        <nav style={estilos.indice} aria-label="Capítulos do tutorial">
          <div style={estilos.indiceRotulo}>Neste tutorial</div>
          {capitulos.map((c, i) => (
            <button key={c.id} type="button" style={estilos.indiceBotao} onClick={() => ir(c.id)}>
              <span style={{opacity: 0.65, minWidth: '1.4em'}}>{i + 1}</span>
              {c.titulo}
            </button>
          ))}
        </nav>

        <main style={estilos.corpo}>
          <header style={{display: 'grid', gap: 12}}>
            <div style={{fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.7}}>
              Cartilha · Gravidez na adolescência
            </div>
            <h1 style={estilos.h1}>Tutorial do Studio: como cadastrar o conteúdo</h1>
            <P>
              Este guia descreve o procedimento para inserir e editar textos, imagens e referências da cartilha no Studio. Na primeira
              utilização, recomenda-se seguir a ordem dos capítulos; depois, o índice permite consultar diretamente o assunto desejado.
            </P>
          </header>

          {capitulos.map((c, i) => (
            <section key={c.id} id={`tutorial-${c.id}`} style={estilos.capitulo}>
              <h2 style={estilos.h2}>
                {i + 1}. {c.titulo}
              </h2>
              {c.conteudo}
            </section>
          ))}
        </main>
      </div>
    </div>
  )
}
