// Request Yammer credentials for the user
// @param options {optional}
// @param credentialRequestCompleteCallback {Function} Callback function to call on
//   completion. Takes one argument, credentialToken on success, or Error on
//   error.
Yammer.requestCredential = function (options, credentialRequestCompleteCallback) {
  // support both (options, callback) and (callback).
  if (!credentialRequestCompleteCallback && typeof options === 'function') {
    credentialRequestCompleteCallback = options;
    options = {};
  }

  var config = ServiceConfiguration.configurations.findOne({service: 'yammer'});
  if (!config) {
    credentialRequestCompleteCallback && credentialRequestCompleteCallback(new ServiceConfiguration.ConfigError("Service not configured"));
    return;
  }

  var credentialToken = Random.id();

  var scope = [];
  if (options && options.requestPermissions) {
    scope = options.requestPermissions.join('+');
  }

  var loginUrl =
        'https://www.yammer.com/dialog/oauth' +
        '?client_id=' + config.clientId +
        '&redirect_uri=' + encodeURIComponent(Meteor.absoluteUrl('_oauth/yammer?close')) +
        '&state=' + credentialToken;

  Oauth.initiateLogin(credentialToken, loginUrl, credentialRequestCompleteCallback);
};
