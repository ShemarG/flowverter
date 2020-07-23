class Litre {
  constructor(input) {
    this.name = 'Litre'
    this.sym = 'L'
    this["Litre"] = input
    this["Imperial Gallon"] = input/4.546
    this["Cubic Inch"] = input*61.024
    this["Cubic Foot"] = input/28.317
    this["Cubic Centimetre"] = input*1000
    this["Cubic Metre"] = input/1000
  }
}

class Imperial_Gallon {
    constructor(input) {
      this.name = 'Imperial Gallon'
      this.sym = 'imp gal'
      this["Imperial Gallon"] = input
      this["Cubic Inch"] = input*277
      this["Cubic Foot"] = input/6.229
      this["Cubic Centimetre"] = input*4546
      this["Cubic Metre"] = input/220
      this["Litre"] = input*4.546
  }
}

class Cubic_Inch {
    constructor(input) {
      this.name = 'Cubic Inch'
      this.sym = 'in\u00B3'
      this["Cubic Inch"] = input
      this["Cubic Foot"] = input/1728
      this["Cubic Centimetre"] = input*16.387
      this["Cubic Metre"] = input/61024
      this["Litre"] = input/61.024
      this["Imperial Gallon"] = input/277
  }
}

class Cubic_Foot {
  constructor(input) {
    this.name = 'Cubic Foot'
    this.sym = 'ft\u00B3'
    this["Cubic Foot"] = input
    this["Cubic Centimetre"] = input*28317
    this["Cubic Metre"] = input/35.315
    this["Litre"] = input*28.317
    this["Imperial Gallon"] = input*6.229
    this["Cubic Inch"] = input*1728
  }
}

class Cubic_Metre {
  constructor(input){
    this.name = 'Cubic Metre'
    this.sym = 'm\u00B3'
    this["Cubic Metre"] = input
    this["Imperial Gallon"] = input*220
    this["Cubic Inch"] = input*61024
    this["Cubic Foot"] = input*35.315
    this["Cubic Centimetre"] = input*(1*(10^6))
    this["Litre"] = input*1000
  }
}

class Cubic_Centimetre {
  constructor(input){
    this.name = 'Cubic Centimetre'
    this.sym = 'cm\u00B3'
    this["Cubic Centimetre"] = input
    this["Cubic Metre"] = input/(1*(10^6))
    this["Imperial Gallon"] = input/4546
    this["Litre"] = input/1000
    this["Cubic Inch"] = input/16.387
    this["Cubic Foot"] = input/28317
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
    this['Litre'] = Litre,
    this['Imperial Gallon'] = Imperial_Gallon,
    this['Cubic Inch'] = Cubic_Inch,
    this['Cubic Foot'] = Cubic_Foot,
    this['Cubic Centimetre'] = Cubic_Centimetre,
    this['Cubic Metre'] = Cubic_Metre
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

let foo = new Converter('Litre', 78)
let car = foo.calculate_rates('sec')
console.log(car)
console.log(foo.calculate_volume_elapsed({day:6, hour:7, minute:1, second:30},'min'))
console.log(foo.calculate_time_required(706797, 'Litre', 'min'))
