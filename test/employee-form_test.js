import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import sinon from 'sinon';
import '../src/components/employee/employee-form.js';

describe('EmployeeForm', () => {
  let element;

  beforeEach(async () => {
    element = await fixture(html`<employee-form></employee-form>`);
  });

  it('updates data and dispatches form-change on input change', async () => {
    element.data = { firstName: '', email: '' };

    const event = {
      target: {
        name: 'firstName',
        value: 'Mustafa'
      }
    };

    const listener = oneEvent(element, 'form-change');

    element._onInputChange(event);
    const ev = await listener;
    await expect(element.data.firstName).to.equal('Mustafa');
    await expect(ev.detail.firstName).to.equal('Mustafa');
  });

  it('dispatches form-submit when form is valid', async () => {
    const fakeForm = {
      checkValidity: () => true,
      reportValidity: sinon.spy(),
    };

    element.data = { email: 'test@example.com' };
    const listener = oneEvent(element, 'form-submit');

    element._onSubmit({ preventDefault: () => {}, target: fakeForm });

    const ev = await listener;
    await expect(ev.detail.email).to.equal('test@example.com');
    expect(fakeForm.reportValidity.called).to.be.false;
  });

  it('calls reportValidity when form is invalid', () => {
    const fakeForm = {
      checkValidity: () => false,
      reportValidity: sinon.spy(),
    };

    element.data = { email: '' };

    element._onSubmit({ preventDefault: () => {}, target: fakeForm });
    expect(fakeForm.reportValidity.calledOnce).to.be.true;
  });
});
