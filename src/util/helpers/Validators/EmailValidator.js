var validator = require("validator");

const ArabicLettersInOneString = "آأئيءةابتثجحخدذرزسشصضطظعغفقكلمنهوي";

export function EmailValidator(str) {
  return validator.isEmail(str);
}

export function NoArabicValidation(str) {
  let containsArabic = false;
  [...ArabicLettersInOneString].forEach((letter) => {
    if (str.includes(letter)) {
      containsArabic = true;
    }
  });
  return !containsArabic;
}

export function EmailWithNoArabicValidator(str) {
  return EmailValidator(str) && NoArabicValidation(str);
}