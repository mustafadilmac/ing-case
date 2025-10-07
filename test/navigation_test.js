import { expect } from '@open-wc/testing';
import sinon from 'sinon';
import { handleGlobalCancel } from '../src/utils/navigation.js';
import { Router } from '@vaadin/router';

describe('handleGlobalCancel', () => {
  let backStub;
  let goStub;

  beforeEach(() => {
    sinon.restore();
    backStub = sinon.stub(window.history, 'back');
    goStub = sinon.stub(Router, 'go');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('calls window.history.back() when history length > 1', () => {
    Object.defineProperty(window.history, 'length', {
      configurable: true,
      value: 3,
    });

    handleGlobalCancel();

    expect(backStub.calledOnce).to.be.true;
    expect(goStub.called).to.be.false;
  });

  it('calls Router.go("/") when history length <= 1', () => {
    Object.defineProperty(window.history, 'length', {
      configurable: true,
      value: 1,
    });

    handleGlobalCancel();

    expect(goStub.calledOnceWith('/')).to.be.true;
    expect(backStub.called).to.be.false;
  });
});
