const {Command} = require('@oclif/command')
const LeanKit = require('../../../lib/leankit')
const {cli} = require('cli-ux')
const path = require('path')
const inquirer = require('inquirer')

class BoardsDefaultCommand extends Command {
  async run() {
    const {args} = this.parse(BoardsDefaultCommand)
    const configPath = path.join(this.config.configDir, 'config.json')
    if (args.boardId) {
      await this.writeNewDefaultBoard(configPath, args.boardId)
      await this.fetchBoardInfo(configPath, args.boardId)
    } else {
      const {defaultBoardId} = await new LeanKit().getConfig(configPath)
      if (defaultBoardId) {
        await this.fetchBoardInfo(configPath, defaultBoardId)
      } else {
        cli.log('No default board set')
        const {client} = await new LeanKit().authenticate(configPath)
        const {data} = await client.board.list()
        const boardsData = data.boards.map(b => {
          return {name: b.title, value: b.id}
        })
        const {boardId} = await inquirer.prompt([{
          name: 'boardId',
          message: 'select a board',
          type: 'list',
          choices: boardsData,
        }])
        await this.writeNewDefaultBoard(configPath, boardId)
        await this.fetchBoardInfo(configPath, boardId)
      }
    }
  }

  async writeNewDefaultBoard(configPath, boardId) {
    const config = await new LeanKit().readJSON(configPath)
    const newConfig = Object.assign({defaultBoardId: boardId}, config)
    await new LeanKit().writeJSON(configPath, newConfig)
    cli.log('New default board set')
  }

  async fetchBoardInfo(configPath, boardId) {
    const {client} = await new LeanKit().authenticate(configPath)
    client.board.get(boardId).then(res => {
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

BoardsDefaultCommand.args = [
  {
    name: 'boardId',
  },
]

BoardsDefaultCommand.description = `
Show info for default board if one exists. If an id is passed, it sets that
board as default.
...
If you need to know the board id, you can \`chubbykit boards\`
`
module.exports = BoardsDefaultCommand
