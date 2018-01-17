const rl = require('readline-sync');
const cards = require('cards');

const Player = require('./models/Player');
const Game = require('./models/Game');
const cardsHelpers = require('./helpers/cardsHelpers')
const views = require('./views')


const deck = new cards.PokerDeck()
deck.shuffleAll()
const cardSuitImage = suit => cards.Card.suitUnicodeStrings[suit]

const players = []
const games = []
let game = new Game()
games.push(game)

const isAnswerYes = answer => answer === 'y' || answer === 'Y'
const isAnswerNo = answer => answer === 'n' || answer === 'N'

const greetingQuestion = () => {
  let answer = rl.question('Добро пожаловать в наш клуб!\nПредставьтесь, пожалуйста ')
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
  let answer = rl.question('Будут ли еще игроки? (y/n) /**Игра может вестисть один на один с крупье**/ ')
  if(isAnswerYes(answer)) {
    greetingQuestion()
  }
  else if(isAnswerNo(answer)) {
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
  let answer = rl.question('Начать игру [игрок ' + currentPlayer.name + '] (y)/ Выйти (n) ')

  if(isAnswerYes(answer)) {
    const card = getCard(currentPlayer)
    views.yourCard(card)
    nextTurnQuestion()
  }
 else if(answer === 'n' || answer === 'N') {
    views.bye()
    process.exit(0)
  }
  else if(!isAnswerYes(answer) && !isAnswerNo(answer)) {
    startGameQuestion()
  }
  else {
    nextTurnQuestion()
  }
}

const nextTurnQuestion = () => {
  let answer = rl.question('Еще одну? (y/n) ')
  const currentPlayer = game.players[game.currentPlayerIndex]

  if(isAnswerYes(answer) && currentPlayer.total <= 21) {
    const card = getCard(currentPlayer)

    views.yourCard(card)
    views.playersCards(game)

    if(currentPlayer.total > 21) {
      changePlayer()
      startGameQuestion()
    }
    else {
      nextTurnQuestion()
    }
  }
  else if(isAnswerNo(answer) || currentPlayer.total > 21) {
    changePlayer()
    startGameQuestion()
  }
  else {
    nextTurnQuestion()
  }
}

const changePlayer = () => {
  let currentPlayer = game.players[game.currentPlayerIndex]

  if(currentPlayer.total > 21) {
    views.overdraw(currentPlayer)
  }

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
  views.winner(calculateWinner())
  views.gamesStat(games, players)

  game = new Game()
  players.forEach(player => game.addPlayer(new Player(player)))
  games.push(game)
  deck.shuffleAll()
}

const getCard = (currentPlayer) => {
  const card = deck.draw()
  currentPlayer.turns.push({
    value: card.value,
    suit: cardSuitImage(card.suit),
    bjValue: cardsHelpers.getCardBJValue(card.value)
  })
  currentPlayer.total += parseInt(cardsHelpers.getCardBJValue(card.value), 10)

  return {value: card.value, suit: cardSuitImage(card.suit)}
}

const calculateWinner = () => {
  let winnerValue = 0, winnerIndexes = []
  game.players.forEach((player, index) => {
    if(player.total > 21)
      return

    if(player.total > winnerValue || player.total === winnerValue) {
      if(player.total > winnerValue) {
        winnerIndexes = [index]
      }
      if(player.total === winnerValue) {
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

greetingQuestion()





