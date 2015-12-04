var htmlparser = require("htmlparser2"),
    rp = require('request-promise'),
    Promise = require('bluebird'),
    _ = require('lodash'),
    csv = require('fast-csv'),
    fs = Promise.promisifyAll(require('fs')),
    moment = require('moment'),
    DomUtils = require("domutils");

require('dotenv').load();

Promise.promisifyAll(htmlparser.DomHandler)

var cookie = process.env.SF_COOKIE;

var options = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.81 Safari/537.36',
        'cookie': cookie,
    }
};

function checkPurchased(script_id, steam_id) {
  return rp(
    _.extend({
      uri: 'https://scriptfodder.com/api/scripts/purchases/' + script_id + "?api_key=" + process.env.SF_APIKEY,
      method: 'GET',
    }, options )
  ).then(function(result) {
    var purchases = JSON.parse(result).purchases;
    return _.findWhere(purchases, {user_id: steam_id}) != undefined;
  });
}

function giveAccess(script_id, steam_id) {
  return rp(
    _.extend({
      uri: 'https://scriptfodder.com/dashboard/editscript/' + script_id + '/grant-access',
      method: 'POST',
      form: { steam_id: steam_id }
    }, options )
  ).then(function(result) {
    return result == '{"status": "success"}';
  });
}

exports.handler = function(event, context) {
  var ids = event.scripts.split(',');

  Promise.map(ids, function(id) {
    return checkPurchased(id, event.steam_id)
    .then(function(purchased) {
      if (purchased) {
        return [id, true];
      }
      return Promise.join(id, giveAccess(id, event.steam_id));
    });
  }).then(function(results) {
    context.succeed(_.zipObject(results));
  })
  .catch(function(e) {
    context.fail(e);
  });
}
