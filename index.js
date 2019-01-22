'use strict'

const Alexa = require('alexa-sdk')
const Moment = require('moment-timezone')
const _ = require('lodash')

const handlers = {
   'menu_date': function () {
      const time_stuff = getTimeStuff(this.event)
      this.emit(':tell', 'I dont know. How about you try to program me.')
   },
   'principal': function () {
      this.emit(':tell', `I don't know! <break time="1s"/> I'm too afraid to look her in the eye!`)
   },
   'officer_davis': function () {
      this.emit(':tell', 'A gigantic huge humungous wonderful man! <break time="1s" /> Yeah, he scares me too! Alexa is no match for Officer Davis.')
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

function getTimeStuff(event) {
   const today = Moment.tz('America/Chicago').format('YYYY-MM-DD')
   const date = _.get(event, 'request.intent.slots.time_utterance.value', today)
   const is_today = today === date
   const day_of_week = Moment.tz(date, 'America/Chicago').format('dddd')

   return {
      day_of_week: day_of_week,
      is_today: is_today,
      today: today,
      date: date,
   }
}

exports.handler = function (event, context) {
   const alexa = Alexa.handler(event, context)
   alexa.registerHandlers(handlers)
   alexa.execute()
}
