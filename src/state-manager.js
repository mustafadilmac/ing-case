export class StateManager {

  constructor(key, initialValue = null) {
    this.key = key;
    this.subscribers = [];

    const storedValue = localStorage.getItem(this.key);

    if (storedValue !== null) {
      try {
        this.state = JSON.parse(storedValue);
      } catch {
        this.state = storedValue;
      }
    } else {
      this.state = initialValue;
      this._save();
    }
  }

  _save() {
    try {
      const valueToStore =
        typeof this.state === 'object'
          ? JSON.stringify(this.state)
          : this.state;
      localStorage.setItem(this.key, valueToStore);
    } catch (err) {
      console.error(`[StateManager] Failed to save key: ${this.key}`, err);
    }
  }

  _notify() {
    for (const cb of this.subscribers) cb(this.state);
  }

  _isJSON(value) {
    if (typeof value !== 'string') return false;
    try {
      JSON.parse(value);
      return true;
    } catch {
      return false;
    }
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    callback(this.state);
    return () => this.subscribers.delete(callback);
  }

  get() {
    return this.state;
  }

  set(value) {
    this.state = this._isJSON(value) ? JSON.parse(value) : value;
    this._save();
    this._notify();
  }

  update(updater) {
    if (typeof updater !== 'function') {
      throw new Error('update() must receive a function');
    }
    this.state = updater(this.state);
    this._save();
    this._notify();
  }

  delete() {
    this.state = null;
    localStorage.removeItem(this.key);
    this._notify();
  }
}
