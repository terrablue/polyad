import {is, maybe} from "dyndef";

const orIdentity = fn => fn ?? (v => v);

export default class Result {
  #result;
  #error;

  constructor(computation) {
    is(computation).f();

    try {
      this.#result = computation();
    } catch (error) {
      this.#error = error;
    }
  }

  get #ok() {
    return this.#error === undefined;
  }

  match(matcher = {}) {
    is(matcher).o();

    return this.#ok()
      ? new Result(orIdentity(matcher.ok)(this.#result))
      : new Result(orIdentity(matcher.error)(this.#error));
  }

  expect(message) {
    maybe(message).s();

    if (this.#ok) {
      return this.#result;
    }
    throw new Error(message);
  }
}
