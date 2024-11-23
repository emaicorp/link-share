import { auth } from '@/firebase.config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { FirebaseError } from 'firebase/app';
import { toast, ToastContainer, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



class UserService {
    async createUser(email: string, password: string): Promise<UserCredential> {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            toast.success("User created successfully");
            return userCredential;
        } catch (error: unknown) {
            if (error instanceof FirebaseError) { // Check if it's a FirebaseError
                switch (error.code) {
                    case "auth/wrong-password":
                        alert("Incorrect password. Please try again.");
                        break;
                    case "auth/user-not-found":
                        alert("User not found. Please check your email address.");
                        break;
                    // Add more error code cases as needed
                    default:
                        alert("An error occurred during login. Please try again later.");
                }
            } else {
                // Handle other types of errors
                console.error("An unexpected error occurred:", error);
                alert("An error occurred during user creation. Please try again later.");
            }
            console.error("Error creating user:", error);
            throw error;
        }
    }

    async loginUser(email: string, password: string): Promise<UserCredential> {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return userCredential;
        } catch (error: unknown) {
            if (error instanceof FirebaseError) {
               
                switch (error.message) {

                    case "Firebase: Error (auth/invalid-credential).":
                        toast.error('Incorrect Username / Password. Please try again.');
                      
                        break;
                    case "Firebase: Error (auth/user-not-found).":
                        toast.error("User not found. Please check your email address.");
                        break;
                    // Add more error code cases as needed
                    default:
                        toast.error(" Please try again later.");
                }
                // alert(error.message)
            } else {
                // Handle other types of errors
                console.error("An unexpected error occurred:", error);
                toast.error("An error occurred during login. Please try again later.");
            }
            toast.error("Error logging in user");
            throw error;
        }
    }
}

const userServices = new UserService();
export default userServices;
