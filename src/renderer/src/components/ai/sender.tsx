import { ChangeEvent, FC, HTMLAttributes, KeyboardEvent, useState } from "react";
import { Textarea } from '@renderer/components/ui/textarea'
import { Button } from "@renderer/components/ui/button"
import { ArrowUp, LoaderCircle } from 'lucide-react'
import { cn } from "@renderer/lib/utils";

interface AiSenderProps {
  loading: boolean
  defaultText?: string
  onValueChange?: (value: ChangeEvent<HTMLTextAreaElement>) => void
  onEnter?: () => void
}

export const AiSender: FC<AiSenderProps & HTMLAttributes<HTMLDivElement>> = ({ className,loading, defaultText, onValueChange, onEnter }) => {
  const [text, setText] = useState(defaultText)

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
    onValueChange?.(e)
  }
  const handleEnter = () => {
    setText('')
    onEnter?.()
  }
  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== 'Enter') {
      return
    }

    e.preventDefault()

    handleEnter()
  }


  return (
    <div className={cn('flex items-end gap-2 border border-border p-2 rounded-md',className)}>
      <Textarea disabled={loading} className="border-none shadow-none resize-none focus-visible:ring-0" value={text} onChange={onChange} onKeyDown={onKeyDown} />
      <Button size='icon' disabled={loading} className="rounded-full cursor-pointer" onClick={handleEnter}>
        {loading ? <LoaderCircle className="animate-spin" /> : <ArrowUp />}
      </Button>
    </div>
  )
}