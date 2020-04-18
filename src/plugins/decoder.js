const Decoder = {
  decodeToken(b64str) {
    const tokenData = b64str.split('.')[1]
      const obj = JSON.parse(atob(tokenData))
      return obj
  }
}

export default Decoder