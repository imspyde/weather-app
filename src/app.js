const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./Utils/geoCode')
// const forecast = require('./Utils/forecast')


const app = express()

//Defining paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))



app.get('',(req, res)=>{
    res.render('index',{
        title:'This is title',
        name: 'Pradeep'
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title:'This is title',
        name: 'Pradeep'
    })
})

app.get('/help',(req, res)=>{
    res.render('help',{
        title:'This is title',
        name: 'Pradeep'
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        name:'Pradeep',
        errorMessage: 'Article Not Found!'
    })
})

app.get('/weather',(req, res)=>{
    if (!req.query.address){
        return res.send({
            error:'Please provide an address!'
        })
    }
    
    geoCode(req.query.address,(error, { latitude , longitude , location })=>{
        if (error){
            return res.send({error })
        }
        
    })


    // res.send({
    //     forecast:'It is hot outside',
    //     location:'Patna',
    //     address: req.query.address

    // })
})


app.get('/products',(req, res)=>{
    if (!req.query.search){
        return res.send({
            error: 'You must provide a Search!'
        })
    }
    
    console.log(req.query.search)
    res.send({
        product: []
    })
})

app.get('*',(req, res)=>{
    res.render('404',{
        title: '404',
        name:'pradeep',
        errorMessage: 'Page Not found'
    })
})

app.listen(3000,()=>{
    console.log('Server is Started! on port')
})