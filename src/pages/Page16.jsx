import deco from '../assets/page16/deco.svg';
import diagram from '../assets/page16/diagram.png';

export default function Page16() {
  return (
    <div className="relative w-[595px] h-[842px] bg-white overflow-hidden">
      <img alt="" className="absolute pointer-events-none" style={{ left: '62.69%', top: '-17.22%', width: '58.74%', height: '35.65%' }} src={deco} />
      <p className="absolute font-worksans text-[#163341] text-[14px] left-[551px] top-[27px] tracking-[0.14px]">16</p>

      <div className="absolute font-poppins font-light text-[#1d4355] left-[54px] top-[35px] w-[460px]" style={{ lineHeight: '1.44' }}>
        <p className="mb-0 text-[32px]">
          <span className="font-semibold">Sobre a fecundação...</span>
        </p>
        <p className="mb-0 text-[32px]">o que é a fecundação e</p>
        <p className="text-[32px]">como ela acontece?</p>
      </div>

      <p className="absolute font-worksans text-black text-[14px] text-justify tracking-[0.14px] leading-[22px] left-[54px] top-[188px] w-[490px]">
        A fecundação é o encontro do espermatozoide e do óvulo. Esse momento único marca o início da gestação e de um
        novo ser. Para que a fecundação aconteça, o corpo passa por uma sequência precisa de eventos:
      </p>

      <div className="absolute rounded-[50px] overflow-hidden shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]" style={{ left: '138px', top: '250px', width: '320px', height: '260px' }}>
        <img alt="Fecundação" className="w-full h-full object-cover" src={diagram} />
      </div>

      <div className="absolute grid grid-cols-2 gap-[10px]" style={{ left: '36px', top: '525px', width: '523px' }}>
        <div className="bg-[#f5f5ef] border-2 border-[#349a95] rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-[12px]">
          <p className="font-poppins text-[10px] text-[#1d4355]">
            Durante uma relação sexual desprotegida (sem o uso de um método contraceptivo), os espermatozoides
            presentes no sêmen são liberados dentro da vagina.
          </p>
        </div>
        <div className="bg-[#f5f5ef] border-2 border-[#349a95] rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-[12px]">
          <p className="font-poppins text-[10px] text-[#1d4355]">
            Através dos movimentos de suas próprias caudas e contando com a ajuda das contrações naturais do útero,
            os espermatozoides sobem pelo aparelho genital feminino.
          </p>
        </div>
        <div className="bg-[#f5f5ef] border-2 border-[#349a95] rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-[12px]">
          <p className="font-poppins text-[10px] text-[#1d4355]">
            Enquanto isso, o óvulo, que foi liberado pelo ovário na ovulação, é direcionado para a tuba uterina, onde
            fica aguardando.
          </p>
        </div>
        <div className="bg-[#f5f5ef] border-2 border-[#349a95] rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-[12px]">
          <p className="font-poppins text-[10px] text-[#1d4355]">
            É exatamente ali, na tuba uterina, que os espermatozoides encontram o óvulo. Apenas um deles conseguirá
            romper a barreira do óvulo e entrar, completando a fecundação.
          </p>
        </div>
      </div>

      <p className="absolute font-worksans text-[#1d4355] text-[12px] left-[54px] top-[790px] tracking-[0.12px]">
        Fonte: Elaborada por inteligência artificial generativa (ChatGPT/OpenAI, 2025), com base em WHO (2022);
        Krishna; Witchel (2024). (WHO, 2022)
      </p>
    </div>
  );
}
