const path = require('path')
const fs = require('fs-extra')
const {cli} = require('cli-ux')
const leanKitClient = require('leankit-client')

class LeanKit {
  async authenticate(configDir) {
    const configPath = path.join(configDir, 'config.json')
    let userConfig = null
    const doesConfigExist = await this.doesConfigExist(configPath)
    if (doesConfigExist) {
      userConfig = await this.readJSON(configPath)
    } else {
      const account = await cli.prompt('What is your LeanKit account? e.g. heroku for heroku.leankit.com')
      const email = await cli.prompt('What is your LeanKit email?')
      const password = await cli.prompt('What is your LeanKit password? (hidden)', {type: 'hide'})
      await this.ensureFile(configPath)
      await this.writeJSON(configPath, {account, email, password})
      userConfig = await this.readJSON(configPath)
    }
    return {
      account: userConfig.account,
      email: userConfig.email,
      client: leanKitClient({
        account: userConfig.account,
        email: userConfig.email,
        password: userConfig.password,
      }),
    }
  }

  async doesConfigExist(file) {
    return fs.pathExists(file)
  }

  async writeJSON(file, obj) {
    try {
      return await fs.writeJson(file, obj)
    } catch (err) {
      this.error(err)
    }
  }

  async readJSON(file) {
    try {
      return await fs.readJson(file)
    } catch (err) {
      this.error(err)
    }
  }

  async ensureFile(file) {
    try {
      await fs.ensureFile(file)
    } catch (err) {
      this.error(err)
    }
  }
}

module.exports = LeanKit
