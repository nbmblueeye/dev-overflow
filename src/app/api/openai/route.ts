import { NextResponse } from 'next/server'

export const POST = async (request: Request) => {
  const { question } = await request.json()
  const content = question.replace(/<.*?>/g, '')
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{
          role: 'system',
          content: 'You are a helpful assistant.'
        },
        {
          role: 'user',
          content: 'Please answer question: ' + content
        }]
      })
    })

    const responseFromOpenAI = await response.json()
    const answer = responseFromOpenAI.choices[0].message.content
    return NextResponse.json({
      status: 'success',
      answer
    })
  } catch (error) {
    return NextResponse.json({ 'OpenAI response error ': error })
  }
}
