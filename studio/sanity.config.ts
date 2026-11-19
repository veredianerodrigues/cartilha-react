import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'
import {tutorialPlugin} from './tutorial'

export default defineConfig({
  name: 'cartilha',
  title: 'Gravidez na adolescência',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  plugins: [structureTool({structure, title: 'Conteúdo'}), tutorialPlugin()],
  // Menu enxuto para a equipe editorial: sem Vision (consultas técnicas) e sem Releases.
  releases: {enabled: false},
  schema: {types: schemaTypes},
})
