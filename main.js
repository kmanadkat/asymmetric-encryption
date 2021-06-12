const generateAndSaveKeys = require('./generateKey')
const encryptAndSave = require('./encryptData')
const decryptAndPrintData = require('./decryptData')

const mainRunner = () => {
  // 1. Generate & Save Asymmetric Keys
  generateAndSaveKeys()

  // 2. Print Raw Data, Encrypt Data, Print It & Save It
  encryptAndSave()

  // 3. Decrypt Data & Print It
  decryptAndPrintData()
}

mainRunner()
