import type { StdioServerParameters } from '@modelcontextprotocol/sdk/client/stdio.js'
import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js'
import pkgInfo from '../../package.json'

export class McpClient {
  client: Client

  constructor() {
    this.client = new Client(
      {
        name: pkgInfo.name,
        version: pkgInfo.version,
      },
      {
        capabilities: {
          prompts: {},
          resources: {},
          tools: {},
        },
      },
    )
  }

  addStdioServer(parameters: StdioServerParameters) {
    this.client.connect(new StdioClientTransport(parameters))
  }

  destory() {
    this.client?.close()
  }
}
