import keygen from 'ssh-keygen'
import fs from 'fs'
import { promisify } from 'util'

const __dirname = process.env.PWD

const jwtPrivateKeyFile = __dirname + '/secrets/jwtRS256.key'

const fileExists = filePath => promisify(fs.exists)(filePath)
const generateKeygen = opts => promisify(keygen)(opts)

const generateSecrets = async () => {
  if (await fileExists(jwtPrivateKeyFile)) {
    console.log('Private key exists')
    return
  }

  await generateKeygen({
    location: jwtPrivateKeyFile,
    format: 'PEM',
    read: false,
    force: false
  })

  console.log('Private and public keys created')
}

generateSecrets()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err)
    process.exit(1)
  });
