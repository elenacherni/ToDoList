import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements'

const AddItem = ({addItem}) => {
  const [text, setText] = useState('');
  const onChange = textValue => setText(textValue);

  return (
    <View>
      <TextInput
        placeholder="Add ToDo..."
        style={styles.input}
        onChangeText={onChange}
        value={text}
      />
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          addItem(text);
          setText('');
        }}>
        <Icon name="add" size={20} color="firebrick"/>
        <Text style={styles.btnText}> Add To Do </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 60,
    padding: 8,
    margin: 5,
  },
  btn: {
    backgroundColor: '#e7bcbc',
    padding: 9,
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'center',

  },
  btnText: {
    color: 'firebrick',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default AddItem;