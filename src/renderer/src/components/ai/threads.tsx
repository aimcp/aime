import { FC } from "react";
import { UIMessage,TextUIPart , ReasoningUIPart , ToolInvocationUIPart , SourceUIPart } from '@ai-sdk/ui-utils'
import {Avatar, AvatarFallback} from '@renderer/components/ui/avatar'

interface ThreadPartProps {
  part: TextUIPart | ReasoningUIPart | ToolInvocationUIPart | SourceUIPart
}

export const AiThreadPart: FC<ThreadPartProps> = ({part}) => {
  if (part.type === 'reasoning' || part.type === 'source' || part.type === 'tool-invocation') {
    return part.type
  }

  return <p>{part.text}</p>
}

interface ThreadProps {
  message: UIMessage
}

export const AiThread:FC<ThreadProps> = ({message}) => {
  return <div className="flex gap-2">
    <Avatar>
      <AvatarFallback>{message.role.slice(0,2)}</AvatarFallback>
    </Avatar>
    <div className="flex-1">
      {message.parts.map((part,i) =>  <AiThreadPart key={i} part={part} />)}
    </div>
  </div>
}

interface ThreadsProps {
  messages:UIMessage[]
}

export const AiThreads: FC<ThreadsProps>= ({messages}) => {
  return <div className="flex flex-col gap-2">
    {messages.map(item => <AiThread key={item.id} message={item} />)}
  </div>
}