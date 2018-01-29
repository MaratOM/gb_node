const Newsru = require('./services/Newsru')
const Svpressa = require('./services/Svpressa')

class NewsFactory {
  static async issue(type) {
    switch(type) {
      case 'newsru':
        return await new Newsru()
        break
      case 'svpressa':
        return await new Svpressa()
        break
    }
  }
}

module.exports = NewsFactory
