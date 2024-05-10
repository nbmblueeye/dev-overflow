"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Badge } from "../ui/badge"

import { useEffect, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import Image from "next/image"
import { useThemeContext } from "@/context/ThemeContext"

const formSchema = z.object({
  title: z.string().min(2).max(50),
  content: z.string().min(50),
  tags: z.string().array().min(1).max(5),
})

export function FormQuestion() {
    
    const { mode } = useThemeContext();
    const editorRef = useRef(null);

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            content:"",
            tags: [],
        },
    })

    const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>, field:any) => {
        if(e.key === "Enter" && field.name === "tags") {
            e.preventDefault()
            let tagInput = e.target as HTMLInputElement;
            let tagValue = tagInput.value.trim();
            if(tagValue !== "") {
                if(tagValue.length < 2 || tagValue.length > 20) {
                    form.setError('tags', {
                        type: "required",
                        message:"Please enter at least 2 characters and less than 20 characters"
                    });
                    return false;
                }

                if(field.value.length >= 5) {
                    form.setError('tags', {
                        type: "required",
                        message:"Maximum 5 Tag is allowed"
                    });
                    return false;
                }

                if(!field.value.includes(tagValue as never)){
                    form.setValue('tags', [...field.value, tagInput.value]);
                    tagInput.value = "";
                    form.clearErrors("tags");
                }
            }else{
                form.trigger()
            }
        }
    }

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
        console.log(form);
    }
    // ...
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-inter font-semibold text-base text-light900_dark300">Question Title <span className="text-primary-500">*</span></FormLabel>
                            <FormControl className="mt-4">
                                <Input placeholder="Add a title..." {...field} className="border border-light700_dark400 outline-none no-focus font-inter text-base font-normal background-light800_dark200 text-light800_dark200 placeholder:text-light-500 px-4 py-6"/>
                            </FormControl>
                            <FormDescription className="font-inter text-sm font-normal text-light-500">
                                Be specific and imagine you’re asking a question to another person.
                            </FormDescription>
                            <FormMessage className="font-inter text-sm font-normal text-primary-500"/>
                        </FormItem>
                        
                    )}
                />

                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-inter font-semibold text-base text-light900_dark300">Detailed explanation of your problem? <span className="text-primary-500">*</span></FormLabel>
                            <FormControl className={`mt-4 outline-none no-focus`}>
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
                                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                            'anchor', 'searchreplace', 'visualblocks', 'codesample', 'fullscreen',
                                            'insertdatetime', 'media', 'table'
                                        ],
                                        toolbar: 'undo redo | blocks | codesample |' +
                                            'bold italic forecolor | alignleft aligncenter ' +
                                            'alignright alignjustify | bullist numlist| ',
                                        content_style: `body { font-family:Inter,sans-serif; font-size:16px}`,
                                        content_css: mode === 'dark' ? 'dark' : 'light', 
                                        skin: mode === 'dark' ? 'oxide-dark' : 'oxide',
                                        
                                    }}
                                />
                               
                            </FormControl>
                            <FormDescription className="font-inter text-sm font-normal text-light-500">
                                Introduce the problem and expand on what you put in the title. Minimum 20 characters.
                            </FormDescription>
                            <FormMessage className="font-inter text-sm font-normal text-primary-500"/>
                        </FormItem>
                        
                    )}
                />  

                <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-inter font-semibold text-base text-light900_dark300">Detailed explanation of your problem? <span className="text-primary-500">*</span></FormLabel>
                            <FormControl className="mt-4">
                                <Input placeholder="Add a Tag" className="border border-light700_dark400 outline-none no-focus font-inter text-base font-normal background-light800_dark200 text-light800_dark200 placeholder:text-light-500 px-4 py-6"
                                    onKeyDown={(e) => handleAddTag(e, field)}
                                />
                            </FormControl>
                            <FormDescription className="font-inter text-sm font-normal text-light-500">
                                Add up to 5 tags to describe what your question is about. Start typing to see suggestions.
                            </FormDescription>
                            <FormMessage className="font-inter text-sm font-normal text-primary-500"/>
                                <div className="flex flex-row flex-wrap gap-4">
                                    {
                                        field.value.length > 0 && field.value.map((item: string, index:any) => {
                                            return (
                                                <Badge key={index} className={`shadow background-light800_dark300 text-sm font-inter font-medium text-light500_dark400 px-4 py-2 rounded-md hover-light700_dark400 flex flex-row gap-2 items-center justify-center`}>
                                                 {item} 
                                                 <Image 
                                                    src="/assets/icons/close.svg"
                                                    width={12}
                                                    height={12}
                                                    alt="close-btn"
                                                    className='invert-0 dark:invert'
                                                />
                                                </Badge>
                                            )
                                        })
                                    }
                                </div>
                        </FormItem>
                        
                    )}
                /> 
                   
                <Button type="submit" className="float-end px-4 py-3 text-base font-inter font-medium bg-primary-500 text-primary-100 hover:text-light-700">Submit</Button>
            </form>
        </Form>
    )
}
