import { useCallback, useEffect, useState } from 'react'
import AdminLogin from './AdminLogin'
import AdminPanel from './AdminPanel'

export default function AdminApp() {
  const [status, setStatus] = useState('checking') // 'checking' | 'loggedOut' | 'loggedIn'
  const [enquiries, setEnquiries] = useState([])
  const [loadError, setLoadError] = useState('')

  const loadEnquiries = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/enquiries')
      if (res.status === 401) {
        setStatus('loggedOut')
        return
      }
      const data = await res.json().catch(() => ({}))
      if (res.ok && data.ok) {
        setEnquiries(data.enquiries || [])
        setLoadError('')
        setStatus('loggedIn')
      } else {
        setLoadError(data.error || 'Could not load enquiries.')
        setStatus('loggedIn')
      }
    } catch {
      setLoadError('Could not reach the server.')
      setStatus('loggedIn')
    }
  }, [])

  useEffect(() => {
    loadEnquiries()
  }, [loadEnquiries])

  const handleLoggedIn = () => {
    setStatus('checking')
    loadEnquiries()
  }

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' }).catch(() => {})
    setEnquiries([])
    setStatus('loggedOut')
  }

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/admin/enquiries?id=${encodeURIComponent(id)}`, { method: 'DELETE' })
      const data = await res.json().catch(() => ({}))
      if (res.ok && data.ok) {
        setEnquiries((prev) => prev.filter((e) => e.id !== id))
        return true
      }
      return false
    } catch {
      return false
    }
  }

  if (status === 'checking') {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center">
        <div className="h-8 w-8 rounded-full border-2 border-gold/30 border-t-gold animate-spin" />
      </div>
    )
  }

  if (status === 'loggedOut') {
    return <AdminLogin onLoggedIn={handleLoggedIn} />
  }

  return (
    <AdminPanel
      enquiries={enquiries}
      loadError={loadError}
      onRefresh={loadEnquiries}
      onLogout={handleLogout}
      onDelete={handleDelete}
    />
  )
}
