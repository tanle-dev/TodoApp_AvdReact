import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Task } from "@/constants/types";
import { Pressable, Switch, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function TaskComponent({task, stateToggle, deleteTask}: {task: Task, stateToggle: (task: Task) => void, deleteTask: (task: Task) => void}) {

    const handleStateToggle = () => {
        // Update the task object
        stateToggle(task);
    }

    const handleDeleteTask = () => {
        // Remove the task object
        deleteTask(task);
    }

    return (
        <ThemedView style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        }}>
            <View>
                <View>
                    <ThemedText type="subtitle">{task.title}</ThemedText>
                </View>
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
                    <Switch value={task.completed} onValueChange={handleStateToggle}/>
                    <ThemedText style={{
                        color: 'green',
                        marginLeft: 8,
                    }}>Done</ThemedText>
                </View>
            </View>
            <Pressable onPress={handleDeleteTask}>
                <Icon name="trash" size={25} color="red"/>
            </Pressable>
        </ThemedView>
    );
}
