class Litre {
  constructor(input) {
    this.name = 'Litre'
    this.sym = 'L'
    this["L"] = input
    this["Imp. gal"] = input/4.546
    this["in\u00B3"] = input*61.024
    this["ft\u00B3"] = input/28.317
    this["cm\u00B3"] = input*1000
    this["m\u00B3"] = input/1000
  }
}

class Imperial_Gallon {
    constructor(input) {
      this.name = 'Imperial Gallon'
      this.sym = 'Imp. gal'
      this["Imp. gal"] = input
      this["in\u00B3"] = input*277
      this["ft\u00B3"] = input/6.229
      this["cm\u00B3"] = input*4546
      this["m\u00B3"] = input/220
      this["L"] = input*4.546
  }
}

class Cubic_Inch {
    constructor(input) {
      this.name = 'Cubic Inch'
      this.sym = 'in\u00B3'
      this["in\u00B3"] = input
      this["ft\u00B3"] = input/1728
      this["Cubic Centimetre"] = input*16.387
      this["m\u00B3"] = input/61024
      this["L"] = input/61.024
      this["Imp. gal"] = input/277
  }
}

class Cubic_Foot {
  constructor(input) {
    this.name = 'Cubic Foot'
    this.sym = 'ft\u00B3'
    this["ft\u00B3"] = input
    this["cm\u00B3"] = input*28317
    this["m\u00B3"] = input/35.315
    this["L"] = input*28.317
    this["Imp. gal"] = input*6.229
    this["in\u00B3"] = input*1728
  }
}

class Cubic_Metre {
  constructor(input){
    this.name = 'Cubic Metre'
    this.sym = 'm\u00B3'
    this["m\u00B3"] = input
    this["Imp. gal"] = input*220
    this["in\u00B3"] = input*61024
    this["ft\u00B3"] = input*35.315
    this["cm\u00B3"] = input*(Math.pow(10,6))
    this["L"] = input*1000
  }
}

class Cubic_Centimetre {
  constructor(input){
    this.name = 'Cubic Centimetre'
    this.sym = 'cm\u00B3'
    this["cm\u00B3"] = input
    this["m\u00B3"] = input/(Math.pow(10,6))
    this["Imp. gal"] = input/4546
    this["L"] = input/1000
    this["in\u00B3"] = input/16.387
    this["ft\u00B3"] = input/28317
  }
}

let time_dict = {
      'sec':{
        sec: 1,
        min: 60,
        hr: 3600,
        day: 86400
      },
      'min': {
        sec: (1/60),
        min: 1,
        hr: 60,
        day: 1440
      },
      'hr': {
        sec: (1/3600),
        min: (1/60),
        hr: 1,
        day: 24
      },
      'day': {
        sec: (1/86400),
        min: (1/1440),
        hr: (1/24),
        day: 1
      }
    }

class Converter {
  constructor(unit, quantity){
    this.unit = unit,
    this.quantity = quantity,
    this['L'] = Litre,
    this['Imp. gal'] = Imperial_Gallon,
    this['in\u00B3'] = Cubic_Inch,
    this['ft\u00B3'] = Cubic_Foot,
    this['cm\u00B3'] = Cubic_Centimetre,
    this['m\u00B3'] = Cubic_Metre
  }

  calculate_conversion() {
    let selected_unit = this[this.unit]
    return new selected_unit(this.quantity)
  }

  // raw_obj accepts output of calculate_conversion()
  calculate_rates(time_unit) {
    let raw_obj = this.calculate_conversion()
    let {name, sym, ...conversion} = raw_obj
    let time_table = {[this.unit]:{}}
    for (let unit in conversion){
      time_table[unit] = {}
      for (let time in time_dict) {
        time_table[this.unit][time] = this.quantity * time_dict[time_unit][time]
        time_table[unit][time] = conversion[unit] * time_dict[time_unit][time]
      }
    }
    return time_table
  }

  // rates accepts output of calculate_rates()
  calculate_volume_elapsed(time, time_unit) {
    let total_time = time.day*86400 + time.hr*3600 + time.min*60 +time.sec
    let rates = this.calculate_rates(time_unit)
    let volume_table = {}
    for (let unit in rates){
      volume_table[unit] = rates[unit]['sec'] * total_time
    }
    return volume_table
  }

  // rates accepts output of calculate_rates()
  calculate_time_required(quantity, quantity_unit, time_unit){
    let rates = this.calculate_rates(time_unit)
    let raw_seconds = quantity / rates[quantity_unit]['sec']
    let days = Math.floor(raw_seconds/86400)
    raw_seconds = raw_seconds-days*86400
    let hours = Math.floor(raw_seconds/3600)
    raw_seconds = raw_seconds-hours*3600
    let minutes = Math.floor(raw_seconds/60)
    raw_seconds = raw_seconds-minutes*60
    return {days:days, hours: hours, minutes: minutes, seconds: raw_seconds}
  }
}

let foo = new Converter('L', 78)
console.log(foo.calculate_conversion())
let car = foo.calculate_rates('sec')
console.log(car)
console.log(foo.calculate_volume_elapsed({day:6, hr:7, min:1, sec:30},'min'))
console.log(foo.calculate_time_required(706797, 'Imp. gal', 'min'))
