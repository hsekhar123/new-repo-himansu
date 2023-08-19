/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: import explicitly to use the types shiped with jest.
import {it} from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<App />);
});
jest.mock('react-native-responsive-screen', () => ({
  widthPercentageToDP: () => jest.fn(),
  heightPercentageToDP: () => jest.fn(),
}));
jest.mock('react-native-vector-icons/AntDesign', () => () => <></>);
jest.mock('react-native-vector-icons/FontAwesome', () => () => <></>);

jest.mock('@react-native-voice/voice', () => {
  const Voice = {
    onSpeechStart: jest.fn(),
    onSpeechEnd: jest.fn(),
    onSpeechResults: jest.fn(),
    start: jest.fn().mockImplementation((...args) => Promise.resolve('en-US')),
    stop: jest.fn(),
  }
  return Voice
});