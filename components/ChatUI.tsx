import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'

interface Message {
  content: string
}

export default function ChatUI() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')

  useEffect(() => {
    const channel = supabase
      .channel('chat')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
        setMessages(prev => [...prev, payload.new as Message])
      })
      .subscribe()
    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const sendMessage = async () => {
    if (!input.trim()) return
    await supabase.from('messages').insert({ content: input })
    setInput('')
  }

  return (
    <div>
      <div>{messages.map((m, i) => <p key={i}>{m.content}</p>)}</div>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  )
}
