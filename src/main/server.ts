import type { ServerType } from '@hono/node-server'
import { createDeepSeek } from '@ai-sdk/deepseek'
import { serve } from '@hono/node-server'
import { streamText } from 'ai'
import { getRandomPort } from 'get-port-please'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { stream } from 'hono/streaming'
import { getAiconfig } from './config'

export class ServerRoutes {
  address: string = '127.0.0.1'
  port: number = 3000
  server: ServerType | undefined

  constructor() {
    getRandomPort().then((port) => {
      this.port = port

      const app = new Hono()
      app.use('/api/*', cors())

      app.post('/api/ai/chat', async (c) => {
        const aiConfig = getAiconfig()
        const apiKey = aiConfig.models?.find(item => item.provider === 'deepseek')?.apiKey

        console.log('apiKey',apiKey)
        const { messages } = await c.req.json()

        const result = streamText({
          model: createDeepSeek({
            baseURL:'https://api.scnet.cn/api/llm/v1',
            apiKey,
          })('DeepSeek-R1-Distill-Qwen-32B'),
          system: 'You are a helpful assistant.',
          messages,
          temperature:0.6
        })

        c.header('Content-Type', 'text/plain; charset=utf-8')

        return stream(c, stream => stream.pipe(result.toDataStream({
          getErrorMessage(error) {
            console.log('error',error)
            if (error == null) {
              return 'unknown error'
            }

            if (typeof error === 'string') {
              return error
            }

            if (error instanceof Error) {
              return error.message
            }

            return JSON.stringify(error)
          },
        })))
      })

      this.server = serve({
        fetch: app.fetch,
        port: this.port,
      })

      console.log(`[Aime] node server started: ${this.address}:${this.port}`)
    })
  }

  getServerUrl() {
    return `http://${this.address}:${this.port}`
  }

  close() {
    this.server?.close()
  }
}
