export interface JobCard {
  id: string
  mawbNumber: string
  createdDate: Date
  defraRequired: boolean
  status: "unattended" | "opened" | "completed"
  attachmentUrl: string
}
