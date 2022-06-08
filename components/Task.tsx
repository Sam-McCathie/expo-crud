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

  const update = () => {
    setTasks(tasks.map(task => (task.id === id ? currentTask : task)));
    if (currentTask.complete)
      setCurrentTask({...currentTask, ['complete']: false});
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
    <View style={styles.taskComponents}>
      <View style={styles.task}>
        {!editing ? (
          <TouchableOpacity
            style={[
              styles.toggleBtn,
              !complete ? styles.incompleteBtn : styles.completeBtn,
            ]}
            onPress={() =>
              editCurrentTask('complete', !currentTask.complete)
            }></TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.toggleBtn, styles.saveBtn]}
            onPress={updateTask}>
            <Text>S</Text>
          </TouchableOpacity>
        )}
        {/* <View style={styles.taskLayout}> */}
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
            style={styles.taskEditInput}
          />
        )}
      </View>

      {!complete &&
        (!editing ? (
          <TouchableOpacity style={[styles.toggleBtn, styles.deleteBtn]}>
            <Text style={styles.deleteTxt}>D</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.toggleBtn, styles.closeBtn]}
            onPress={() => setEditing(false)}>
            <Text>X</Text>
          </TouchableOpacity>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  taskComponents: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  task: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#F7F7F7',
    width: 310, // works fine if not %
    padding: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskLayout: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  taskTextComplete: {
    textDecorationLine: 'line-through',
  },
  taskEditInput: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'black',
    width: 240,
    paddingVertical: 2,
    paddingHorizontal: 10,
  },
  toggleBtn: {
    width: 24,
    height: 24,
    borderRadius: 5,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  completeBtn: {backgroundColor: 'green'},
  incompleteBtn: {backgroundColor: 'rgba(85, 188, 246, 0.4)'},
  saveBtn: {backgroundColor: 'orange'},
  deleteBtn: {backgroundColor: 'red', marginLeft: 10},
  deleteTxt: {color: 'white', fontWeight: '700'},
  closeBtn: {backgroundColor: 'yellow', marginLeft: 10},
});

export default Task;
