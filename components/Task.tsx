import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {TaskSchema} from '../App';

// bug -> when marking a task as done, you have to click twice

type Props = {
  tasks: TaskSchema[];
  setTasks: React.Dispatch<React.SetStateAction<TaskSchema[]>>;
};

const Task: React.FC<TaskSchema & Props> = props => {
  const {id, task, complete, tasks, setTasks} = props;
  const [currentTask, setCurrentTask] = useState<TaskSchema>({
    id: id,
    task: task,
    complete: complete,
  });
  const [editing, setEditing] = useState<boolean>(false);

  console.log(tasks);

  const update = () => {
    setTasks(tasks.map(task => (task.id === id ? currentTask : task)));
  };

  const editCurrentTask = (item: string, value: boolean | string) => {
    setCurrentTask({...currentTask, [item]: value});
    if (item === 'complete') update();
  };

  const updateTask = () => {
    if (task === currentTask.task) setEditing(false);
    else if (currentTask.task.length > 0) {
      update();
      setEditing(false);
    } else {
      Alert.alert('Your task is too short :(');
    }
  };

  return (
    <View style={styles.task}>
      {!editing ? (
        <TouchableOpacity
          style={[
            styles.completeToggle,
            !complete
              ? styles.completeToggleIncomplete
              : styles.completeToggleComplete,
          ]}
          onPress={() =>
            editCurrentTask('complete', !currentTask.complete)
          }></TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[styles.completeToggle, styles.saveToggle]}
          onPress={updateTask}>
          <Text>S</Text>
        </TouchableOpacity>
      )}
      {!editing ? (
        <Text
          style={complete ? styles.taskTextComplete : {}}
          onPress={() => setEditing(!editing)}>
          {task}
        </Text>
      ) : (
        <TextInput
          value={currentTask.task}
          onChangeText={value => editCurrentTask('task', value)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  task: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#F7F7F7',
    marginBottom: 10,
    width: 310, // works fine if not %
    padding: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  completeToggle: {
    width: 24,
    height: 24,
    borderRadius: 5,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskTextComplete: {
    textDecorationLine: 'line-through',
  },
  completeToggleComplete: {backgroundColor: 'green'},
  completeToggleIncomplete: {backgroundColor: 'rgba(85, 188, 246, 0.4)'},
  saveToggle: {backgroundColor: 'orange'},
});

export default Task;
