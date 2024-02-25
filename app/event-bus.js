class EventBus {
  constructor() {
    this._bus = document.createElement("div");
  }

  register(name, callback) {
    this._bus.addEventListener(name, callback);
  }

  remove(name, callback) {
    this._bus.removeEventListener(name, callback);
  }

  dispatch(name, detail = {}) {
    this._bus.dispatchEvent(
      new CustomEvent(name, {
        detail,
      })
    );
  }
}

export default new EventBus();
