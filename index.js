'use strict'

const Alexa = require('alexa-sdk')
const Moment = require('moment-timezone')
const _ = require('lodash')
const LunchMenu = require('./lunch_menu.json')

const handlers = {
   'menu_today': function () {
      const today = Moment.tz('America/Chicago').format('YYYY-MM-DD')
      const lunch = _.get(LunchMenu, `${today}.menu`, 'No school lunch today, sorry!')
      this.emit(':tell', lunch)
   },
   'menu_date': function () {
      const date = this.event.request.intent.slots.time_utterance.value
      const lunch = _.get(LunchMenu, `${date}.menu`, 'No school lunch that day, sorry!')
      this.emit(':tell', lunch)
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
