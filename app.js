const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.static('public' , {
	 extensions: ['html', 'htm']
}))
app.use(express.static(path.join(__dirname, "public")));
app.use(function (req, res, next) {
  if (req.path.substr(-1) == '/' && req.path.length > 1) {
    let query = req.url.slice(req.path.length)
    res.redirect(301, req.path.slice(0, -1) + query)
  } else {
    next()
  }
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public'));
});

app.get('/blog', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/blog'));
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/404.html'));
});

app.listen(port);
console.log('Server started at http://localhost:' + port);
