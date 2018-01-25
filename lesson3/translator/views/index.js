const term = require( 'terminal-kit' ).terminal

module.exports = {
  greeting: () => term.red('Добро пожаловать в Переводчик с английского на русский!\n'),

  enterWord: () => {
    term.yellow('Введите слово для перевода ')
    term.red('(exit - выход)\n')
  },

  translation: translation => term.green(`Перевод: ${translation}\n`),

  error: () => term.red('Произошла ошибка. Попробуйте позже.\n'),

  bye: () => term.red('До свидания! Приходите еще!\n'),
}
