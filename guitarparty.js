
var request = require('request')

exports.search = function(query, callback) {
  console.log('search')
  if (typeof query !== 'string' || query.length === 0) {
    callback({code:400, response:{status:'error', message:'missing query (q parameter)'}})
  }
  
  const url = 'http://api.guitarparty.com/v2/songs/'          //  GuitarParty Api
  const query_string = {query:query , maxResults: 0}// ask in lab about maxresults not working
  request.get({headers: {
               'Guitarparty-Api-Key': 'd0ba136ea0e7bade8e61096631e665b2a0727951'},qs:query_string,url:url}, function(err, res, body) {
    if (err) {
      callback({code:500, response:{status:'error', message:'search failed', data:err}})
    }
    console.log(typeof body)
    const json = JSON.parse(body)
    const items = json.items
    //console.log(json)
    const songs = json.objects.map(function(element) {
      return {'Link':element.permalink,'Authors':element.authors[0].name,'Title':element.title}  
    })
    console.log(songs)
    callback({code:200, response:{status:'success', message:songs.length+' songs found', data:songs}})
  })
}
