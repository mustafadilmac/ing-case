import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import sinon from 'sinon';
import '../src/components/confirm-modal.js';

describe('ConfirmModal', () => {
  let element;

  beforeEach(async () => {
    element = await fixture(html`<confirm-modal></confirm-modal>`);
  });

  it('has default properties', () => {
    expect(element.open).to.be.false;
    expect(element.title).to.equal('');
    expect(element.message).to.equal('');
  });

  it('adds and removes keydown listener when open changes', async () => {
    const addSpy = sinon.spy(window, 'addEventListener');
    const removeSpy = sinon.spy(window, 'removeEventListener');

    element.open = true;
    await element.updateComplete;

    expect(addSpy.calledWith('keydown')).to.be.true;

    element.open = false;
    await element.updateComplete;

    expect(removeSpy.calledWith('keydown')).to.be.true;

    addSpy.restore();
    removeSpy.restore();
  });

  it('dispatches confirm event and closes when Yes button clicked', async () => {
    element.open = true;
    await element.updateComplete;

    const listener = oneEvent(element, 'confirm');

    const yesBtn = element.shadowRoot.querySelector('.actions c-button[variant="primary"]');
    yesBtn.click();

    const ev = await listener;

    await expect(ev.type).to.equal('confirm');
    expect(element.open).to.be.false;
  });

  it('dispatches cancel event and closes when Cancel button clicked', async () => {
    element.open = true;
    await element.updateComplete;

    const listener = oneEvent(element, 'cancel');
    const cancelBtn = element.shadowRoot.querySelector('.actions c-button[variant="outline"]');

    cancelBtn.click();

    const ev = await listener;
    await expect(ev.type).to.equal('cancel');
    expect(element.open).to.be.false;
  });

  it('dispatches cancel event when Escape key pressed', async () => {
    element.open = true;
    await element.updateComplete;

    const listener = oneEvent(element, 'cancel');
    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    window.dispatchEvent(event);

    const ev = await listener;
    await expect(ev.type).to.equal('cancel');
    expect(element.open).to.be.false;
  });

  it('dispatches cancel event when clicking backdrop', async () => {
    element.open = true;
    await element.updateComplete;

    const listener = oneEvent(element, 'cancel');
    const backdrop = element.shadowRoot.querySelector('.backdrop');
    backdrop.click();

    const ev = await listener;
    await expect(ev.type).to.equal('cancel');
    expect(element.open).to.be.false;
  });

  it('renders title and message properly', async () => {
    element.title = 'Delete Item';
    element.message = 'Are you sure you want to delete this item?';
    await element.updateComplete;

    const h3 = element.shadowRoot.querySelector('h3');
    const p = element.shadowRoot.querySelector('p');
    expect(h3.textContent).to.include('Delete Item');
    expect(p.textContent).to.include('Are you sure');
  });
});
