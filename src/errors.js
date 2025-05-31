export class DuplicateUserEmailError extends Error {
  errorCode = "U001";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class DuplicateUserPhoneNumberError extends Error {
    errorCode = "U002";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class DuplicateUserEmailPhoneNumberError extends Error {
    errorCode = "U003";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class PhoneNumberNotVerifiedError extends Error {
    errorCode = "U004";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class DuplicateStoreNameError extends Error {
    errorCode = "S001";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class RateExceedError extends Error {
    errorCode = "R001";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}