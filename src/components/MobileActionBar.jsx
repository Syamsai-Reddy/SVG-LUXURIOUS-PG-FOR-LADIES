import { Phone, MessageCircle, ClipboardList } from 'lucide-react'
import { pg, waLink, defaultWaMessage } from '../data/config'

export default function MobileActionBar() {
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-ivory/95 backdrop-blur-md border-t border-charcoal/10 shadow-soft">
      <div className="grid grid-cols-3">
        <a
          href={waLink(defaultWaMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 py-3 text-[#1FAA53]"
        >
          <MessageCircle size={20} />
          <span className="text-[11px] font-medium">WhatsApp</span>
        </a>
        <a
          href={`tel:${pg.phoneTel}`}
          className="flex flex-col items-center justify-center gap-1 py-3 border-x border-charcoal/10 text-charcoal"
        >
          <Phone size={20} />
          <span className="text-[11px] font-medium">Call</span>
        </a>
        <a
          href="#enquire"
          className="flex flex-col items-center justify-center gap-1 py-3 text-rose-dark"
        >
          <ClipboardList size={20} />
          <span className="text-[11px] font-medium">Enquire</span>
        </a>
      </div>
    </div>
  )
}
