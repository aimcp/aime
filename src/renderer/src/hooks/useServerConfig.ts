import { useMemo, useState } from 'react'

export function useServerConfig() {
  const [serverUrl, setServerUrl] = useState<string>()

  window.electronAPI.getServerUrl().then(url => setServerUrl(url))

  const aiChatApiPath = useMemo(() => `${serverUrl}/api/ai/chat`, [serverUrl])

  return {
    serverUrl,
    setServerUrl,

    aiChatApiPath,
  }
}
