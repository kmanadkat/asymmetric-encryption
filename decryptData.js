const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

const decryptAndPrintData = () => {
  // 1. Bring Private Key From data/keys.json
  const keysJsonStr = fs.readFileSync(path.join(__dirname, './data/keys.json')).toString()
  const { privateKey } = JSON.parse(keysJsonStr)
  const privateKeyObj = crypto.createPrivateKey({ key: privateKey, type: 'pkcs1', format: 'pem' })

  // 2. Bring Encrypted Data From data/encryptedData.json
  const encryptedDataStr = fs.readFileSync(path.join(__dirname, './data/encryptedData.json')).toString()
  const encryptedDataObj = JSON.parse(encryptedDataStr)[0]

  // 3. Decrypt Data
  const decryptedData = crypto.privateDecrypt(
    {
      key: privateKeyObj,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: 'sha256',
    },
    Buffer.from(encryptedDataObj.data, 'base64')
  )

  // 4. Print Decrypted Data
  const decryptedDataObj = JSON.parse(decryptedData.toString())
  console.log('Decrypted Data : ', decryptedDataObj)
}

module.exports = decryptAndPrintData
