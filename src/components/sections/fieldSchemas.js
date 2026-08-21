// Mapeia, por seção, quais blocks tipo "paragraph" são slots fixos do layout
// bespoke (chave = block.heading, usado só como identificador interno, nunca
// exibido como título). Nessas seções a lista de campos é definida pelo
// design da página — o admin só edita a redação de cada um, não
// adiciona/remove/reordena. Seções fora deste mapa (ex. "apresentacao")
// continuam com a lista livre de parágrafos, na ordem que o admin definir.
export const SECTION_FIELD_SLOTS = {
  'adolescencia-chegou': [
    { key: 'puberdade_definicao', label: 'Bloco "O Que é Puberdade?"' },
    { key: 'puberdade_hormonios', label: 'Bloco "O que acontece no corpo..."' },
    { key: 'puberdade_caracteres_sexuais', label: 'Caixa "E tem mais..."' },
    { key: 'puberdade_conclusao', label: 'Parágrafo "Portanto..."' },
  ],
  'transformacoes-menino': [
    { key: 'estirao_crescimento', label: 'Estirão de crescimento e peso' },
    { key: 'puberdade_sinais', label: 'Primeiro sinal da puberdade (testículos, pelos, espermarca)' },
  ],
  'erecao-ejaculacao': [
    { key: 'erecao_ejaculacao_definicao', label: 'Definição de ereção e ejaculação' },
    { key: 'espermarca_explicacao', label: 'Explicação da espermarca' },
  ],
  'tanner-menino': [
    { key: 'tanner_intro', label: 'Caixa "Você sabia..." (estágios de Tanner)' },
    { key: 'tanner_estagios_meninos', label: 'Parágrafo sobre genitália (G) e pelos (P)' },
  ],
  'transformacoes-menina': [
    { key: 'transformacoes_corpo_menina', label: 'Broto mamário, estirão e menarca' },
    { key: 'tanner_estagios_meninas', label: 'Parágrafo sobre mamas (M) e pelos (P)' },
  ],
  menstruacao: [
    { key: 'menarca_definicao', label: 'Definição de menarca' },
    { key: 'ciclo_intro', label: 'Ciclo menstrual — parágrafo 1' },
    { key: 'ciclo_sem_fecundacao', label: 'Ciclo menstrual — parágrafo 2 (sem fecundação)' },
    { key: 'fluxo_duracao', label: 'Duração do fluxo/ciclo' },
    { key: 'fique_atenta_texto', label: 'Caixa "Fique atenta..."' },
    { key: 'voce_sabia_texto', label: 'Caixa "Você sabia" (menarca)' },
    { key: 'engravidar_antes_menarca', label: 'Caixa "E tem mais" (engravidar antes da menarca)' },
    { key: 'registro_calendario', label: 'Caixa "Portanto recomenda-se..." (registro em calendário)' },
  ],
  fecundacao: [
    { key: 'fecundacao_intro', label: 'Parágrafo de abertura (definição de fecundação)' },
    { key: 'sequencia_intro', label: 'Frase que introduz a sequência de eventos' },
  ],
  'metodos-contraceptivos': [
    { key: 'ciclo_menstrual', label: 'Parágrafo sobre o ciclo menstrual' },
    { key: 'atencao', label: 'Caixa "Atenção..."' },
  ],
  'classificacao-metodos': [
    { key: 'intro', label: 'Parágrafo introdutório' },
    { key: 'cinco_grupos_intro', label: 'Frase "Quanto à classificação..." (introduz os 5 grupos)' },
    { key: 'cinco_grupos_lista', label: 'Lista dos cinco grupos de métodos' },
    { key: 'olha_so', label: 'Caixa "Olha só..."' },
  ],
  'metodos-barreira': [
    { key: 'intro', label: 'Parágrafo introdutório' },
    { key: 'fique_ligado', label: 'Caixa "Fique ligado!!"' },
    { key: 'masculino_intro', label: 'Preservativo masculino — parágrafo introdutório' },
    { key: 'masculino_citacao', label: 'Preservativo masculino — citação' },
    { key: 'feminino_intro_1', label: 'Preservativo feminino — parágrafo 1' },
    { key: 'feminino_intro_2', label: 'Preservativo feminino — parágrafo 2' },
    { key: 'feminino_citacao', label: 'Preservativo feminino — citação' },
  ],
  diu: [
    { key: 'intro_1', label: 'Parágrafo introdutório 1' },
    { key: 'intro_2', label: 'Parágrafo introdutório 2' },
    { key: 'diu_intro', label: 'Texto sobre o DIU (antes dos cards)' },
    { key: 'diu_cobre', label: 'Card "DIU de Cobre"' },
    { key: 'diu_hormonal', label: 'Card "DIU Hormonal"' },
    { key: 'importante_ist', label: 'Caixa "Importante!" (ISTs)' },
    { key: 'e_ainda', label: 'Caixa "E ainda!"' },
    { key: 'implanon_intro_1', label: 'Implanon — parágrafo 1' },
    { key: 'implanon_intro_2', label: 'Implanon — parágrafo 2' },
    { key: 'implanon_duracao', label: 'Implanon — duração e retirada' },
    { key: 'implanon_importante', label: 'Caixa "Importante:" (Implanon)' },
  ],
  'metodos-hormonais': [
    { key: 'intro_liberdade', label: 'Introdução — liberdade dos anticoncepcionais' },
    { key: 'intro_ahc_combinados', label: 'Introdução — o que é AHC' },
    { key: 'pilula_como_funciona', label: 'Pílula — como funciona (anovulação)' },
    { key: 'pilula_formas_administracao', label: 'Pílula — formas de administração dos hormônios' },
    { key: 'pilula_nao_protege_ist', label: 'Caixa "Como você sabe..." (pílula não protege de IST)' },
    { key: 'pilula_duas_regras_intro', label: 'Pílula — introdução às duas regras fundamentais' },
    { key: 'pilula_reversivel_lista', label: 'Lista — pílula é reversível' },
    { key: 'pilula_regras_lista', label: 'Lista — as duas regras fundamentais' },
    { key: 'pilula_como_usar_lista', label: 'Lista — como usar a pílula' },
    { key: 'injetavel_intro', label: 'Injetável — introdução (mensal/trimestral)' },
    { key: 'injetavel_primeira_aplicacao', label: 'Injetável — primeira aplicação' },
    { key: 'injetavel_como_usar_lista', label: 'Lista — como usar o injetável' },
    { key: 'injetavel_atencao_troca', label: 'Caixa "Atenção" (injetável) — troca de método' },
    { key: 'injetavel_atencao_intervalo', label: 'Caixa "Atenção" (injetável) — intervalo entre cartelas' },
    { key: 'pilula_importante_esquecimento', label: 'Caixa "Importante lembrar!" — esquecimento da pílula' },
    { key: 'outros_dispositivos_intro', label: 'Transição — outros dispositivos hormonais' },
    { key: 'anel_descricao', label: 'Anel vaginal — descrição' },
    { key: 'anel_como_usar', label: 'Anel vaginal — como usar' },
    { key: 'adesivo_descricao', label: 'Adesivo — descrição' },
    { key: 'adesivo_caracteristicas', label: 'Adesivo — características' },
    { key: 'emergencia_intro', label: 'Pílula do dia seguinte — introdução' },
    { key: 'emergencia_tempo_fator', label: 'Pílula do dia seguinte — o tempo como fator-chave' },
    { key: 'emergencia_atencao_prazo', label: 'Caixa "Atenção" (emergência) — prazos (72h/120h)' },
    { key: 'emergencia_atencao_risco', label: 'Caixa "Atenção" (emergência) — risco crescente' },
    { key: 'emergencia_atencao_lembrete', label: 'Caixa "Atenção" (emergência) — lembrete do nome' },
    { key: 'emergencia_direitos_adolescente', label: 'Caixa "Olha só..." — direitos do adolescente' },
  ],
  'mitos-anticoncepcional': [
    { key: 'mito_1', label: 'Card mito/verdade 1 (engorda)' },
    { key: 'mito_2', label: 'Card mito/verdade 2 (acne)' },
    { key: 'mito_3', label: 'Card mito/verdade 3 (outros benefícios)' },
    { key: 'fique_por_dentro_lista', label: 'Lista "Fique por dentro!"' },
  ],
  'direitos-sexuais-reprodutivos': [
    { key: 'paragrafo_1', label: 'Parágrafo 1' },
    { key: 'paragrafo_2', label: 'Parágrafo 2' },
    { key: 'paragrafo_3', label: 'Parágrafo 3' },
    { key: 'paragrafo_4', label: 'Parágrafo 4' },
  ],
  'gravidez-adolescencia-mudancas': [
    { key: 'intro_fecundacao', label: 'Parágrafo introdutório (fecundação)' },
    { key: 'intro_fases_periodo', label: 'Frase "Essas fases são divididas..."' },
    { key: 'trimestre_1', label: 'Card "1º Trimestre"' },
    { key: 'trimestre_2', label: 'Card "2º Trimestre"' },
    { key: 'trimestre_3', label: 'Card "3º Trimestre"' },
    { key: 'trimestre_puerperio', label: 'Card "Puerpério (Pós-parto)"' },
  ],
  'orientacao-quem-pode-ajudar': [
    { key: 'fundamental_conversar', label: 'Caixa "É fundamental…"' },
    { key: 'procure_posto_saude', label: 'Parágrafo sobre procurar o posto de saúde' },
  ],
};

// undefined (não o key cru) quando não bate com nenhum slot conhecido — senão
// um block velho/solto (ex. sobra do seed antigo) pareceria um slot válido e
// esconderia os controles de mover/remover no admin sem motivo.
export function fieldLabel(slug, key) {
  return SECTION_FIELD_SLOTS[slug]?.find((f) => f.key === key)?.label;
}
