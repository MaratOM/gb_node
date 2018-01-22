const http = require('http')
const rp = require('request-promise')
const cheerio = require('cheerio')

const newsServiceUrl = 'http://www.newsru.com'

const populateServerRespondNews = res => {
  const news = []
  const promises = []

  rp(`${newsServiceUrl}/allnews`)
    .then(data => {
      const $ = cheerio.load(data)

      $('.index-news-content').each(function (i, element) {
        const newsItemUrn = $(this).find('a').eq(0).attr('href')

        if(newsItemUrn.indexOf('http') === -1) {
          promises.push(
            rp(newsServiceUrl + newsItemUrn)
              .then(data => news.push(getNewsFullItem(data)))
          )
        }
      })

      Promise.all(promises)
        .then(function() {
          serverRespondNews(res, news)
        })
        .catch(err => {throw new Error(err)})
    }
  )
}

const getNewsFullItem = data => {
  const $ = cheerio.load(data)

  let date = $('.article-date').text().trim()
  date = date.substring(date.indexOf(':') + 2, date.indexOf('|')).trim()

  const title = $('.article-title').text().trim()

  let body = ''
  $('.article-text p.maintext').each((i, el) => {
    body += ` ${$(el).text()}`
  })

  return {date, title, body}
}

const serverRespondNews = (res, news) => {
  res.writeHead(200, {'Content-Type': 'application/json'})
  res.write(JSON.stringify(news))
  res.end()
}

http.createServer(function (req, res) {
  populateServerRespondNews(res)
}).listen(8080)
