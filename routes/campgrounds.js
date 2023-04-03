const express = require('express')
const campground = require('../models/campground')
const router = express.Router()
const Campground = require('../models/campground')
const Review = require('../models/review')

router.get("/", async (req,res) => {
    try {
        const allCamps = await Campground.find()
        res.render("index", {allCamps})
    }
    catch (e) {
        console.log("error "+e)
    }
    })

router.get("/new", (req,res) => {
    res.render("campgrounds/new")
})

router.get("/:id/edit", (req,res) => {
    
})

router.get("/:id", async (req,res) => {
    const { id } = req.params
    try{
    const campground = await Campground.findOne({_id: id})
    res.render('campgrounds/show',{campground})

} catch{
        req.flash('error','Campground not encountered.')
        res.redirect('/campground')
    }
})

//post

router.post("/new", async (req, res, next) =>{
    try{
    const {title, location, image, price} = req.body.campground
    const campground = new Campground({title: title, location: location, image: image, price: price})
    console.log(campground)
    await campground.save()
    req.flash('success', `The campground ${title} has been successfully registered.`)
    res.redirect("/campground")
    }
    catch(e) {
        req.flash('error','An error has occured. '+e)
    }
})

router.post('/:id/reviews', async (req, res)=>{
    console.log(req.body)
    const {body, rating} = req.body.review
    const campground = await Campground.findById(req.params.id)
    const review = new Review({body: body, rating: rating})
    console.log(campground)
    console.log(review)
    campground.reviews.push(review)
    await campground.save()
    await review.save()
    req.flash('success','Your review has been sent.')
    res.redirect('/campground/'+req.params.id)
})


//edit
router.put("/:id", (req, res) => {

})

//delete
router.delete("/:id", async (req, res) => {
const campground = await Campground.findByIdAndDelete(req.body.id)
if(!campground) {
    req.flash('error','Campground not encountered.')
    res.redirect('/campground')
}
})

module.exports = router