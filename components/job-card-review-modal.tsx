"use client"

import { X, FileText, Calendar, Shield, ShieldCheck, Package, MapPin, Plane, Hash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

interface JobCardReviewModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: () => void
  formData: {
    mawbNumber: string
    createdDate: string
    defraRequired: boolean
    fileName: string
    shipmentNo: string
    consolNo: string
  }
  extractedData: {
    mawbNumber: string
    hawbNumber: string
    importer: string
    exporter: string
    origin: string
    eta: string
    numberOfPieces: string
    shipmentNo: string
    consolNo: string
  }
}

export function JobCardReviewModal({ isOpen, onClose, onSubmit, formData, extractedData }: JobCardReviewModalProps) {
  if (!isOpen) return null

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#142d6a] rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Review Job Card</h2>
              <p className="text-sm text-gray-600">Verify all details before submission</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {/* Form Data Section */}
          <Card className="p-5 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-[#142d6a]" />
              Form Information
            </h3>
            <div>
            <Label className="text-sm font-medium text-gray-700">Shipment No</Label>
            <p className="text-sm text-gray-900 font-mono bg-gray-50 p-2 rounded border mt-1">
              {formData.shipmentNo || "N/A"}
              </p>
              </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">MAWB Number</Label>
                <p className="text-sm text-gray-900 font-mono bg-gray-50 p-2 rounded border mt-1">
                  {formData.mawbNumber}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Created Date</Label>
                <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded border mt-1 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  {formatDate(formData.createdDate)}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">DEFRA Status</Label>
                <div className="mt-1">
                  <div
                    className={`${
                      formData.defraRequired
                        ? "bg-red-50 text-red-700 border-red-200"
                        : "bg-gray-50 text-gray-700 border-gray-200"
                    } font-medium px-3 py-2 border rounded-md inline-flex items-center text-sm`}
                  >
                    {formData.defraRequired ? (
                      <>
                        <ShieldCheck className="w-4 h-4 mr-2" />
                        DEFRA Required
                      </>
                    ) : (
                      <>
                        <Shield className="w-4 h-4 mr-2" />
                        DEFRA Not Required
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Attached File</Label>
                <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded border mt-1 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#142d6a]" />
                  {formData.fileName}
                </p>
              </div>
            </div>
          </Card>

          {/* Extracted PDF Data Section */}
          <Card className="p-5 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#142d6a]" />
              Extracted PDF Data
            </h3>
            <div>
  <Label className="text-sm font-medium text-gray-700">Shipment No</Label>
  <p className="text-sm text-gray-900 font-mono bg-blue-50 p-2 rounded border mt-1">
    {extractedData.shipmentNo || "N/A"}
  </p>
</div>

<div>
  <Label className="text-sm font-medium text-gray-700">Consol No</Label>
  <p className="text-sm text-gray-900 font-mono bg-blue-50 p-2 rounded border mt-1">
    {extractedData.consolNo || "N/A"}
  </p>
</div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">MAWB Number</Label>
                <p className="text-sm text-gray-900 font-mono bg-blue-50 p-2 rounded border mt-1">
                  {extractedData.mawbNumber}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">HAWB Number</Label>
                <p className="text-sm text-gray-900 font-mono bg-blue-50 p-2 rounded border mt-1">
                  {extractedData.hawbNumber}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Importer</Label>
                <p className="text-sm text-gray-900 bg-blue-50 p-2 rounded border mt-1">{extractedData.importer}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Exporter</Label>
                <p className="text-sm text-gray-900 bg-blue-50 p-2 rounded border mt-1">{extractedData.exporter}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Origin</Label>
                <p className="text-sm text-gray-900 bg-blue-50 p-2 rounded border mt-1 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  {extractedData.origin}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">ETA</Label>
                <p className="text-sm text-gray-900 bg-blue-50 p-2 rounded border mt-1 flex items-center gap-2">
                  <Plane className="w-4 h-4 text-gray-500" />
                  {extractedData.eta}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Number of Pieces</Label>
                <p className="text-sm text-gray-900 bg-blue-50 p-2 rounded border mt-1 flex items-center gap-2">
                  <Hash className="w-4 h-4 text-gray-500" />
                  {extractedData.numberOfPieces}
                </p>
              </div>
            </div>
          </Card>

          {/* Data Validation Notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">!</span>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-amber-800">Data Validation</h4>
                <p className="text-sm text-amber-700 mt-1">
                  Please verify that the extracted data matches the information in your PDF document. If any
                  discrepancies are found, please contact support before submitting.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <Button variant="outline" onClick={onClose} className="px-6">
            Cancel
          </Button>
          <Button onClick={onSubmit} className="bg-[#142d6a] hover:bg-[#1a3570] text-white px-6">
            <FileText className="w-4 h-4 mr-2" />
            Submit Job Card
          </Button>
        </div>
      </div>
    </div>
  )
}
