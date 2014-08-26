var VError, request, async, uri;

VError = require('verror');
request = require('request');
async = require('async');

/**
 * @method
 * @summary Setups default base uri
 *
 * @param {String} newUri
 */
exports.configUri = function (newUri) {
  'use strict';
  
  uri = newUri;
};

exports.histories = function (user, page, next) {
  'use strict';

  return httpRequest(uri + '/users/' + user + '/histories?page=' + page, function (error, res, body) {
    var histories;
    if (error) {
      error = new VError(error, 'error requesting user "$s" histories', user);
      return next(error);
    }
    try {
      histories = JSON.parse(body);
      return next(null, histories);
    } catch (error) {
      error = new VError(error, 'error parsing user "$s" histories to json', user);
      return next(error);
    }
  });
};

exports.history = function (user, id, next) {
  'use strict';

  return httpRequest(uri + '/users/' + user + '/histories/' + id, function (error, res, body) {
    var history;
    if (error) {
      error = new VError(error, 'error requesting history "$s"', id);
      return next(error);
    }
    try {
      history = JSON.parse(body);
      return next(null, history);
    } catch (error) {
      error = new VError(error, 'error parsing history "$s" to json', id);
      return next(error);
    }
  });
};

exports.disciplines = function (user, history, page, next) {
  'use strict';

  return httpRequest(uri + '/users/' + user + '/histories/' + history + '/disciplines?page=' + page, function (error, res, body) {
    var disciplines;
    if (error) {
      error = new VError(error, 'error requesting user "$s" disciplines', user);
      return next(error);
    }
    try {
      disciplines = JSON.parse(body);
      return next(null, disciplines);
    } catch (error) {
      error = new VError(error, 'error parsing user "$s" disciplines to json', user);
      return next(error);
    }
  });
};

exports.discipline = function (user, history, id, next) {
  'use strict';

  return httpRequest(uri + '/users/' + user + '/histories/' + history + '/disciplines/' + id, function (error, res, body) {
    var discipline;
    if (error) {
      error = new VError(error, 'error requesting discipline "$s"', id);
      return next(error);
    }
    try {
      discipline = JSON.parse(body);
      return next(null, discipline);
    } catch (error) {
      error = new VError(error, 'error parsing discipline "$s" to json', id);
      return next(error);
    }
  });
};