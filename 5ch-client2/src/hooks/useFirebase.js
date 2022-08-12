import firebaseInitialization from "../components/Firebase/Firebase.init";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword,
sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup  } from "firebase/auth";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';


firebaseInitialization()

const useFirebase = () => {
    const [user, setUser] = useState({});
    const auth = getAuth();
    // login with google
    const googleProvider = new GoogleAuthProvider();
    const googleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                setUser(user)
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Register Successfully',
                })
            }).catch((error) => {
                const errorMessage = error.message;
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: errorMessage,
                })
            });
    }
    //   register
    const registerUser = (email, password, name,reset) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                // Signed in  ;
                setUser(result.user);
                console.log(result.user)
                // update user
                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(() => {
                    // Profile updated!
                    // ...
                }).catch((error) => {
                    // console.log(error.message)
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: error.message,
                    })
                });
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Register Successfully',
                })
                reset()
            })
            .catch((error) => {
                const errorMessage = error.message;
                // console.log(errorMessage)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: errorMessage,
                })
            });
    }


    // login
    const loginUser = (email,password,reset) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                // Signed in
                setUser(result.user)
                reset()
            })
            .catch((error) => {
                const errorMessage = error.message;
                // console.log(errorMessage)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: errorMessage,
                })
            });
    }

    // send password email
    const passwordResetWithEmail = (email) => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                // Password reset email sent!
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Password reset email sent!',
                })
            })
            .catch((error) => {
                const errorMessage = error.message;
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: errorMessage,
                })
            });
    }

    //   on auth state change
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            } else {
                setUser({})
            }
        });
    }, [auth])

    return {
        user,
        googleSignIn,
        registerUser,
        loginUser,
        passwordResetWithEmail,
    }

}
export default useFirebase;