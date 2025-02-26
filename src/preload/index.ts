import type { AiConfig } from '../types'
import { contextBridge, ipcRenderer } from 'electron'

const electronAPI = {
  getAiconfig: () => ipcRenderer.invoke('getAiconfig'),
  updateAiModel: (model: AiConfig['models'][0]) => ipcRenderer.invoke('updateAiModel', model),
  getServerUrl: () => ipcRenderer.invoke('getServerUrl'),
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electronAPI', electronAPI)
  }
  catch (error) {
    console.error(error)
  }
}
else {
  // @ts-expect-error electronAPI
  window.electronAPI = electronAPI
}
