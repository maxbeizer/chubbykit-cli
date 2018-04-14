const {Command, flags} = require('@oclif/command')
const path = require('path')
const fs = require('fs-extra')
const {cli} = require('cli-ux')
const leanKitClient = require('leankit-client')

class WhoamiCommand extends Command {
  async run() {
    this.parse(WhoamiCommand)
    const configPath = path.join(this.config.configDir, 'config.json')
    let userConfig = null
    const doesConfigExist = await this.doesConfigExist(configPath)
    if (doesConfigExist) {
      userConfig = await fs.readJson(configPath)
    } else {
      const account = await cli.prompt('What is your LeanKit account? e.g. heroku for heroku.leankit.com')
      const email = await cli.prompt('What is your LeanKit email?')
      const password = await cli.prompt('What is your LeanKit password? (hidden)', {type: 'hide'})
      await this.ensureFile(configPath)
      await this.writeJSON(configPath, {account, email, password})
      userConfig = await fs.readJson(configPath)
    }
    const client = leanKitClient({account: userConfig.account, email: userConfig.email, password: userConfig.password})
    client.account.get()
    .then(() => this.log(`Logged in as: ${userConfig.email} on acount ${userConfig.account}`))
    .catch(() => this.log(`There was an error logging you in as: ${userConfig.email} on acount ${userConfig.account}`))
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

WhoamiCommand.description = `
Describe the command here
...
Extra documentation goes here
`

WhoamiCommand.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = WhoamiCommand
