import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from '../../studio/schemaTypes'
import {structure} from '../../studio/structure'
import {tutorialPlugin} from '../../studio/tutorial'

// Studio embutido no site, servido em /studio. Mesmo schema do studio/.
export default defineConfig({
  name: 'cartilha',
  title: 'Gravidez na adolescência',
  basePath: '/studio',
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  plugins: [structureTool({structure, title: 'Conteúdo'}), tutorialPlugin()],
  // Menu enxuto para a equipe editorial: sem Vision (consultas técnicas) e sem Releases.
  releases: {enabled: false},
  schema: {types: schemaTypes},
})
