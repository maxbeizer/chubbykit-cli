const {Command} = require('@oclif/command')
const LeanKit = require('../../lib/leankit')

class WhoamiCommand extends Command {
  async run() {
    this.parse(WhoamiCommand)
    const {client, account, email} = await new LeanKit().authenticate(this.config.configDir)
    client.account.get()
    .then(() => this.log(`Logged in as: ${email} on acount ${account}`))
    .catch(() => this.log(`There was an error logging you in as: ${email} on acount ${account}`))
  }
}

WhoamiCommand.description = `
Check your log in status
`
module.exports = WhoamiCommand
