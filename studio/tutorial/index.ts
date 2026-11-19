import {definePlugin} from 'sanity'
import {TutorialTool} from './TutorialTool'

/** Plugin que adiciona a ferramenta "Tutorial" à barra superior do Studio. */
export const tutorialPlugin = definePlugin({
  name: 'cartilha-tutorial',
  tools: [{name: 'tutorial', title: 'Tutorial', component: TutorialTool}],
})
