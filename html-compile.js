#!/usr/bin/env node

const pug = require('pug'),
  fs = require('fs-extra'),
  chokidar = require('chokidar')

const DEBUG = !(process.env.NODE_ENV === 'production')

const target = [
  'index',
  'top',
]

const renderOptions = {
  pretty: true
}

const compileHTML = () => {
  target.map((html) => {
    pug.renderFile(__dirname + `/src/${ html }.pug`, renderOptions, (err, res) => {
      if (err) { 
        console.log(err) 
      }

      fs.outputFile(__dirname + `/public/${ html }.html`, res, (err) => {
        if (err) { 
          console.log(err) 
          return false 
        }
        console.log(`Compiled: ${ html }.pug`)
      })
    })
  })
}

if (DEBUG) {
  chokidar.watch(__dirname + '/src/**/*.{pug}', {}).on('all', (event, path) => {
    if (event === 'change') { compileHTML() }
    console.log(event, path)
  })
  compileHTML()
} else {
  compileHTML()
}