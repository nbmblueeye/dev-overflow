'use client'
import React, { useRef, useState } from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import { useThemeContext } from '@/context/ThemeContext'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import Spinner from '../shares/Spinner'
import { Editor } from '@tinymce/tinymce-react'
// import { createAnswer } from '@/backend/controllers/answer.controller'
import { usePathname } from 'next/navigation'
import { createAnswer } from '@/backend/controllers/answer.controller'

const answerSchema = z.object({
  content: z.string().min(50)
})

type Props = {
  author:string,
  question:string,
}

const FormAnswer = ({ author, question }: Props) => {
  const { mode } = useThemeContext()
  const editorRef = useRef(null)
  const [isLoading, setIsLoading] = useState(false)
  const pathName = usePathname()

  // 1. Define your form.
  const form = useForm<z.infer<typeof answerSchema>>({
    resolver: zodResolver(answerSchema),
    defaultValues: {
      content: ''
    }
  })

  // 2. Define a submit handler.
  async function addNewAnswer (values: z.infer<typeof answerSchema>) {
    setIsLoading(true)
    try {
      await createAnswer({
        author: JSON.parse(author),
        question: JSON.parse(question),
        content: values.content,
        path: pathName
      })

      form.reset()
      const editor = editorRef.current as any
      if (editor) {
        editor.setContent('')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(addNewAnswer)} className="space-y-8">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-6 flex flex-row flex-wrap items-center justify-between gap-4">
                  <p className="text-light800_dark200 mb-4 font-inter text-base font-semibold">Write your answer here</p>
                  <Button className='background-light800_dark300 hover-light700_dark400 rounded-md font-inter text-xs font-medium text-primary-500 shadow'>
                    <Image
                        src='/assets/icons/stars.svg'
                        width={14}
                        height={14}
                        alt="ai answer"
                        className='me-2'
                    />
                    Generate AI Answer
                  </Button>
                </FormLabel>
                <FormControl className={'no-focus outline-none'}>
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                    onInit={(evt, editor) => {
                      // @ts-ignore
                      editorRef.current = editor
                    }}
                    onBlur={field.onBlur}
                    onEditorChange={(content) => field.onChange(content)}
                    initialValue=""
                    init={{
                      height: 300,
                      menubar: false,
                      plugins: [
                        'advlist',
                        'autolink',
                        'lists',
                        'link',
                        'image',
                        'charmap',
                        'preview',
                        'anchor',
                        'searchreplace',
                        'visualblocks',
                        'codesample',
                        'fullscreen',
                        'insertdatetime',
                        'media',
                        'table'
                      ],
                      toolbar:
                        'undo redo | blocks | codesample |' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist| ',
                      content_style:
                        'body { font-family:Inter,sans-serif; font-size:16px}',
                      content_css: mode === 'dark' ? 'dark' : 'light',
                      skin: mode === 'dark' ? 'oxide-dark' : 'oxide'
                    }}
                  />
                </FormControl>
                <FormMessage className="font-inter text-sm font-normal text-primary-500" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="float-end bg-primary-500 px-4 py-3 font-inter text-base font-medium text-primary-100 hover:text-light-700"
          >
            {isLoading
              ? (
              <>
                <Spinner addClass="font-inter text-base font-medium text-primary-100" />
                Submiting
              </>
                )
              : (
                  'Submit'
                )}
          </Button>
        </form>
      </Form>
  )
}

export default FormAnswer
