Template.configureLoginServiceDialogForYammer.siteUrl = function () {
  return Meteor.absoluteUrl();
};

Template.configureLoginServiceDialogForYammer.fields = function () {
  return [
    {property: 'clientId', label: 'Client ID'},
    {property: 'secret', label: 'Client Secret'}
  ];
};
