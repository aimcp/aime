import { useChat } from '@ai-sdk/react'
import Header from '@renderer/components/Header'
import { useServerConfig } from './hooks/useServerConfig'
import { AiSender } from '@renderer/components/ai/sender'
import { useEffect } from 'react'
import {AiThreads} from '@renderer/components/ai/threads'

function App(): JSX.Element {
  const { aiChatApiPath } = useServerConfig()

  const { messages, input,status, handleInputChange, handleSubmit } = useChat({
    api: aiChatApiPath,
  })

  useEffect(() => {
  },[status])

  return (
    <div>
      <Header />
      <main>
        <div className='p-4'>
          <AiThreads messages={messages} />
          <AiSender
          className='mt-4'
           loading={status === 'submitted' || status === 'streaming'} 
           defaultText={input} 
           onValueChange={handleInputChange} 
           onEnter={handleSubmit} />
        </div>
      </main>
    </div>
  )
}

export default App
