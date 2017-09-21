'use strict'

const Alexa = require('alexa-sdk')
const Moment = require('moment-timezone')
const _ = require('lodash')
const LunchMenu = require('./lunch_menu.json')

const handlers = {
   'menu_today': function () {
      const today = Moment.tz('America/Chicago').format('YYYY-MM-DD')
      this.emit(':tell', 'today is chicken patty wednesday' + today)
   },
   'menu_date': function () {
      console.log(this.event.request.intent.slots.time_utterance.value)
      this.emit(':tell', 'red bottom shoes ' + this.event.request.intent.slots.time_utterance.value)
   },
   'AMAZON.HelpIntent': function () {
      const speechOutput = this.t('HELP_MESSAGE')
      const reprompt = this.t('HELP_MESSAGE')
      this.emit(':ask', speechOutput, reprompt)
   },
   'AMAZON.CancelIntent': function () {
      this.emit(':tell', this.t('STOP_MESSAGE'))
   },
   'AMAZON.StopIntent': function () {
      this.emit(':tell', this.t('STOP_MESSAGE'))
   },
}

exports.handler = function (event, context) {
   const alexa = Alexa.handler(event, context)
   alexa.registerHandlers(handlers)
   alexa.execute()
}
