const rl = require('readline-sync');
const cards = require('cards');

const Player = require('./Player');
const Players = require('./Players');
const cardsHelpers = require('./cardsHelpers')

const deck = new cards.PokerDeck();
deck.shuffleAll();
const cardSuitImage = suit => cards.Card.suitUnicodeStrings[suit]

var pls = new Players();

const isAnswerYes = answer => answer === 'y' || answer === 'Y'
const isAnswerNo = answer => answer === 'n' || answer === 'N'


const greetingQuestion = () => {
  let answer = rl.question('Представьтесь, пожалуйста ')
  if(answer) {
    console.log(`Рады Вас приветствовать, ${answer}`);

    pls.addPlayer(new Player(answer))
    addAnotherPlayerQuestion()
  }
  else {
    greetingQuestion()
  }
}

const addAnotherPlayerQuestion = () => {
  let answer = rl.question('Будут еще игроки? (y/n) /**Игра может вестисть один на один с крупье**/ ')
  if(isAnswerYes(answer)) {
    greetingQuestion()
  }
  else if(isAnswerNo(answer)) {
    pls.addPlayer(new Player('Крупье'))
    startGameQuestion()
  }
  else {
    addAnotherPlayerQuestion()
  }
}

const startGameQuestion = () => {
  let answer = rl.question('Начать игру (y)/ Выйти (n) ')
  if(isAnswerYes(answer)) {
    const card = deck.draw();
    pls.players[pls.currentPlayerIndex].turns.push({
      value: card.value,
      suit: cardSuitImage(card.suit),
      bjValue: cardsHelpers.getCardBJValue(card.value)
    })
    pls.players[pls.currentPlayerIndex].total += parseInt(cardsHelpers.getCardBJValue(card.value), 10)
    console.log('Ваша карта ' + pls.players[pls.currentPlayerIndex].showCards())
    nextTurnQuestion()
  }
 else if(answer === 'n' || answer === 'N') {
    console.log('Спасибо за игру! Приходите еще!')
    process.exit(0)
  }
  else if(answer !== 'y' && answer !== 'Y' && answer !== 'n' && answer !== 'N') {
    startGameQuestion()
  }
  else {
    nextTurnQuestion()
  }
}

const nextTurnQuestion = () => {
  let answer = rl.question('Еще одну? (y/n) ')
  if(answer === 'y' || answer === 'Y'
      && pls.players[pls.currentPlayerIndex].total <= 21) {
    const card = deck.draw();
    pls.players[pls.currentPlayerIndex].turns.push({
      value: card.value,
      suit: cardSuitImage(card.suit),
      bjValue: cardsHelpers.getCardBJValue(card.value)
    })
    pls.players[pls.currentPlayerIndex].total += parseInt(cardsHelpers.getCardBJValue(card.value), 10)

    console.log('Ваши карты ' + pls.players[pls.currentPlayerIndex].showCards())
    console.log('Всего очков ' + pls.players[pls.currentPlayerIndex].total)

    nextTurnQuestion()
  }
  else if(answer === 'n' || answer === 'N'
            && pls.players[pls.currentPlayerIndex].total > 21) {
    console.log('Игрок ' + pls.players[pls.currentPlayerIndex].name + ' закончил игру с картами ' + pls.players[pls.currentPlayerIndex].showCards())

    pls.currentPlayerIndex++

    if(pls.players.length > pls.currentPlayerIndex) {
      console.log('Следующий игрок - ' + pls.players[pls.currentPlayerIndex].name)
    }
    else {
      console.log('Игра окончена')
      pls.players.forEach(player => console.log(player.name + ' '  + player.showCards()))
    }

    startGameQuestion()
  }
  else {
    nextTurnQuestion()
  }
}

greetingQuestion()





