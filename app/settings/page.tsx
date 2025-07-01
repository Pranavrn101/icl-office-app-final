// app/office/settings/page.tsx

"use client"

import WarehouseStaffList from "../../components/warehouseStaffList"

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 lg:px-20">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Settings</h1>

        {/* Staff Management Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Warehouse Staff Management</h2>
          <p className="text-gray-600 mb-6">
            Add, remove or manage the list of warehouse staff shown in the Warehouse App signature dropdown.
          </p>

          <WarehouseStaffList />
        </section>
      </div>
    </div>
  )
}
