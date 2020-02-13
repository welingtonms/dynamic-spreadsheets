import React from 'react';
import Enzyme, { shallow as enzymeShallow, mount as enzymeMount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({
  adapter: new Adapter(),
  disableLifecycleMethods: true
});

/**
 * Returns node(s) with the given data-test attribute.
 * @function
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper.
 * @param {string} val - Data-test attribute to be searched for.
 * @returns {ShallowWrapper}
 */
export function findByTestAttr(wrapper, value) {
  return wrapper.find(asTestAttr(value));
}

/**
 * Returns the given value as a data-test attribute.
 * @function
 * @param {string} wrapper - attribute to be wrapped as data-test.
 * @returns {string} returns value as `[data-test="<value>"]`
 */
export function asTestAttr(value) {
  return `[data-test="${value}"]`;
}

/**
 * Creates a ShallowWrapper for the given component.
 * @function
 * @param {object} props - Component props specific to this setup.
 * @returns {ShallowWrapper}
 */
export const shallow = (Component, props = {}) => {
  return enzymeShallow(<Component {...props} />);
};

/**
 * Creates a ShallowWrapper for the given component.
 * @function
 * @param {object} props - Component props specific to this setup.
 * @returns {ShallowWrapper}
 */
export const mount = (Component, props = {}) => {
  return enzymeMount(<Component {...props} />);
};
