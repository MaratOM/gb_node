class Player {
  constructor(name) {
    this.name = name
    this.turns = []
    this.total = 0
  }

  showCards() {
    let cards = ''
    this.turns.forEach(card => cards += card.value + card.suit + ' ')

    return cards
  }
}

module.exports = Player