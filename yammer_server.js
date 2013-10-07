Oauth.registerService('yammer', 2, null, function(query) {
  var response = getTokenResponse(query);

  var serviceData = {
    id: response.user.id,
    accessToken: response.access_token.token,
    expiresAt: response.access_token.expires_at
  };

  var fields = response.user;
  _.extend(serviceData, fields);

  return {
    serviceData: serviceData,
    options: {
      profile: { name: serviceData.full_name }
    }
  };
});

// checks whether a string parses as JSON
var isJSON = function (str) {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};

// Yammer returns user profile information here along with the access token
var getTokenResponse = function (query) {
  var config = ServiceConfiguration.configurations.findOne({service: 'yammer'});
  if (!config)
    throw new ServiceConfiguration.ConfigError("Service not configured");

  var responseContent;
  try {
    responseContent = Meteor.http.post(
      "https://www.yammer.com/oauth2/access_token.json", {
        params: {
          client_id: config.clientId,
          client_secret: config.secret,
          code: query.code,
          redirect_uri: Meteor.absoluteUrl("_oauth/yammer?close")
        }
      }).content;
  } catch (err) {
    throw new Error("Failed to complete OAuth handshake with Yammer. " + err.message);
  }

  // If 'responseContent' does not parse as JSON, it is an error.
  if (!isJSON(responseContent)) {
    throw new Error("Failed to complete OAuth handshake with Yammer. " + responseContent);
  }

  var response = JSON.parse(responseContent);

  if (!response.access_token.token) {
    throw new Error("Failed to complete OAuth handshake with Yammer " +
      "-- can't find access token in HTTP response. " + responseContent);
  }

  return response;
};

Yammer.retrieveCredential = function(credentialToken) {
  return Oauth.retrieveCredential(credentialToken);
};
