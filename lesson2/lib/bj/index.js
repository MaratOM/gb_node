const rl = require('readline-sync')

const Player = require('./models/Player')
const Game = require('./models/Game')
const BJ = require('./BJ')
const helpers = require('../../helpers/index')
const views = require('./views/index')

const BJGame = new BJ()
BJGame.shuffleDeck()

const players = []
const games = []
let game = new Game()
games.push(game)

const greetingQuestion = () => {
  const answer = rl.question('Добро пожаловать в Black Jack клуб!\nПредставьтесь, пожалуйста ')
  if(answer) {
    views.greeting(answer)

    players.push(answer)
    game.addPlayer(new Player(answer))
    addAnotherPlayerQuestion()
  }
  else {
    greetingQuestion()
  }
}

const addAnotherPlayerQuestion = () => {
  const answer = rl.question('Будут ли еще игроки? (y/n) /**Игра может вестисть один на один с крупье**/ ')
  if(helpers.isAnswerYes(answer)) {
    greetingQuestion()
  }
  else if(helpers.isAnswerNo(answer)) {
    players.push('Крупье')
    game.addPlayer(new Player('Крупье'))
    startGameQuestion()
  }
  else {
    addAnotherPlayerQuestion()
  }
}

const startGameQuestion = () => {
  const currentPlayer = game.players[game.currentPlayerIndex]
  const answer = rl.question('Начать игру [игрок ' + currentPlayer.name + '] (y)/ Выйти (n) ')

  if(helpers.isAnswerYes(answer)) {
    const card = BJGame.getCard(game)
    views.yourCard(card)
    nextTurnQuestion()
  }
 else if(helpers.isAnswerNo(answer)) {
    views.bye()
    process.exit(0)
  }
  else {
    startGameQuestion()
  }
}

const nextTurnQuestion = () => {
  const currentPlayer = game.players[game.currentPlayerIndex]
  const answer = rl.question('Еще одну? (y/n) ')

  if(helpers.isAnswerYes(answer) && currentPlayer.total <= 21) {
    const card = BJGame.getCard(game)

    views.yourCard(card)
    views.playersCards(game)

    if(currentPlayer.total > 21) {
      views.overdraw(currentPlayer)

      changePlayer()
      startGameQuestion()
    }
    else {
      nextTurnQuestion()
    }
  }
  else if(helpers.isAnswerNo(answer)) {
    changePlayer()
    startGameQuestion()
  }
  else {
    nextTurnQuestion()
  }
}

const changePlayer = () => {
  let currentPlayer = game.players[game.currentPlayerIndex]

  views.playerGameOver(currentPlayer)

  game.currentPlayerIndex++
  currentPlayer = game.players[game.currentPlayerIndex]
  if(game.players.length > game.currentPlayerIndex) {
    views.nextPlayer(currentPlayer)
  }
  else {
    gameOver()
  }
}

const gameOver = () => {
  views.gameOver()
  views.playersCards(game)
  views.winner(BJGame.calculateWinner(game))
  views.gamesStat(games, players)

  game = new Game()
  players.forEach(player => game.addPlayer(new Player(player)))
  games.push(game)
  BJGame.shuffleDeck()
}

const start = () => greetingQuestion()

module.exports = {
  start: start()
}





