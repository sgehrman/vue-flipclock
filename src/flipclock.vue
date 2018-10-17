<template>
<div
  ref="flipclock"
  class="flip-clock"
/>
</template>

<script>
import FlipClock from './flipclock.js'

export default {
  props: {
    digit: Number,
    options: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      clock: null,
      convert: {
        days: 'hours',
        hours: 'minutes',
        minutes: 'seconds',
        seconds: 'last'
      }
    }
  },
  created() {
    this.$nextTick(() => {
      this.init(this.options)
    })
  },
  watch: {
    options: {
      handler(val) {
        this.reset(val)
      },
      deep: true
    },
    digit(val) {
      console.warn('deprecated. please use `options.digit` instead')
    }
  },
  methods: {
    init(options) {
      options = options || {}
      this.destroyClock()
      this.clock = new FlipClock(
        this.$refs.flipclock,
        options.digit !== undefined ? options.digit : this.digit,
        Object.assign({}, options, {
          autoStart: options.hasOwnProperty('autoStart') ?
            options.autoStart : true
        })
      )
      if (
        options.divider &&
        Object.prototype.toString.call(options.divider) === '[object Object]'
      ) {
        for (var key in options.divider) {
          var el = document.querySelector(
            `.flip-clock-divider.${this.convert[key]}`
          )
          if (el) {
            el.innerHTML = options.divider[key]
          } else if (this.convert[key] === 'last') {
            this.$refs.flipclock.appendChild(
              FlipClock.Base.createDom(
                `<span class="flip-clock-divider">${
                  options.divider[key]
                }</span>`
              )
            )
          }
        }
      }
      options.time && this.clock.setTime(options.time)
      options.time && this.clock.autoStart && this.clock.start()
    },
    instance() {
      return this.clock
    },
    trigger(event, params) {
      this.clock && this.clock[event] && this.clock[event](arguments.slice(1))
    },
    start(callback) {
      this.clock && this.clock.start(callback)
    },
    stop(callback) {
      this.clock && this.clock.stop(callback)
    },
    reset(options, callback) {
      if (typeof options === 'function') {
        callback = options
        options = null
      }
      this.clock && this.clock.reset(callback)
      if (options) {
        options.digit = options.digit !== undefined ? options.digit : 0
        this.init(options)
      }
    },
    increment() {
      this.clock && this.clock.increment()
    },
    decrement() {
      this.clock && this.clock.decrement()
    },
    loadClockFace(name, options) {
      this.clock && this.clock.loadClockFace(name, options)
    },
    loadLanguage(name) {
      this.clock && this.clock.loadLanguage(name)
    },
    setCountdown(value) {
      this.clock && this.clock.setCountdown(value)
    },
    getTime() {
      this.clock ? this.clock.getTime() : 0
    },
    setTime(value) {
      this.clock && this.clock.setTime(value)
    },
    setOptions(options) {
      this.clock && this.clock.setOptions(options)
    },
    destroyClock() {
      if (this.clock) {
        this.clock.stop()
        this.clock = null
      }
    }
  },
  beforeDestroy() {
    this.destroyClock()
  }
}
</script>

<style lang="scss">
@import './flipclock.scss';
</style>
