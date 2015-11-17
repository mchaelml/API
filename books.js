
var request = require('request')

// https://www.googleapis.com/books/v1/volumes?q=swift&maxResults=40&fields=items(id,volumeInfo(title,authors))

exports.search = function(query, callback) {
  console.log('search')
  if (typeof query !== 'string' || query.length === 0) {
    callback({code:400, response:{status:'error', message:'missing query (q parameter)'}})
  }
  //const url = 'https://www.googleapis.com/books/v1/volumes'
  const url = 'http://api.guitarparty.com/v2/songs/'
  const query_string = {q: query,Guitarparty_Api_Key:"d0ba136ea0e7bade8e61096631e665b2a0727951"} //maxResults: 40, fields: 'items(id,volumeInfo(title,authors))'}
  request.get({url: url, qs: query_string}, function(err, res, body) {
    if (err) {
      callback({code:500, response:{status:'error', message:'search failed', data:err}})
    }
    console.log(typeof body)
    const json = JSON.parse(body)
    const items = json.items
    console.log(json)
    const books = items.map(function(element) {
      return {"Author":element.authors}//, title:element.volumeInfo.title, authors:element.volumeInfo.authors}
    })
    console.log(books)
    callback({code:200, response:{status:'success', message:books.length+' books found', data:books}})
  })
}
