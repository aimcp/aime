import type { AiConfig } from '../../../types'
import { useEffect, useMemo, useRef, useState } from 'react'

export function useAiConfig() {
  const [aiConfig, setAiConfig] = useState<AiConfig>()

  const isDirty = useRef(true)
  useEffect(() => {
    if (!isDirty.current) {
      return
    }

    window.electronAPI.getAiconfig().then((config) => {
      setAiConfig(config)
      isDirty.current = false
    })
  }, [isDirty])

  const models = useMemo(() => aiConfig?.models ?? [], [aiConfig])

  const updateAiModel = (model: AiConfig['models'][0]) => {
    window.electronAPI.updateAiModel(model).then(() => {
      isDirty.current = true
    })
  }

  return {
    aiConfig,
    models,
    updateAiModel,
  }
}
