import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import i18next from '../src/i18n.js';
import { I18nMixin } from '../src/i18n-mixin.js';
import { LitElement } from 'lit';

class TestI18nComponent extends I18nMixin(LitElement) {
  render() {
    return html`<div>Lang test</div>`;
  }
}
customElements.define('test-i18n-component', TestI18nComponent);

describe('I18nMixin', () => {
  let element;

  beforeEach(async () => {
    sinon.restore();
    element = await fixture(html`<test-i18n-component></test-i18n-component>`);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('subscribes and unsubscribes to i18next events correctly', async () => {
    const onSpy = sinon.spy(i18next, 'on');
    const offSpy = sinon.spy(i18next, 'off');

    element.connectedCallback();
    expect(onSpy.calledWith('languageChanged')).to.be.true;

    element.disconnectedCallback();
    expect(offSpy.calledWith('languageChanged')).to.be.true;
  });

  it('calls requestUpdate when language changes', async () => {
    const reqSpy = sinon.spy(element, 'requestUpdate');
    element._langChanged();
    expect(reqSpy.calledOnce).to.be.true;
  });
});
