import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text} from 'react-native';
import * as SQLite from'expo-sqlite';
import { Input, ListItem, Button, Icon } from'react-native-elements';

export default function Places({ navigation })  {
  const db = SQLite.openDatabase('shoplist.db');
  const [listItem, setListItem] = useState('');
  const [listQuantity, setListQuantity] = useState('');
  const [shopping, setShopping] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists shopping (id integer primary key not null, item text, quantity text);');
    }, null, updateList);
  }, []);

  const addPressed = () => { 
    db.transaction(tx => {
      tx.executeSql('insert into shopping (item, quantity) values (?, ?);',
        [listItem, listQuantity]);
      }, null, updateList)
      setListItem('');
      setListQuantity('');
  }

  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from shopping;', [], (_, { rows }) =>
         setShopping(rows._array)
      );
     }, null, null);
  }

  const deleteItem = (id) => {
    db.transaction(
    tx => {
    tx.executeSql('delete from shopping where id = ?;', [id]);
  }, null, updateList) 
  }

  return (
    
    <View style={styles.container}>
      <View>
      <Input   
          placeholder='Type in address' label='PLACEFINDER' style='input'
          onChangeText={listItem => setListItem(listItem)} value={listItem}
      />
      </View>
      <View style={styles.buttoncontainer}>
        <View style={styles.button}>
        <Button color="#d3d3d3" raised icon={{ name: 'save', color: '#fff' }} onPress={addPressed} title="SAVE" />
        </View>
      </View>
      <FlatList 
        data={shopping}
        renderItem = {({ item }) => (
          <ListItem bottomDivider>
            <ListItem.Content>

              <View  style={styles.listcontainer}>
              <View>
                <ListItem.Title>{item.item}</ListItem.Title>
              </View> 
              <View style={styles.buttoncontainer}>
                <Text style={{ color: "grey" }} onPress={() => navigation.navigate('Map',{ item })} onLongPress={() => deleteItem(item.id)}>show on map</Text>
                <ListItem.Chevron type="material" color ='gray' onPress={() => navigation.navigate('Map',{ item })} onLongPress={() => deleteItem(item.id)}/>
              </View>
              </View>
            </ListItem.Content>
          </ListItem>
        )}
        keyExtractor={item => item.id.toString()}
        />

      <StatusBar style="auto" />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  buttoncontainer : {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
    
  },

  button : {
    width: '95%',
    marginBottom: 30,
    color:'gray'
  },

  input : {
    width:200  , 
    alignItems: 'left',
    marginTop: 30,
  },

  listcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'

   },

   headtext : {

  },
});