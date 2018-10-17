let Base = function() {
  // dummy
}

Base.createDom = function(el) {
  if (typeof el !== 'string') return el
  let span = document.createElement('span')
  span.innerHTML = el

  return span.childNodes[0]
}

Base.insertBefore = function(newEl, el) {
  newEl = typeof newEl === 'string' ? Base.createDom(newEl) : newEl
  el = typeof el === 'string' ? Base.createDom(el) : el
  el.parentNode.insertBefore(newEl, el)
}

Base.extend = function(_instance, _static) {
  let extend = Base.prototype.extend

  // build the prototype
  Base._prototyping = true

  let proto = new this()

  extend.call(proto, _instance)

  proto.base = function() {
    // call this method from any other method to invoke that method's ancestor
  }

  delete Base._prototyping

  // create the wrapper for the constructor function
  //let constructor = proto.constructor.valueOf(); //-dean
  let constructor = proto.constructor
  let klass = proto.constructor = function() {
    if (!Base._prototyping) {
      if (this._constructing || this.constructor === klass) {
        // instantiation
        this._constructing = true
        constructor.apply(this, arguments)
        delete this._constructing
      } else if (arguments[0] !== null) {
        // casting
        return (arguments[0].extend || extend).call(arguments[0], proto)
      }
    }
  }

  // build the class interface
  klass.ancestor = this
  klass.extend = this.extend
  klass.createDom = this.createDom
  klass.insertBefore = this.insertBefore
  klass.forEach = this.forEach
  klass.implement = this.implement
  klass.prototype = proto
  klass.toString = this.toString
  klass.valueOf = function(type) {
    //return (type === "object") ? klass : constructor; //-dean
    return type === 'object' ? klass : constructor.valueOf()
  }
  extend.call(klass, _static)
  // class initialisation
  if (typeof klass.init === 'function') klass.init()
  return klass
}

Base.prototype = {
  extend: function(source, value) {
    if (arguments.length > 1) {
      // extending with a name/value pair
      let ancestor = this[source]
      if (
        ancestor &&
        typeof value === 'function' && // overriding a method?
        // the valueOf() comparison is to avoid circular references
        (!ancestor.valueOf || ancestor.valueOf() !== value.valueOf()) &&
        /\bbase\b/.test(value)
      ) {
        // get the underlying method
        let method = value.valueOf()
        // override
        value = function() {
          let previous = this.base || Base.prototype.base
          this.base = ancestor
          let returnValue = method.apply(this, arguments)
          this.base = previous
          return returnValue
        }
        // point to the underlying method
        value.valueOf = function(type) {
          return type === 'object' ? value : method
        }
        value.toString = Base.toString
      }
      this[source] = value
    } else if (source) {
      // extending with an object literal
      let extend = Base.prototype.extend
      // if this object has a customised extend method then use it
      if (!Base._prototyping && typeof this !== 'function') {
        extend = this.extend || extend
      }
      let proto = {
        toSource: null
      }
      // do the "toString" and other methods manually
      let hidden = ['constructor', 'toString', 'valueOf']
      // if we are prototyping then include the constructor
      let i = Base._prototyping ? 0 : 1
      while (key = hidden[i++]) {
        if (source[key] !== proto[key]) {
          extend.call(this, key, source[key])
        }
      }
      // copy each of the source object's properties to this object
      for (let key in source) {
        if (!proto[key]) extend.call(this, key, source[key])
      }
    }
    return this
  }
}

// initialise
Base = Base.extend({
  constructor: function() {
    this.extend(arguments[0])
  }
}, {
  ancestor: Object,
  version: '1.1',

  forEach: function(object, block, context) {
    for (let key in object) {
      if (this.prototype[key] === undefined) {
        block.call(context, object[key], key, object)
      }
    }
  },

  implement: function() {
    for (let i = 0; i < arguments.length; i++) {
      if (typeof arguments[i] === 'function') {
        // if it's a function, call it
        arguments[i](this.prototype)
      } else {
        // add the interface using the extend method
        this.prototype.extend(arguments[i])
      }
    }
    return this
  },

  toString: function() {
    return String(this.valueOf())
  }
})

let FlipClock = function(obj, digit, options) {
  if (digit instanceof Object && digit instanceof Date === false) {
    options = digit
    digit = 0
  }

  return new FlipClock.Factory(obj, digit, options)
}

FlipClock.Lang = {}

FlipClock.Base = Base.extend({
  buildDate: '2018-10-18',
  version: '1.7.7',

  constructor: function(_default, options) {
    if (typeof _default !== 'object') {
      _default = {}
    }
    if (typeof options !== 'object') {
      options = {}
    }
    this.setOptions(Object.assign({}, _default, options))
  },

  callback: function(method) {
    if (typeof method === 'function') {
      let args = []

      for (let x = 1; x <= arguments.length; x++) {
        if (arguments[x]) {
          args.push(arguments[x])
        }
      }

      method.apply(this, args)
    }
  },

  log: function(str) {
    if (window.console && console.log) {
      console.log(str)
    }
  },

  getOption: function(index) {
    if (this[index]) {
      return this[index]
    }
    return false
  },

  getOptions: function() {
    return this
  },

  setOption: function(index, value) {
    this[index] = value
  },

  setOptions: function(options) {
    for (let key in options) {
      if (typeof options[key] !== 'undefined') {
        this.setOption(key, options[key])
      }
    }
  }
})

FlipClock.Face = FlipClock.Base.extend({
  autoStart: true,
  dividers: [],
  dot: true,
  factory: false,
  lists: [],

  constructor: function(factory, options) {
    this.dividers = []
    this.lists = []
    this.base(options)
    this.factory = factory
  },

  build: function() {
    if (this.autoStart) {
      this.start()
    }
  },

  createDivider: function() {
    let dots = [
      '<span class="' + this.factory.classes.dot + ' top"></span>',
      '<span class="' + this.factory.classes.dot + ' bottom"></span>'
    ].join('')

    let html = [
      '<span class="' + this.factory.classes.divider + '">',
      dots,
      '</span>'
    ]

    let $html = Base.createDom(html.join(''))

    this.dividers.push($html)

    return $html
  },

  createList: function(digit, options, parentNode) {
    if (typeof digit === 'object') {
      options = digit
      digit = 0
    }

    let obj = new FlipClock.List(this.factory, digit, options, parentNode)

    this.lists.push(obj)

    return obj
  },

  reset: function() {
    this.factory.time = new FlipClock.Time(
      this.factory,
      this.factory.original ? Math.round(this.factory.original) : 0, {})

    this.flip(this.factory.original, false)
  },

  appendDigitToClock: function(obj) {
    // obj.$el.append(false);
  },

  addDigit: function(digit) {
    let obj = this.createList(digit, {
      classes: {
        active: this.factory.classes.active,
        before: this.factory.classes.before,
        flip: this.factory.classes.flip
      }
    })

    this.appendDigitToClock(obj)
  },

  start: function() {},
  stop: function() {},

  autoIncrement: function() {
    if (!this.factory.countdown) {
      this.increment()
    } else {
      this.decrement()
    }
  },

  increment: function() {
    this.factory.time.addSecond()
  },

  decrement: function() {
    if (this.factory.time.getTimeSeconds() === 0) {
      this.factory.stop()
    } else {
      this.factory.time.subSecond()
    }
  },

  flip: function(time, doNotAddPlayClass) {
    let t = this

    Array.isArray(time) && time.forEach(function(digit, i) {
      let list = t.lists[i]

      if (list) {
        if (!doNotAddPlayClass && digit !== list.digit) {
          list.play()
        }

        list.select(digit)
      } else {
        t.addDigit(digit)
      }
    })
  }
})

FlipClock.Factory = FlipClock.Base.extend({
  animationRate: 1000,
  autoStart: true,
  callbacks: {
    destroy: false,
    create: false,
    init: false,
    interval: false,
    start: false,
    stop: false,
    reset: false
  },

  classes: {
    active: 'flip-clock-active',
    before: 'flip-clock-before',
    divider: 'flip-clock-divider',
    dot: 'flip-clock-dot',
    label: 'flip-clock-label',
    flip: 'flip',
    play: 'play',
    wrapper: 'flip-clock-wrapper'
  },
  clockFace: 'DailyCounter',
  countdown: false,
  defaultClockFace: 'DailyCounter',
  defaultLanguage: 'english',
  $el: false,
  face: true,
  lang: false,
  language: 'english',
  original: false,
  running: false,
  time: false,
  timer: false,

  constructor: function(obj, digit, options) {
    if (!options) {
      options = {}
    }

    this.lists = []
    this.running = false
    this.base(options)

    this.$el = this.base.createDom(obj)
    this.$el.classList.add(this.classes.wrapper)

    this.original =
      digit instanceof Date ? digit : digit ? Math.round(digit) : 0

    this.time = new FlipClock.Time(this, this.original, {
      animationRate: this.animationRate
    })

    this.timer = new FlipClock.Timer(this, options)

    this.loadLanguage(this.language)

    this.loadClockFace(this.clockFace, options)

    if (this.autoStart) {
      this.start()
    }
  },

  loadClockFace: function(name, options) {
    let face,
      suffix = 'Face',
      hasStopped = false

    name = name.ucfirst() + suffix

    if (this.face.stop) {
      this.stop()
      hasStopped = true
    }

    this.$el.innerHTML = ''

    if (FlipClock[name]) {
      face = new FlipClock[name](this, options)
    } else {
      face = new FlipClock[this.defaultClockFace + suffix](this, options)
    }

    face.build()

    this.face = face

    if (hasStopped) {
      this.start()
    }

    return this.face
  },

  loadLanguage: function(name) {
    let lang

    if (FlipClock.Lang[name.ucfirst()]) {
      lang = FlipClock.Lang[name.ucfirst()]
    } else if (FlipClock.Lang[name]) {
      lang = FlipClock.Lang[name]
    } else {
      lang = FlipClock.Lang[this.defaultLanguage]
    }

    return (this.lang = lang)
  },

  localize: function(index, obj) {
    let lang = this.lang

    if (!index) {
      return null
    }

    let lindex = index.toLowerCase()

    if (typeof obj === 'object') {
      lang = obj
    }

    if (lang && lang[lindex]) {
      return lang[lindex]
    }

    return index
  },

  start: function(callback) {
    let t = this

    if (!t.running && (!t.countdown || t.countdown && t.time.time > 0)) {
      t.face.start(t.time)
      t.timer.start(function() {
        t.flip()

        if (typeof callback === 'function') {
          callback()
        }
      })
    } else {
      t.log('Trying to start timer when countdown already at 0')
    }
  },

  stop: function(callback) {
    this.face.stop()
    this.timer.stop(callback)

    for (let x in this.lists) {
      if (this.lists.hasOwnProperty(x)) {
        this.lists[x].stop()
      }
    }
  },

  reset: function(callback) {
    this.timer.reset(callback)
    this.face.reset()
  },

  setTime: function(time) {
    this.time.time = time
    this.flip(true)
  },

  getTime: function(time) {
    return this.time
  },

  setCountdown: function(value) {
    let running = this.running

    this.countdown = Boolean(value)

    if (running) {
      this.stop()
      this.start()
    }
  },

  flip: function(doNotAddPlayClass) {
    this.face.flip(false, doNotAddPlayClass)
  }
})

FlipClock.List = FlipClock.Base.extend({
  digit: 0,
  classes: {
    active: 'flip-clock-active',
    before: 'flip-clock-before',
    flip: 'flip'
  },

  factory: false,
  $el: false,
  items: [],
  lastDigit: 0,

  constructor: function(factory, digit, options, parentEl = null) {
    this.factory = factory
    this.digit = digit
    this.lastDigit = digit
    this.$el = this.createList()

    if (digit > 0) {
      this.select(digit)
    }

    if (parentEl) {
      parentEl.appendChild(this.$el)
    } else {
      this.factory.$el.appendChild(this.$el)
    }
  },

  select: function(digit) {
    if (typeof digit === 'undefined') {
      digit = this.digit
    } else {
      this.digit = digit
    }

    if (this.digit !== this.lastDigit) {
      let $delete = this.$el.querySelector('.' + this.classes.before)
      $delete && $delete.classList.remove(this.classes.before)

      let $active = this.$el.querySelector('.' + this.classes.active)
      $active.classList.remove(this.classes.active)
      $active.classList.add(this.classes.before)

      this.appendListItem(this.classes.active, this.digit)

      $delete && $delete.remove()

      this.lastDigit = this.digit
    }
  },

  play: function() {
    this.$el.classList.add(this.factory.classes.play)
  },

  stop: function() {
    let t = this

    setTimeout(function() {
      t.$el.classList.remove(t.factory.classes.play)
    }, this.factory.timer.interval)
  },

  createListItem: function(css, value) {
    return [
      '<li class="' + (css ? css : '') + '">',
      '<a href="#">',
      '<div class="up">',
      '<div class="shadow"></div>',
      '<div class="inn">' + (value ? value : '') + '</div>',
      '</div>',
      '<div class="down">',
      '<div class="shadow"></div>',
      '<div class="inn">' + (value ? value : '') + '</div>',
      '</div>',
      '</a>',
      '</li>'
    ].join('')
  },

  appendListItem: function(css, value) {
    this.$el.appendChild(Base.createDom(this.createListItem(css, value)))
  },

  createList: function() {
    let lastDigit = this.getPrevDigit() ? this.getPrevDigit() : this.digit

    return Base.createDom(
      [
        '<ul class="' +
        this.classes.flip +
        ' ' +
        (this.factory.running ? this.factory.classes.play : '') +
        '">',
        this.createListItem(this.classes.before, lastDigit),
        this.createListItem(this.classes.active, this.digit),
        '</ul>'
      ].join('')
    )
  },

  getNextDigit: function() {
    return this.digit === 9 ? 0 : this.digit + 1
  },

  getPrevDigit: function() {
    return this.digit === 0 ? 9 : this.digit - 1
  }
})

String.prototype.ucfirst = function() {
  return this.substr(0, 1).toUpperCase() + this.substr(1)
}

FlipClock.Time = FlipClock.Base.extend({
  time: 0,
  factory: false,

  constructor: function(factory, time, options) {
    if (typeof options !== 'object') {
      options = {}
    }

    this.base(options)
    this.factory = factory

    if (time) {
      this.time = time
    }
  },

  convertDigitsToArray: function(str) {
    let data = []

    str = str.toString()

    for (let x = 0; x < str.length; x++) {
      if (str[x].match(/^\d*$/g)) {
        data.push(str[x])
      }
    }

    return data
  },

  digit: function(i) {
    let timeStr = this.toString()
    let length = timeStr.length

    if (timeStr[length - i]) {
      return timeStr[length - i]
    }

    return false
  },

  digitize: function(obj, clumps = false) {
    let data = []

    obj.forEach(function(value, i) {
      let dest = data

      if (clumps) {
        dest = []
      }

      value = value.toString()

      if (value.length === 1) {
        value = '0' + value
      }

      for (let x = 0; x < value.length; x++) {
        dest.push(value.charAt(x))
      }

      if (clumps) {
        data.push(dest)
      }
    })

    return data
  },

  getDateObject: function() {
    if (this.time instanceof Date) {
      return this.time
    }

    return new Date(new Date().getTime() + this.getTimeSeconds() * 1000)
  },

  getDayCounter: function(clumps = false) {
    let digits = [this.getDays(), this.getHours(true), this.getMinutes(true), this.getSeconds(true)]

    return {
      names: [this.factory.localize('Days'), this.factory.localize('Hours'), this.factory.localize('Minutes'), this.factory.localize('Seconds')],
      digits: this.digitize(digits, clumps)
    }
  },

  getDays: function(mod) {
    let days = this.getTimeSeconds() / 60 / 60 / 24

    if (mod) {
      days = days % 7
    }

    return Math.floor(days)
  },

  getHourCounter: function() {
    let obj = this.digitize([
      this.getHours(),
      this.getMinutes(true),
      this.getSeconds(true)
    ])

    return obj
  },

  getHourly: function() {
    return this.getHourCounter()
  },

  getHours: function(mod) {
    let hours = this.getTimeSeconds() / 60 / 60

    if (mod) {
      hours = hours % 24
    }

    return Math.floor(hours)
  },

  getMilitaryTime: function(date) {
    if (!date) {
      date = this.getDateObject()
    }

    let data = [date.getHours(), date.getMinutes(), date.getSeconds()]

    return this.digitize(data)
  },

  getMinutes: function(mod) {
    let minutes = this.getTimeSeconds() / 60

    if (mod) {
      minutes = minutes % 60
    }

    return Math.floor(minutes)
  },

  getMinuteCounter: function() {
    let obj = this.digitize([this.getMinutes(), this.getSeconds(true)])

    return obj
  },

  getTimeSeconds: function(date) {
    if (!date) {
      date = new Date()
    }

    if (this.time instanceof Date) {
      if (this.factory.countdown) {
        return Math.max(this.time.getTime() / 1000 - date.getTime() / 1000, 0)
      }
      return date.getTime() / 1000 - this.time.getTime() / 1000
    }
    return this.time
  },

  getTime: function(date) {
    if (!date) {
      date = this.getDateObject()
    }

    let hours = date.getHours()
    let data = [
      hours > 12 ? hours - 12 : hours === 0 ? 12 : hours,
      date.getMinutes()
    ]

    data.push(date.getSeconds())

    return this.digitize(data)
  },

  getSeconds: function(mod) {
    let seconds = this.getTimeSeconds()

    if (mod) {
      if (seconds === 60) {
        seconds = 0
      } else {
        seconds = seconds % 60
      }
    }

    return Math.ceil(seconds)
  },

  getWeeks: function(mod) {
    let weeks = this.getTimeSeconds() / 60 / 60 / 24 / 7

    if (mod) {
      weeks = weeks % 52
    }

    return Math.floor(weeks)
  },

  removeLeadingZeros: function(totalDigits, digits) {
    let total = 0
    let newArray = []
    digits.forEach(function(digit, i) {
      if (i < totalDigits) {
        total += parseInt(digits[i], 10)
      } else {
        newArray.push(digits[i])
      }
    })

    if (total === 0) {
      return newArray
    }

    return digits
  },

  addSeconds: function(x) {
    if (this.time instanceof Date) {
      this.time.setSeconds(this.time.getSeconds() + x)
    } else {
      this.time += x
    }
  },

  addSecond: function() {
    this.addSeconds(1)
  },

  subSeconds: function(x) {
    if (this.time instanceof Date) {
      this.time.setSeconds(this.time.getSeconds() - x)
    } else {
      this.time -= x
    }
  },

  subSecond: function() {
    this.subSeconds(1)
  },

  toString: function() {
    return this.getTimeSeconds().toString()
  }
})

FlipClock.Timer = FlipClock.Base.extend({
  callbacks: {
    destroy: false,
    create: false,
    init: false,
    interval: false,
    start: false,
    stop: false,
    reset: false
  },
  count: 0,
  factory: false,
  interval: 1000,
  animationRate: 1000,

  constructor: function(factory, options) {
    this.base(options)
    this.factory = factory
    this.callback(this.callbacks.init)
    this.callback(this.callbacks.create)
  },

  getElapsed: function() {
    return this.count * this.interval
  },

  getElapsedTime: function() {
    return new Date(this.time + this.getElapsed())
  },

  reset: function(callback) {
    clearInterval(this.timer)
    this.count = 0
    this._setInterval(callback)
    this.callback(this.callbacks.reset)
  },

  start: function(callback) {
    this.factory.running = true
    this._createTimer(callback)
    this.callback(this.callbacks.start)
  },

  stop: function(callback) {
    this.factory.running = false
    this._clearInterval(callback)
    this.callback(this.callbacks.stop)
    this.callback(callback)
  },

  _clearInterval: function() {
    clearInterval(this.timer)
  },

  _createTimer: function(callback) {
    this._setInterval(callback)
  },

  _destroyTimer: function(callback) {
    this._clearInterval()
    this.timer = false
    this.callback(callback)
    this.callback(this.callbacks.destroy)
  },

  _interval: function(callback) {
    this.callback(this.callbacks.interval)
    this.callback(callback)
    this.count++
  },

  _setInterval: function(callback) {
    let t = this

    t._interval(callback)

    t.timer = setInterval(function() {
      t._interval(callback)
    }, this.interval)
  }
})

FlipClock.DailyCounterFace = FlipClock.Face.extend({
  constructor: function(factory, options) {
    this.base(factory, options)
  },

  build: function(unusedTime) {
    let t = this
    let children = this.factory.$el.querySelectorAll('ul')

    const items = this.factory.time.getDayCounter(true)
    const time = items.digits

    if (time.length > children.length) {
      time.forEach((clump, i) => {
        let fullWrap = this.factory.$el.appendChild(Base.createDom('<div style="display: flex;"></div>'))

        if (i !== 0) {
          fullWrap.appendChild(this.createDivider())
        }

        let wrap = fullWrap.appendChild(Base.createDom('<div style="display: flex; flex-direction: column;"></div>'))
        const parent = wrap.appendChild(Base.createDom('<div style="display: flex;"></div>'))
        wrap.appendChild(Base.createDom('<div class="' + this.factory.classes.label + '">' + items.names[i] + '</div>'))

        clump.forEach(function(digit, i) {
          t.createList(digit, {}, parent)
        })
      })
    }

    this.base()
  },

  flip: function(time, doNotAddPlayClass) {
    if (!time) {
      time = this.factory.time.getDayCounter().digits
    }

    this.autoIncrement()

    this.base(time, doNotAddPlayClass)
  }
})

FlipClock.Lang.Arabic = {
  years: 'سنوات',
  months: 'شهور',
  days: 'أيام',
  hours: 'ساعات',
  minutes: 'دقائق',
  seconds: 'ثواني'
}

/* Create various aliases for convenience */

FlipClock.Lang['ar'] = FlipClock.Lang.Arabic
FlipClock.Lang['ar-ar'] = FlipClock.Lang.Arabic
FlipClock.Lang['arabic'] = FlipClock.Lang.Arabic
/**
 * FlipClock Danish Language Pack
 *
 * This class will used to translate tokens into the Danish language.
 *
 */

FlipClock.Lang.Danish = {
  years: 'År',
  months: 'Måneder',
  days: 'Dage',
  hours: 'Timer',
  minutes: 'Minutter',
  seconds: 'Sekunder'
}

/* Create various aliases for convenience */

FlipClock.Lang['da'] = FlipClock.Lang.Danish
FlipClock.Lang['da-dk'] = FlipClock.Lang.Danish
FlipClock.Lang['danish'] = FlipClock.Lang.Danish
/**
 * FlipClock German Language Pack
 *
 * This class will used to translate tokens into the German language.
 *
 */

FlipClock.Lang.German = {
  years: 'Jahre',
  months: 'Monate',
  days: 'Tage',
  hours: 'Stunden',
  minutes: 'Minuten',
  seconds: 'Sekunden'
}

/* Create various aliases for convenience */

FlipClock.Lang['de'] = FlipClock.Lang.German
FlipClock.Lang['de-de'] = FlipClock.Lang.German
FlipClock.Lang['german'] = FlipClock.Lang.German
/**
 * FlipClock English Language Pack
 *
 * This class will used to translate tokens into the English language.
 *
 */

FlipClock.Lang.English = {
  years: 'Years',
  months: 'Months',
  days: 'Days',
  hours: 'Hours',
  minutes: 'Minutes',
  seconds: 'Seconds'
}

/* Create various aliases for convenience */

FlipClock.Lang['en'] = FlipClock.Lang.English
FlipClock.Lang['en-us'] = FlipClock.Lang.English
FlipClock.Lang['english'] = FlipClock.Lang.English
/**
 * FlipClock Spanish Language Pack
 *
 * This class will used to translate tokens into the Spanish language.
 *
 */

FlipClock.Lang.Spanish = {
  years: 'Años',
  months: 'Meses',
  days: 'Días',
  hours: 'Horas',
  minutes: 'Minutos',
  seconds: 'Segundos'
}

/* Create various aliases for convenience */

FlipClock.Lang['es'] = FlipClock.Lang.Spanish
FlipClock.Lang['es-es'] = FlipClock.Lang.Spanish
FlipClock.Lang['spanish'] = FlipClock.Lang.Spanish
/**
 * FlipClock Finnish Language Pack
 *
 * This class will used to translate tokens into the Finnish language.
 *
 */

FlipClock.Lang.Finnish = {
  years: 'Vuotta',
  months: 'Kuukautta',
  days: 'Päivää',
  hours: 'Tuntia',
  minutes: 'Minuuttia',
  seconds: 'Sekuntia'
}

/* Create various aliases for convenience */

FlipClock.Lang['fi'] = FlipClock.Lang.Finnish
FlipClock.Lang['fi-fi'] = FlipClock.Lang.Finnish
FlipClock.Lang['finnish'] = FlipClock.Lang.Finnish
/**
 * FlipClock Canadian French Language Pack
 *
 * This class will used to translate tokens into the Canadian French language.
 *
 */

FlipClock.Lang.French = {
  years: 'Ans',
  months: 'Mois',
  days: 'Jours',
  hours: 'Heures',
  minutes: 'Minutes',
  seconds: 'Secondes'
}

/* Create various aliases for convenience */

FlipClock.Lang['fr'] = FlipClock.Lang.French
FlipClock.Lang['fr-ca'] = FlipClock.Lang.French
FlipClock.Lang['french'] = FlipClock.Lang.French
/**
 * FlipClock Italian Language Pack
 *
 * This class will used to translate tokens into the Italian language.
 *
 */

FlipClock.Lang.Italian = {
  years: 'Anni',
  months: 'Mesi',
  days: 'Giorni',
  hours: 'Ore',
  minutes: 'Minuti',
  seconds: 'Secondi'
}

/* Create various aliases for convenience */

FlipClock.Lang['it'] = FlipClock.Lang.Italian
FlipClock.Lang['it-it'] = FlipClock.Lang.Italian
FlipClock.Lang['italian'] = FlipClock.Lang.Italian
/**
 * FlipClock Latvian Language Pack
 *
 * This class will used to translate tokens into the Latvian language.
 *
 */

FlipClock.Lang.Latvian = {
  years: 'Gadi',
  months: 'Mēneši',
  days: 'Dienas',
  hours: 'Stundas',
  minutes: 'Minūtes',
  seconds: 'Sekundes'
}

/* Create various aliases for convenience */

FlipClock.Lang['lv'] = FlipClock.Lang.Latvian
FlipClock.Lang['lv-lv'] = FlipClock.Lang.Latvian
FlipClock.Lang['latvian'] = FlipClock.Lang.Latvian
/**
 * FlipClock Dutch Language Pack
 *
 * This class will used to translate tokens into the Dutch language.
 */

FlipClock.Lang.Dutch = {
  years: 'Jaren',
  months: 'Maanden',
  days: 'Dagen',
  hours: 'Uren',
  minutes: 'Minuten',
  seconds: 'Seconden'
}

/* Create various aliases for convenience */

FlipClock.Lang['nl'] = FlipClock.Lang.Dutch
FlipClock.Lang['nl-be'] = FlipClock.Lang.Dutch
FlipClock.Lang['dutch'] = FlipClock.Lang.Dutch
/**
 * FlipClock Norwegian-Bokmål Language Pack
 *
 * This class will used to translate tokens into the Norwegian language.
 *
 */

FlipClock.Lang.Norwegian = {
  years: 'År',
  months: 'Måneder',
  days: 'Dager',
  hours: 'Timer',
  minutes: 'Minutter',
  seconds: 'Sekunder'
}

/* Create various aliases for convenience */

FlipClock.Lang['no'] = FlipClock.Lang.Norwegian
FlipClock.Lang['nb'] = FlipClock.Lang.Norwegian
FlipClock.Lang['no-nb'] = FlipClock.Lang.Norwegian
FlipClock.Lang['norwegian'] = FlipClock.Lang.Norwegian
/**
 * FlipClock Portuguese Language Pack
 *
 * This class will used to translate tokens into the Portuguese language.
 *
 */

FlipClock.Lang.Portuguese = {
  years: 'Anos',
  months: 'Meses',
  days: 'Dias',
  hours: 'Horas',
  minutes: 'Minutos',
  seconds: 'Segundos'
}

/* Create various aliases for convenience */

FlipClock.Lang['pt'] = FlipClock.Lang.Portuguese
FlipClock.Lang['pt-br'] = FlipClock.Lang.Portuguese
FlipClock.Lang['portuguese'] = FlipClock.Lang.Portuguese
/**
 * FlipClock Russian Language Pack
 *
 * This class will used to translate tokens into the Russian language.
 *
 */

FlipClock.Lang.Russian = {
  years: 'лет',
  months: 'месяцев',
  days: 'дней',
  hours: 'часов',
  minutes: 'минут',
  seconds: 'секунд'
}

/* Create various aliases for convenience */

FlipClock.Lang['ru'] = FlipClock.Lang.Russian
FlipClock.Lang['ru-ru'] = FlipClock.Lang.Russian
FlipClock.Lang['russian'] = FlipClock.Lang.Russian
/**
 * FlipClock Swedish Language Pack
 *
 * This class will used to translate tokens into the Swedish language.
 *
 */

FlipClock.Lang.Swedish = {
  years: 'År',
  months: 'Månader',
  days: 'Dagar',
  hours: 'Timmar',
  minutes: 'Minuter',
  seconds: 'Sekunder'
}

/* Create various aliases for convenience */

FlipClock.Lang['sv'] = FlipClock.Lang.Swedish
FlipClock.Lang['sv-se'] = FlipClock.Lang.Swedish
FlipClock.Lang['swedish'] = FlipClock.Lang.Swedish
/**
 * FlipClock Chinese Language Pack
 *
 * This class will used to translate tokens into the Chinese language.
 *
 */

FlipClock.Lang.Chinese = {
  years: '年',
  months: '月',
  days: '日',
  hours: '时',
  minutes: '分',
  seconds: '秒'
}

/* Create various aliases for convenience */

FlipClock.Lang['zh'] = FlipClock.Lang.Chinese
FlipClock.Lang['zh-cn'] = FlipClock.Lang.Chinese
FlipClock.Lang['chinese'] = FlipClock.Lang.Chinese

typeof exports === 'object' && typeof module !== 'undefined' ?
  module.exports = FlipClock :
  window.FlipClock = FlipClock