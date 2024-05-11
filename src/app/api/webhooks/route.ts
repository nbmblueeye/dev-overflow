'use server'
/* eslint-disable camelcase */
import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { createUser, deleteUser, updateUser } from '@/backend/controllers/user.controller'
import { NextResponse } from 'next/server'

export async function POST (req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.NEXT_CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Get the headers
  const headerPayload = headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occured', {
      status: 400
    })
  }

  // Do something with the payload
  // For this guide, you simply log the payload to the console

  if (evt.type === 'user.created') {
    console.log('Created a user')
    const { id, email_addresses, username, first_name, last_name, image_url } = evt.data
    const mongoUser = await createUser({
      clerkId: id,
      name: `${first_name} ${last_name || ''}`,
      username: username!,
      email: email_addresses[0].email_address,
      picture: image_url
    })

    return NextResponse.json({ message: 'OK', user: mongoUser })
  }

  if (evt.type === 'user.updated') {
    console.log('updated a User')
    const { id, email_addresses, username, first_name, last_name, image_url } = evt.data
    const mongoUser = await updateUser({
      clerkId: id,
      updateData: {
        name: `${first_name} ${last_name || ''}`,
        username: username!,
        email: email_addresses[0].email_address,
        picture: image_url
      },
      path: `profile/${id}`
    })

    return NextResponse.json({ message: 'OK', user: mongoUser })
  }

  if (evt.type === 'user.deleted') {
    const { id } = evt.data
    const user = await deleteUser({ clerkId: id!, path: `profile/${id}` })

    return new Response(JSON.stringify(user), { status: 200 })
  }

  return NextResponse.json({ message: 'OK' })
}
