const rp = require('request-promise')
const cheerio = require('cheerio')

class News {
  constructor() {
    this.newsServiceUrl = ''
    this.newsListUrn = ''
    this.listItemSelector = ''
    this.itemTitleSelector = ''
    this.itemDateSelector = ''
    this.itemBodySelector = ''
  }

  async getNewsList() {
    let news = []

    await rp(`${this.newsServiceUrl}${this.newsListUrn}`)
        .then(data => {
          const $ = cheerio.load(data)

          $(this.listItemSelector).each(function (i, element) {
            const newsItemUrn = $(this).find('a').eq(0).attr('href')
            const newsItemTitle = $(this).find('a').eq(0).text().trim()

            if(newsItemUrn.indexOf('http') === -1) {
              news.push({
                title: newsItemTitle,
                urn: newsItemUrn,
              })
            }
          })
        })

    return news
  }

  getNewsItemTitle($) {
    return $(this.itemTitleSelector).text().trim()
  }

  getNewsItemDate($) {
    return $(this.itemDateSelector).text().trim()
  }

  getNewsItemBody($) {
    let body = ''

    $(this.itemBodySelector).each((i, el) => {
      body += ` ${$(el).text().trim()}`
    })

    return body
  }

  async getNewsItem(newsItemUrn) {
    let newsItemData = {}

    await rp(this.newsServiceUrl + newsItemUrn)
        .then(data => {
          const $ = cheerio.load(data)
          const date = this.getNewsItemDate($)
          const title = this.getNewsItemTitle($)
          const body = this.getNewsItemBody($)
          newsItemData = {date, title, body}
        })

    return newsItemData
  }
}

module.exports = News
