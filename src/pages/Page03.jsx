import deco1 from '../assets/page03/deco1.svg';
import deco2 from '../assets/page03/deco2.svg';

const items = [
  { label: 'APRESENTAÇÃO', page: '4', bold: true },
  { label: 'A ADOLESCENCIA CHEGOU... E AGORA?', page: '5', bold: true },
  { label: 'O que é puberdade?', page: '5' },
  { label: 'O que acontece no corpo humano nesse período?', page: '5' },
  { label: 'Que transformações ocorrem no corpo do menino?', page: '7' },
  { label: 'O QUE É EREÇÃO E EJACULAÇÃO E QUANDO ACONTECE A PRIMEIRA EJACULAÇÃO?', page: '8' },
  { label: 'Que transformações ocorrem no corpo da menina?', page: '11' },
  { label: 'E A MENSTRUAÇÃO... O QUE É E COMO ACONTECE?', page: '13', bold: true },
  { label: 'SOBRE A FECUNDAÇÃO... O QUE É FECUNDAÇÃO E COMO ACONTECE?', page: '16', bold: true },
  { label: 'MÉTODOS CONTRACEPTIVOS', page: '17', bold: true },
  { label: 'Como são classificados os métodos contraceptivos? Todos eles são indicados para adolescentes?', page: '18' },
  { label: 'Métodos comportamentais', page: '18' },
  { label: 'Métodos de Barreira', page: '19' },
  { label: 'Métodos hormonais', page: '22' },
  { label: 'Mitos relacionados ao anticoncepcional hormonal', page: '27' },
  { label: 'VAMOS FALAR SOBRE DIREITOS SEXUAIS E REPRODUTIVOS?', page: '28/29', bold: true },
  { label: 'GRAVIDEZ NA ADOLESCENCIA E MUDANÇAS', page: '29', bold: true },
  { label: 'SE EU PRECISAR DE ORIENTAÇÃO, QUEM PODERÁ ME AJUDAR?', page: '31', bold: true },
  { label: 'REFERÊNCIAS', page: '32', bold: true },
];

export default function Page03() {
  return (
    <div className="relative w-[595px] h-[842px] bg-[#f5f5ef] overflow-hidden">
      <img alt="" className="absolute pointer-events-none" style={{ left: '-20.34%', top: '83.97%', width: '96.66%', height: '28.14%' }} src={deco1} />
      <img alt="" className="absolute pointer-events-none" style={{ left: '62.69%', top: '-17.22%', width: '58.74%', height: '35.65%' }} src={deco2} />

      <p className="absolute font-poppins font-light text-[#349a95] text-[24px] left-[248px] top-[27px]" style={{ textShadow: '0px 4px 4px rgba(0,0,0,0.25)' }}>
        SUMÁRIO
      </p>

      <div className="absolute left-[26px] top-[138px] w-[543px] font-worksans text-[#1d4355] text-[12px]">
        {items.map((it, i) => (
          <div key={i} className="flex items-baseline gap-2 mb-[3px]">
            <span className={`${it.bold ? 'font-medium' : 'font-light'} shrink-0`}>{it.label}</span>
            <span className="flex-1 border-b border-dotted border-[#1d4355] opacity-40 translate-y-[-3px]"></span>
            <span className="font-medium shrink-0">{it.page}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
