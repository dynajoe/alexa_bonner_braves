'use strict'

const Alexa = require('alexa-sdk')
const Moment = require('moment-timezone')
const _ = require('lodash')
const LunchMenu = require('./lunch_menu.json')
const Jokes = require('./jokes.json')

const handlers = {
   'menu_date': function () {
      const today = Moment.tz('America/Chicago').format('YYYY-MM-DD')
      const random_joke = Jokes[_.random(0, Jokes.length - 1)]
      const date = _.get(this.event, 'request.intent.slots.time_utterance.value', today)
      const lunch = _.get(LunchMenu, `${date}.menu`)
      const is_today = today === date
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
   'Unhandled': function () {
      this.emit(':tell', `Sorry! That didn't make any sense to me kiddo!`)
   },
   'AMAZON.CancelIntent': function () {
      this.emit(':tell', 'cancel')
   },
   'AMAZON.StopIntent': function () {
      this.emit(':tell', 'stop')
   },
}

exports.handler = function (event, context) {
   const alexa = Alexa.handler(event, context)
   alexa.registerHandlers(handlers)
   alexa.execute()
}
