'use strict';

const Alexa = require('alexa-sdk');

const handlers = {
   'menu_today': function () {
      this.emit(':tell', 'hey joe');
   },
   'menu_date': function () {

   },
   'AMAZON.HelpIntent': function () {
      const speechOutput = this.t('HELP_MESSAGE');
      const reprompt = this.t('HELP_MESSAGE');
      this.emit(':ask', speechOutput, reprompt);
   },
   'AMAZON.CancelIntent': function () {
      this.emit(':tell', this.t('STOP_MESSAGE'));
   },
   'AMAZON.StopIntent': function () {
      this.emit(':tell', this.t('STOP_MESSAGE'));
   },
};

exports.handler = function (event, context) {
   const alexa = Alexa.handler(event, context);
   alexa.registerHandlers(handlers);
   alexa.execute();
};
