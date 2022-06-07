import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {TaskSchema} from '../App';

const Task: React.FC<TaskSchema> = props => {
  const {task, complete} = props;
  return (
    <View style={styles.task}>
      <TouchableOpacity style={styles.completeToggle}></TouchableOpacity>
      <Text>{task}</Text>
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
    backgroundColor: 'rgba(85, 188, 246, 0.4)',
    borderRadius: 5,
    marginRight: 10,
  },
});

export default Task;
