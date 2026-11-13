/**
 * Troca infográficos com texto dentro da imagem por conteúdo em HTML (Design System
 * "Cartilha"): caixas e o bloco "Passo a passo", com os desenhos de cada passo
 * recortados da imagem original (scripts/infograficos/*.png).
 *
 * Seções: metodos-barreira (pág. 14) e fecundacao (pág. 11).
 *
 * Rodar dentro de studio/ (usa o login do `sanity` CLI):
 *   npx sanity exec scripts/migrar-infograficos.ts --with-user-token            (só mostra)
 *   npx sanity exec scripts/migrar-infograficos.ts --with-user-token -- --aplicar
 *
 * Grava direto no documento publicado. Para desfazer, use o Histórico do documento no
 * Studio (as versões anteriores continuam lá).
 */
import {createReadStream} from 'node:fs'
import {resolve} from 'node:path'
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-11-01'})
const aplicar = process.argv.includes('--aplicar')

const chave = () => Math.random().toString(36).slice(2, 12)

// Texto simples -> Portable Text. **trecho** vira negrito.
function paragrafo(texto: string) {
  const partes = texto.split(/(\*\*[^*]+\*\*)/).filter(Boolean)
  return {
    _type: 'block',
    _key: chave(),
    style: 'normal',
    markDefs: [],
    children: partes.map((parte) => {
      const negrito = parte.startsWith('**')
      return {
        _type: 'span',
        _key: chave(),
        text: negrito ? parte.slice(2, -2) : parte,
        marks: negrito ? ['strong'] : [],
      }
    }),
  }
}

const textoPT = (...paragrafos: string[]) => paragrafos.map(paragrafo)

async function desenho(arquivo: string, alt: string) {
  if (!aplicar) return {_type: 'imagemItem', tipo: 'ilustracao', alt, imagem: `(enviaria ${arquivo})`}
  const asset = await client.assets.upload('image', createReadStream(resolve('scripts/infograficos', arquivo)), {
    filename: arquivo,
  })
  return {
    _type: 'imagemItem',
    tipo: 'ilustracao',
    alt,
    imagem: {_type: 'image', asset: {_type: 'reference', _ref: asset._id}},
  }
}

type Passo = {titulo: string; texto: string; arquivo: string; alt: string}

async function passos(lista: Passo[]) {
  const itens = []
  for (const p of lista) {
    itens.push({
      _type: 'passoItem',
      _key: chave(),
      titulo: p.titulo,
      texto: textoPT(p.texto),
      imagem: await desenho(p.arquivo, p.alt),
    })
  }
  return itens
}

async function blocosNovos() {
  return {
    // ---- Página 14: métodos de barreira -------------------------------------------
    k6s: {
      _type: 'blocoTexto',
      _key: chave(),
      variante: 'fiqueAtento',
      titulo: 'Fique ligado!',
      conteudo: textoPT(
        'Além de evitar uma gravidez não planejada, o preservativo é o único método que **previne contra ISTs** (Infecções Sexualmente Transmissíveis), ou seja, é **proteção dupla**!',
        'Tanto o preservativo interno quanto o externo **são fornecidos pelo SUS**: você pode encontrá-los nas unidades de saúde do seu bairro, **sem necessidade de receita médica**.',
      ),
      fonte: 'Fonte: Ministério da Saúde (2022) e SBP (2023).',
    },
    k6w: {
      _type: 'blocoPassos',
      _key: chave(),
      titulo: 'Como usar o preservativo externo',
      passos: await passos([
        {
          titulo: 'Coloque antes de qualquer contato com a genital ou penetração',
          texto: 'O preservativo externo deverá ser colocado assim que o pênis estiver ereto, antes de qualquer contato genital ou penetração.',
          arquivo: 'externo-1.png',
          alt: 'Mão colocando o preservativo externo na ponta do pênis ereto.',
        },
        {
          titulo: 'Aperte a ponta e retire o ar',
          texto: 'A ponta do preservativo externo (o reservatório) deverá ser apertada com os dedos para tirar o ar. Se o ar ficar ali dentro, o preservativo externo pode estourar durante a relação.',
          arquivo: 'externo-2.png',
          alt: 'Dedos apertando a ponta do preservativo para tirar o ar.',
        },
        {
          titulo: 'Desenrole até a base do pênis',
          texto: 'Mantendo a ponta apertada, o preservativo externo deverá ser desenrolado da cabeça do pênis (glande) até a base.',
          arquivo: 'externo-3.png',
          alt: 'Mão desenrolando o preservativo até a base do pênis.',
        },
        {
          titulo: 'Retire com cuidado após a ejaculação',
          texto: 'Logo após a ejaculação, enquanto o pênis ainda estiver ereto, ele deverá ser retirado da vagina segurando firmemente a base do preservativo externo junto ao corpo, para evitar que ele escorregue e o sêmen vaze.',
          arquivo: 'externo-4.png',
          alt: 'Corte lateral mostrando a retirada do pênis segurando a base do preservativo.',
        },
      ]),
      lembretes: [
        'Verifique a validade e se a embalagem está íntegra.',
        'Use lubrificante à base de água, se necessário.',
        'Use apenas um preservativo externo por relação.',
        'Protege de ISTs e também evita gravidez não planejada.',
      ],
      fonte:
        'Fonte: ilustrações elaboradas por inteligência artificial generativa (Gemini), baseadas em recomendações da World Health Organization (2022) e do Ministério da Saúde do Brasil (2022).',
    },
    k70: {
      _type: 'blocoPassos',
      _key: chave(),
      titulo: 'Como usar o preservativo interno',
      passos: await passos([
        {
          titulo: 'Confira o produto',
          texto: 'Verifique a embalagem e a validade. Abra com cuidado.',
          arquivo: 'interno-1.png',
          alt: 'Embalagem de preservativo com lupa mostrando a data de validade.',
        },
        {
          titulo: 'Aperte o anel interno',
          texto: 'Aperte o anel interno (o da extremidade fechada) para formar um “8”.',
          arquivo: 'interno-2.png',
          alt: 'Mãos apertando o anel interno do preservativo, formando um oito.',
        },
        {
          titulo: 'Insira na vagina',
          texto: 'Com a outra mão, afaste os lábios da vulva e insira o anel interno o mais fundo possível. O anel externo fica para fora da vagina, cobrindo parcialmente os lábios da vulva.',
          arquivo: 'interno-3.png',
          alt: 'Corte lateral mostrando a inserção do preservativo interno na vagina.',
        },
        {
          titulo: 'Durante a relação',
          texto: 'O pênis deve ser guiado para dentro do preservativo interno. O anel externo deve permanecer do lado de fora da vagina.',
          arquivo: 'interno-4.png',
          alt: 'Corte lateral mostrando o pênis dentro do preservativo interno.',
        },
        {
          titulo: 'Retire com cuidado e descarte',
          texto: 'Torça o anel externo para evitar que o conteúdo vaze e retire com delicadeza. Descarte de forma segura no lixo (não no vaso sanitário).',
          arquivo: 'interno-5.png',
          alt: 'Mão torcendo o preservativo usado e jogando no lixo.',
        },
      ]),
      lembretes: [
        'Use um preservativo interno novo a cada relação.',
        'Use lubrificante à base de água, se necessário.',
        'O preservativo interno pode ser colocado antes da relação.',
        'Protege contra ISTs e também ajuda a evitar gravidez.',
      ],
      fonte:
        'Fonte: ilustrações elaboradas por inteligência artificial generativa (Gemini), baseadas nas recomendações da World Health Organization (2022) e do Ministério da Saúde do Brasil (2022).',
    },

    // ---- Página 11: fecundação -------------------------------------------------------
    k5k: {
      _type: 'blocoPassos',
      _key: chave(),
      titulo: 'Fecundação: como acontece?',
      passos: await passos([
        {
          titulo: 'Durante uma relação sexual desprotegida',
          texto: 'Sem o uso de um método contraceptivo, os espermatozoides presentes no sêmen são liberados dentro da vagina.',
          arquivo: 'fecundacao-1.png',
          alt: 'Corte lateral do corpo feminino com útero, bexiga, reto e canal vaginal; espermatozoides viajando pelo canal vaginal em direção ao útero.',
        },
        {
          titulo: 'Espermatozoides sobem pelo aparelho genital',
          texto: 'Através dos movimentos de suas próprias caudas e com a ajuda das contrações naturais do útero, eles avançam pelo aparelho genital feminino.',
          arquivo: 'fecundacao-2.png',
          alt: 'Útero com setas mostrando os espermatozoides subindo.',
        },
        {
          titulo: 'O óvulo aguarda na tuba uterina',
          texto: 'Enquanto isso, o óvulo liberado pelo ovário na ovulação é direcionado para a tuba uterina, onde fica aguardando.',
          arquivo: 'fecundacao-3.png',
          alt: 'Útero com a tuba uterina destacada.',
        },
        {
          titulo: 'O encontro na tuba uterina',
          texto: 'É ali que os espermatozoides encontram o óvulo. Apenas um deles conseguirá romper a barreira do óvulo e entrar, completando a fecundação.',
          arquivo: 'fecundacao-4.png',
          alt: 'Tuba uterina com espermatozoides chegando ao óvulo.',
        },
      ]),
      nota: textoPT(
        'A fecundação geralmente acontece na **tuba uterina**. Após a fecundação, o óvulo fecundado segue para o útero, onde pode se fixar e iniciar uma gravidez.',
      ),
      fonte:
        'Fonte: ilustrações elaboradas por inteligência artificial generativa (ChatGPT/OpenAI, 2025), com base em WHO (2022); Krishna; Witchel (2024).',
    },
  }
}

const SECOES: Record<string, string[]> = {
  'secao-metodos-barreira': ['k6s', 'k6w', 'k70'],
  'secao-fecundacao': ['k5k'],
}

async function main() {
  // Um rascunho aberto no Studio ficaria desatualizado (e sobrescreveria a troca ao
  // publicar): melhor parar e pedir para publicar ou descartar antes.
  const rascunhos = await client.fetch<string[]>(`*[_id in $ids]._id`, {
    ids: Object.keys(SECOES).map((id) => `drafts.${id}`),
  })
  if (rascunhos.length) {
    throw new Error(`Há rascunho aberto em ${rascunhos.join(', ')}. Publique ou descarte no Studio e rode de novo.`)
  }

  const novos = await blocosNovos()
  const tx = client.transaction()
  for (const [id, chaves] of Object.entries(SECOES)) {
    const atuais = await client.fetch<string[]>(`*[_id == $id][0].blocos[]._key`, {id})
    for (const k of chaves) {
      if (!atuais.includes(k)) throw new Error(`${id}: bloco ${k} não encontrado (já migrado?).`)
      tx.patch(id, (p) => p.insert('replace', `blocos[_key=="${k}"]`, [novos[k as keyof typeof novos]]))
      console.log(`${id}: ${k} -> ${novos[k as keyof typeof novos]._type}`)
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
