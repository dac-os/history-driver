var VError, httpRequest, async, uri;
VError = require('verror');
httpRequest = require('request');
async = require('async');

exports.configUri = function (newUri) {
  'use strict';

  uri = newUri;
};

function downloadPages(url, next) {
  'use strict';

  var lastPage, results, lastLength;
  results = [];
  lastLength = 0;
  lastPage = 0;
  async.doWhilst(function (next) {
    return httpRequest({
      'url'  : uri + url,
      'json' : true,
      'qs'   : {'page' : lastPage}
    }, function (error, res, body) {
      if (error) {
        return next(error);
      }
      results = results.concat(body);
      lastLength = body.length;
      lastPage++;
      return next();
    });
  }, function () {
    return lastLength > 0;
  }, function (error) {
    return next(error, results);
  });
}

exports.histories = function (user, next) {
  'use strict';

  return downloadPages('/users/' + user + '/histories', next);
};

exports.history = function (user, id, next) {
  'use strict';

  return httpRequest({
    'url'  : uri + '/users/' + user + '/histories/' + id,
    'json' : true
  }, function (error, res, body) {
    next(error, body);
  });
};

exports.currentHistory = function (user, next) {
  'use strict';
  var currentHistory;

  this.histories(user, function (error, histories) {
    if (error) {
      error = new VError(error, 'Error when trying to get the history');
      return next(error);
    }

    if (!histories) {
      return next(false);
    }

    currentHistory = histories.sort(function (a, b) {
      return a.year - b.year;
    }).pop();

    if (!currentHistory) {
      error = new VError(error, 'Current history not found');
      return next(error);
    }

    next(error, currentHistory);
  }.bind(this));
};

exports.disciplines = function (user, history, next) {
  'use strict';

  return downloadPages('/users/' + user + '/histories/' + history + '/disciplines', next);
};

exports.discipline = function (user, history, id, next) {
  'use strict';

  return httpRequest({
    'url'  : uri + '/users/' + user + '/histories/' + history + '/disciplines/' + id,
    'json' : true
  }, function (error, res, body) {
    next(error, body);
  });
};