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

const dictionary = {
  'Litre': Litre,
  'Imperial Gallon': Imperial_Gallon,
  'Cubic Inch': Cubic_Inch,
  'Cubic Foot': Cubic_Foot,
  'Cubic Centimetre': Cubic_Centimetre,
  'Cubic Metre': Cubic_Metre
}

let calculate = (unit, quantity) => {
  let selected_unit = dictionary[unit]
  let result = new selected_unit(quantity)
  return result
}
