"use client"

import { useState } from "react"
import { useEffect } from "react"
import { TopBar } from "@/components/top-bar"
import { LeftSidebar } from "@/components/left-sidebar"
import { CenterPanel } from "@/components/center-panel"
import { RightPanel } from "@/components/right-panel"
import type { JobCard } from "types/job-card"
import { WarehouseStaffModal } from "./warehouseStaffSettingsModal"

export default function DesktopApp() {
  const [jobCards, setJobCards] = useState<JobCard[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOption, setSortOption] = useState("newest")
  const [activeNavItem, setActiveNavItem] = useState("dashboard")
  const [showStaffModal, setShowStaffModal] = useState(false)


useEffect(() => {
  const fetchJobCards = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/job-cards");
      const data = await res.json();

      // 🛠️ Map each backend row to the frontend structure
      const formatted = data.map((card: any) => ({
        id: card.id,
        mawbNumber: card.mawb_number,
        createdDate: new Date(card.created_date),
        defraRequired: card.defra_required,
        status: card.status,
        attachmentUrl: card.attachment_url,
      }))

      setJobCards(formatted);
    } catch (err) {
      console.error("Failed to fetch job cards", err);
    }
  }

  fetchJobCards();
}, [])


  const handleAddJobCard = (newJobCard: Omit<JobCard, "id" | "status">) => {
    const jobCard: JobCard = {
      ...newJobCard,
      id: Date.now().toString(),
      status: "unattended",
    }
    setJobCards([...jobCards, jobCard])
  }

  const handleNavItemClick = (item: string) => {
    setActiveNavItem(item)
    if (item === "staff") {
      setShowStaffModal(true)
    }
  }

  const filteredJobCards = jobCards
    .filter((card) => card.mawbNumber.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      return sortOption === "newest"
        ? b.createdDate.getTime() - a.createdDate.getTime()
        : a.createdDate.getTime() - b.createdDate.getTime()
    })

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden font-inter">
      <TopBar />
      <div className="flex flex-1 overflow-hidden gap-1 p-1">
        <LeftSidebar
  activeItem={activeNavItem}
  onNavItemClick={(item) => {
    setActiveNavItem(item)
    if (item === "staff") setShowStaffModal(true)
  }}
/>
        <CenterPanel
          jobCards={filteredJobCards}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortOption={sortOption}
          onSortChange={setSortOption}
        />
        <RightPanel onAddJobCard={handleAddJobCard} />
      </div>

      {showStaffModal && (
  <WarehouseStaffModal open={showStaffModal} onClose={() => setShowStaffModal(false)} />
)}
    </div>
  )
}
