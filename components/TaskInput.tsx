import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

const TaskInput: React.FC = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.taskInputContainer}>
      <View style={styles.taskInputComponents}>
        <TextInput
          placeholder="Add task here"
          style={[styles.taskInput, styles.taskInputComponentShadow]}
        />

        <TouchableOpacity
          activeOpacity={0.6}
          style={[styles.taskAdd, styles.taskInputComponentShadow]}>
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
