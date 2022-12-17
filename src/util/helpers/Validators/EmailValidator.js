var validator = require("validator");

// const ArabicLettersInOneString = 'آأئيءابتثجحخدذرزسشصضطظعغفقكلمنهوي'

export function EmailValidator(str) {
  return validator.isEmail(str, {
    // blacklisted_chars:ArabicLettersInOneString,
  });
}

export function NoArabicValidation(str) {
  return !/[\u0600-\u06FF]/.test(str);
}

export function EmailWithNoArabicValidator(str) {
  return EmailValidator(str) && NoArabicValidation(str);
}
