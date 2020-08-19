import React, {useState} from 'react';
import {CheckBox, View, Text, StyleSheet, TouchableOpacity, TextInput,} from 'react-native';
import { Icon } from 'react-native-elements'



const ListItem = ({ 
  item,
  deleteItem,
  // editItem,
  itemChecked,
}) => {
  const [isSelected, setSelection] = useState(item.checked);

  return (
    <TouchableOpacity style={styles.listItem}>
      <View style={styles.listItemView}>
      <CheckBox value={isSelected} onValueChange={(newValue) => {setSelection(newValue); itemChecked(item.id, item.checked)}}/>
            <Text>
            {item.text}
          </Text>
          <Icon
            name="delete"
            size={20}
            color="firebrick"
            onPress={() => deleteItem(item.id)}/> 
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  listItemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
});

export default ListItem;