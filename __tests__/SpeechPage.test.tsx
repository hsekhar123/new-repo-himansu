import React from 'react';
import {screen, render, fireEvent} from '@testing-library/react-native';
import SpeechPage from '../src/screen/SpeechPage';
import Voice from '@react-native-voice/voice';
import {act} from 'react-test-renderer';

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
  };
  return Voice;
});
describe('SpeachPage component', () => {
  it('for stop button', () => {
    render(<SpeechPage />);
    const stopBtn = screen.getByTestId('stop-btn');
    expect(stopBtn).toBeTruthy();
    fireEvent.press(stopBtn);
  });
  it('click speak buttoncfor open modal', () => {
    render(<SpeechPage />);
    const speechBtn = screen.getByTestId('speech-btn');
    expect(speechBtn).toBeTruthy();
    fireEvent.press(speechBtn);
    Voice.onSpeechStart({});
    Voice.onSpeechEnd({});
    Voice.onSpeechResults({});
    const state_toggle = true;
    const modal = screen.getByTestId('modal');
    expect(modal).toBeTruthy();
    const closeBtn = screen.getByTestId('close-btn');
    console.log('close', closeBtn);
    act(() => {
      fireEvent.press(closeBtn);
    });
  });
  it('click clear', () => {
    render(<SpeechPage />);
    const speechBtn = screen.getByTestId('speech-btn');
    expect(speechBtn).toBeTruthy();
    fireEvent.press(speechBtn);
    const closeBtn = screen.getByTestId('close-btn');
    act(() => {
      fireEvent.press(closeBtn);
    });
  });
  it('clear all list button ', () => {
    render(<SpeechPage />);
    const button = screen.getByTestId('clearList');
    expect(button).toBeTruthy();
    fireEvent.press(button);
    const speechText = screen.getByTestId('speech-text');
    expect(speechText).toBeDefined();
  });
  it('for flatlist text-item', () => {
    render(<SpeechPage />);
    const speechBtn = screen.getByTestId('speech-btn');
    fireEvent.press(speechBtn);
    const flatlist = screen.getByTestId('flatlist');
    expect(flatlist).toBeTruthy();
    flatlist.props.renderItem((item: any) => <></>);
  });
  it('on press to clear the text', () => {
    render(<SpeechPage />);
    const clearBtnId = screen.getByTestId('clearBtn');
    fireEvent.press(clearBtnId);
  });
});
