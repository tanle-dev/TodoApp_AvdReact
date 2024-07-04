import Modal from '@/components/AddModal';
import useFirebase from '@/hooks/useFirebase';
import React, { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ThemedText } from '../../components/ThemedText';
import { Task } from '../../constants/types'; // Update the import path
import TaskComponent from '../task'; // Update the import path

export default function HomeScreen() {

  const [taskList, setTaskList] = useState<Task[]>([] as Task[]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    useFirebase().fetchData().then((data) => {
      if (data !== undefined) setTaskList(data as Task[]);
    });
  }, []);
  
  const handleStateToggle = (task: Task) => {
    // Update the task object
    task.completed = !task.completed;
    useFirebase().updateData(task.id, task)
    let taskIndex = taskList.findIndex((t) => t.id === task.id);
    taskList[taskIndex] = task;
    setTaskList([...taskList]);
  }

  const deleteTask = (task: Task) => {
    // Remove the task object
    setTaskList(taskList.filter((t) => t.id !== task.id));
    useFirebase().deleteData(task.id);
  }

  const handleAddBtnClick = () => {
    setModalVisible(true);
  }

  const addNewTask = (task: Task) => {
    setTaskList([...taskList, task]);
  }

  return (
    <SafeAreaView style={{
      height: '100%',
    }}>
      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} addTask={addNewTask}/>
      
      <ScrollView>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 8,
          marginBottom: 8,
          backgroundColor: '#fefae0',
        }}>
          <ThemedText style={styles.titleContainer} type="title">Todo App</ThemedText>

          <Pressable style={{
            marginEnd: 8,
            padding: 12,
            backgroundColor: '#b7e4c7',
            borderRadius: 50,
          }} onPress={handleAddBtnClick}>
            <Icon name="plus" size={25} color="green"/>
          </Pressable>
        </View>
          

          {taskList.map((task) => (
            <TaskComponent key={task.id.toString()} task={task} stateToggle={handleStateToggle} deleteTask={deleteTask}/>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    color: '#6a994e',
    backgroundColor: '#fefae0',
    padding: 8,
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
