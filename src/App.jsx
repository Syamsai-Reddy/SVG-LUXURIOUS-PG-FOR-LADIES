import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Highlights from './components/Highlights'
import About from './components/About'
import WhyChooseUs from './components/WhyChooseUs'
import Rooms from './components/Rooms'
import Amenities from './components/Amenities'
import Safety from './components/Safety'
import Gallery from './components/Gallery'
import Lifestyle from './components/Lifestyle'
import Location from './components/Location'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import Enquire from './components/Enquire'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'
import CallFloat from './components/CallFloat'
import MobileActionBar from './components/MobileActionBar'

export default function App() {
  return (
    <div className="pb-16 lg:pb-0">
      <Navbar />
      <Hero />
      <Highlights />
      <About />
      <WhyChooseUs />
      <Rooms />
      <Amenities />
      <Safety />
      <Gallery />
      <Lifestyle />
      <Location />
      <Testimonials />
      <FAQ />
      <Enquire />
      <Contact />
      <Footer />
      <CallFloat />
      <WhatsAppFloat />
      <MobileActionBar />
    </div>
  )
}
