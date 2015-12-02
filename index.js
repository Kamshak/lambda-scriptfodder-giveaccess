var htmlparser = require("htmlparser2"),
    rp = require('request-promise'),
    Promise = require('bluebird'),
    _ = require('lodash'),
    csv = require('fast-csv'),
    fs = Promise.promisifyAll(require('fs')),
    moment = require('moment'),
    DomUtils = require("domutils");

Promise.promisifyAll(htmlparser.DomHandler)

var cookie = process.env.SF_COOKIE;

var options = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.81 Safari/537.36',
        'cookie': cookie,
    }
};

function giveAccess(script_id, steam_id) {
  return rp(
    _.extend({
      uri: 'https://scriptfodder.com/dashboard/editscript/' + script_id + '/grant-access',
      method: 'POST',
      form: { steam_id: steam_id }
    }, options )
  );
}

exports.handler = function(event, context) {
  giveAccess(event.script_id, event.steam_id)
  .then(function() {
    context.succeed(event.script_id);
  })
  .catch(function(e) {
    console.log(e);
    context.fail(e);
  });
}
