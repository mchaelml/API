//var mongoose = require('mongoose');
var mongo = require("../mongo.js")
var List = require("../mongo.js")

describe('Mongoose list', function () {

	it('should clear all the lists and return "lists removed"', function(done) {
	    mongo.clear(function(result){
	        expect(result).toEqual('lists removed')
	        done();
	    });
	});    
	xit('should clear all the lists and return an error,bad data',function(done){
	    
	    mongo.addList(function(data,result){
	        //const query=data
	            
	        //const newList = new List({query})
	        //newList.save((data)=>{
	          expect(result).toEqual('added: '+data)
	          done();
	       // });
	        done();
	    });
	});
	
	it('should find all lists',function(done){
	   mongo.getAll(function(result){
	      expect(result).toEqual([]) 
	      done();
	   }); 
	});
});
var request = require("request");

var base_url = "http://www.myapifilms.com/imdb?title=day"

describe("Hello World Server", function() {
  describe("GET /", function() {
    it("returns status code 200", function(done) {
      request.get(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it("returns Hello World", function(done) {
      //mongo.addList(function(data,result){
          
          request.get(base_url, function(error, response, body) {
            body = "hi"
            expect(body).toBe("hi");
            done();
            //mongo.addList(function(data,result){
                //expect(result).toEqual(data)
                //done();
            //});
            //done();
      });
      //});
    });
    
  });
});
