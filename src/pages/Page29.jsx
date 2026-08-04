import deco from '../assets/page29/deco.svg';

export default function Page29() {
  return (
    <div className="relative w-[595px] h-[842px] bg-white overflow-hidden">
      <img alt="" className="absolute pointer-events-none" style={{ left: '62.69%', top: '-17.22%', width: '58.74%', height: '35.65%' }} src={deco} />
      <p className="absolute font-worksans text-[#163341] text-[14px] left-[551px] top-[27px] tracking-[0.14px]">29</p>

      <p className="absolute font-poppins font-semibold text-[#1d4355] text-[26px] left-[54px] top-[35px] w-[500px]" style={{ lineHeight: '1.3' }}>
        Gravidez na adolescência e mudanças
      </p>

      <div className="absolute bg-[rgba(29,67,85,0.05)] rounded-[50px] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15)]" style={{ left: '54px', top: '150px', width: '493px', height: '640px' }} />
      <div className="absolute font-worksans text-black text-[13.5px] text-justify tracking-[0.14px] leading-[20px] left-[80px] top-[172px] w-[441px]">
        <p className="mb-[14px]">
          Após a fecundação, o corpo feminino passa por uma série de transformações fisiológicas. Cada mulher percebe
          essas mudanças de maneira única, o que pode gerar sentimentos de vulnerabilidade física e emocional durante
          a gestação <span className="text-[11px]">(Alves; Bezerra, 2020).</span>
        </p>
        <p className="mb-[14px]">Essas fases são divididas em períodos marcantes:</p>

        <p className="font-poppins font-bold text-[#289dd2] text-[15px] mb-[8px]">1º Trimestre</p>
        <p className="mb-[14px]">
          É marcado por intensas transformações hormonais para sustentar a gravidez. Surgem sintomas como a
          interrupção da menstruação, mudanças no sono e no apetite, aumento das mamas e do volume de sangue, além de
          enjoos e vômitos.
        </p>

        <p className="font-poppins font-bold text-[#289dd2] text-[15px] mb-[8px]">2º Trimestre</p>
        <p className="mb-[14px]">
          É uma fase de adaptação mais confortável. O útero cresce visivelmente, a mãe começa a sentir os movimentos
          do bebê e o peito inicia a produção do colostro (o primeiro leite).
        </p>

        <p className="font-poppins font-bold text-[#289dd2] text-[15px] mb-[8px]">3º Trimestre</p>
        <p className="mb-[14px]">
          O bebê cresce de forma acelerada. O tamanho do útero passa a pressionar os outros órgãos da mãe, o que
          costuma causar desconfortos como dor nas costas (lombar), falta de ar, azia e refluxo.
        </p>

        <p className="font-poppins font-bold text-[#289dd2] text-[15px] mb-[8px]">Puerpério (Pós-parto)</p>
        <p className="mb-[10px]">
          Após o nascimento do bebê, o corpo entra em um período de recuperação física profunda, marcado pelo início
          de novas experiências desafiadoras e afetuosas, como a amamentação.
        </p>
        <p className="text-[11px]">Castilho; Mattos; Pedrosa (2024)</p>
      </div>
    </div>
  );
}
