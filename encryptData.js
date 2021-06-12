const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

const encryptAndSave = () => {
  // 1. Bring Public Key From data/keys.json
  const keysJsonStr = fs.readFileSync(path.join(__dirname, './data/keys.json')).toString()
  const { publicKey } = JSON.parse(keysJsonStr)
  const publicKeyObj = crypto.createPublicKey({ key: publicKey, type: 'pkcs1', format: 'pem' })

  // 2. Bring Raw Data From data/rawData.json
  const rawDataStr = fs.readFileSync(path.join(__dirname, './data/rawData.json')).toString()
  const rawDataObj = JSON.parse(rawDataStr)[0]
  console.log('Original Raw Data: ', rawDataObj)

  // 3. Encrypt Raw Data
  const encryptedData = crypto.publicEncrypt(
    {
      key: publicKeyObj,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: 'sha256',
    },
    Buffer.from(JSON.stringify(rawDataObj))
  )
  const encryptedDataStr = encryptedData.toString('base64')
  console.log('\nEncrypted Data: ', encryptedDataStr)

  // 4. Form Data To Save
  const encryptedDataArr = [
    {
      id: new Date().getTime(),
      data: encryptedDataStr,
    },
  ]

  // 5. Save Data to data/encryptedData.json
  const encryptedDataArrStr = JSON.stringify(encryptedDataArr)
  fs.writeFileSync(path.join(__dirname, './data/encryptedData.json'), encryptedDataArrStr)
}

module.exports = encryptAndSave
