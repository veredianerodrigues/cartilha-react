import {defineCliConfig} from 'sanity/cli'

// Defina SANITY_STUDIO_PROJECT_ID / SANITY_STUDIO_DATASET em studio/.env
export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
})
