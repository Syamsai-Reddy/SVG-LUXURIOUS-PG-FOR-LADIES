// Enquiry form validation + WhatsApp message formatting. Plain JS, no
// React/DOM, so it's easy to unit-test on its own.

export const NAME_RE = /^[A-Za-z][A-Za-z\s.'-]{1,49}$/
export const PHONE_RE = /^[6-9]\d{9}$/
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/

export function validateEnquiry(form) {
  const errors = {}
  const name = (form.name || '').trim()
  const phone = (form.phone || '').trim()
  const email = (form.email || '').trim()

  if (!NAME_RE.test(name)) errors.name = 'Enter your full name'
  if (!PHONE_RE.test(phone)) errors.phone = 'Enter a valid 10-digit mobile number'
  if (!EMAIL_RE.test(email)) errors.email = 'Enter a valid email address'
  if (!form.moveIn) errors.moveIn = 'Select a move-in date'
  else if (new Date(form.moveIn) < new Date(new Date().toDateString())) {
    errors.moveIn = 'Move-in date cannot be in the past'
  }
  if (!form.numPeople || Number(form.numPeople) < 1 || Number(form.numPeople) > 10) {
    errors.numPeople = 'Enter a number between 1 and 10'
  }
  if (!form.roomType) errors.roomType = 'Select what you are looking for'
  if (!form.stayDuration) errors.stayDuration = 'Select a stay duration'

  return errors
}

export function formatMoveInDate(iso) {
  if (!iso) return 'N/A'
  const [year, month, day] = iso.split('-')
  return `${day}/${month}/${year}`
}

export function buildEnquiryMessage(form) {
  const lines = [
    '🔔 New Enquiry',
    '',
    `Name: ${(form.name || '').trim()}`,
    `Mobile Number: ${(form.phone || '').trim()}`,
    `Email: ${(form.email || '').trim()}`,
    `Looking For: ${form.roomType}`,
    `Preferred Move-in Date: ${formatMoveInDate(form.moveIn)}`,
    `Number of People: ${form.numPeople}`,
    `Stay Duration: ${form.stayDuration}`,
  ]
  const message = (form.message || '').trim()
  if (message) lines.push(`Message: ${message}`)
  return lines.join('\n')
}
