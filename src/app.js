const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory for content
app.use(express.static(publicDirectoryPath))

// routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Bruce Wishart'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Bruce Wishart'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Bruce Wishart',
        helpText: 'This is some help text passed into the help.hbs template.'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    const address = req.query.address
    geocode(address, (error, { latitude, longitude, location} = {}) => {
        if (error) {
            return res.send(error) 
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send(error) 
            }
            res.send({
                location: location,
                forecastData: forecastData,
                address: address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    } )
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help not found',
        name: 'Bruce Wishart',
        msg: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page Not Found',
        name: 'Bruce Wishart',
        msg: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})