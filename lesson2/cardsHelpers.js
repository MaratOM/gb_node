module.exports = {
  getCardBJValue: value => {
    if(isNaN(value)) {
      value = 10
    }

    return value
  }
}