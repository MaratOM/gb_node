module.exports = {
  getCardBJValue: value => {
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