import React, {useState} from 'react';
import {StyleSheet, Text, View, SafeAreaView, FlatList} from 'react-native';
import Task from './components/Task';
import TaskInput from './components/TaskInput';

export type TaskSchema = {
  id: string;
  task: string;
  complete: boolean;
};

export default function App() {
  const [tasks, setTasks] = useState<TaskSchema[]>([]);
  console.log(tasks);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Today's Tasks</Text>
      <View style={styles.tasks}>
        {tasks.length > 0 ? (
          <FlatList
            keyExtractor={item => item.id}
            data={tasks}
            renderItem={({item}) => (
              <Task
                tasks={tasks}
                setTasks={setTasks}
                id={item.id}
                task={item.task}
                complete={item.complete}
              />
            )}
          />
        ) : (
          <Text>No tasks added yet..</Text>
        )}
      </View>
      <TaskInput tasks={tasks} setTasks={setTasks} />
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
