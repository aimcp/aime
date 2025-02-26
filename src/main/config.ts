import type { AiConfig } from '../types'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { destr } from 'destr'
import { app } from 'electron'
import { ensureFileSync, writeJson } from 'fs-extra'

const appConfigDir = resolve(app.getPath('userData'), 'configs')

const aiConfigPath = resolve(appConfigDir, 'ai.json')
export function getAiconfig() {
  ensureFileSync(aiConfigPath)
  const data = readFileSync(aiConfigPath, 'utf-8')

  let fileData = destr<AiConfig>(data)
  if (typeof fileData === 'string') {
    fileData = {
      activeProvider: 'deepseek',
      models: [],
    }
  }
  if (!fileData.activeProvider && fileData.models.length) {
    fileData.activeProvider = fileData.models[0].provider
  }

  return fileData
}
export async function updateAiModel(model: AiConfig['models'][0]) {
  const config = getAiconfig()

  const oldModel = config.models.find(item => item.provider === model.provider)
  if (oldModel) {
    oldModel.apiKey = model.apiKey
  }
  else {
    config.models.push(model)
  }

  config.activeProvider = model.provider

  return writeJson(aiConfigPath, config, {
    spaces: 2,
    encoding: 'utf-8',
  })
}
