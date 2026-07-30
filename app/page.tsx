import Navbar from '@/components/navbar'
import Hero from '@/components/hero'
import ChiSono from '@/components/chi-sono'
import Features from '@/components/features'
import Testimonials from '@/components/testimonials'
import CtaSection from '@/components/cta-section'
import DoveTrovarmi from '@/components/dove-trovarmi'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <ChiSono />
      <Features />
      <Testimonials />
      <CtaSection />
      <DoveTrovarmi />
      <Footer />
    </main>
  )
}
