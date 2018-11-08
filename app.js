const express = require('express');
const bodyParser = require('body-parser');
const OAuth2Server  = require('oauth2-server');
const app = express();

app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(bodyParser.json());

const oauth = new OAuth2Server({
    model: require('./model'),
    allowBearerTokensInQueryString: true,
    token: ['client_credentials']
})

const Request = OAuth2Server.Request;
const Response = OAuth2Server.Response;
// let response = new Response(app.res)

function authenticateHandler() {
    return function(req, res, next) {
      let request = new Request(req);
      let response = new Response(res);
      return oauth.authenticate(request, response)
        .then(function(token) {
            console.log(token)
          res.locals.oauth = {token: token};
          next();
        })
        .catch(function(err) {
          // handle error condition
          res.send( err);
        });
    }
  }

app.post('/login', authenticateHandler(), function(req,res) {
    let request = new Request(req);
    //console.log(request);
    res.send('dddddd');
});

function tokenHandler() {
    return function(req, res, next) {
      let request = new Request(req);
      let response = new Response(res);
      return oauth.token(request, response)
        .then(function(token) {
         //   console.log('aaaaaaa',code)
          res.locals.oauth = {token: token};
         
          next();
        })
        .catch(function(err) {
          // handle error condition
          console.log('wtf')
         // res.send( err);
        });
    }
  }
app.post('/token', tokenHandler(), function(req,res) {
   // console.log( res.locals.oauth )
    res.send(res.locals.oauth)
});

app.listen(3000, function() {
	console.log('listening')
});