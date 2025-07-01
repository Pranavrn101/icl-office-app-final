import { Eye, Calendar, Shield, ShieldCheck } from "lucide-react"
import type { JobCard } from "types/job-card"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface JobCardItemProps {
  jobCard: JobCard
}

export function JobCardItem({ jobCard }: JobCardItemProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "unattended":
        return {
          color: "bg-amber-50 text-amber-700 border-amber-200",
          icon: "⏳",
          label: "Unattended",
        }
      case "opened":
        return {
          color: "bg-blue-50 text-blue-700 border-blue-200",
          icon: "👁️",
          label: "Opened",
        }
      case "completed":
        return {
          color: "bg-emerald-50 text-emerald-700 border-emerald-200",
          icon: "✅",
          label: "Completed",
        }
      default:
        return {
          color: "bg-gray-50 text-gray-700 border-gray-200",
          icon: "❓",
          label: "Unknown",
        }
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const statusConfig = getStatusConfig(jobCard.status)

  return (
    <Card className="p-5 hover:shadow-md transition-all duration-200 border border-gray-200 bg-white">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <h3 className="font-bold text-lg text-gray-900">{jobCard.mawbNumber}</h3>
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-[#142d6a] hover:bg-gray-100 p-2">
              <Eye className="h-4 w-4" />
              <span className="sr-only">View details</span>
            </Button>
          </div>

          <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>Created: {formatDate(jobCard.createdDate)}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            <div
              className={`${
                jobCard.defraRequired
                  ? "bg-red-50 text-red-700 border-red-200"
                  : "bg-gray-50 text-gray-700 border-gray-200"
              } font-medium px-3 py-1 border rounded-md inline-flex items-center text-sm`}
            >
              {jobCard.defraRequired ? (
                <>
                  <ShieldCheck className="w-3 h-3 mr-1" />
                  DEFRA Required
                </>
              ) : (
                <>
                  <Shield className="w-3 h-3 mr-1" />
                  DEFRA Not Required
                </>
              )}
            </div>

            {/* <div
              className={`${statusConfig.color} font-medium px-3 py-1 border rounded-md inline-flex items-center text-sm`}
            >
              <span className="mr-1">{statusConfig.icon}</span>
              {statusConfig.label}
            </div> */}
          </div>
        </div>
      </div>
    </Card>
  )
}
