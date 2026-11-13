/**
 * Segundo lote da troca de infográficos por HTML (Design System "Cartilha"):
 * - viram passo a passo / lista / grade: p. 13, 15 (DIU e Implanon), 16 (tipos de
 *   anticoncepcionais e anel/adesivo/pílula do dia seguinte), 18 (direitos) e
 *   19 (1º, 2º e 3º trimestre e puerpério), com os desenhos recortados em
 *   scripts/infograficos/;
 * - ficam como imagem em "Página inteira": p. 5, 8 e 9 (diagramas) e os infográficos
 *   mantidos das p. 8 e 10.
 *
 * Rodar dentro de studio/:
 *   npx sanity exec scripts/migrar-infograficos-2.ts --with-user-token            (só mostra)
 *   npx sanity exec scripts/migrar-infograficos-2.ts --with-user-token -- --aplicar
 *
 * Grava direto nos documentos publicados; para desfazer, use o Histórico de cada
 * documento no Studio.
 */
import {aplicar, chave, chavesDe, client, imagem, itens, semRascunhos, textoPT} from './migracao'

const FONTE_MS_SBP = 'Fonte: Produzido por inteligência artificial a partir de Ministério da Saúde (2022) e SBP (2023).'
const FONTE_OMS_SBP = 'Fonte: Produzido por inteligência artificial a partir de OMS (2022) e SBP (2023).'
const FONTE_GESTACAO =
  'Fonte: Produzido por inteligência artificial a partir de diretrizes do Ministério da Saúde (2024, 2026) e Unicef Brasil.'

const texto = (titulo: string | null, variante: string, ...linhas: string[]) => ({
  _type: 'blocoTexto',
  _key: chave(),
  variante,
  ...(titulo ? {titulo} : {}),
  conteudo: textoPT(...linhas),
})

const figura = async (
  arquivo: string,
  alt: string,
  opcoes: {tipo?: string; legenda?: string; fonte?: string; tamanho?: string; alinhamento?: string} = {},
) => ({
  _type: 'blocoImagem',
  _key: chave(),
  imagem: await imagem(arquivo, alt, opcoes),
  tamanho: opcoes.tamanho ?? 'auto',
  alinhamento: opcoes.alinhamento ?? 'centro',
})

const gestante = (arquivo: string, alt: string) =>
  figura(arquivo, alt, {tipo: 'retrato', tamanho: 'pequena', alinhamento: 'direita'})

// Cada chave de bloco antigo -> lista de blocos novos, na ordem em que entram.
async function trocas(): Promise<Record<string, Record<string, unknown[]>>> {
  return {
    // ---- p. 13: classificação dos métodos ----------------------------------------
    'secao-classificacao-metodos': {
      k6m: [
        {
          _type: 'blocoPassos',
          _key: chave(),
          titulo: 'É importante saber',
          estilo: 'lista',
          passos: await itens([
            {
              titulo: 'Métodos comportamentais (como a tabelinha)',
              texto: ['**Têm limitações** para adolescentes, pois os ciclos menstruais costumam ser irregulares.'],
              arquivo: 'k6m-comportamentais.png',
              alt: 'Calendário menstrual marcado com um X: método não indicado.',
            },
            {
              titulo: 'Métodos definitivos (laqueadura e vasectomia)',
              texto: [
                '**São permanentes** e possuem **critérios legais de acesso**, sendo indicados apenas para adultos e não se aplicam a adolescentes.',
              ],
              arquivo: 'k6m-definitivos.png',
              alt: 'Desenhos do útero com as tubas amarradas e dos testículos com os canais amarrados, marcados com X.',
            },
          ]),
          nota: textoPT('Por isso, vamos focar nos **métodos indicados para a fase adolescente**.'),
          fonte: FONTE_MS_SBP,
        },
      ],
    },

    // ---- p. 15: DIU e Implanon -----------------------------------------------------
    'secao-diu': {
      k7l: [
        texto(
          'DIU (Dispositivo Intrauterino)',
          'normal',
          'Pequeno dispositivo em formato de “T” colocado dentro do útero por um profissional de saúde. Pode ser de cobre ou hormonal.',
        ),
        await figura('k7l-diu-utero.png', 'Útero com o DIU posicionado dentro dele; rótulos indicam o DIU, o útero, o colo do útero e os fios do DIU, que ficam dentro da vagina.', {
          legenda: 'Figura: DIU dentro do útero.',
          fonte: FONTE_OMS_SBP,
        }),
        {
          _type: 'blocoPassos',
          _key: chave(),
          estilo: 'lista',
          passos: await itens([
            {
              titulo: 'DIU de cobre',
              texto: ['Cria uma **barreira natural** dentro do útero que paralisa os espermatozoides bem antes de chegarem perto do óvulo.'],
              arquivo: 'k7l-diu-cobre.png',
              alt: 'DIU em T com fio de cobre enrolado.',
            },
            {
              titulo: 'DIU hormonal',
              texto: [
                'Libera uma pequena quantidade de hormônio, que **deixa o muco do útero espesso e impede que a parede do útero se prepare** para uma gravidez.',
              ],
              arquivo: 'k7l-diu-hormonal.png',
              alt: 'DIU hormonal em formato de T.',
            },
          ]),
        },
      ],
      k7v: [
        texto(
          'Implanon (etonogestrel)',
          'normal',
          'Ele é um bastão bem pequeno e flexível. O procedimento é rápido: o implante é realizado **debaixo da pele do braço**, com **anestesia local**, por um **profissional treinado**.',
        ),
        await figura('k7v-implanon-braco.png', 'Braço com o implante sob a pele e, em destaque, dedos segurando o bastão do Implanon.', {
          legenda: 'Implante de etonogestrel (ISE), conhecido comercialmente no Brasil como Implanon®',
          fonte: FONTE_OMS_SBP,
        }),
        texto(
          'Como funciona',
          'voceSabia',
          'O Implanon libera o hormônio etonogestrel, que impede a ovulação, dificulta a passagem dos espermatozoides e torna o muco do colo do útero mais espesso, evitando a fecundação.',
        ),
      ],
    },

    // ---- p. 16: métodos hormonais ----------------------------------------------------
    'secao-metodos-hormonais': {
      k82: [
        {
          _type: 'blocoPassos',
          _key: chave(),
          titulo: 'Anticoncepcionais hormonais',
          estilo: 'grade',
          passos: await itens([
            {titulo: 'Pílula anticoncepcional', arquivo: 'k82-pilula.png', alt: 'Cartela de pílulas.'},
            {titulo: 'Adesivo transdérmico', arquivo: 'k82-adesivo.png', alt: 'Adesivo anticoncepcional.'},
            {titulo: 'Anel vaginal', arquivo: 'k82-anel.png', alt: 'Anel vaginal transparente.'},
            {titulo: 'Injetável anticoncepcional', arquivo: 'k82-injetavel.png', alt: 'Frasco e seringa de injeção.'},
            {titulo: 'Implante hormonal', arquivo: 'k82-implante.png', alt: 'Bastão do implante.'},
            {titulo: 'DIU hormonal', arquivo: 'k82-diu-hormonal.png', alt: 'DIU hormonal em formato de T.'},
          ]),
          fonte: 'Fonte: Imagem gerada por inteligência artificial (ChatGPT).',
        },
      ],
      k96: [
        {
          _type: 'blocoPassos',
          _key: chave(),
          estilo: 'lista',
          passos: await itens([
            {
              titulo: 'Anel vaginal',
              texto: [
                'É um anel de plástico bem flexível e macio que libera hormônios no corpo, **impedindo a ovulação**.',
                'Você mesma coloca e retira o anel de dentro da vagina. É discreto, regula o ciclo e não altera sua saúde íntima.',
              ],
              arquivo: 'k96-anel.png',
              alt: 'Mão segurando um anel vaginal.',
            },
            {
              titulo: 'Adesivo anticoncepcional',
              texto: [
                'É um adesivo que libera hormônios na corrente sanguínea para **bloquear a ovulação**.',
                'É bem fino e colante: você gruda na pele (pode ser no braço, nas costas ou na barriga). É um método moderno e seguro, bom para quem esquece de tomar remédio todo dia.',
              ],
              arquivo: 'k96-adesivo.png',
              alt: 'Adesivo anticoncepcional colado no braço.',
            },
            {
              titulo: 'Pílula do dia seguinte (contracepção de emergência)',
              texto: [
                'É um **método de emergência**, indicado para quando a camisinha estoura, sai do lugar ou quando você esquece de tomar seu anticoncepcional de rotina.',
                'Quanto mais rápido você tomar, maior a chance de evitar uma gravidez.',
                'Se precisar, vá até a Unidade de Saúde do seu bairro. A equipe vai te orientar e tirar todas as suas dúvidas.',
              ],
              arquivo: 'k96-pilula-dia-seguinte.png',
              alt: 'Cartela com um comprimido.',
            },
          ]),
          nota: textoPT('**A pílula do dia seguinte não é indicada como método anticoncepcional de rotina.** Como o nome diz, é para situações imprevistas.'),
          fonte: FONTE_OMS_SBP,
        },
      ],
    },

    // ---- p. 18: direitos ---------------------------------------------------------------
    'secao-direitos-sexuais-reprodutivos': {
      ka4: [
        texto('Seus direitos sexuais e reprodutivos', 'normal', '**Autonomia e liberdade** para decidir sobre seu corpo e futuro.'),
        {
          _type: 'blocoPassos',
          _key: chave(),
          estilo: 'lista',
          passos: await itens([
            {
              titulo: 'Direitos sexuais',
              texto: ['• Liberdade, respeito e sem violência', '• Prevenção de ISTs e sexo seguro'],
              arquivo: 'ka4-sexuais.png',
              alt: 'Preservativo e escudo com sinal de confirmação.',
            },
            {
              titulo: 'Direitos reprodutivos',
              texto: ['• Decisão de ter ou não filhos', '• Acesso a métodos contraceptivos'],
              arquivo: 'ka4-reprodutivos.png',
              alt: 'Calendário e teste de gravidez.',
            },
            {
              titulo: 'Acolhimento no SUS',
              texto: ['• Atendimento sigiloso para jovens', '• Orientação médica sem julgamento'],
              arquivo: 'ka4-sus.png',
              alt: 'Cadeado e balão de conversa.',
            },
          ]),
          fonte: 'Fonte: Produzido por inteligência artificial a partir de Ministério da Saúde (2010).',
        },
      ],
    },

    // ---- p. 19: trimestres e puerpério --------------------------------------------------
    'secao-gravidez-adolescencia-mudancas': {
      kbc: [
        await gestante('kbc-gestante.png', 'Adolescente grávida no início da gestação, com as mãos na barriga.'),
        texto(
          '1º trimestre',
          'normal',
          'O primeiro trimestre **vai até a 13ª semana** de gestação e é uma fase em que o organismo passa por um turbilhão de mudanças hormonais. Nessa fase, é comum surgirem sinais no corpo e nas emoções.',
        ),
        {
          _type: 'blocoPassos',
          _key: chave(),
          titulo: 'Sintomas no corpo',
          estilo: 'grade',
          passos: await itens([
            {titulo: 'Seios inchados ou doloridos', arquivo: 'kbc-seios.png'},
            {titulo: 'Mamilos e aréolas mais escuros', arquivo: 'kbc-mamilos.png'},
            {titulo: 'Muito cansaço', arquivo: 'kbc-cansaco.png'},
            {titulo: 'Fraqueza no dia a dia', arquivo: 'kbc-fraqueza.png'},
            {titulo: 'Enjoos e vômitos frequentes', arquivo: 'kbc-enjoos.png'},
          ]),
        },
        {
          _type: 'blocoPassos',
          _key: chave(),
          titulo: 'Sintomas nas emoções',
          estilo: 'grade',
          passos: await itens([
            {titulo: 'Oscilações repentinas de humor', arquivo: 'kbc-humor.png'},
            {titulo: 'Ansiedade', arquivo: 'kbc-ansiedade.png'},
            {titulo: 'E até episódios de tristeza', arquivo: 'kbc-tristeza.png'},
          ]),
          fonte: FONTE_GESTACAO,
        },
      ],
      kbg: [
        await gestante('kbg-gestante.png', 'Adolescente grávida no segundo trimestre, com a barriga mais visível.'),
        texto(
          '2º trimestre (de 14 a 27 semanas)',
          'normal',
          'Nessa fase, você pode começar a sentir os movimentos do bebê e seu corpo apresenta mudanças mais visíveis, como o crescimento da barriga, das mamas e dos quadris.',
        ),
        {
          _type: 'blocoPassos',
          _key: chave(),
          titulo: 'Como você pode se sentir?',
          estilo: 'grade',
          passos: await itens([
            {titulo: 'Geralmente, há menos enjoos e mais disposição.', arquivo: 'kbg-disposicao.png'},
            {titulo: 'Você pode começar a sentir os movimentos do bebê, que ficam cada vez mais perceptíveis.', arquivo: 'kbg-movimentos.png'},
          ]),
        },
        {
          _type: 'blocoPassos',
          _key: chave(),
          titulo: 'Sintomas comuns',
          estilo: 'grade',
          passos: await itens([
            {titulo: 'Dormência ou formigamento nas mãos', arquivo: 'kbg-dormencia.png'},
            {titulo: 'Linha escura na pele da barriga', arquivo: 'kbg-linha.png'},
            {titulo: 'Manchas mais escuras no rosto', arquivo: 'kbg-manchas.png'},
            {titulo: 'Dores nas costas e na pelve', arquivo: 'kbg-costas.png'},
            {titulo: 'Aréolas mais escuras', arquivo: 'kbg-areolas.png'},
            {titulo: 'Estrias nos seios, barriga, nádegas e coxas', arquivo: 'kbg-estrias.png'},
          ]),
          fonte: FONTE_GESTACAO,
        },
      ],
      kbk: [
        await gestante('kbk-gestante.png', 'Adolescente grávida no fim da gestação, com a barriga grande.'),
        texto(
          '3º trimestre (a partir de 28 semanas)',
          'normal',
          '**No final da gestação,** o seu corpo e o do seu bebê passam por mudanças de preparação para o parto.',
        ),
        {
          _type: 'blocoPassos',
          _key: chave(),
          titulo: 'Principais mudanças e sinais',
          estilo: 'grade',
          passos: await itens([
            {titulo: 'Mais peso e desconforto', arquivo: 'kbk-peso.png'},
            {titulo: 'Vontade frequente de urinar', arquivo: 'kbk-urinar.png'},
            {titulo: 'Dificuldade para dormir', arquivo: 'kbk-dormir.png'},
            {titulo: 'Ansiedade', arquivo: 'kbk-ansiedade.png'},
            {titulo: 'Barriga endurecendo por alguns momentos (geralmente sem dor)', arquivo: 'kbk-barriga.png'},
            {titulo: 'Saída de colostro do bico mamário', arquivo: 'kbk-colostro.png'},
          ]),
        },
        {
          ...texto(
            'É hora de se preparar!',
            'dica',
            'Seu corpo está se preparando para o parto e o bebê, nos últimos meses, normalmente se posiciona para nascer. Ele tem o próprio ritmo de dormir e acordar e começa a dar sinais de que está quase **pronto para nascer**, com o surgimento das primeiras contrações.',
          ),
          fonte: FONTE_GESTACAO,
        },
      ],
      kbl: [
        {
          _type: 'blocoPassos',
          _key: chave(),
          titulo: 'Puerpério (pós-parto): o bebê nasceu, e agora?',
          estilo: 'numerado',
          passos: await itens([
            {
              titulo: 'Puerpério',
              texto: [
                'O que é afinal esse tal de “puerpério”? É o período que começa logo após o nascimento do bebê, em que o corpo, as emoções e a rotina passam por várias mudanças.',
                '**Físico:** nesse período o corpo começa a voltar ao normal.',
                '**Emocional:** nesse momento se inicia uma nova rotina em sua vida.',
              ],
              arquivo: 'kbl-puerperio.png',
              alt: 'Mãe segurando o bebê recém-nascido junto ao rosto.',
            },
            {
              titulo: 'O corpo em mudança',
              texto: [
                'O que acontece com o corpo depois do parto?',
                '• **Sangramento (lóquios):** é normal nos primeiros dias e pode variar de cor: vermelha, rosada, amarelada ou esbranquiçada.',
                '• **Cólicas leves:** acontecem porque o útero se contrai para voltar ao seu tamanho normal.',
                '• **Mamas sensíveis:** as mamas podem ficar aumentadas, quentes ou endurecidas e sensíveis, devido à produção de leite.',
                '• **Pontos/cicatriz:** pode haver dor leve no local, que melhora com o passar dos dias. Se você observar alguma coisa diferente, como vermelhidão, dor intensa, febre ou inchaço, procure a unidade de saúde do seu bairro.',
                '• **Cansaço e sono:** a rotina de cuidados com o bebê pode fazer você ter noites mal dormidas.',
              ],
            },
            {
              titulo: 'E o vínculo da mãe com o bebê?',
              texto: [
                'O vínculo nem sempre acontece de forma imediata. Ele vai se construindo dia após dia, com a convivência, o contato, os cuidados, os sorrisos...',
              ],
              arquivo: 'kbl-vinculo.png',
              alt: 'Mãe beijando o bebê no colo.',
            },
            {
              titulo: 'As emoções',
              texto: [
                'Por que as emoções ficam tão bagunçadas? Após o parto, os hormônios mudam, a rotina é nova e muitas coisas se transformam ao mesmo tempo. Isso pode causar sentimentos intensos e misturados: alegria, medo, ansiedade, saudade da vida de antes, cansaço e insegurança.',
              ],
              arquivo: 'kbl-emocoes.png',
              alt: 'Mulher pensativa, com a mão no rosto.',
            },
            {
              titulo: 'A realidade',
              texto: [
                'Sentir culpa significa que sou uma “mãe ruim”? A realidade: a maternidade não é perfeita, cada família tem sua história e seus desafios.',
                'Sentir cansaço, medo de errar ou culpa não é fracasso.',
              ],
              arquivo: 'kbl-realidade.png',
              alt: 'Mulher cansada apoiando o rosto na mão.',
            },
          ]),
          fonte: FONTE_GESTACAO,
        },
      ],
    },
  }
}

// Diagramas e infográficos mantidos como imagem: só passam para "Página inteira".
const PAGINA_INTEIRA: Record<string, string[]> = {
  'secao-adolescencia-chegou': ['kf'],
  'secao-transformacoes-menina': ['k2c', 'k2q'],
  'secao-estagios-de-tanner': ['k3b', 'k3j'],
  'secao-menstruacao': ['k3t'],
}

async function main() {
  const lista = await trocas()
  const ids = [...new Set([...Object.keys(lista), ...Object.keys(PAGINA_INTEIRA)])]
  await semRascunhos(ids)

  const tx = client.transaction()
  for (const id of ids) {
    const atuais = await chavesDe(id)
    for (const [k, novos] of Object.entries(lista[id] ?? {})) {
      if (!atuais.includes(k)) throw new Error(`${id}: bloco ${k} não encontrado (já migrado?).`)
      tx.patch(id, (p) => p.insert('replace', `blocos[_key=="${k}"]`, novos))
      console.log(`${id}: ${k} -> ${novos.map((b) => (b as {_type: string})._type).join(' + ')}`)
    }
    for (const k of PAGINA_INTEIRA[id] ?? []) {
      if (!atuais.includes(k)) throw new Error(`${id}: bloco ${k} não encontrado.`)
      tx.patch(id, (p) => p.set({[`blocos[_key=="${k}"].tamanho`]: 'pagina'}))
      console.log(`${id}: ${k} -> página inteira`)
    }
  }

  if (!aplicar) {
    console.log('\nSimulação: nada foi gravado. Rode de novo com "-- --aplicar" para gravar.')
    return
  }
  await tx.commit()
  console.log('\nPronto: blocos trocados e desenhos enviados.')
}

main().catch((erro) => {
  console.error(erro.message)
  process.exit(1)
})
