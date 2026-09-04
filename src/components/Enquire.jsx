import { useState } from 'react'
import { Phone, Send, RotateCcw } from 'lucide-react'
import Reveal from './Reveal'
import Toast from './Toast'
import { pg, waLink, defaultWaMessage, rooms, stayDurations } from '../data/config'
import { validateEnquiry } from '../utils/enquiry'

const INITIAL_FORM = {
  name: '',
  phone: '',
  email: '',
  roomType: rooms[0]?.type || '',
  moveIn: '',
  numPeople: '1',
  stayDuration: stayDurations[0],
  message: '',
}

export default function Enquire() {
  const [step, setStep] = useState('form') // 'form' | 'done'
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [toast, setToast] = useState(null)

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    const fieldErrors = validateEnquiry(form)
    setErrors(fieldErrors)
    if (Object.keys(fieldErrors).length > 0) {
      setToast({ type: 'error', message: 'Please enter your original, valid details to continue.' })
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))

      if (res.ok && data.ok) {
        setStep('done')
        setToast({ type: 'success', message: 'We have received your details — we may contact you shortly.' })
      } else {
        setToast({
          type: 'error',
          message: data.error || 'We could not send your enquiry right now. Please WhatsApp or call us directly.',
        })
      }
    } catch {
      setToast({
        type: 'error',
        message: 'We could not reach the server. Please WhatsApp or call us directly.',
      })
    } finally {
      setSubmitting(false)
    }
  }

  const startOver = () => {
    setForm(INITIAL_FORM)
    setErrors({})
    setStep('form')
  }

  const inputClass = (hasError) =>
    `w-full rounded-xl border ${
      hasError ? 'border-rose-dark/60' : 'border-charcoal/15'
    } bg-ivory px-4 py-3 text-sm outline-none focus:border-rose-dark transition-colors`

  return (
    <section id="enquire" className="bg-ivory bg-glow">
      <Toast toast={toast} onClose={() => setToast(null)} />
      <div className="container-px max-w-content mx-auto py-24 md:py-32">
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          <Reveal>
            <p className="eyebrow mb-4">Enquire</p>
            <h2 className="section-heading mb-6">Find Your New Home</h2>
            <p className="text-charcoal/65 font-light leading-relaxed mb-10 max-w-md">
              Schedule a visit or speak with us about availability — we typically respond right
              away.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <a href={waLink(defaultWaMessage)} target="_blank" rel="noopener noreferrer" className="btn-primary !bg-rose-dark">
                WhatsApp Us
              </a>
              <a href={`tel:${pg.phoneTel}`} className="btn-secondary">
                <Phone size={16} /> Call Now
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="card-premium p-7 md:p-9">
              {step === 'done' ? (
                <div className="text-center py-10">
                  <h3 className="font-serif text-2xl mb-3">Thank You</h3>
                  <p className="text-charcoal/65 font-light mb-6">
                    We have received your enquiry and will get back to you shortly.
                  </p>
                  <button onClick={startOver} className="btn-secondary !py-2.5 mx-auto">
                    <RotateCcw size={15} /> Submit Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        placeholder="Full Name"
                        value={form.name}
                        onChange={update('name')}
                        className={inputClass(!!errors.name)}
                      />
                      {errors.name && <p className="text-xs text-rose-dark mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <input
                        placeholder="Mobile Number"
                        inputMode="numeric"
                        value={form.phone}
                        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value.replace(/\D/g, '').slice(0, 10) }))}
                        className={inputClass(!!errors.phone)}
                      />
                      {errors.phone && <p className="text-xs text-rose-dark mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={form.email}
                      onChange={update('email')}
                      className={inputClass(!!errors.email)}
                    />
                    {errors.email && <p className="text-xs text-rose-dark mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest2 text-charcoal/45 mb-1.5">
                      Looking For
                    </label>
                    <select value={form.roomType} onChange={update('roomType')} className={inputClass(false)}>
                      {rooms.map((r) => (
                        <option key={r.id} value={r.type}>
                          {r.type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-widest2 text-charcoal/45 mb-1.5">
                        Preferred Move-in Date
                      </label>
                      <input
                        type="date"
                        value={form.moveIn}
                        onChange={update('moveIn')}
                        className={`${inputClass(!!errors.moveIn)} text-charcoal/70`}
                      />
                      {errors.moveIn && <p className="text-xs text-rose-dark mt-1">{errors.moveIn}</p>}
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest2 text-charcoal/45 mb-1.5">
                        Number of People
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={10}
                        value={form.numPeople}
                        onChange={update('numPeople')}
                        className={inputClass(!!errors.numPeople)}
                      />
                      {errors.numPeople && <p className="text-xs text-rose-dark mt-1">{errors.numPeople}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest2 text-charcoal/45 mb-1.5">
                      Stay Duration
                    </label>
                    <select value={form.stayDuration} onChange={update('stayDuration')} className={inputClass(false)}>
                      {stayDurations.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  <textarea
                    placeholder="Message (optional)"
                    rows={3}
                    value={form.message}
                    onChange={update('message')}
                    className={`${inputClass(false)} resize-none`}
                  />

                  <button type="submit" disabled={submitting} className="btn-primary !bg-rose-dark w-full disabled:opacity-60">
                    <Send size={16} /> {submitting ? 'Sending…' : 'Send Enquiry'}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
