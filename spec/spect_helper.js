const request = require("request")

class Requester{
    get(url,callback){
        request(url), callback
    }
    // post(path, body, callback){
    //     request.post (url: "http://localhost:3000#{path}", body: body), callback
    // }
}
   
    

  
    

exports.withServer = function (callback){
    asyncSpecWait()
}
  

  const app = require("../index.js")

  stopServer = function(){
    app.close()
    asyncSpecDone()
  }
    

//   app.listen(3090)

  const callback = new Requester() 
  stopServer();