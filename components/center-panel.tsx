"use client"
import React from "react"
import { Search, Filter, FileText } from "lucide-react"
import { JobCardItem } from "@/components/job-card-item"
import type { JobCard } from "types/job-card"

interface CenterPanelProps {
  jobCards: JobCard[]
  searchQuery: string
  onSearchChange: (query: string) => void
  sortOption: string
  onSortChange: (option: string) => void
}

export function CenterPanel({ jobCards, searchQuery, onSearchChange, sortOption, onSortChange }: CenterPanelProps) {
  return (
    <div className="w-1/2 bg-white rounded-lg shadow-sm border border-gray-200 p-6 overflow-y-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Job Cards</h2>
        <p className="text-sm text-gray-600">Manage and track your shipping job cards</p>
      </div>

      {/* Search and Filter Controls */}
      <div className="mb-6 flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search by MAWB or Shipping Number"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#142d6a] focus:border-transparent bg-gray-50 text-sm font-medium placeholder-gray-500"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <select
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value)}
            className="pl-10 pr-8 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#142d6a] focus:border-transparent bg-gray-50 text-sm font-medium appearance-none cursor-pointer"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="unattended">Unattended First</option>
          </select>
        </div>
      </div>

      {/* Job Cards List */}
      <div className="space-y-4">
        {jobCards.length > 0 ? (
          jobCards.map((card) => <JobCardItem key={card.mawbNumber} jobCard={card} />)
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No job cards found</h3>
            <p className="text-gray-500">Create a new job card to get started.</p>
          </div>
        )}
      </div>
    </div>
  )
}
