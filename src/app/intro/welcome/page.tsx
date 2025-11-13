import Header from "@/components/header"
import Footer from "@/components/footer"
import WelcomeHero from "@/components/welcome/welcome-hero"
import PastorIntroduction from "@/components/welcome/pastor-introduction"
import ChurchValues from "@/components/welcome/church-values"

export default function WelcomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <WelcomeHero />
        <PastorIntroduction />
        <ChurchValues />
      </main>
      <Footer />
    </div>
  )
}
