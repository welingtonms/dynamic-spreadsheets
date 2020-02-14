import { AlertManager } from './index';
import { findByTestAttr, shallow } from '../../test/helpers';
import { TYPE, DELAY } from './constants';
import { values } from 'ramda';
import generator from '../../test/data-generator';

describe('<AlertManager />', () => {
  const wrapper = shallow(AlertManager);
  const component = findByTestAttr(wrapper, 'c-alert-manager');

  it('renders without error', () => {
    expect(component.length).toBe(1);
  });

  describe('when a new message is added', () => {
    const instance = wrapper.instance();
    const newMessage = {
      message: generator.paragraph({ words: 5 }),
      type: generator.pick(values(TYPE))
    };

    it('adds to the messages state', () => {
      instance.handleAddMessage(newMessage);

      expect(wrapper.state('messages')).toContainEqual(
        expect.objectContaining(newMessage)
      );
    });

    it('removes the newly added message from state after DELAY', async () => {
      await new Promise(r => setTimeout(r, DELAY));

      expect(wrapper.state('messages')).toHaveLength(0);
    });
  });
});
