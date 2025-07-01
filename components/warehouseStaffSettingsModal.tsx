"use client"

import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash } from "lucide-react"

interface StaffMember {
  id: number
  name: string
}

interface WarehouseStaffModalProps {
  open: boolean
  onClose: () => void
}

export function WarehouseStaffModal({ open, onClose }: WarehouseStaffModalProps) {
  const [staff, setStaff] = useState<StaffMember[]>([])
  const [newName, setNewName] = useState("")

  const fetchStaff = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/warehouse-staff")
      const data = await res.json()
      setStaff(data)
    } catch (err) {
      console.error("Failed to load staff:", err)
    }
  }

  const addStaff = async () => {
    if (!newName.trim()) return
    try {
      await fetch("http://localhost:3001/api/warehouse-staff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName }),
      })
      setNewName("")
      fetchStaff()
    } catch (err) {
      console.error("Add failed:", err)
    }
  }

  const deleteStaff = async (id: number) => {
    try {
      await fetch(`http://localhost:3001/api/warehouse-staff/${id}`, {
        method: "DELETE",
      })
      fetchStaff()
    } catch (err) {
      console.error("Delete failed:", err)
    }
  }

  useEffect(() => {
    fetchStaff()
  }, [])

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Warehouse Staff Settings</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter staff name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="flex-1"
            />
            <Button onClick={addStaff}>Add</Button>
          </div>

          <ul className="divide-y border rounded-md overflow-hidden">
            {staff.map((member) => (
              <li key={member.id} className="flex justify-between items-center px-4 py-2 text-sm">
                <span>{member.name}</span>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => deleteStaff(member.id)}
                >
                  <Trash size={16} className="text-red-600" />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  )
}
