/** @type {import('tailwindcss').Config} */
// Tokens do Design System "Cartilha" (cores, tipografia, espaçamentos e raios).
// Os nomes são os mesmos do sistema, para o código e o guia falarem a mesma língua.
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Cores antigas, ainda usadas pela capa, contracapa e ficha catalográfica.
        'brand-dark': '#1D4355',
        'brand-darker': '#163341',
        'brand-blue': '#289DD2',
        'brand-teal': '#41C1BA',

        mesa: '#e9ebe6',
        papel: '#ffffff',
        'papel-creme': '#f5f5ef',
        tinta: '#1d4355',
        'tinta-forte': '#163341',
        'tinta-suave': '#4f6b78',
        'azul-marca': '#289dd2',
        'azul-texto': '#156e9a',
        'teal-marca': '#41c1ba',
        'azul-claro': '#e3f2f9',
        'teal-claro': '#ddf3f1',
        'neutro-claro': '#eef1f2',
        destaque: '#156e9a',
        'sobre-destaque': '#ffffff',
        fio: '#d6dee2',
        // Pastéis dos cartões do passo a passo (tom informal, como os infográficos
        // originais). Texto em tinta: contraste acima de 10:1 em todos.
        'lilas-claro': '#ece4f7',
        'rosa-claro': '#fbe2e6',
        'amarelo-claro': '#fdf0cf',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'Poppins', 'system-ui', 'sans-serif'],
        titulo: ['Poppins', 'system-ui', 'sans-serif'],
        texto: ['"Work Sans"', 'system-ui', 'sans-serif'],
        // Nomes antigos, ainda usados pelas páginas de abertura.
        poppins: ['Poppins', 'sans-serif'],
        worksans: ['"Work Sans"', 'sans-serif'],
      },
      fontSize: {
        capa: ['64px', { lineHeight: '60px', letterSpacing: '0.5px' }],
        abertura: ['48px', { lineHeight: '48px', letterSpacing: '0.5px' }],
        'titulo-pagina': ['30px', { lineHeight: '38px', letterSpacing: '-0.3px', fontWeight: '600' }],
        subtitulo: ['21px', { lineHeight: '28px', fontWeight: '600' }],
        'titulo-caixa': ['16px', { lineHeight: '22px', fontWeight: '700' }],
        'abre-texto': ['17px', { lineHeight: '27px' }],
        corpo: ['15px', { lineHeight: '24px' }],
        legenda: ['12px', { lineHeight: '17px', fontWeight: '500' }],
        'fonte-imagem': ['11px', { lineHeight: '15px' }],
        rubrica: ['11px', { lineHeight: '14px', letterSpacing: '1.3px', fontWeight: '600' }],
        folio: ['13px', { lineHeight: '16px', fontWeight: '600' }],
      },
      spacing: {
        'margem-topo': '56px',
        'margem-base': '64px',
        'margem-externa': '40px',
        'margem-interna': '48px',
      },
      borderRadius: {
        pagina: '4px',
        caixa: '24px',
        cartao: '16px',
      },
      boxShadow: {
        pagina: '0 1px 2px rgba(22,51,65,0.08), 0 16px 40px rgba(22,51,65,0.14)',
        'dobra-esq': 'inset -28px 0 28px -20px rgba(22,51,65,0.16)',
        'dobra-dir': 'inset 28px 0 28px -20px rgba(22,51,65,0.16)',
      },
    },
  },
  plugins: [],
}
