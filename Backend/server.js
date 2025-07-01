import express from "express"
import cors from "cors"
import pdfRoutes from "./routes/pdf.js"
import jobCardsRoute from './routes/jobCards.js'
import bodyParser from "body-parser"
import warehouseReportRoute from "./routes/warehouseReport.js" // you'll create this file
import uploadImagesRoute from "./routes/uploadImages.js"
import warehouseStaffRoutes from './routes/warehouseStaff.js'
import pdfRoute from "./routes/pdfRoute.js";
import pool from "./db.js"
import imagePdfRoute from "./routes/imagePdfRoute.js";
import sendEmailRoute from "./routes/sendEmailRoute.js"





console.log("🚀 server.js is running!!");
const app = express()
app.use(cors())
app.use("/api", pdfRoutes)
app.use(express.json()) // required to parse JSON body
app.use("/api/job-cards", jobCardsRoute)
app.use(bodyParser.json())
app.use("/api/warehouse-report", warehouseReportRoute)
app.use("/api/upload-images", uploadImagesRoute)
app.use("/uploads", express.static("uploads"))
app.use('/api/warehouse-staff', warehouseStaffRoutes)
app.use("/api", pdfRoute);
app.use("/api", imagePdfRoute);
app.use("/api/report", sendEmailRoute)





// Route to fetch combined report by MAWB number
app.get("api/report/:mawb", async (req, res) => {
  const { mawb } = req.params
  try {
    const { rows } = await pool.query(`
      SELECT *
      FROM job_cards jc
      JOIN warehouse_reports wr ON jc.mawb_number = wr.mawb_number
      WHERE jc.mawb_number = $1
    `, [mawb])

    if (rows.length === 0) {
      return res.status(404).json({ message: "Report not found" })
    }

    res.json(rows[0]) // send the first matched row (you expect one)
  } catch (error) {
    console.error("Error fetching report:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})



app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001")
})

