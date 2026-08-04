import image1 from '../assets/page02/image1.png';

export default function Page02() {
  return (
    <div className="relative w-[595px] h-[842px] bg-[#f5f5ef] overflow-hidden">
      <div className="absolute w-[168px] h-[106px] left-[214px] top-[706px]">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={image1} />
      </div>

      <div className="absolute border-2 border-black border-solid h-[294px] left-[92px] top-[57px] w-[411px]" />
      <div className="absolute font-poppins text-[11px] text-black text-left leading-normal left-[105px] top-[65px] w-[391px] whitespace-pre-wrap">
        <p className="mb-2">Gonzatto, Cariane Renata Saldanha Fant.</p>
        <p className="mb-2">{`     "Vamos conversar sobre gravidez na adolescência?" `}</p>
        <p className="mb-2">{`/ Cariane Renata Saldanha Fant Gonzatto e Solange de Fátima `}</p>
        <p className="mb-2">{`Reis Conterno Cascavel/ Paraná, 2026. 36 p. `}</p>
        <p className="mb-2">2. ed. Revisada e atualizada</p>
        <p className="mb-2">{`     Dissertação (Mestrado Acadêmico) - Universidade Estadual `}</p>
        <p className="mb-2">{`do Oeste do Paraná. Programa de Pós-graduação em Biociências `}</p>
        <p className="mb-2">{`e Saúde, 2022. `}</p>
        <p className="mb-2">{`     Orientadora: Profª. Dra. Solange de Fátima Reis Conterno. `}</p>
        <p className="mb-2">{`     1. Educação em Saúde.  2. Tecnologia educativa. 3. Saúde do `}</p>
        <p className="mb-2">{`Adolescente.  4. Gravidez na adolescência. `}</p>
        <p className="mb-2">{`     I. Conterno, Solange de Fátima Reis, orient. `}</p>
        <p>{`     II. Título. `}</p>
      </div>

      <div className="absolute font-poppins text-[12px] text-black text-left leading-normal left-[38px] top-[372px] w-[519px]">
        <p className="mb-[14px]">Copyright: Dos autores. Todos os direitos reservados – 2026</p>
        <p className="mb-[14px]">Revisão: Prof.ª Dra. Solange de Fátima Reis Conterno</p>
        <p className="mb-[14px]">Produção gráfica: Verediane Rodrigues dos Santos Monteiro</p>
        <p className="mb-[14px]">Realização: Programa de Pós-graduação em Biociências e Saúde.</p>
        <p className="mt-2 text-[11px]">
          Esta obra corresponde à 2.ª edição revisada e atualizada da cartilha "Vamos conversar sobre gravidez na
          adolescência?" originalmente publicada em 2022 como produto técnico-educacional vinculado à Dissertação de
          Mestrado Acadêmico do Programa de Pós-Graduação em Biociências e Saúde da Universidade Estadual do Oeste do
          Paraná (Unioeste). Esta edição incorpora a revisão e a atualização do conteúdo científico e das informações
          apresentadas.
        </p>
      </div>
    </div>
  );
}
