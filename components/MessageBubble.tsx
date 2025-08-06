export default function MessageBubble({ text }: { text: string }) {
  return (
    <div className="p-2 m-1 bg-blue-100 rounded">
      {text}
    </div>
  )
}