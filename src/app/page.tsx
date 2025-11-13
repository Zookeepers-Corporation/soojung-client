import Header from "@/components/header"
import Hero from "@/components/hero"
import About from "@/components/about"
import Categories from "@/components/categories"
import Gallery from "@/components/gallery"
import Events from "@/components/events"
import Ministry from "@/components/ministry"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="w-full">
      <Header />
      <Hero />
      <Events />
      <Categories />
      <Gallery />
      <Footer />
    </div>
  )
}
