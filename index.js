
/* BOOKSHOP API */

var fs = require('fs')

var restify = require('restify')
var server = restify.createServer()
var mongo = require('./mongo.js')

var list = require('./modules/tests') //testing

server.use(restify.fullResponse())
server.use(restify.queryParser())
server.use(restify.bodyParser())
server.use(restify.authorizationParser())
//var accounts = require('./accounts.js')
var imdb = require('./imdb.js')
var guitarparty = require('./guitarparty.js')

const stdin = process.openStdin()

stdin.on('data', function(chunk) {
  console.log(typeof chunk)
  var text = chunk.toString().trim()
  console.log(typeof text)
  
  if (text.indexOf('add ') === 0) {
    var space = text.indexOf(' ')
    var item = text.substring(space+1).trim()
    console.log('adding "'+item+'"')
    /* notice the use of 'arrow function' syntax to define the anonymous function parameter. */
    mongo.addList(item, data => {
        console.log('returned: '+data)
    })
  }
  
  if (text.indexOf('get ') === 0) {
    var space = text.indexOf(' ')
    var item = text.substring(space+1).trim()
    console.log('finding: ID "'+item+'"')
    if (isNaN(item[0])){
    mongo.getById1(item, data => {
        console.log(data)
    })}else{
    mongo.getById(item, data => {
        console.log(data)
    })}
  }
  
  if (text.indexOf('list') === 0) {
    mongo.getAll( data => {
        console.log(data)
    })
  }
  
  if (text.indexOf('clear') === 0) {
    mongo.clear( data => {
        console.log(data)
    })
  }
  if(text.indexOf('names')===0){
    mongo.names(data =>{
      console.log(data)
    })
  }
})



var apikey = 'd0ba136ea0e7bade8e61096631e665b2a0727951' //guitarparty api
//server.get('/library', function(req, res) {
server.get('/songs/', function(req, res) { // the GuitarParty Api , ask for help with authentication header
  console.log('GET /library')
  const searchTerm = req.query.query
  console.log('q='+searchTerm)
  
  guitarparty.search(searchTerm, function(data) {
    const stuff = data.response.data
    mongo.addList(stuff, data => {
        console.log('returned: '+data)
        
    })
    console.log(data)
    res.setHeader('content-type', 'application/json');
    res.send(data.code, data.response);
    res.end();
  })
})

server.get('/movies', function(req, res) {
  console.log('GET /library')
  const searchTerm = req.query.title
  console.log('q='+searchTerm)
  imdb.search(searchTerm, function(data) {
    console.log(data)
    res.setHeader('content-type', 'application/json');
    res.send(data.code, data.response);
    res.end();
  })
})

server.post('/accounts', function(req, res) {
  console.log('POST /accounts')
  const auth = req.authorization
  const body = req.body
  console.log(body)
  const host = req.headers.host
  console.log(typeof req.files)
  accounts.add(host, auth, body, req.files, function(data) {
    console.log('DATA RETURNED')
    console.log(data)
    res.setHeader('content-type', 'application/json');
    res.send(data.code, data.response);
    res.end();
  })
})

//server.get(/images\/?.*/, restify.serveStatic({
   // directory: __dirname
//}))

//fs.mkdir('images', function(err) {
 // if (err) {
  //  console.log('error creating images directory')
 // }
  //console.log('images directory created')
//})

var port = process.env.PORT || 8080;
server.listen(port, function (err) {
  if (err) {
      console.error(err);
  } else {
    console.log('App is ready at : ' + port);
  }
})
