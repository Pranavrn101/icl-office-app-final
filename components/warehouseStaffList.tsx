// components/WarehouseStaffList.tsx
"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

interface Staff {
  id: number
  name: string
}

export default function WarehouseStaffList() {
  const [staffList, setStaffList] = useState<Staff[]>([])
  const [newStaff, setNewStaff] = useState("")

  // Fetch all staff
  const fetchStaff = async () => {
    const res = await fetch("http://localhost:3001/api/warehouse-staff")
    const data = await res.json()
    setStaffList(data)
  }

  useEffect(() => {
    fetchStaff()
  }, [])

  // Add new staff
  const handleAddStaff = async () => {
    if (!newStaff.trim()) return
    await fetch("http://localhost:3001/api/warehouse-staff", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newStaff }),
    })
    setNewStaff("")
    fetchStaff()
  }

  // Delete staff
  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:3001/api/warehouse-staff/${id}`, {
      method: "DELETE",
    })
    fetchStaff()
  }

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl space-y-6 max-w-lg">
      <h2 className="text-2xl font-bold">Manage Warehouse Staff</h2>

      <div className="flex gap-4">
        <Input
          placeholder="Enter staff name"
          value={newStaff}
          onChange={(e) => setNewStaff(e.target.value)}
        />
        <Button onClick={handleAddStaff}>Add</Button>
      </div>

      <ul className="space-y-3">
        {staffList.map((staff) => (
          <li key={staff.id} className="flex justify-between items-center border p-3 rounded">
            <span>{staff.name}</span>
            <Button variant="outline" onClick={() => handleDelete(staff.id)}>
              <Trash2 className="text-red-500" size={18} />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}
