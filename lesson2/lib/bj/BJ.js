const cards = require('cards');

class BJ {
  constructor() {
    this.deck = new cards.PokerDeck()
    this.shuffleDeck()
  }

  shuffleDeck() {
    this.deck.shuffleAll()
  }

  static cardSuitImage(suit) {
    return cards.Card.suitUnicodeStrings[suit]
  }

  getCard(game) {
    const currentPlayer = game.players[game.currentPlayerIndex]
    const card = this.deck.draw()
    currentPlayer.turns.push({
      value: card.value,
      suit: BJ.cardSuitImage(card.suit),
      bjValue: BJ.getCardBJValue(card.value)
    })
    currentPlayer.total += parseInt(BJ.getCardBJValue(card.value), 10)

    return {value: card.value, suit: BJ.cardSuitImage(card.suit)}
  }

  calculateWinner(game) {
    let winnerValue = 0,
        winnerIndexes = []
    game.players.forEach((player, index) => {
      if(player.total > 21)
        return

      if(player.total > winnerValue || player.total === winnerValue) {
        if(player.total > winnerValue) {
          winnerIndexes = [index]
        }
        else if(player.total === winnerValue) {
          winnerIndexes.push(index)
        }
        winnerValue = player.total
      }
    })

    winnerIndexes.forEach(index => {
      game.players[index].winner = true
      game.winners.push(game.players[index].name)
    })

    return game.winners.toString()
  }

  static getCardBJValue(value) {
    if(isNaN(value)) {
      if(value === 'A') {
        value = 11
      }
      else {
        value = 10
      }
    }

    return value
  }
}

module.exports = BJ
