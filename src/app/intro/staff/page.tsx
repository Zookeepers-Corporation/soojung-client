import Header from "@/components/header"
import Footer from "@/components/footer"
import StaffPageHeader from "@/components/staff/staff-page-header"
import PastorsSection from "@/components/staff/pastors-section"
import EldersSection from "@/components/staff/elders-section"

export default function StaffPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <StaffPageHeader />
        <PastorsSection />
        <EldersSection />
      </main>
      <Footer />
    </div>
  )
}
