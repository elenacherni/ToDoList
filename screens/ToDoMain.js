import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import ListItem from '../components/ListItem';
import AddItem from '../components/AddItem';
import uuid from 'react-native-uuid';

import * as firebase from 'firebase'

const temp = () => {

  firebase.database()
    .ref('/Lists/' + 1)
    .set([
      {
        id: uuid(),
        text: 'Call Dor',
      },
      {
        id: uuid(),
        text: 'Review',
      },
      {
        id: uuid(),
        text: 'Coding',
      },
      {
        id: uuid(),
        text: 'Something',
      },
    ])
    .then(() => console.log('Data set.'));
}//temp- writing to te database

// temp();//inserting fake data to database

export default function ToDoMain({ route }) {

  const [items, setItems] = useState([])

  const listId = route.params.split('.').join(' ');
  // console.log(listId.split('.').join(' '));

  firebase.database()
    .ref('/Lists/' + listId)
    .once('value')
    .then(snapshot => {

      if (snapshot.val()) {
        // console.log('User data as been restored', snapshot.val());
        const arr = Object.keys(snapshot.val()).map(function (key) {
          return { key: key, ...snapshot.val()[key] };
        });
        setItems(arr);
      }
      else {
        // console.log('the array is null')
        setItems([]);
      };

    });


  const deleteItem = id => {

    const ref1 = firebase.database().ref('/Lists/' + listId).orderByChild('id').equalTo(id);
    ref1.once('value', snapshot => snapshot.forEach(child => child.ref.remove()));
  };


  const addItem = text => {
    if (!text) {
      Alert.alert(
        'No ToDo entered',
        'Please enter a To Do when adding to your To Do List',
        [
          {
            text: 'OK',
            style: 'cancel',
          },
        ],
        { cancelable: true },
      );
    } else {
      setItems(prevItems => {
        return [{ id: uuid(), text, checked: false }, ...prevItems];
      });
      // console.log(text)
      firebase.database()
        .ref('/Lists/' + listId)
        .push({ id: uuid(), text, checked: false })
      // .then(() => console.log('Data set.'));
    }
  };

  const editItem = (id, newText) => {

    const ref1 = firebase.database().ref('/Lists/' + listId).orderByChild('id').equalTo(id);
    ref1.once('value', snapshot => snapshot.forEach(child => child.ref.update({
      text: newText,
    })));

  };

  const itemChecked = (id, checked) => {

    const ref1 = firebase.database().ref('/Lists/' + listId).orderByChild('id').equalTo(id);
    ref1.once('value', snapshot => snapshot.forEach(child => child.ref.update({
      checked: !checked,
    })));

  };

  return (
    <View style={styles.container}>
      <AddItem addItem={addItem} />
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <ListItem
            item={item}
            deleteItem={deleteItem}
            editItem={editItem}
            itemChecked={itemChecked}
          />

        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

