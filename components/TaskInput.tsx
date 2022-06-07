import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import {TaskSchema} from '../App';

type Props = {
  tasks: TaskSchema[];
  setTasks: React.Dispatch<React.SetStateAction<TaskSchema[]>>;
};

const TaskInput: React.FC<Props> = ({tasks, setTasks}) => {
  const [task, setTask] = useState<string>('');

  const createNewTask = () => {
    if (task.length > 0) {
      setTasks([
        ...tasks,
        {id: Date.now().toString(), task: task, complete: false},
      ]);
      setTask('');
    } else {
      Alert.alert('Please add a task.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.taskInputContainer}>
      <View style={styles.taskInputComponents}>
        <TextInput
          placeholder="Add task here"
          style={[styles.taskInput, styles.taskInputComponentShadow]}
          onChangeText={input => setTask(input)}
          value={task}
        />

        <TouchableOpacity
          activeOpacity={0.6}
          style={[styles.taskAdd, styles.taskInputComponentShadow]}
          onPress={createNewTask}>
          <Text>+</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  taskInputContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  taskInputComponents: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  taskInputComponentShadow: {
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 30,
  },
  taskInput: {
    backgroundColor: '#FFFFFF',
    width: 246,
    paddingVertical: 15,
    borderRadius: 60,
    textAlign: 'center',
  },
  taskAdd: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 52,
  },
});

export default TaskInput;
