import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Voice from '@react-native-voice/voice';
interface IProps {}
interface IState {
  speechText: string;
  toggle: boolean;
  speechList: any;
}
class SpeechPage extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      speechText: '',
      toggle: false,
      speechList: [],
    };
    Voice.onSpeechStart = this.onStartSpeech.bind(this);
    Voice.onSpeechEnd = this.onEndSpeech.bind(this);
    Voice.onSpeechResults = this.onResultSpeech.bind(this);
  }
  onStartSpeech() {
    // console.log('start speech');
  }
  onEndSpeech() {
    // console.log('end speech');
    // this.setState({toggle: false});
  }
  onResultSpeech(eve: any) {
    // console.log('result speech', eve.value[0]);
    this.setState(prev => ({
      speechList: [...prev.speechList, {id: Date.now(), text: eve.value[0]}],
      speechText: eve.value[0],
    }));
  }

  handleStartRecognitation = async () => {
    this.setState({toggle: true});
    await Voice.start('en-US');
    this.onStartSpeech();

    // console.log('start error', e);
  };
  handleStopRecognition = async () => {
    await Voice.stop();
    this.onEndSpeech();

    this.setState({toggle: false});
  };
  clearText = () => {
    this.setState({
      speechText: '',
    });
  };
  handleClearAllList = () => {
    this.setState({
      speechList: [],
      speechText: '',
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headingText}>Speech Recognitior</Text>
        </View>
        <View style={styles.fieldContainer}>
          <Text testID="speech-text" style={styles.textInput}>
            {this.state.speechText}
          </Text>
        </View>
        <View style={styles.actionSect}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              testID="speech-btn"
              onPress={this.handleStartRecognitation}
              style={[styles.speakBtn, {backgroundColor: 'green'}]}>
              <Text style={styles.text2}>Speak</Text>
            </TouchableOpacity>
            <TouchableOpacity
              testID="stop-btn"
              onPress={this.handleStopRecognition}
              style={[styles.speakBtn, {backgroundColor: '#b83228'}]}>
              <Text style={styles.text2}>Stop</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            testID="clearBtn"
            onPress={this.clearText}
            style={styles.clearAction}>
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>
        </View>
        <View>
          {this.state.toggle ? (
            <Modal
              testID="modal"
              animationType="slide"
              transparent={true}
              visible={this.state.toggle}>
              <View style={styles.centeredView}>
                <View style={[styles.modalView, {position: 'relative'}]}>
                  <TouchableOpacity
                    testID="close-btn"
                    onPress={() => this.setState({toggle: !this.state.toggle})}
                    style={{position: 'absolute', top: 10, right: '20%'}}>
                    <AntDesign
                      name="closecircleo"
                      color={'rgb(196, 96, 86)'}
                      size={20}
                    />
                  </TouchableOpacity>
                  <View
                    style={{
                      marginVertical: 10,
                    }}>
                    <FontAwesome
                      name="microphone"
                      color={'red'}
                      size={wp(15)}
                    />
                  </View>
                </View>
              </View>
            </Modal>
          ) : null}
        </View>
        <View
          style={{
            height: hp(35),
            paddingHorizontal: wp(1.5),
            paddingVertical: hp(1),
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: hp(5),
                color: 'green',
              }}>
              List of Speech
            </Text>
            <TouchableOpacity
              testID="clearList"
              onPress={() => this.handleClearAllList()}>
              <Text>Clear All</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            testID="flatlist"
            data={this.state.speechList}
            renderItem={({item}) => (
              <Text style={styles.itemText}>{item?.text}</Text>
            )}
          />
        </View>
      </View>
    );
  }
}
export default SpeechPage;

const styles = StyleSheet.create({
  container: {
    // backgroundColor:'#5885AF'
    paddingHorizontal: wp(5),
    marginBottom: hp(3),
  },
  header: {
    alignItems: 'center',
    marginVertical: hp(3),
  },
  headingText: {
    fontSize: hp(6),
    fontWeight: '500',
    letterSpacing: 1.11,
    color: 'black',
  },
  fieldContainer: {
    borderWidth: 1,
    height: hp(25),
    borderRadius: 8,
    paddingHorizontal: wp(3),
    paddingVertical: hp(2),
  },
  textInput: {
    fontSize: hp(5),
    width: wp(83),
    // textAlign: 'justify',
    lineHeight: hp(2.7),
  },
  actionSect: {
    marginTop: hp(3.5),
  },
  clearAction: {
    backgroundColor: 'black',
    marginVertical: hp(3),
    // height: hp(5),
    paddingVertical: hp(1.4),
    alignItems: 'center',
    borderRadius: 5,
  },
  clearText: {
    color: 'white',
    textAlign: 'center',
    fontSize: hp(4.5),
  },
  speakBtn: {
    paddingVertical: hp(1),
    width: wp(20),
    alignItems: 'center',
    borderRadius: 5,
  },
  text2: {
    color: 'white',
    fontSize: hp(4),
    fontWeight: '500',
    letterSpacing: 1.3,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: 300,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
  },
  itemText: {
    marginBottom: hp(2),
    fontSize: hp(4),
    color: 'white',
  },
});
