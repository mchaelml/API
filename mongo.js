 
var mongoose = require('mongoose')
/* the database name is stored in a private variable instead of being 'hard-coded' so it can be replaced using the 'rewire' module. This avoids the need for the unit tests to run against the 'live' database. */
var database = 'api'
/* the server connections string includes both the database server IP address and the name of the database. */
const server = 'mongodb://'+process.env.IP+'/'+database
console.log(server)
/* the mongoose drivers connect to the server and return a connection object. */
mongoose.connect(server)
const db = mongoose.connection

/* all documents in a 'collection' must adhere to a defined 'schema'. Here we define a new schema that includes a mandatory string and an array of strings. */
const listSchema = new mongoose.Schema({
    query: { type: String, required: true }
    //items:  [{type: Array ,required : false}] 
   // description :  [ {type : Array ,required : false} ]
    
})
/* the schema is associated with the 'List' collection which means it will be applied to all documents added to the collection. */
const List = mongoose.model('List', listSchema)
/* END OF MONGOOSE SETUP */

/* notice we are using the 'arrow function' syntax. In this example there are more than one parameter so they need to be enclosed in brackets. */
exports.addList = (data, callback) => {
  const query = data // data[0] to add 1st found item from search to db
  //const step1 = query.split('}')
  //console.log(step1)
  
  /* here we use the 'map' function to loop through the array and apply the trim() function. There are several useful functions that are part of the 'array prototype' such as map(), filter(), reduce(). */
  //const items = step1[0].split('}').map(function(item) {
  //  return item.trim()
  //})
  //const description = step1[1].split(',').map(function(it) {
  //  return it.trim()
  //})
  
  /* now we have extracted the data we can use it to create a new 'List' object that adopts the correct schema. */
  const newList = new List({query})
  newList.save( (err, data) => {
    
    if (err) {
      callback('error: '+err)
    }else
    callback('added: '+data)
    
  })
  
  
}

exports.getAll = callback => {
  /* the List object contains several useful properties. The 'find' property contains a function to search the MongoDB document collection. */
  List.find( (err, data) => {
    if (err) {
      callback('error: '+err)
    }
    const list = data.map( item => {
      //return {id: item._id, name: item.name, description: item.description}
      return { song: item.query}
    })
    callback(list)
  })
}

exports.getById = (id,callback) => {
  /* the 'find' property function can take a second 'filter' parameter. */
  List.find({_id:id}, (err, data) => {
    if (err) {
      callback('error: '+err)
    }
    callback(data)
  })
}
exports.getById1 = (name,callback) => {
  /* the 'find' property function can take a second 'filter' parameter. */
  List.find({name:name}, (err, data) => {
    if (err) {
      callback('error: '+err)
    }
    callback(data)
  })
}




exports.clear = (callback) => {
  /* the 'remove()' function removes any document matching the supplied criteria. */
  List.remove({}, err => {
    if (err) {
      callback('error: '+err)
    }
    callback('lists removed')
  })
}

exports.names  = callback => {
  /* the List object contains several useful properties. The 'find' property contains a function to search the MongoDB document collection. */
  List.find( (err, data) => {
    if (err) {
      callback('error: '+err)
    }
    const list = data.map( item => {
       return item.name
      
    })
    callback(list)
  })
}