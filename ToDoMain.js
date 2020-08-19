import React, {useState} from 'react';
import {View, StyleSheet, FlatList, Alert} from 'react-native';
import Header from './components/Header';
import ListItem from './components/ListItem';
import AddItem from './components/AddItem';
import uuid from 'react-native-uuid';

import * as firebase from 'firebase'

const temp = () =>{
        
  firebase.database()
  .ref('/Users/'+1)
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
 

const ToDoMain = () => {

  const [items, setItems] = useState([])   


  firebase.database()
    .ref('/Users/'+1)
    .once('value')
    .then(snapshot => {
      // console.log('User data as been restored', snapshot.val());
      const arr = Object.keys(snapshot.val()).map(function(key) {
        return { key:  key,...snapshot.val()[key] };
      });
      setItems(arr);
    });


  const deleteItem = id => {
    const ref1 = firebase.database().ref('/Users/'+1).orderByChild('id').equalTo(id);
    ref1.once('value', snapshot=> snapshot.forEach(child => child.ref.remove()));
  };

 
  const addItem = text => {
    if (!text) {
      Alert.alert(
        'No ToDo entered',
        'Please enter a To Do when adding to your To Do list',
        [
          {
            text: 'OK',
            style: 'cancel',
          },
        ],
        {cancelable: true},
      );
    } else {
      setItems(prevItems => {
        return [{id: uuid(), text, checked: false}, ...prevItems];
      });
      // console.log(text)
      firebase.database()
      .ref('/Users/'+1)
      .push({id: uuid(), text, checked: false})
      // .then(() => console.log('Data set.'));
    }
  };

  // const editItem = (id, text) => {
  // };

  const itemChecked = (id, checked) => {
    
    const ref1 = firebase.database().ref('/Users/'+1).orderByChild('id').equalTo(id);
    ref1.once('value', snapshot=> snapshot.forEach(child => child.ref.update({
      checked: !checked,
    })));

  };

  return (
    <View style={styles.container}>
      <Header title="To Do List" />
      <AddItem addItem={addItem} />
      <FlatList
        data={items}
        renderItem={({item}) => (
          <ListItem
            item={item}
            deleteItem={deleteItem}
            // editItem={editItem}
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

export default App;