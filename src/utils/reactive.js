export function reactive(obj) {
  const listeners = new Set();

  const proxy = new Proxy(obj, {
    set(target, key, value) {
      target[key] = value;
      listeners.forEach(fn => fn());
      return true;
    }
  });

  proxy.__subscribe = (fn) => listeners.add(fn);
  proxy.__unsubscribe = (fn) => listeners.delete(fn);

  return proxy;
}
