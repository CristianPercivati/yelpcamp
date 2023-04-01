const express = require("express")
const mongoose = require("mongoose")
const session = require("express-session")
const bcrypt = require("bcrypt")
const ejsMate = require("ejs-mate")
const methodOverride = require('method-override')
const Campground = require("./models/campground")

const app = express()

app.engine("ejs",ejsMate)
app.set("view engine", "ejs")

app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

const mongoConnect = () => {mongoose.connect('mongodb+srv://cpercivati:cpercivati@cluster0.po0m89e.mongodb.net/yelpcamp', {useNewUrlParser: true})}

mongoConnect()

//get endpoints
app.get("/", async (req, res) => {
    try {
        const allCamps = await Campground.find()
        res.render("index", {allCamps})
    }
    catch {
        console.log("error")

    }
}
)
app.get("/campground", (req,res) => {
    })

app.get("/campground/new", (req,res) => {
    res.render("campgrounds/new")
})

app.get("/campground/:id/edit", (req,res) => {
    
})

app.get("/campground/:id", async (req,res) => {
    const { id } = req.params
    campground = await Campground.findOne({_id: id})
    res.render('campgrounds/show',{campground})
})

//post

app.post("/campground/new", (req, res) =>{
    const {title, location, image, price} = req.body.campground
    const campground = new Campground({title: title, location: location, image: image, price: price})
    campground.save()
    res.redirect("/")
})

//edit
app.put("/campground/:id", (req, res) => {

})

//delete
app.delete("/campground/:id", async (req, res) => {

const campground = await Campground.findByIdAndDelete(req.body.id)

})

app.listen(3000, () => {console.log("listening to port 3000")})