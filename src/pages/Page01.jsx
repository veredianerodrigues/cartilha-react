export default function Page01() {
  return (
    <div className="relative w-[595px] h-[842px] bg-[#f5f5ef] text-center overflow-hidden">
      <div className="absolute left-1/2 -translate-x-1/2 top-[50px] font-poppins text-[#163341] text-[12px] whitespace-nowrap">
        <p className="mb-0">Cariane Renata Saldanha Fant Gonzatto</p>
        <p>Solange de Fátima Reis Conterno</p>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 top-[776px] font-poppins text-[#163341] text-[12px] whitespace-nowrap text-center">
        <p className="mb-0">Cascavel, PR,</p>
        <p>2026</p>
      </div>

      <div className="absolute left-[19.16%] right-[19.33%] top-[28%] flex flex-col items-center gap-[22px]">
        <p className="font-poppins font-light text-[#349a95] text-[32px] leading-[1.44] text-center">
          VAMOS CONVERSAR SOBRE
        </p>
        <p
          className="text-center text-[#289dd2] tracking-[1.74px]"
          style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '58px', lineHeight: '0.9' }}
        >
          GRAVIDEZ NA
          <br />
          ADOLESCÊNCIA?
        </p>
      </div>
    </div>
  );
}
