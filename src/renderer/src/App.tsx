import { useChat } from '@ai-sdk/react'
import Header from '@renderer/components/Header'
import { useServerConfig } from './hooks/useServerConfig'

function App(): JSX.Element {
  const { aiChatApiPath } = useServerConfig()

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: aiChatApiPath,
  })

  return (
    <div>
      <Header />
      <main>
        <div>
          {messages.map(message => (
            <div key={message.id}>
              {message.role === 'user' ? 'User: ' : 'AI: '}
              {message.content}
            </div>
          ))}

          <form onSubmit={handleSubmit}>
            <input name="prompt" value={input} onChange={handleInputChange} />
            <button type="submit">Submit</button>
          </form>
        </div>
      </main>
    </div>
  )
}

export default App
