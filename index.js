const express = require("express")
const mongoose = require("mongoose")
const session = require("express-session")
const bcrypt = require("bcrypt")
const ejsMate = require("ejs-mate")
const methodOverride = require('method-override')
const flash = require("connect-flash")
const Campground = require("./models/campground")
const Review = require('./models/review')
const campgroundsRoutes = require('./routes/campgrounds')

const app = express()

const flashMiddleware = (req, res, next) => {
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next()
}

app.use(session({secret: 'blabla', 
resave: false, 
saveUninitialized: true,
cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60,
    maxAge: 1000 * 60 * 60
}}
))

app.use(flash())
app.use(flashMiddleware)

app.engine("ejs",ejsMate)
app.set("view engine", "ejs")

app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(express.static('public'))

const mongoConnect = () => {mongoose.connect('mongodb+srv://cpercivati:cpercivati@cluster0.po0m89e.mongodb.net/yelpcamp', {useNewUrlParser: true})}


mongoConnect()


app.use("/campground",campgroundsRoutes)

//get endpoints
app.get("/", async (req, res) => {

})


app.listen(3000, () => {console.log("listening to port 3000")})