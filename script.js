class Litre {
  constructor(input) {
    this.name = 'Litre'
    this.sym = 'L'
    this.imperial_gallons = input/4.546
    this.cubic_inches = input*61.024
    this.cubic_feet = input/28.317
    this.cubic_centimeters = input*1000
    this.cubic_metres = input/1000
  }
}

class Imperial_Gallon {
    constructor(input) {
      this.name = 'Imperial Gallon'
      this.sym = 'imp gal'
      this.cubic_inches = input*277
      this.cubic_feet = input/6.229
      this.cubic_centimeters = input*4546
      this.cubic_metres = input/220
      this.litres = input*4.546
  }
}

class Cubic_Inch {
    constructor(input) {
      this.name = 'Cubic Inch'
      this.sym = 'in\u00B3'
      this.cubic_feet = input/1728
      this.cubic_centimeters = input*16.387
      this.cubic_metres = input/61024
      this.litres = input/61.024
      this.imperial_gallons = input/277
  }
}

class Cubic_Foot {
  constructor(input) {
    this.name = 'Cubic Foot'
    this.sym = 'ft\u00B3'
    this.cubic_centimeters = input*28317
    this.cubic_metres = input/35.315
    this.litres = input*28.317
    this.imperial_gallons = input*6.229
    this.cubic_inches = input*1728
  }
}

class Cubic_Metre {
  constructor(input){
    this.name = 'Cubic Metre'
    this.sym = 'm\u00B3'
    this.imperial_gallons = input*220
    this.cubic_inches = input*61024
    this.cubic_feet = input*35.315
    this.cubic_centimeters = input*(1*(10^6))
    this.litres = input*1000
  }
}

class Cubic_Centimetre {
  constructor(input){
    this.name = 'Cubic Centimetre'
    this.sym = 'cm\u00B3'
    this.cubic_metres = input/(1*(10^6))
    this.imperial_gallons = input/4546
    this.litres = input/1000
    this.cubic_inches = input/16.387
    this.cubic_feet = input/28317
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

  calculate_rates(raw_obj, time_unit) {
    let {name, sym, ...conversion} = raw_obj
    let time_table = {
      name,
      sym,
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

  calculate_rates(raw_obj, time_unit) {
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

  // working
  calculate_volume_elapsed(rate, rate_unit, time, time_unit) {
    return (rate * time_dict[rate_unit][time_unit]) * time
  }

  // under construction
  calculate_time_required(rate, rate_unit, quantity, desired_unit){
    return (quantity / (time_dict[rate_unit][rate_unit]))
  }
}

// let foo = new Converter('Litre', 30)
// let bar = foo.calculate_conversion()
// console.log(foo.calculate_rates(bar, 'min'))
// console.log(foo.calculate_volume_elapsed(4, 'hr', 180, 'sec'))
