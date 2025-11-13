import Header from "@/components/header"
import Footer from "@/components/footer"
import WorshipPageHeader from "@/components/worship/worship-page-header"
import RegularWorshipSection from "@/components/worship/regular-worship-section"
import SundaySchoolSection from "@/components/worship/sunday-school-section"

export default function WorshipPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <WorshipPageHeader />
        <RegularWorshipSection />
        <SundaySchoolSection />
      </main>
      <Footer />
    </div>
  )
}
