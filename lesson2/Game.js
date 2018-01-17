class Players {
  constructor() {
    this.players = []
    this.currentPlayer = null
  }

  addPlayer(player) {
    this.players.push(player)
    if(this.players.length === 1) {
      this.currentPlayerIndex = 0
    }
  }
}

module.exports = Players