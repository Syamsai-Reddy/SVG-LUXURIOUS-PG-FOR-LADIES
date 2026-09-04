import { useState } from 'react'
import { Phone, Send, ShieldCheck, ArrowLeft, RotateCcw } from 'lucide-react'
import Reveal from './Reveal'
import Toast from './Toast'
import { pg, waLink, defaultWaMessage, rooms, stayDurations } from '../data/config'

const NAME_RE = /^[A-Za-z][A-Za-z\s.'-]{1,49}$/
const PHONE_RE = /^[6-9]\d{9}$/
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/

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

function validate(form) {
  const errors = {}
  if (!NAME_RE.test(form.name.trim())) errors.name = 'Enter your full name'
  if (!PHONE_RE.test(form.phone.trim())) errors.phone = 'Enter a valid 10-digit mobile number'
  if (!EMAIL_RE.test(form.email.trim())) errors.email = 'Enter a valid email address'
  if (!form.moveIn) errors.moveIn = 'Select a move-in date'
  else if (new Date(form.moveIn) < new Date(new Date().toDateString())) {
    errors.moveIn = 'Move-in date cannot be in the past'
  }
  if (!form.numPeople || Number(form.numPeople) < 1 || Number(form.numPeople) > 10) {
    errors.numPeople = 'Enter a number between 1 and 10'
  }
  return errors
}

function formatDate(iso) {
  if (!iso) return 'N/A'
  const [year, month, day] = iso.split('-')
  return `${day}/${month}/${year}`
}

function buildMessage(form) {
  const lines = [
    '🔔 New Enquiry',
    '',
    `Name: ${form.name.trim()}`,
    `Mobile Number: ${form.phone.trim()}`,
    `Email: ${form.email.trim()}`,
    `Looking For: ${form.roomType}`,
    `Preferred Move-in Date: ${formatDate(form.moveIn)}`,
    `Number of People: ${form.numPeople}`,
    `Stay Duration: ${form.stayDuration}`,
  ]
  const message = form.message.trim()
  if (message) lines.push(`Message: ${message}`)
  return lines.join('\n')
}

function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000))
}

export default function Enquire() {
  const [step, setStep] = useState('form') // 'form' | 'otp' | 'done'
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [otp, setOtp] = useState('')
  const [otpInput, setOtpInput] = useState('')
  const [otpError, setOtpError] = useState('')
  const [toast, setToast] = useState(null)

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSendOtp = (e) => {
    e.preventDefault()
    const fieldErrors = validate(form)
    setErrors(fieldErrors)
    if (Object.keys(fieldErrors).length > 0) {
      setToast({ type: 'error', message: 'Please enter your original, valid details to continue.' })
      return
    }
    setOtp(generateOtp())
    setOtpInput('')
    setOtpError('')
    setStep('otp')
  }

  const handleResendOtp = () => {
    setOtp(generateOtp())
    setOtpInput('')
    setOtpError('')
  }

  const handleVerifyAndSubmit = (e) => {
    e.preventDefault()
    if (otpInput.trim() !== otp) {
      setOtpError('Incorrect code. Please check and try again.')
      return
    }
    window.open(waLink(buildMessage(form)), '_blank', 'noopener,noreferrer')
    setStep('done')
    setToast({ type: 'success', message: 'We have received your details — we may contact you shortly.' })
  }

  const startOver = () => {
    setForm(INITIAL_FORM)
    setErrors({})
    setOtp('')
    setOtpInput('')
    setOtpError('')
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
              away. Enquiries submitted here are verified with a one-time code before they reach
              the owner, to keep things spam-free.
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
                    Your verified enquiry has been opened in WhatsApp — send the message and the
                    owner will get back to you shortly.
                  </p>
                  <button onClick={startOver} className="btn-secondary !py-2.5 mx-auto">
                    <RotateCcw size={15} /> Submit Another Enquiry
                  </button>
                </div>
              ) : step === 'otp' ? (
                <form onSubmit={handleVerifyAndSubmit} className="space-y-5">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="h-11 w-11 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                      <ShieldCheck className="text-gold" size={20} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl">Verify Your Number</h3>
                      <p className="text-xs text-charcoal/55">
                        Enter the 6-digit code sent to {form.phone}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-xl border border-dashed border-gold/50 bg-gold/5 px-4 py-3 text-xs text-charcoal/70 leading-relaxed">
                    <strong className="text-charcoal">Demo mode:</strong> this project has no SMS
                    backend wired up yet, so your code is shown here instead of being texted —
                    your verification code is{' '}
                    <span className="font-semibold text-gold tracking-widest">{otp}</span>. Connect
                    a real SMS/email OTP provider before launch.
                  </div>

                  <input
                    autoFocus
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="Enter 6-digit code"
                    value={otpInput}
                    onChange={(e) => {
                      setOtpInput(e.target.value.replace(/\D/g, '').slice(0, 6))
                      setOtpError('')
                    }}
                    className={`${inputClass(!!otpError)} text-center tracking-[0.5em] text-lg font-medium`}
                  />
                  {otpError && <p className="text-xs text-rose-dark -mt-3">{otpError}</p>}

                  <button type="submit" disabled={otpInput.length !== 6} className="btn-primary !bg-rose-dark w-full disabled:opacity-40">
                    <ShieldCheck size={16} /> Verify &amp; Send Enquiry
                  </button>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <button
                      type="button"
                      onClick={() => setStep('form')}
                      className="inline-flex items-center gap-1.5 text-charcoal/60 hover:text-charcoal transition-colors"
                    >
                      <ArrowLeft size={13} /> Edit details
                    </button>
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      className="text-rose-dark hover:text-rose-dark/70 transition-colors"
                    >
                      Resend code
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleSendOtp} className="space-y-4" noValidate>
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

                  <button type="submit" className="btn-primary !bg-rose-dark w-full">
                    <Send size={16} /> Send Enquiry
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
