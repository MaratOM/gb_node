const News = require('./News')

class Svpressa extends News {
  constructor() {
    super()
    this.newsServiceUrl = 'https://svpressa.ru/'
    this.newsListUrn = 'all/news/'
    this.listItemSelector = '.b-article__content_item'
    this.itemTitleSelector = '.b-text__title'
    this.itemDateSelector = '.b-text__date'
    this.itemBodySelector = '.b-text__block_text p'
  }
}

module.exports = Svpressa
