import {is, maybe} from "dyndef";
import Eager from "./Eager.js";

const orIdentity = fn => fn ?? (v => v);

export default class EagerResult {
  #result;
  #error;

  constructor(computation) {
    is(computation).f();

    return new Eager(resolve =>
      (async () => computation())().then(result => {
        this.#result = result;
        resolve(this);
      }, error => {
        this.#error = error;
        resolve(this);
      }));
  }

  get #ok() {
    return this.#error === undefined;
  }

  match(matcher = {}) {
    is(matcher).o();

    return this.#ok()
      ? new EagerResult(() => orIdentity(matcher.ok)(this.#result))
      : new EagerResult(() => orIdentity(matcher.error)(this.#error));
  }

  expect(message) {
    maybe(message).s();

    if (this.#ok) {
      return this.#result;
    }
    throw new Error(message);
  }
}
