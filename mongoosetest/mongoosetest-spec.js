var mongoose = require('mongoose');
mongoose.createConnection('mongodb://localhost/test');

var list = require("../mongo.js")
describe('Mongoose list', function () {

	it('should find new list', function() {
		var newlist= new list({
		
		    query : 'THIS'
		})
		newlist.save(function (err){
		    if (err)
		        throw err
		    
		})
		var queryy = newlist.find({query:'THIS'},function(err,user){
		    if (err) throw err;
		    console.log(queryy)
		
	    })
	    expect(queryy == 'THIS')
    })
})



//var Cat = mongoose.model('Cat', { name: String });

//var kitty = new Cat({ name: 'Zildjian' });
//kitty.save(function (err) {
//  if (err) // ...
//  console.log('meow');
//});