const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Get colors from environment variables
const bgColor = process.env.BGCOLOR;
const fgColor = process.env.FGCOLOR;

// Regex to test if the colors are valid hex codes
const colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

// If the colors are valid hex codes, change the background and foreground colors, otherwise set to black and white
if (colorRegex.test(bgColor) && colorRegex.test(fgColor)) {
  bgColorStyle = bgColor;
  fgColorStyle  = fgColor;
}
else {
  bgColorStyle  = "black";
  fgColorStyle  = "white";
}

// Root path response
app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  let html = "<body style='background-color:"+bgColorStyle +';color:'+ fgColorStyle+";'><h1>Hello World!</h1>";
  res.send(html);
});

// Environment variables response
app.get('/api/environment', (req, res) => {
  const { format } = req.query;
  const environment = process.env;
  if (format === 'json') {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(environment));
  } else if (format === 'xml') {
    res.setHeader('Content-Type', 'application/xml');
    let xml = '';
    Object.keys(environment).forEach((key) => {
      xml += `<${key}>${environment[key]}</${key}>`;
    });
    res.send(`<environment>${xml}</environment>`);
  } else {
    res.setHeader('Content-Type', 'text/html');
    let html = "<body style='background-color:"+bgColorStyle +';color:'+ fgColorStyle+";'>";
    Object.keys(environment).forEach((key) => {
      html += `<p>${key}: ${environment[key]}</p>`;
    });
    res.send(html);
  }
});

// Headers response
app.get('/api/headers', (req, res) => {
  const { format } = req.query;
  if (format === 'json') {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(req.headers));
  } else if (format === 'xml') {
    res.setHeader('Content-Type', 'application/xml');
    let xml = '';
    Object.keys(req.headers).forEach((key) => {
      xml += `<${key}>${req.headers[key]}</${key}>`;
    });
    res.send(`<headers>${xml}</headers>`);
  } else {
    res.setHeader('Content-Type', 'text/html');

    let html = "<body style='background-color:"+bgColorStyle +';color:'+ fgColorStyle+";'>";
    Object.keys(req.headers).forEach((key) => {
      html += `<p>${key}: ${req.headers[key]}</p>`;
    });
    res.send(html);
  }
});

// Post method response. Parses the body of the request and returns it as JSON, XML or HTML based on the format parameter.
app.post('/api/post', bodyParser.json(), (req, res) => {
  const { format } = req.query;
  const { body } = req;
  if (format === 'json') {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(body));
  } else if (format === 'xml') {
    res.setHeader('Content-Type', 'application/xml');
    let xml = '';
    Object.keys(body).forEach((key) => {
      xml += `<${key}>${body[key]}</${key}>`;
    });
    res.send(`<body>${xml}</body>`);
  } else {
    res.setHeader('Content-Type', 'text/html');
    let html = "<body style='background-color:"+bgColorStyle +';color:'+ fgColorStyle+";'>";
    Object.keys(body).forEach((key) => {
      html += `<p>${key}: ${body[key]}</p>`;
    });
    res.send(html);
  }
});

// Error handling for unsupported methods
app.use('/api/post', (req, res) => {
  res.status(405).send('Method not allowed');
});

// Listen for incoming requests
app.listen(3000, () => {
  console.log('Listening on port 3000');
});
