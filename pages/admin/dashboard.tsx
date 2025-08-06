import { useEffect, useState } from 'react'
import { supabase } from '../../utils/supabaseClient'

export default function Dashboard() {
  const [users, setUsers] = useState<any[]>([])
  const [tokens, setTokens] = useState<number>(0)

  useEffect(() => {
    const fetchData = async () => {
      const { data: users } = await supabase.from('profiles').select('*')
      const { data: logs } = await supabase.from('usage_logs').select('*')
      setUsers(users || [])
      setTokens(logs?.reduce((sum, l) => sum + (l.tokens_used || 0), 0) || 0)
    }
    fetchData()
  }, [])

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Users: {users.length}</p>
      <p>Total Tokens Used: {tokens}</p>
    </div>
  )
}
