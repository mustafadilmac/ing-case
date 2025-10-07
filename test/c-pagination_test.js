import { expect, fixture, html, oneEvent, nextFrame } from '@open-wc/testing';
import sinon from 'sinon';
import '../src/components/c-pagination.js';

describe('CPagination', () => {
  let element;

  beforeEach(async () => {
    element = await fixture(html`<c-pagination></c-pagination>`);
  });

  it('has default property values', () => {
    expect(element.currentPage).to.equal(1);
    expect(element.pageSize).to.equal(10);
    expect(element.totalItems).to.equal(0);
    expect(element.siblingCount).to.equal(1);
  });

  it('calculates totalPages correctly', () => {
    element.totalItems = 95;
    element.pageSize = 10;
    expect(element.totalPages).to.equal(10);

    element.totalItems = 0;
    expect(element.totalPages).to.equal(1);
  });

  it('emits page-change event when changing page', async () => {
    element.totalItems = 50;
    element.currentPage = 2;

    setTimeout(() => element.shadowRoot.querySelectorAll('.page')[3].click());
    const ev = await oneEvent(element, 'page-change');

    expect(ev.detail.page).to.be.a('number');
    expect(ev.detail.page).to.not.equal(element.currentPage);
  });

  it('does not emit event if clicking current page', () => {
    const spy = sinon.spy(element, 'dispatchEvent');
    element.shadowRoot.querySelector('.page.active').click();
    const calledWithChange = spy.getCalls().some(c => c.args[0].type === 'page-change');
    expect(calledWithChange).to.be.false;
  });

  it('renders dots when many pages exist', async () => {
    element.totalItems = 300;
    element.pageSize = 10;
    element.currentPage = 10;
    await element.updateComplete;

    const dots = element.shadowRoot.querySelectorAll('.dots');
    expect(dots.length).to.be.at.least(1);
  });

  it('disables prev and next buttons correctly', async () => {
    element.totalItems = 100;
    element.pageSize = 10;

    await element.updateComplete;

    let prev = element.shadowRoot.querySelector('button[aria-label="Prev"]');
    let next = element.shadowRoot.querySelector('button[aria-label="Next"]');
    expect(prev.disabled).to.be.true;
    expect(next.disabled).to.be.false;

    element.currentPage = element.totalPages;
    await element.updateComplete;
    await nextFrame();

    prev = element.shadowRoot.querySelector('button[aria-label="Prev"]');
    next = element.shadowRoot.querySelector('button[aria-label="Next"]');
    expect(prev.disabled).to.be.false;
    expect(next.disabled).to.be.true;
  });
});
