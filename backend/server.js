const mongoose = require("mongoose")

const Laundry = require("./models/Laundry")

const express = require("express")

const cors = require("cors")

const app = express()

app.use(cors())

app.use(express.json())



const PORT = 5000

mongoose.connect("mongodb://palak7931_db_user:Palak1234@ac-rsig0zm-shard-00-00.urmqmzz.mongodb.net:27017,ac-rsig0zm-shard-00-01.urmqmzz.mongodb.net:27017,ac-rsig0zm-shard-00-02.urmqmzz.mongodb.net:27017/?ssl=true&replicaSet=atlas-kkldya-shard-0&authSource=admin&appName=LaundryCluster")

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

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})