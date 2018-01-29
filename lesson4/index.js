const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const app = express();

const NewsFactory = require('./lib/news');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

const port = 8000;
app.listen(port, () => {
  console.log('Listening on port ' + port);
});

app.get('/',  async (req, res) => {
  res.render('home')
});

app.get('/news/list/:service',  async (req, res) => {
  const newsService = await NewsFactory.issue(req.params.service)
  const newsList = await newsService.getNewsList()

  res.render('newsList', {service: req.params.service, news: newsList})
});

app.get('/news/:service',  async (req, res) => {
  const newsService = await NewsFactory.issue(req.params.service)
  const newsItem = await newsService.getNewsItem(req.query.q)

  res.render('newsItem', {service: req.params.service, newsItem: newsItem})
});
