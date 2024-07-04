import { Task } from "@/constants/types";
import { initializeApp } from "@firebase/app";
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, updateDoc } from "firebase/firestore";


// Initialize Firebase
const app = initializeApp({
    apiKey: "AIzaSyDkWHnYkO5pqnEE0tHrtm7ByVT9PrwMB5s",
    authDomain: "todoapp-avdreact.firebaseapp.com",
    projectId: "todoapp-avdreact",
    storageBucket: "todoapp-avdreact.appspot.com",
    messagingSenderId: "1069464947036",
    appId: "1:1069464947036:web:8b0412089b36a592eb5999"
  });

export default function useFirebase() {
    const db = getFirestore(app);

    const fetchData = async () => {
        try {
        const querySnapshot = await getDocs(collection(db, "tasks"));
        const newData = querySnapshot.docs.map((doc) => ({...doc.data()}));
        return newData; // Ensure newData is returned from the function
    } catch (error) {
        console.error('Error fetching data from Firestore:', error);
    }
    };


    const addData = async (newData: Task) => {
        try {
            const docRef = await addDoc(collection(db, "tasks"), newData);
            console.log(docRef.id);
            return docRef.id;
        } catch (error) {
            console.error('Error adding data to Firestore:', error);
        }
    }

    const updateData = async (id: string, updatedData: Partial<Task>) => {
        try {
            const docRef = await doc(collection(db, "tasks"), id);
            await updateDoc(docRef, updatedData);
            return id;
        } catch (error) {
            console.error('Error updating data in Firestore:', error);
        }
    }

    const deleteData = async (id: string) => {
        try {
            const docRef = await doc(collection(db, "tasks"), id);
            await deleteDoc(docRef);
            return id;
        } catch (error) {
            console.error('Error deleting data from Firestore:', error);
        }
    }

    return { fetchData, addData, updateData, deleteData };
}
