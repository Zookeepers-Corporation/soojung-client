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
        <div className="py-12 md:py-16 pb-0 md:pb-0">
          <RegularWorshipSection />
          <SundaySchoolSection />
        </div>
      </main>
      <Footer />
    </div>
  )
}
