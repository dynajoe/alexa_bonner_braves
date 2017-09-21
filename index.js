'use strict'

const Alexa = require('alexa-sdk')
const Moment = require('moment-timezone')
const _ = require('lodash')
const LunchMenu = require('./lunch_menu.json')
const Jokes = require('./jokes.json')

const handlers = {
   'menu_date': function () {
      const random_joke = Jokes[_.random(0, Jokes.length - 1)]
      const date = this.event.request.intent.slots.time_utterance.value
      const lunch = _.get(LunchMenu, `${date}.menu`)
      const is_today = Moment.tz('America/Chicago').format('YYYY-MM-DD') === date
      const day_of_week = Moment.tz(date, 'America/Chicago').format('dddd')

      if (!_.isNil(lunch)) {
         if (day_of_week === 'Wednesday') {
            this.emit(':tell', 'I think you know what is for lunch on Wednesday! Do I really need to tell you?')
         } else {
            this.emit(':tell', `${is_today ? 'Today' : day_of_week} you are having ${lunch}. ${random_joke}`)
         }
      } else {
         this.emit(':tell', `There is no lunch on ${day_of_week}!`)
      }
   },
   'principal': function () {
      this.emit(':tell', `I don't know! <break time="1s"/> I'm too afraid to look her in the eye!`)
   },
   'officer_davis': function () {
      this.emit(':tell', 'A gigantic huge humungous wonderful man!')
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
