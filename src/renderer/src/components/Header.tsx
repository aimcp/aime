import { zodResolver } from '@hookform/resolvers/zod'
import { DeepSeek } from '@lobehub/icons'
import { Button } from '@renderer/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@renderer/components/ui/dialog'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@renderer/components/ui/form'
import { Input } from '@renderer/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@renderer/components/ui/select'
import { useAiConfig } from '@renderer/hooks/useAiConfig'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function Header() {
  const [isOpenAiConfigForm, setIsOpenAiConfigForm] = useState(false)

  const { activeProvider, models, updateAiModel } = useAiConfig()
  const aiModelSchema = z.object({
    provider: z.enum(['deepseek']),
    apiKey: z.string().nonempty('API key cannot by empty'),
  })
  const aiModelForm = useForm<z.infer<typeof aiModelSchema>>({
    resolver: zodResolver(aiModelSchema),
    defaultValues: {
      provider: activeProvider,
      apiKey: models.find(model => model.provider === activeProvider)?.apiKey,
    },
  })
  const onOpenAiConfigForm = () => {
    aiModelForm.setValue('provider', activeProvider)
    aiModelForm.setValue('apiKey', models.find(model => model.provider === activeProvider)?.apiKey ?? '')
    setIsOpenAiConfigForm(true)
  }
  const onProviderChange = (value: z.infer<typeof aiModelSchema>['provider']) => {
    const model = models.find(item => item.provider === value)
    if (model) {
      aiModelForm.setValue('apiKey', model.apiKey)
    }
  }
  const onSubmitAiConfig = (values: z.infer<typeof aiModelSchema>) => {
    updateAiModel(values)
    setIsOpenAiConfigForm(false)
  }

  return (
    <header className="h-10 flex items-center px-2 border-b border-border">
      <Dialog open={isOpenAiConfigForm} onOpenChange={setIsOpenAiConfigForm}>
        <Button className="size-8 cursor-pointer" variant="ghost" onClick={() => onOpenAiConfigForm()}>
          <DeepSeek color="#4D6BFE" />
        </Button>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>AI Model Config</DialogTitle>
            <DialogDescription> Configure the AI Model and API Key currently used </DialogDescription>
          </DialogHeader>
          <Form {...aiModelForm}>
            <form onSubmit={aiModelForm.handleSubmit(onSubmitAiConfig)}>
              <FormField
                control={aiModelForm.control}
                name="provider"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Provider</FormLabel>
                    <Select
                      defaultValue={field.value}
                      onValueChange={(value) => {
                        field.onChange(value)
                        onProviderChange(value as z.infer<typeof aiModelSchema>['provider'])
                      }}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="AI model"></SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="deepseek">Deepseek</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>The AI Model to use</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={aiModelForm.control}
                name="apiKey"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel>API Key</FormLabel>
                    <FormControl>
                      <Input type="password" defaultValue={field.value} placeholder="API key" onChange={field.onChange} />
                    </FormControl>
                    <FormDescription>The API key for auth</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="mt-3">
                <Button variant="secondary" onClick={() => setIsOpenAiConfigForm(false)}>Close</Button>
                <Button type="submit">Save</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </header>
  )
}
