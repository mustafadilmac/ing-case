import { expect } from '@open-wc/testing';
import sinon from 'sinon';
import { reactive } from '../src/utils/reactive.js';

describe('reactive', () => {
  it('notifies subscribed listeners on property change', () => {
    const obj = reactive({ count: 0 });
    const spy = sinon.spy();

    obj.__subscribe(spy);

    obj.count = 10;
    expect(spy.calledOnce).to.be.true;
  });

  it('does not notify unsubscribed listeners', () => {
    const obj = reactive({ count: 0 });
    const spy = sinon.spy();

    obj.__subscribe(spy);
    obj.__unsubscribe(spy);

    obj.count = 5;

    expect(spy.called).to.be.false;
  });

  it('returns a proxy that reflects property changes', () => {
    const obj = reactive({ name: 'John' });

    obj.name = 'Jane';
    expect(obj.name).to.equal('Jane');
  });

  it('supports multiple listeners', () => {
    const obj = reactive({ value: 1 });
    const spy1 = sinon.spy();
    const spy2 = sinon.spy();

    obj.__subscribe(spy1);
    obj.__subscribe(spy2);

    obj.value = 2;

    expect(spy1.calledOnce).to.be.true;
    expect(spy2.calledOnce).to.be.true;
  });
});
