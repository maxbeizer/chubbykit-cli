chubbykit-cli
=============



[![Version](https://img.shields.io/npm/v/chubbykit-cli.svg)](https://npmjs.org/package/chubbykit-cli)
[![CircleCI](https://circleci.com/gh/maxbeizer/chubbykit-cli/tree/master.svg?style=shield)](https://circleci.com/gh/maxbeizer/chubbykit-cli/tree/master)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/maxbeizer/chubbykit-cli?branch=master&svg=true)](https://ci.appveyor.com/project/maxbeizer/chubbykit-cli/branch/master)
[![Codecov](https://codecov.io/gh/maxbeizer/chubbykit-cli/branch/master/graph/badge.svg)](https://codecov.io/gh/maxbeizer/chubbykit-cli)
[![Downloads/week](https://img.shields.io/npm/dw/chubbykit-cli.svg)](https://npmjs.org/package/chubbykit-cli)
[![License](https://img.shields.io/npm/l/chubbykit-cli.svg)](https://github.com/maxbeizer/chubbykit-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g chubbykit-cli
$ chubbykit COMMAND
running command...
$ chubbykit (-v|--version|version)
chubbykit-cli/0.0.0 darwin-x64 node-v9.11.1
$ chubbykit --help [COMMAND]
USAGE
  $ chubbykit COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [chubbykit hello](#chubbykit-hello)
* [chubbykit help [COMMAND]](#chubbykit-help-command)

## chubbykit hello

Describe the command here

```
USAGE
  $ chubbykit hello

OPTIONS
  -n, --name=name  name to print

DESCRIPTION
  Describe the command here
  ...
  Extra documentation goes here
```

_See code: [src/commands/hello.js](https://github.com/maxbeizer/chubbykit-cli/blob/v0.0.0/src/commands/hello.js)_

## chubbykit help [COMMAND]

display help for chubbykit

```
USAGE
  $ chubbykit help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v1.2.4/src/commands/help.ts)_
<!-- commandsstop -->
