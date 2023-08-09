const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const { error } = require('console')

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req, res) => {
    res.render('index',{
        title: 'Weather app',
        name:'nitesh yalamanchili'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title:'About me',
        text:'One of my dream job is to serve our Nation!',
        name:'Nitesh Yalamanchili'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        email: 'nitesh1yalamanchili@gmail.com',
        phone: '937-559-4242',
        title: 'Welcome to Help section',
        name:'nitesh yalamanchili'
    })
})

app.get('/help/*',(req,res) => {
    res.render('404Page', {
        title: '404',
        text: 'Help article not found'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, data) => {
        if (error || !data) {
            return res.send({ error: error || 'An unexpected error occurred.' });
        }
    
        const { latitude, longitude, location } = data;
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }
    
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        })
    })  
})

app.get('*', (req, res) => {
    res.render('404Page', {
        title: '404',
        text: 'The page is not found'
    })
})

// app.com
// app.com/help
// app.com/about

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})