class Random {
  yesOrNo (yesChance) {
    yesChance = yesChance || 0.5
    return Math.random() < yesChance
  }

  getRandomIntExclusive (min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    // The maximum is exclusive and the minimum is inclusive
    return Math.floor(Math.random() * (max - min)) + min
  }

  getRandomIntInclusive (min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    // The maximum is inclusive and the minimum is inclusive
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  getRandomElementFromArray (array) {
    var index = this.getRandomIntExclusive(0, array.length)
    return array[index]
  }

  shuffle (array) {
    let currentIndex = array.length
    let temporaryValue, randomIndex

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1

      // And swap it with the current element.
      temporaryValue = array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex] = temporaryValue
    }
  }
}

export default new Random()
