"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import StaffPageHeader from "@/components/staff/staff-page-header"
import PastorsSection from "@/components/staff/pastors-section"
import EldersSection from "@/components/staff/elders-section"
import Button from "@/components/ui/button"

export default function StaffPage() {
  const [activeTab, setActiveTab] = useState<"pastors" | "elders">("pastors")

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <StaffPageHeader />
        
        {/* Tab Buttons */}
        <div className="pt-12 py-8 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center gap-4">
              <Button
                variant={activeTab === "pastors" ? "primary" : "secondary"}
                onClick={() => setActiveTab("pastors")}
              >
                교역자
              </Button>
              <Button
                variant={activeTab === "elders" ? "primary" : "secondary"}
                onClick={() => setActiveTab("elders")}
              >
                장로
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        {activeTab === "pastors" && <PastorsSection />}
        {activeTab === "elders" && <EldersSection />}
      </main>
      <Footer />
    </div>
  )
}
