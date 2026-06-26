import { lazy, Suspense } from 'react'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { SectionDivider } from './components/SectionDivider'
import { StickyMobileCTA } from './components/StickyMobileCTA'

const Work = lazy(() => import('./components/Work').then((module) => ({ default: module.Work })))
const Services = lazy(() => import('./components/Services').then((module) => ({ default: module.Services })))
const Team = lazy(() => import('./components/Team').then((module) => ({ default: module.Team })))
const Process = lazy(() => import('./components/Process').then((module) => ({ default: module.Process })))
const SocialProof = lazy(() =>
  import('./components/SocialProof').then((module) => ({ default: module.SocialProof })),
)
const Contact = lazy(() => import('./components/Contact').then((module) => ({ default: module.Contact })))
const Footer = lazy(() => import('./components/Footer').then((module) => ({ default: module.Footer })))

function App() {
  return (
    <>
      <div className="grain pattern-dots min-h-screen">
        <Navbar />
        <main>
          <Hero />
          <SectionDivider />
          <Suspense fallback={<div className="min-h-40" aria-hidden="true" />}>
            <Work />
            <SectionDivider />
            <Services />
            <SectionDivider />
            <Team />
            <SectionDivider />
            <Process />
            <SectionDivider />
            <SocialProof />
            <SectionDivider />
            <Contact />
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
        <StickyMobileCTA />
      </div>
    </>
  )
}

export default App
