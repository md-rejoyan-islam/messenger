/**
 * Email Validate
 */
export const isEmail = (email) => {
  return /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(email);
};

/**
 * Bd Phone number Validate
 */
export const isBdMobile = (mobile) => {
  return /(^(\+8801|8801|01|008801))[3-9]{1}(\d){8}$/.test(mobile);
};

/**
 * handle keydown
 */

export const handleKeyDown = (e) => {
  const form = e.target.form;
  const index = Array.prototype.indexOf.call(form, e.target);
  // when press enter go to next input
  if (e.key === "Enter" && e.target.type !== "submit") {
    e.preventDefault();
    form.elements[index + 1].focus();
  }
  // when backspace press go to previous input
  if (e.key === "Backspace" && e.target.value === "" && index > 0) {
    e.preventDefault();
    form.elements[index - 1].focus();
  }
};

/**
 * email to star
 */

export const starEmailAddress = (email) => {
  const [namePart, extPart] = email.split("@");

  if (email.length < 3) return email;

  const firstletter = namePart[0];
  const lastLetter = namePart[namePart.length - 1];

  // return email;
  return (
    firstletter +
    Array(namePart.length - 2)
      .fill("*")
      .join("") +
    lastLetter +
    extPart
  );
};

/**
 * phone to star
 */

export const starPhone = (phone) => {
  return (
    phone.slice(0, 3) +
    Array(phone.length - 4)
      .fill("*")
      .join("") +
    phone[phone.length - 2] +
    phone[phone.length - 1]
  );
};

/**
 * @description: Name to Letter Avatar
 */

export const nameToLetterAvatar = (name) => {
  const nameArray = name.split(" ");
  const firstletter = nameArray[0][0];
  const lastletter = nameArray[nameArray.length - 1][0];
  return firstletter + lastletter;
};

/**
 * Email Validate
 */
export const isString = (data) => {
  return /^[a-zA-Z ]+$/.test(data);
};

/**
 * Email Validate
 */
export const isNumber = (number) => {
  return /^[0-9]+$/.test(number);
};

/**
 * Create a random number
 */
export const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

/**
 * Random String
 */
export const randStr = (length = 12) => {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
};

/**
 * Dot to Hy
 */
export const dotsToHyphens = (inputString) => {
  // Use the replace method with a regular expression to replace dots with hyphens
  const stringWithHyphens = inputString.replace(/\./g, "-");
  return stringWithHyphens;
};

/**
 * Hypens to Dots
 */
export const hyphensToDots = (inputString) => {
  // Use the replace method with a regular expression to replace hyphens with dots
  const stringWithDots = inputString.replace(/-/g, ".");
  return stringWithDots;
};

/**
 * Find Public ID
 */
export const findPublicId = (url) => {
  return url.split("/")[url.split("/").length - 1].split(".")[0];
};

/**
 * Create Slug
 */
export const createSlug = (title) => {
  // Remove non-alphanumeric characters and convert to lowercase
  const cleanedTitle = title.replace(/[^\w\s]/gi, "").toLowerCase();

  // Replace spaces with hyphens
  const slug = cleanedTitle.replace(/\s+/g, "-");

  return slug;
};

/**
 * Generat Random Password
 */
export const generateRandomPassword = (length = 10) => {
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const specialChars = "!@#$%^&*()-_=+[]{}|;:,.<>?";

  const allChars = uppercaseChars + lowercaseChars + numberChars + specialChars;
  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    password += allChars[randomIndex];
  }

  return password;
};

/**
 * Time Ago
 */
export const timeAgo = (date) => {
  const SECOND = 1000;
  const MINUTE = 60 * SECOND;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;
  const WEEK = 7 * DAY;
  const MONTH = 30 * DAY;
  const YEAR = 365 * DAY;

  const timeElapsed = Date.now() - new Date(date).getTime();

  if (timeElapsed < MINUTE) {
    return `${Math.floor(timeElapsed / SECOND)} seconds ago`;
  } else if (timeElapsed < HOUR) {
    return `${Math.floor(timeElapsed / MINUTE)} minutes ago`;
  } else if (timeElapsed < DAY) {
    return `${Math.floor(timeElapsed / HOUR)} hours ago`;
  } else if (timeElapsed < WEEK) {
    return `${Math.floor(timeElapsed / DAY)} days ago`;
  } else if (timeElapsed < MONTH) {
    return `${Math.floor(timeElapsed / WEEK)} weeks ago`;
  } else if (timeElapsed < YEAR) {
    return `${Math.floor(timeElapsed / MONTH)} months ago`;
  } else {
    return `${Math.floor(timeElapsed / YEAR)} years ago`;
  }
};
