export async function fetchChat() {
  const res = await fetch('/api/chat')
  return await res.json()
}