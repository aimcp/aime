export interface AiConfigModel {
  provider: 'deepseek'
  apiKey: string
}

export interface AiConfig {
  activeProvider: AiConfigModel['provider']
  models: AiConfigModel[]
}
