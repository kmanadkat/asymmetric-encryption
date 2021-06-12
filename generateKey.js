const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

const generateAndSaveKeys = () => {
  // Generate Keys -> Key Objects
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048 * 3,
  })

  // Convert KeyObjects to Strings -> To save easily
  const publicKeyStr = publicKey.export({ type: 'pkcs1', format: 'pem' }).toString('hex')
  const privateKeyStr = privateKey.export({ type: 'pkcs1', format: 'pem' }).toString('hex')

  // Form object to save
  const keys = {
    publicKey: publicKeyStr,
    privateKey: privateKeyStr,
  }

  // Save Key to data/keys.json
  const filePath = path.join(__dirname, '/data/keys.json')
  fs.writeFileSync(filePath, JSON.stringify(keys))
}

module.exports = generateAndSaveKeys
