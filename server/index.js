// config should be imported before importing any other file
const config = require('./config/config');
const app = require('./config/express');
require('./config/mongoose');
const https = require('https');
const fs = require('fs');

let https_options;

try {
  https_options = {
    ca: fs.readFileSync("/home/ubuntu/gpicc/certificado/ca_bundle.crt"),
    key: fs.readFileSync("/home/ubuntu/gpicc/certificado/private.key"),
    cert: fs.readFileSync("/home/ubuntu/gpicc/certificado/certificate.crt")
  };
} catch (err) {
  console.log('Certificados não encontrados')
}


// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912
if (!module.parent) {

  app.listen(config.port, () => {
    console.info(`server started on port ${config.port} (${config.env})`);
  });

  const httpsServer = https.createServer(https_options, app);

  httpsServer.listen(8443, () => {
    console.log('HTTPS Server running on port 8443');

  });
}

module.exports = app;
