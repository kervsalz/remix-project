var helpers = require('./contracts')

module.exports = function (browser, callback) {
  browser.clickLaunchIcon = helpers.clickLaunchIcon
  browser
    .url('http://127.0.0.1:8080/#version=builtin')
    .injectScript('test-browser/helpers/applytestmode.js', function () {
      browser.resizeWindow(2560, 1440, () => {
        initModules(browser, () => {
          browser.clickLaunchIcon('solidity').click('#autoCompile')
          .perform(function () {
            callback()
          })
        })
      })
    })
}

function initModules (browser, callback) {
  browser.click('#icon-panel div[title="pluginManager"]')
  .execute(function () {
    document.querySelector('div[title="pluginManager"]').scrollTop = document.querySelector('div[title="pluginManager"]').scrollHeight
  }, [], function () {
    browser.click('#pluginManager div[title="solidity"] button')
    .click('#pluginManager div[title="run transactions"] button')
    .click('#pluginManager div[title="solidity static analysis"] button')
    .click('#pluginManager div[title="debugger"] button')
    .click('#icon-panel div[title="file explorers"]')
    .perform(() => { callback() })
  })
}
