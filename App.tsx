import React, {useState} from 'react';
import {RadioButton} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Pressable,
} from 'react-native';

const storeData = async (value) => {
  try {
    await AsyncStorage.setItem('my-key', value);
  } catch (e) {
    // saving error
  }
};

type Reminder = {
  title: string;
  completed: boolean;
};

const defaultReminders: Reminder[] = [
  {
    title: 'Subscribe to notJust.dev',
    completed: false,
  },
  {
    title: 'Build exciting apps',
    completed: false,
  },
  {
    title: 'Be happy',
    completed: false,
  },
];

function App(): JSX.Element {
  const [reminders, setReminders] = useState<Reminder[]>(defaultReminders);
  const [newReminder, setNewReminder] = useState('');
  const sortedReminders = [...reminders].sort((a, b) => a.completed - b.completed);
  const toggleCompletion = (reminder: Reminder) => {
    const updatedReminders = [...reminders];
    const index = reminders.findIndex(r=>r.title === reminder.title);
    updatedReminders[index].completed = !updatedReminders[index].completed;
    setReminders(updatedReminders);
  };

  const addReminder = () => {
    if (newReminder.trim() === '') {
      const updatedReminders = [
        ...reminders,
        {title: newReminder.trim(), completed: false},
      ];
      setReminders(updatedReminders);
      setNewReminder('');
    }
  };

  const renderItem = ({item, index}: {item: Reminder; index: number}) => (
    <Pressable onPress={() => toggleCompletion(index)} style={styles.item}>
      <RadioButton
        value={item.title}
        status={item.completed ? 'checked' : 'unchecked'}
        color="royalblue"
      />
      <Text style={styles.itemTitle}>{item.title}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 15,
        }}>
        <Text style={styles.title}>Reminders</Text>
        <Text style={styles.title}>{reminders.length}</Text>
      </View>
      <FlatList data={reminders} renderItem={renderItem} />;
      <TextInput
        style={styles.input}
        onChangeText={setNewReminder}
        value={newReminder}
        placeholder="Add a new reminder"
        onSubmitEditing={addReminder}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    //backgroundColor: '#211D2D',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#454547',
    paddingVertical: 5,
  },
  itemTitle: {
    flex: 1,
    marginLeft: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'royalblue',
  },
  input: {
    padding: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#454547',
    borderRadius: 5,
  },
});

export default App;
