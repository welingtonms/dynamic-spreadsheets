import { findByTestAttr, shallow } from '../../test/helpers';
import { Button } from './index';
import generator from '../../test/data-generator';

describe('<Button />', () => {
  const label = generator.word();

  it('renders without error', () => {
    const wrapper = shallow(Button, { children: label });
    const component = findByTestAttr(wrapper, 'c-button');
    expect(component.length).toBe(1);
  });

  it('renders the given label', () => {
    const wrapper = shallow(Button, { children: label });
    const component = findByTestAttr(wrapper, 'c-button');
    expect(component.text()).toBe(label);
  });

  it('renders disabled', () => {
    const wrapper = shallow(Button, { children: label, disabled: true });
    const component = findByTestAttr(wrapper, 'c-button');
    expect(component.prop('disabled')).toBe(true);
  });

  it('renders highlighted', () => {
    const wrapper = shallow(Button, { children: label, highlighted: true });
    const component = findByTestAttr(wrapper, 'c-button');
    expect(component.hasClass('-highlighted')).toBe(true);
  });
});
