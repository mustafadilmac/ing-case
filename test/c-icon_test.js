import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import '../src/components/c-icon.js';

describe('CIcon', () => {
  let element;

  beforeEach(async () => {
    element = await fixture(html`<c-icon></c-icon>`);
  });

  it('renders with default properties', () => {
    expect(element.name).to.equal('home');
    expect(element.size).to.equal(20);
    expect(element.stroke).to.equal('currentColor');
    expect(element.strokeWidth).to.equal(2);
  });

  it('renders correct i tag with data-lucide attribute', () => {
    const iTag = element.shadowRoot.querySelector('i');
    expect(iTag).to.exist;
    expect(iTag.getAttribute('data-lucide')).to.equal('home');
  });

  it('calls lucide.createIcons on firstUpdated if lucide is available', () => {
    const createIconsSpy = sinon.spy();
    window.lucide = { createIcons: createIconsSpy };

    element.firstUpdated();

    expect(createIconsSpy.calledOnce).to.be.true;
    expect(createIconsSpy.firstCall.args[0]).to.have.property('root');
    expect(createIconsSpy.firstCall.args[0].attrs.width).to.equal(20);
  });

  it('calls _initIcons when reactive properties change', async () => {
    const spy = sinon.spy(element, '_initIcons');

    element.name = 'user';
    await element.updateComplete;
    expect(spy.calledOnce).to.be.true;

    element.size = 30;
    await element.updateComplete;
    expect(spy.calledTwice).to.be.true;

    element.stroke = 'red';
    await element.updateComplete;
    expect(spy.calledThrice).to.be.true;
  });

  it('does not throw or call createIcons when lucide is undefined', () => {
    delete window.lucide;
    const createSpy = sinon.spy();

    Object.defineProperty(window, 'lucide', {
      configurable: true,
      writable: true,
      value: undefined,
    });

    expect(() => element._initIcons()).to.not.throw();
    expect(createSpy.called).to.be.false;
  });
});
