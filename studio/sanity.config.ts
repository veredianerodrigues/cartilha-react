import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'
import {tutorialPlugin} from './tutorial'

export default defineConfig({
  name: 'cartilha',
  title: 'Gravidez na adolescência',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  plugins: [structureTool({structure}), visionTool(), tutorialPlugin()],
  schema: {types: schemaTypes},
})
