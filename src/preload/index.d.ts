import type { AiConfig } from '../types'

declare global {
  interface Window {
    electronAPI: {
      getAiconfig: () => Promise<AiConfig>
      updateAiModel: (model: AiConfig['models'][0]) => Promise<void>
    }
  }
}

export {}
