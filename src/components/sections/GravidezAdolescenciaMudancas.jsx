import IllustrationFrame from '../IllustrationFrame.jsx';
import deco from '../../assets/page29/deco.svg';

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
  },
];

export default function GravidezAdolescenciaMudancas({ images }) {
  const [teste, barriga] = images;

  return (
    <div className="relative">
      <img alt="" className="absolute pointer-events-none -top-[4%] -right-[6%] w-[45%] max-w-[300px] -z-10" src={deco} />

      <h1 className="font-poppins font-semibold text-brand-dark text-2xl sm:text-3xl mb-6">
        Gravidez na adolescência e mudanças
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        <div>
          <IllustrationFrame src={teste?.url} alt={teste?.caption || 'Teste de gravidez'} className="w-full h-[220px]" />
          {teste?.caption && <p className="text-xs text-brand-darker mt-1">{teste.caption}</p>}
        </div>
        <div>
          <IllustrationFrame src={barriga?.url} alt={barriga?.caption || 'Gravidez na adolescência'} className="w-full h-[220px]" />
          {barriga?.caption && <p className="text-xs text-brand-darker mt-1">{barriga.caption}</p>}
        </div>
      </div>

      <div className="rounded-[24px] sm:rounded-[40px] bg-[rgba(29,67,85,0.05)] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15)] p-6 sm:p-8 mb-6 space-y-4">
        <p className="font-worksans text-black text-sm leading-[22px] tracking-[0.14px] text-justify">
          Após a fecundação, o corpo feminino passa por uma série de transformações fisiológicas. Cada mulher
          percebe essas mudanças de maneira única, o que pode gerar sentimentos de vulnerabilidade física e
          emocional durante a gestação (Alves; Bezerra, 2020).
        </p>
        <p className="font-worksans text-black text-sm leading-[22px] tracking-[0.14px]">
          Essas fases são divididas em períodos marcantes:
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {TRIMESTRES.map((t) => (
          <div key={t.label} className="rounded-[20px] bg-[rgba(40,157,210,0.19)] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15)] p-4">
            <p className="font-poppins font-semibold text-brand-dark text-sm mb-2">{t.label}</p>
            <p className="font-worksans text-sm text-black leading-[22px]">{t.text}</p>
          </div>
        ))}
      </div>

      <p className="text-xs text-brand-darker">Castilho; Mattos; Pedrosa (2024).</p>
    </div>
  );
}
