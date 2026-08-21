import IllustrationFrame from '../IllustrationFrame.jsx';
import PageHero from '../PageHero.jsx';
import TextCard from './shared/TextCard.jsx';
import Paragraph from './shared/Paragraph.jsx';
import Cite from './shared/Cite.jsx';

const TRIMESTRES = [
  {
    label: '1º Trimestre',
    text: 'É marcado por intensas transformações hormonais para sustentar a gravidez. Surgem sintomas como a interrupção da menstruação, mudanças no sono e no apetite, aumento das mamas e do volume de sangue, além de enjoos e vômitos.',
  },
  {
    label: '2º Trimestre',
    text: 'É uma fase de adaptação mais confortável. O útero cresce visivelmente, a mãe começa a sentir os movimentos do bebê e o peito inicia a produção do colostro (o primeiro leite).',
  },
  {
    label: '3º Trimestre',
    text: 'O bebê cresce de forma acelerada. O tamanho do útero passa a pressionar os outros órgãos da mãe, o que costuma causar desconfortos como dor nas costas (lombar), falta de ar, azia e refluxo.',
  },
  {
    label: 'Puerpério (Pós-parto)',
    text: 'Após o nascimento do bebê, o corpo entra em um período de recuperação física profunda, marcado pelo início de novas experiências desafiadoras e afetuosas, como a amamentação.',
    cite: 10,
  },
];

export default function GravidezAdolescenciaMudancas({ images }) {
  const [teste, barriga] = images;

  return (
    <div className="relative">
      <PageHero pageLabel="19" weight="semibold" title="E se a gravidez acontecer..." />

      <div className="mb-6">
        <IllustrationFrame src={teste?.url} alt={teste?.caption || 'Teste de gravidez'} className="w-full h-[220px]" />
        {teste?.caption && <p className="text-xs text-brand-darker mt-1">{teste.caption}</p>}
      </div>

      <TextCard className="mb-6 space-y-4">
        <Paragraph>
          Após a fecundação, o corpo feminino passa por uma série de transformações fisiológicas. Cada mulher
          percebe essas mudanças de maneira única, o que pode gerar sentimentos de vulnerabilidade física e
          emocional durante a gestação.<Cite n={1} />
        </Paragraph>
        <p className="font-worksans text-black text-sm leading-[22px] tracking-[0.14px]">
          Essas fases são divididas em períodos marcantes:
        </p>
      </TextCard>

      <div className="flex flex-col sm:flex-row gap-3 mb-4 items-stretch">
        <div className="flex-1 grid grid-cols-1 gap-3">
          {TRIMESTRES.map((t) => (
            <div key={t.label} className="rounded-[20px] bg-[rgba(40,157,210,0.19)] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15)] p-4">
              <p className="font-poppins font-semibold text-brand-dark text-sm mb-2">{t.label}</p>
              <p className="font-worksans text-sm text-black leading-[22px]">
                {t.text}
                {t.cite && <Cite n={t.cite} />}
              </p>
            </div>
          ))}
        </div>
        <div className="w-full sm:w-[220px] shrink-0">
          <IllustrationFrame src={barriga?.url} alt={barriga?.caption || 'Gravidez na adolescência'} className="w-full h-full" />
          {barriga?.caption && <p className="text-xs text-brand-darker mt-1">{barriga.caption}</p>}
        </div>
      </div>

    </div>
  );
}
