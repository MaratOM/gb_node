class Player {
  constructor(name) {
    this.name = name
    this.turns = []
    this.total = 0
  }

  showCards() {
    return this.turns.reduce((prevCard, curCard) => prevCard + ' ' + curCard.value + curCard.suit + ' ', '')
  }
}

module.exports = Player