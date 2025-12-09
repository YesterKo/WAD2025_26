const express = require('express');
const fs = require('fs');
const https = require('https');
const http = require('http');
const helmet = require('helmet');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = require('./app');

const port = 3000;






http.createServer(app).listen(port, () => {
  console.log('HTTPS server running at http://localhost'+ ':' + port);
});