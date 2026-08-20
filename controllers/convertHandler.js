function ConvertHandler() {

  this.getNum = function(input) {
    let result;

    const unitRegex = /[a-z]+$/i;
    const unitMatch = unitRegex.exec(input);
    let numberStr = input;

    if (unitMatch !== null) {
      numberStr = input.slice(0, unitMatch.index);
    }

    if (numberStr === '') {
      return 1;
    }

    if (numberStr.includes('/')) {
      const fractions = numberStr.split('/');
      if (fractions.length > 2) {
        return 'invalid number';
      }
      const numerator = parseFloat(fractions[0]);
      const denominator = parseFloat(fractions[1]);
      if (isNaN(numerator) || isNaN(denominator) || denominator === 0) {
        return 'invalid number';
      }
      result = numerator / denominator;
    } else {
      result = parseFloat(numberStr);
      if (isNaN(result)) {
        return 'invalid number';
      }
    }

    return result;
  };

  this.getUnit = function(input) {
    let result;

    const unitMatch = input.match(/[a-z]+$/i);

    if (unitMatch === null) {
      return 'invalid unit';
    }

    const unit = unitMatch[0].toLowerCase();

    if (unit === 'l') {
      return 'L';
    }

    const validUnits = ['gal', 'mi', 'km', 'lbs', 'kg'];
    if (validUnits.includes(unit)) {
      result = unit;
    } else {
      result = 'invalid unit';
    }

    return result;
  };

  this.getReturnUnit = function(initUnit) {
    let result;

    switch (initUnit) {
      case 'gal':
        result = 'L';
        break;
      case 'L':
        result = 'gal';
        break;
      case 'mi':
        result = 'km';
        break;
      case 'km':
        result = 'mi';
        break;
      case 'lbs':
        result = 'kg';
        break;
      case 'kg':
        result = 'lbs';
        break;
      default:
        result = 'invalid unit';
    }

    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;

    switch (unit) {
      case 'gal':
        result = 'gallons';
        break;
      case 'L':
        result = 'liters';
        break;
      case 'mi':
        result = 'miles';
        break;
      case 'km':
        result = 'kilometers';
        break;
      case 'lbs':
        result = 'pounds';
        break;
      case 'kg':
        result = 'kilograms';
        break;
      default:
        result = 'invalid unit';
    }

    return result;
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch (initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'L':
        result = initNum / galToL;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      default:
        return 'invalid unit';
    }

    return parseFloat(result.toFixed(5));
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;

    result = initNum + ' ' + this.spellOutUnit(initUnit) +
      ' converts to ' + returnNum + ' ' + this.spellOutUnit(returnUnit);

    return result;
  };

}

module.exports = ConvertHandler;