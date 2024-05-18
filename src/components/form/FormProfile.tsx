'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Spinner from '../shares/Spinner'
import { usePathname, useRouter } from 'next/navigation'
import { editUserProfile } from '@/backend/controllers/user.controller'

type Props = {
    user: string
}

const profileSchema = z.object({
  name: z.string().min(2).max(100),
  username: z.string().min(2).max(100),
  location: z.string().max(100),
  portfolioWebsite: z.string(),
  bio: z.string().min(2).max(200)
})

const FormProfile = ({ user }:Props) => {
  const userData = JSON.parse(user)
  const pathName = usePathname()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // 1. Define your form.
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: userData.name || '',
      username: userData.username || '',
      location: userData.location || '',
      portfolioWebsite: userData.portfolioWebsite || '',
      bio: userData.bio || ''
    }
  })

  // 2. Define a submit handler.
  const editProfile = async (values: z.infer<typeof profileSchema>) => {
    setIsLoading(true)
    try {
      await editUserProfile({
        userId: userData._id,
        name: values.name,
        username: values.username,
        location: values.location,
        portfolioWebsite: values.portfolioWebsite,
        bio: values.bio,
        path: pathName
      })
      router.push(`/profile/${userData.clerkId}`)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(editProfile)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-light900_dark300 font-inter text-base font-semibold">
                Name <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-4">
                <Input
                  placeholder="Add a Name.."
                  {...field}
                  className="border-light700_dark400 no-focus background-light800_dark200 text-light800_dark200 border px-4 py-6 font-inter text-base font-normal outline-none placeholder:text-light-500"
                />
              </FormControl>
              <FormMessage className="font-inter text-sm font-normal text-primary-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-light900_dark300 font-inter text-base font-semibold">
                Username <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-4">
                <Input
                  placeholder="Add a Username.."
                  {...field}
                  className="border-light700_dark400 no-focus background-light800_dark200 text-light800_dark200 border px-4 py-6 font-inter text-base font-normal outline-none placeholder:text-light-500"
                />
              </FormControl>
              <FormMessage className="font-inter text-sm font-normal text-primary-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-light900_dark300 font-inter text-base font-semibold">
                Your location
              </FormLabel>
              <FormControl className="mt-4">
                <Input
                  placeholder="Add a Location.."
                  {...field}
                  className="border-light700_dark400 no-focus background-light800_dark200 text-light800_dark200 border px-4 py-6 font-inter text-base font-normal outline-none placeholder:text-light-500"
                />
              </FormControl>
              <FormMessage className="font-inter text-sm font-normal text-primary-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="portfolioWebsite"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-light900_dark300 font-inter text-base font-semibold">
                Your portfolioWebsite
              </FormLabel>
              <FormControl className="mt-4">
                <Input
                  type='url'
                  placeholder="Add your portfolioWebsite.."
                  {...field}
                  className="border-light700_dark400 no-focus background-light800_dark200 text-light800_dark200 border px-4 py-6 font-inter text-base font-normal outline-none placeholder:text-light-500"
                />
              </FormControl>
              <FormMessage className="font-inter text-sm font-normal text-primary-500" />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-light900_dark300 font-inter text-base font-semibold">
                Your bio <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-4">
                <Textarea
                  placeholder="What's special about you?"
                  {...field}
                  className="border-light700_dark400 no-focus background-light800_dark200 text-light800_dark200 border px-4 py-2 font-inter text-base font-normal outline-none placeholder:text-light-500"
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
               Editting...
            </>
              )
            : ('Edit profile')
            }
        </Button>
      </form>
    </Form>
  )
}

export default FormProfile
