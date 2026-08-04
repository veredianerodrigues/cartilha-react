import deco from '../assets/page34/deco.svg';

export default function Page34() {
  return (
    <div className="relative w-[595px] h-[842px] bg-white overflow-hidden">
      <img alt="" className="absolute pointer-events-none" style={{ left: '62.69%', top: '-17.22%', width: '58.74%', height: '35.65%' }} src={deco} />
      <p className="absolute font-worksans text-[#163341] text-[14px] left-[551px] top-[27px] tracking-[0.14px]">34</p>

      <p className="absolute font-poppins font-semibold text-[#1d4355] text-[32px] left-[54px] top-[35px] w-[460px]" style={{ lineHeight: '1.44' }}>
        Referências
      </p>

      <div className="absolute font-worksans text-black text-[11px] text-justify tracking-[0.11px] leading-[16px] left-[54px] top-[130px] w-[493px] space-y-[12px]">
        <p>
          ORGANIZAÇÃO MUNDIAL DA SAÚDE. Family planning: a global handbook for providers: evidence-based guidance
          developed through worldwide collaboration. 4. ed. Genebra: Organização Mundial da Saúde, 2022. Disponível
          em: https://fphandbook.org/. Acesso em: 7 jul. 2026.
        </p>
        <p>
          REZENDE FILHO, Jorge de; MONTENEGRO, Carlos Antonio. Rezende obstetrícia fundamental. 14. ed. Rio de
          Janeiro: Guanabara Koogan, 2022.
        </p>
        <p>
          SARTOR, B. C.; FIORIN, P. B. G.; SULZBACHER, M. M. Infância acelerada: a complexidade da puberdade precoce
          e a importância do acompanhamento clínico. Revista DELOS, Curitiba, v. 18, n. 74, p. 1-22, 2025. DOI:
          https://doi.org/10.55905/rdelosv18.n74-044. Disponível em:
          https://ojs.revistadelos.com/delos/article/view/2347. Acesso em: 20 jun. 2026.
        </p>
        <p>
          SOCIEDADE BRASILEIRA DE PEDIATRIA. Departamento Científico de Medicina do Adolescente (gestão 2022-2024).
          Como reconhecer um ciclo menstrual normal em adolescentes? Rio de Janeiro: Sociedade Brasileira de
          Pediatria, 2023a. (Guia Prático de Atualização). Disponível em:
          https://www.sbp.com.br/fileadmin/user_upload/24065c-GPA_-_ComoReconhecer_CicloMenstrual_Nl_em_Adl.pdf.
          Acesso em: 7 jul. 2026.
        </p>
        <p>
          SOCIEDADE BRASILEIRA DE PEDIATRIA. Departamento Científico de Adolescência. Contracepção na adolescência: o
          que há de novo? Rio de Janeiro: Sociedade Brasileira de Pediatria, 2023b. (Guia Prático de Atualização).
          Disponível em:
          https://www.sbp.com.br/fileadmin/user_upload/24200f-GPA_ISBN-_Atualiza_MetodosEfetivos_Contracepcao_Adl.pdf.
          Acesso em: 1 jul. 2026.
        </p>
      </div>
    </div>
  );
}
