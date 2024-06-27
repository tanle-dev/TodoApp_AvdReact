

import { Task } from '@/constants/types';
import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Switch, TextInput, View } from 'react-native';
import uuid from "react-native-uuid";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ThemedText } from './ThemedText';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    addTask: (task: Task) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, addTask}) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [taskTitle, setTaskTitle] = useState('');
    const [isCompleted, setIsCompleted] = useState(false);

    const handleClose = () => {
        setIsAnimating(true);
        setTimeout(() => {
            setIsAnimating(false);
            onClose();
        }, 300); // Adjust the duration of the animation as needed
    };

    const addNewTask = () => {
        if (taskTitle.trim() === '') {
            Alert.alert('Error', 'Task title cannot be empty');
            return;
        }

        addTask(new Task(
            uuid.v4(),
            taskTitle,
            isCompleted,
        ));

        setTaskTitle('');
        setIsCompleted(false);
        handleClose();
    }

    if (!isOpen) {
        return null;
    }

    return (
        <View style={styles.modalView}>
            <View style={{
                backgroundColor: 'white',
                paddingBottom: 40,
                paddingTop: 15,
                paddingHorizontal: 20,
                borderRadius: 10,
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                width: '80%',
            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <ThemedText type="subtitle">Add New Task</ThemedText>
                    <Pressable onPress={handleClose}>
                        <Icon name="times" size={30} color="red"/>
                    </Pressable>
                </View>

                <TextInput
                    editable
                    numberOfLines={1}
                    maxLength={40}
                    placeholder='Enter title here...'
                    onChangeText={text => setTaskTitle(text)}
                    value={taskTitle}
                    style={{
                        padding: 10,
                        marginVertical: 10,
                        marginTop: 30,
                        borderWidth: 1,
                        borderRadius: 10,
                    }}
                />

                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        marginTop: 8,
                    }}
                >
                    <ThemedText style={{
                        color: 'red',
                        marginRight: 8,
                    }}>Due</ThemedText>
                    <Switch value={isCompleted} onValueChange={() => setIsCompleted(!isCompleted)}/>
                    <ThemedText style={{
                        color: 'green',
                        marginLeft: 8,
                    }}>Done</ThemedText>
                </View>

                <Pressable 
                    style={{
                        backgroundColor: '#b7e4c7',
                        padding: 12,
                        borderRadius: 10,
                        width: '100%',
                        marginTop: 20,
                        alignSelf: 'center',
                    }}
                    onPress={addNewTask}
                >
                    <ThemedText type="default" style={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                    }}>Add Task</ThemedText>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    modalView: {
      position: 'absolute',
      zIndex: 1,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'transparent', // Adjust the background color as needed
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default Modal;