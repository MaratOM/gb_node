class Game {
  constructor() {
    this.players = []
    this.currentPlayerIndex = null
    this.winners = []
  }

  addPlayer(player) {
    this.players.push(player)
    if(this.players.length === 1) {
      this.currentPlayerIndex = 0
    }
  }
}

module.exports = Game
