const prefix = `${process.env.VUE_APP_PREFIX}`

const persistData = {
  setItem(name, value, stringify) {
    if (stringify) {
      localStorage.setItem(`${prefix}-${name}`, JSON.stringify(value))
    }
    localStorage.setItem(`${prefix}-name`, value)
  },
  getItem(name, jsonParse) {
    const item = localStorage.getItem(`${prefix}-${name}`)

    if (jsonParse) {
      return JSON.parse(item)
    } else {
      return item
    }
  },

}

export default persistData
