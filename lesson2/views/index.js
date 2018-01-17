const term = require( 'terminal-kit' ).terminal ;

module.exports = {
  greeting: answer => term.red(`Рады Вас приветствовать, ${answer}!\n`),

  yourCard: card => {
    term.green(`Ваша карта ${card.value}${card.suit} \n`) // ``
  },

  bye: () => term.green('Спасибо за игру! Приходите еще!\n'),

  playersCards: game => {
    term.yellow('----------------------\n')
    term.yellow('Карты игроков\n')
    game.players.forEach(player => term.yellow(`${player.name} ${player.showCards()}\n`))
    term.yellow('----------------------\n')
  },

  overdraw: currentPlayer => term.green(`Игрок ${currentPlayer.name} проиграл (перебор)\n`),

  playerGameOver: currentPlayer => term.green(`Игрок ${currentPlayer.name} закончил игру с картами ${currentPlayer.showCards()}\n`),

  nextPlayer: currentPlayer => term.green(`Следующий игрок - ${currentPlayer.name}\n`),

  gameOver: currentPlayer => term.red('Игра окончена с картами\n'),

  winner: winner => term.red.bold(`*** Победитель - игрок ${winner}! ***\n`),

  gamesStat: (games, players) => {
    let playersScores = {}
    players.forEach(playerName => {
      playersScores[playerName] = 0
    })

    games.forEach(game => {
      if(game.winners.length) {
        game.winners.forEach(winner => playersScores[winner]++)
      }
    })

    term.blue('======================\n')
    term.blue('Статистика игр\n')
    term.blue('======================\n')
    term.blue(`Сыграно игр - ${games.length}\n`)
    term.blue('----------------------\n')
    term.blue('Количество побед:\n')

    for (let playerName in playersScores) {
      term.blue(`${playerName} ${playersScores[playerName]}\n`)
    }

    term.blue('======================\n')
  },
}