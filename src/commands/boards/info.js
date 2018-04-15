const {Command} = require('@oclif/command')
const LeanKit = require('../../../lib/leankit')
const {cli} = require('cli-ux')
const path = require('path')

class BoardsInfoCommand extends Command {
  async run() {
    const {args} = this.parse(BoardsInfoCommand)
    const configPath = path.join(this.config.configDir, 'config.json')
    const {client} = await new LeanKit().authenticate(configPath)

    client.board.get(args.boardId).then(res => {
      const {title, id, users} = res.data
      cli.log('Board info:')
      cli.log(`${title} (id: ${id})`)
      cli.log('Users:')
      users.map(u => cli.log(u.username))
    })
    .catch(err => {
      cli.error('Error:', err)
    })
  }
}

BoardsInfoCommand.args = [
  {
    name: 'boardId',
    required: true,
  },
]

BoardsInfoCommand.description = `
Show info for a given board id
...
If you need to know the board id, you can \`chubbykit boards\`
`
module.exports = BoardsInfoCommand
