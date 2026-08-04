import deco from '../assets/page28/deco.svg';

export default function Page28() {
  return (
    <div className="relative w-[595px] h-[842px] bg-white overflow-hidden">
      <img alt="" className="absolute pointer-events-none" style={{ left: '62.69%', top: '-17.22%', width: '58.74%', height: '35.65%' }} src={deco} />
      <p className="absolute font-worksans text-[#163341] text-[14px] left-[551px] top-[27px] tracking-[0.14px]">28</p>

      <p className="absolute font-poppins font-light text-[#1d4355] left-[54px] top-[35px] w-[500px]" style={{ lineHeight: '1.3' }}>
        <span className="text-[26px]">
          Vamos falar sobre <span className="font-semibold">direitos sexuais, reprodutivos ...</span>
        </span>
      </p>

      <div className="absolute bg-[rgba(29,67,85,0.05)] rounded-[50px] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15)]" style={{ left: '54px', top: '150px', width: '493px', height: '560px' }} />
      <p className="absolute font-worksans text-black text-[14px] text-justify tracking-[0.14px] leading-[22px] left-[82px] top-[176px] w-[437px]">
        As pessoas têm o direito de decidir se desejam ou não uma gestação, em que momento ela deve acontecer e
        quantos filhos querem ter, para que esse direito seja exercido de forma consciente e responsável é
        necessário o conhecimento sobre formas e dispositivos existentes com o objetivo de evitar esse evento. Como
        resultado de reivindicações coletivas emergiu à noção de direitos à saúde sexual e reprodutiva, sendo
        definido como direitos sexuais a &quot;[...] possibilidade de viver e expressar livremente a sexualidade sem
        violência, discriminações e imposições [...] O direito do sexo seguro para prevenção da gravidez e de
        doenças sexualmente transmissíveis (DST) e Aids&quot;{' '}
        <span className="text-[12px]">(BRASIL, 2010, p. 16).</span> Direitos reprodutivos referem-se à possibilidade
        &quot;[...] de acesso a informações, meios, métodos e técnicas para ter ou não filhos&quot;{' '}
        <span className="text-[12px]">(BRASIL, 2010, p. 15).</span> Nesse sentido, deve ser garantido a todos os
        sujeitos sociais (adultos, jovens e adolescentes), de forma equitativa os direitos sexuais e reprodutivos,
        como expressão do acesso integral à saúde.
      </p>
    </div>
  );
}
