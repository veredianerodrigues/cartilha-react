import deco from '../../assets/page28/deco.svg';

export default function DireitosSexuaisReprodutivos() {
  return (
    <div className="relative">
      <img alt="" className="absolute pointer-events-none -top-[4%] -right-[6%] w-[45%] max-w-[300px] -z-10" src={deco} />

      <h1 className="font-poppins font-light text-brand-dark text-2xl sm:text-3xl leading-[1.4] mb-6">
        Vamos falar sobre <span className="font-semibold">direitos sexuais e reprodutivos?</span>
      </h1>

      <div className="rounded-[24px] sm:rounded-[40px] bg-[rgba(29,67,85,0.05)] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15)] p-6 sm:p-8">
        <p className="font-worksans text-black text-sm leading-[22px] tracking-[0.14px] text-justify">
          As pessoas têm o direito de decidir se desejam ou não uma gestação, em que momento ela deve acontecer e
          quantos filhos querem ter. Para que esse direito seja exercido de forma consciente e responsável, é
          necessário o conhecimento sobre as formas e os dispositivos existentes com o objetivo de evitar esse
          evento. Como resultado de reivindicações coletivas, emergiu a noção de direitos à saúde sexual e
          reprodutiva, sendo definidos os direitos sexuais como a "[...] possibilidade de viver e expressar
          livremente a sexualidade sem violência, discriminações e imposições [...]. O direito do sexo seguro para
          prevenção da gravidez e de doenças sexualmente transmissíveis (DST) e Aids" (Brasil, 2010, p. 16). Os
          direitos reprodutivos referem-se à possibilidade "[...] de acesso a informações, meios, métodos e técnicas
          para ter ou não filhos" (Brasil, 2010, p. 15). Nesse sentido, deve ser garantido a todos os sujeitos
          sociais (adultos, jovens e adolescentes), de forma equitativa, os direitos sexuais e reprodutivos, como
          expressão do acesso integral à saúde.
        </p>
      </div>
    </div>
  );
}
