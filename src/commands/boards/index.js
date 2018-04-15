const {Command} = require('@oclif/command')
const LeanKit = require('../../../lib/leankit')

class BoardsIndexCommand extends Command {
  async run() {
    this.parse(BoardsIndexCommand)
    const {client} = await new LeanKit().authenticate(this.config.configDir)

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
