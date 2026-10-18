import Navbar from './components/navigation/Navbar.jsx'
import Hero from './sections/Hero/Hero.jsx'
import Platform from './sections/Platform/Platform.jsx'
import ProcessSection from './sections/Process/ProcessSection.jsx'
import AboutSection from './sections/About/AboutSection.jsx'
import FAQSection from './sections/FAQ/FAQSection'
import FooterSection from './sections/Footer/FooterSection'
import './App.css'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Platform />
        <ProcessSection />
        <AboutSection />
        <FAQSection />
        <FooterSection />
      </main>
    </>
  )
}

export default App