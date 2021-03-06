
var request = require('request')
var weatherapikey = '1be111df2a2f9259ea79c73db1086aae'
// https://www.googleapis.com/books/v1/volumes?q=swift&maxResults=40&fields=items(id,volumeInfo(title,authors))

exports.search = function(query, callback) {
  console.log('search')
  if (typeof query !== 'string' || query.length === 0) {
    callback({code:400, response:{status:'error', message:'missing query (q parameter)'}})
  }
  const url = 'http://www.myapifilms.com/imdb'
  const query_string = {title:query}  //movie Api query
  request.get({url: url, qs: query_string}, function(err, res, body) {
    if (err) {
      callback({code:500, response:{status:'error', message:'search failed', data:err}})
    }
    console.log(typeof body)
    const json = JSON.parse(body)
    //const items = json.items
    //console.log(json)
    const movie = json.map(function(element) {
      return {'Title':element.title,'Directors':element.directors,'Rating':element.metascore,'Year':element.year}
    })
    console.log(movie)
    callback({code:200, response:{status:'success', message:movie.length+' movies found', data:movie}})
  })
}
