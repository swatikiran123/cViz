var constants = require('./constants');
var config = require(constants.paths.config + '/config');

module.exports = function(app, passport) {
  
  //app.use(logErrors);
  //app.use(clientErrorHandler);
  
  if (config.get("env") === 'development') {
    app.use(catchRestAllDev);
  } else {
    app.use(catchRestAllProd);
  }
}


function logErrors(err, req, res, next) {
  console.log('log error working');
  console.error(err.stack);
  next(err);
}


function clientErrorHandler(err, req, res, next) {
  console.log('clientErrorHandler working');
  if (req.xhr) {
    console.log('req.xhr');
    res.status(500).send({ error: 'Something failed!' });
  } else {
    next(err);
  }
}


function catchRestAllDev(err, req, res, next) {
  if (res.headersSent) {
    console.log('res.headersSent');
    return next(err);
  }

  if(req.url.indexOf('api') > -1) // it is an api call
  {
    res.status(500).send({
      status:500, 
      message: err.message,
      error: err,
      stack_trace: err.stack,
      type:'internal'
    }); 
  } else {
    res.render('/public/static/err/500.html') 
  }
}

function catchRestAllProd(err, req, res, next) {
  if(req.url.indexOf('api')>-1) // it is an api call
  {
    res.status(500).send({
      status:500, 
      message: "Internal Error",
      type:'internal'
    }); 
  } else {
    res.render('/public/static/err/500.html') 
  }
}
