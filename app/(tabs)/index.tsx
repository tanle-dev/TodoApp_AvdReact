import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import uuid from "react-native-uuid";
import { ThemedText } from '../../components/ThemedText';
import { Task } from '../../constants/types'; // Update the import path
import TaskComponent from '../task'; // Update the import path

export default function HomeScreen() {
  var tasks: Task[] = [];
  tasks.push(new Task(uuid.v4(), "Task 1", false));
  tasks.push(new Task(uuid.v4(), "Task 2", true));
  tasks.push(new Task(uuid.v4(), "Task 3", false));

  const [taskList, setTaskList] = useState<Task[]>(tasks);

  const handleStateToggle = (task: Task) => {
    // Update the task object
    task.completed = !task.completed;
    setTaskList([...taskList]);
  }

  const deleteTask = (task: Task) => {
    // Remove the task object
    setTaskList(taskList.filter((t) => t.id !== task.id));
  }

  return (
    <SafeAreaView>
      <ScrollView>
          <ThemedText style={styles.titleContainer} type="title">Todo App</ThemedText>

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
    marginBottom: 8,
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
