const News = require('./News')

class Newsru extends News {
  constructor() {
    super()
    this.newsServiceUrl = 'http://www.newsru.com'
    this.newsListUrn = '/allnews'
    this.listItemSelector = '.index-news-content'
    this.itemTitleSelector = '.article-title'
    this.itemDateSelector = '.article-date'
    this.itemBodySelector = '.article-text p.maintext'
  }

  getNewsItemDate($) {
    let date = $(this.itemDateSelector).text().trim()
    return date.substring(date.indexOf(':') + 2, date.indexOf('|')).trim()
  }
}

module.exports = Newsru
