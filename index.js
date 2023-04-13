const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Root path response
app.get('/', (req, res) => {
  res.send('Hello World!');
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
    let html = '<h1>Environment Variables:</h1>';
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
    let html = '<h1>Request Headers:</h1>';
    Object.keys(req.headers).forEach((key) => {
      html += `<p>${key}: ${req.headers[key]}</p>`;
    });
    res.send(html);
  }
});

// Post request response
app.post('/api/post', bodyParser.urlencoded({ extended: false }), (req, res) => {
  const { body } = req;
  let html = '<h1>Post Request Body:</h1>';
  Object.keys(body).forEach((key) => {
    html += `<p>${key}: ${body[key]}</p>`;
  });
  res.setHeader('Content-Type', 'text/html');
  res.send(html);
});

// Error handling for unsupported methods
app.use('/api/post', (req, res) => {
  res.status(405).send('Method not allowed');
});

// Listen for incoming requests
app.listen(3000, () => {
  console.log('Listening on port 3000');
});
