import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import Task from './components/Task';
import TaskInput from './components/TaskInput';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Today's Tasks</Text>
      <View style={styles.tasks}>
        <Task name={'yes'} />
        <Task name={'no'} />
      </View>
      <TaskInput />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  heading: {
    fontSize: 24,
    lineHeight: 28,
    fontWeight: '700',
    marginTop: 60,
    marginBottom: 20,
    marginLeft: 20,
  },
  tasks: {
    display: 'flex',
    alignItems: 'center',
  },
});
