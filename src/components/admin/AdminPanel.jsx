import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LogOut, RefreshCw, Inbox, AlertCircle } from 'lucide-react'
import EnquiryCard from './EnquiryCard'

export default function AdminPanel({ enquiries, loadError, onRefresh, onLogout, onDelete }) {
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    const interval = setInterval(onRefresh, 30000)
    return () => clearInterval(interval)
  }, [onRefresh])

  const handleRefresh = async () => {
    setRefreshing(true)
    await onRefresh()
    setTimeout(() => setRefreshing(false), 400)
  }

  const newTodayCount = enquiries.filter(
    (e) => Date.now() - e.receivedAt < 24 * 60 * 60 * 1000
  ).length

  return (
    <div className="min-h-screen bg-ivory">
      <header className="bg-charcoal text-ivory">
        <div className="container-px max-w-content mx-auto py-6 flex items-center justify-between">
          <div>
            <span className="font-serif text-2xl">SVG</span>
            <p className="text-[10px] uppercase tracking-widest2 text-gold mt-0.5">
              Admin Panel &middot; Welcome, Anirud Reddy
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              aria-label="Refresh"
              className="p-2.5 rounded-full border border-ivory/20 hover:bg-ivory/10 transition-colors"
            >
              <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
            </button>
            <button
              onClick={onLogout}
              className="inline-flex items-center gap-2 text-sm border border-ivory/20 rounded-full px-4 py-2.5 hover:bg-ivory/10 transition-colors"
            >
              <LogOut size={15} /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="container-px max-w-content mx-auto py-10">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="font-serif text-3xl text-charcoal">Enquiries</h1>
            <p className="text-sm text-charcoal/55 mt-1">
              {enquiries.length} total &middot; {newTodayCount} in the last 24 hours &middot; auto-removed after 30 days
            </p>
          </div>
        </div>

        {loadError && (
          <div className="flex items-center gap-2 bg-white border border-rose-dark/30 rounded-xl px-4 py-3 mb-6 text-sm text-rose-dark">
            <AlertCircle size={16} /> {loadError}
          </div>
        )}

        {enquiries.length === 0 && !loadError ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Inbox className="text-charcoal/20 mb-4" size={40} />
            <p className="text-charcoal/50">No enquiries yet — new ones will appear here instantly.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence>
              {enquiries.map((enquiry, i) => (
                <EnquiryCard key={enquiry.id} enquiry={enquiry} index={i} onDelete={onDelete} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  )
}
