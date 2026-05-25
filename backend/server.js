require("dotenv").config({ path: "./.env" })
const mongoose = require("mongoose")

const Laundry = require("./models/Laundry")

const express = require("express")

const cors = require("cors")

const app = express()

app.use(cors())

app.use(express.json())


mongoose.connect(process.env.MONGO_URI)

.then(() => {

    console.log("MongoDB Connected Successfully")

})

.catch((error) => {

    console.log(error)

})
app.get("/", (req, res) => {
  res.send("Washify Backend Server Running 🚀")
})
app.get("/records", async (req, res) => {
    const records = await Laundry.find()
    res.json(records)
})
app.post("/addRecord", async (req, res) => {
    const newLaundry = new Laundry(req.body)
    await newLaundry.save()
    res.json({
        message: "Laundry record added successfully"
    })

})

app.delete("/deleteRecord/:id", async (req, res) => {

    await Laundry.findByIdAndDelete(req.params.id)

    res.json({
        message: "Record deleted successfully"
    })

})
app.put("/updateRecord/:id", async (req, res) => {

    await Laundry.findByIdAndUpdate(
        req.params.id,
        req.body
    )

    res.json({
        message: "Record updated successfully"
    })

})

app.put("/updateStatus/:id", async (req, res) => {

    req.body.remainingBalance =
    Number(req.body.depositAmount) -
    Number(req.body.deductedAmount)

    await Laundry.findByIdAndUpdate(
        req.params.id,
        {
            status: req.body.status
        }
    )

    res.json({
        message: "Status updated successfully"
    })

})
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})