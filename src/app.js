const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//DEFINE PATHS FOR EXPRESS
const pathdir = path.join(__dirname,'../public')
const viewspath = path.join(__dirname,'../Templates/views')
const partialpath = path.join(__dirname,'../Templates/partials')

//SETUP HANDLEBARS AND VIEWS LOCATION
app.set('view engine','hbs')
app.set('views',viewspath) //this is done to customise views folder name to templates. now express knows where to look when it needs views directory
hbs.registerPartials(partialpath)

//SETUP STATIC DIRECTORY TO SERVE
app.use(express.static(pathdir))

//app.get - this tells what the server should do when someone tries to get data on a specific url
app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather App",
        name: "Mukul Agarwal"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About page",
        name:"Mukul Agarwal"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        msg:"we are here to help you",
        title:"Help",
        name:"Mukul Agarwal"
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"You must provide an address"
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({
                error
            })
        }
        forecast(latitude,longitude,(error,{summary,temperature,precProb}={})=>{
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                location,
                summary,
                temperature,
                precProb,
            })
        })
    })
    
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        errormsg:"Help article not found",
        title:"404",
        name:"Mukul Agarwal"
    })
})
app.get('*',(req,res)=>{    // '*' this is the wild card character that matches with anything else than what is listed above
    res.render('404',{
        errormsg:"Page not found",
        title:"404",
        name:"Mukul Agarwal"
    })
})
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})