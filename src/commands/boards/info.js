const {Command} = require('@oclif/command')
const LeanKit = require('../../../lib/leankit')

class BoardsInfoCommand extends Command {
  async run() {
    const {args} = this.parse(BoardsInfoCommand)
    const {client} = await new LeanKit().authenticate(this.config.configDir)

    client.board.get(args.boardId).then(res => {
      const {title, id, users} = res.data
      this.log('Board info:')
      this.log(`${title} (id: ${id})`)
      this.log('Users:')
      users
      .map(u => this.log(u.username))
    })
    .catch(err => {
      this.error('Error:', err)
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
