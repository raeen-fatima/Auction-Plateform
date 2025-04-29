import AiAssistant from "../components/AiAssist"
import Blogs from "../components/Blogs"
import Footer from "../components/Footer"
import HeroSection from "../components/Hero"
import HowItWorks from "../components/HowItWorks"
import Navbar from "../components/Navbar"
import NewsletterForm from "../components/NewsLetter"
import Portfolio from "../components/OurPortfolio"
import RecommendedAuctions from "../components/RecommandedAuct"
import OurServices from "../components/Services"
import Testimonials from "../components/Testimonials"
import WhyChooseUs from "../components/WhyChooseUs"


function Home() {
  return (
    <div>
        <Navbar />
        <HeroSection />
        <RecommendedAuctions />
        <AiAssistant />
        <HowItWorks />
        <OurServices />
        <WhyChooseUs />
        <Portfolio />
        <Testimonials />
        <Blogs />
        <NewsletterForm />
        <Footer />
    </div>
  )
}

export default Home
