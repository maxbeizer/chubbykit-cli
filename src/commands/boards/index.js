const {Command} = require('@oclif/command')
const LeanKit = require('../../../lib/leankit')
const path = require('path')

class BoardsIndexCommand extends Command {
  async run() {
    this.parse(BoardsIndexCommand)
    const configPath = path.join(this.config.configDir, 'config.json')
    const {client} = await new LeanKit().authenticate(configPath)

    client.board.list().then(res => {
      res.data.boards
      .map(b => this.log(`${b.title} (id: ${b.id})`))
    })
    .catch(err => {
      this.error('Error:', err)
    })
  }
}

BoardsIndexCommand.description = `
List boards
`
module.exports = BoardsIndexCommand
