const prefix = `${process.env.VUE_APP_PREFIX}`

const persistData = {
  setItem(name, value, stringify = false) {
    if (stringify) {
      localStorage.setItem(`${prefix}-${name}`, JSON.stringify(value))
    }
    localStorage.setItem(`${prefix}-${name}`, value)
  },
  getItem(name, jsonParse = false) {
    const item = localStorage.getItem(`${prefix}-${name}`)

    if (jsonParse) {
      return JSON.parse(item)
    } else {
      return item
    }
  },
  removeItem(name) {
    localStorage.removeItem(`${prefix}-${name}`)
  }

}

export default persistData
