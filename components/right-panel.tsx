"use client"

import type React from "react"
import { useState } from "react"
import { Calendar, Upload, Plus, FileText, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { JobCard } from "types/job-card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { JobCardReviewModal } from "@/components/job-card-review-modal"

interface RightPanelProps {
  onAddJobCard: (jobCard: Omit<JobCard, "id" | "status">) => void
}

export function RightPanel({ onAddJobCard }: RightPanelProps) {
  const [shipmentNo, setShipmentNo] = useState("")
  const [consolNo, setConsolNo] = useState("")
  const [mawbNumber, setMawbNumber] = useState("")
  const [createdDate, setCreatedDate] = useState(new Date().toISOString().split("T")[0])
  const [defraRequired, setDefraRequired] = useState(false)
  const [attachmentUrl, setAttachmentUrl] = useState("")
  const [fileName, setFileName] = useState("")
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  const [rawText, setRawText] = useState("")

  // Extracted PDF data
const [extractedData, setExtractedData] = useState({
  mawbNumber: "",
  hawbNumber: "",
  importer: "",
  exporter: "",
  origin: "",
  eta: "",
  numberOfPieces: "",
  consolNo:"",
  shipmentNo:""
})

function parseETA(etaStr: string): string {
  const parsed = Date.parse(etaStr)
  if (!isNaN(parsed)) {
    return new Date(parsed).toISOString().split("T")[0]
  }
  // fallback or return today's date
  return new Date().toISOString().split("T")[0]
}


//Custom function to handle file
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0]
  if (!file) return

  setFileName(file.name)

  const formData = new FormData()
  formData.append("file", file)

  try {
    const response = await fetch("http://localhost:3001/api/extract-pdf-data", {
      method: "POST",
      body: formData,
    })

    const data = await response.json()

    // update your form with the extracted values
    setMawbNumber(data.extractedData.mawbNumber || "")
    setCreatedDate(data.eta ? parseETA(data.eta) : "")
    setDefraRequired(false) // this field isn’t extracted, keep default
    setAttachmentUrl("uploaded-placeholder") // Optional: URL from backend if stored
    setExtractedData(data.extractedData) // if you want to display a preview
    setShipmentNo(data.extractedData.shipmentNo || "")
    setConsolNo(data.extractedData.consolNo || "")


  } catch (error) {
    console.error("Failed to extract PDF data", error)
  }
}


 const handleReviewSubmit = async () => {
  try {
    const payload = {
      ...extractedData,
      mawbNumber,
      createdDate: new Date(createdDate).toISOString().split("T")[0], // ⬅️ Only the date part
      defraRequired,
      attachmentUrl,
    }


    const response = await fetch("http://localhost:3001/api/job-cards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorMessage = await response.text()
      console.error("❌ Backend responded with:", errorMessage) // 👈 AND THIS
      throw new Error("Failed to save job card")
    }

    console.log("✅ Job card saved to database")

    // 3. Call parent handler if needed
    onAddJobCard({
      mawbNumber,
      createdDate: new Date(createdDate),
      defraRequired,
      attachmentUrl,
    })

    // 4. Reset form
    setShipmentNo("")
    setConsolNo("")
    setMawbNumber("")
    setCreatedDate(new Date().toISOString().split("T")[0])
    setDefraRequired(false)
    setAttachmentUrl("")
    setFileName("")
    setIsReviewModalOpen(false)
  } catch (error) {
    console.error("Error submitting job card:", error)
    alert("Something went wrong. Could not save job card.")
  }
}


  return (
    <>
      <div className="w-3/10 bg-white rounded-lg shadow-sm border border-gray-200 p-6 overflow-y-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-[#142d6a] rounded-lg flex items-center justify-center">
              <Plus className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Create Job Card</h2>
          </div>
          <p className="text-sm text-gray-600">Add a new shipping job card to the system</p>
        </div>

        {/* Form */}
        <form className="space-y-6">

          <div className="space-y-2">
            <Label htmlFor="attachment" className="text-sm font-semibold text-gray-700">
              Attach PDF from CargoWise
            </Label>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors bg-gray-25">
              <input id="attachment" type="file" accept=".pdf" onChange={handleFileChange} className="hidden" />
              <label htmlFor="attachment" className="cursor-pointer flex flex-col items-center">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                  {fileName ? (
                    <FileText className="h-6 w-6 text-[#142d6a]" />
                  ) : (
                    <Upload className="h-6 w-6 text-gray-400" />
                  )}
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {fileName ? fileName : "Click to upload or drag and drop"}
                </span>
                <span className="text-xs text-gray-500 mt-1">PDF files only, max 10MB</span>
              </label>
            </div>
          </div>

          
                    
          <div className="space-y-2">
  <Label htmlFor="mawbNumber" className="text-sm font-semibold text-gray-700">
    MAWB Number
  </Label>
  <div
    id="mawbNumber"
    className="border border-gray-200 rounded-md bg-gray-100 px-3 py-2 text-sm text-gray-800"
  >
    {mawbNumber}
  </div>
</div>
          <div className="space-y-2">
  <Label htmlFor="shipmentNo" className="text-sm font-semibold text-gray-700">
    Shipment No
  </Label>
  <div
    id="shipmentNo"
    className="border border-gray-200 rounded-md bg-gray-100 px-3 py-2 text-sm text-gray-800"
  >
    {shipmentNo || "N/A"}
  </div>
</div>
          <div className="space-y-2">
            <Label htmlFor="createdDate" className="text-sm font-semibold text-gray-700">
              Created Date
            </Label>
            <div className="relative">
              <Input
                id="createdDate"
                type="date"
                value={createdDate}
                onChange={(e) => setCreatedDate(e.target.value)}
                required
                className="pl-10 border-gray-200 focus:ring-[#142d6a] focus:border-[#142d6a] bg-gray-50"
              />
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <Label className="text-sm font-semibold text-gray-700">DEFRA Required?</Label>
              <p className="text-xs text-gray-500 mt-1">Enable if DEFRA compliance is needed</p>
            </div>
            <RadioGroup
              value={defraRequired ? "yes" : "no"}
              onValueChange={(value) => setDefraRequired(value === "yes")}
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="defra-yes" className="border-gray-300 text-[#142d6a]" />
                <Label htmlFor="defra-yes" className="font-medium text-gray-700">
                  Yes
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="defra-no" className="border-gray-300 text-[#142d6a]" />
                <Label htmlFor="defra-no" className="font-medium text-gray-700">
                  No
                </Label>
              </div>
            </RadioGroup>
          </div>



          {/* Review Job Card Button */}
          <Button
            type="button"
            onClick={() => setIsReviewModalOpen(true)}
            disabled={!fileName || !mawbNumber}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 shadow-sm disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <Eye className="w-4 h-4 mr-2" />
            Review Job Card
          </Button>

          <div className="text-xs text-gray-500 text-center">
            Upload a PDF and fill required fields to review your job card
          </div>
        </form>
      </div>

      {/* Review Modal */}
      <JobCardReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSubmit={handleReviewSubmit}
        formData={{
          mawbNumber,
          createdDate,
          defraRequired,
          fileName,
          shipmentNo,
          consolNo,
        }}
        extractedData={extractedData}
      />
    </>
  )
}
