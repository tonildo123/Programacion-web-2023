import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";



const useFirebaseRegister = () => {

    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleRegister = async (email, password, repassword) => {
        if (password !== repassword) {
            return setError('Las contraseñas no coinciden');
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password)
                .then(async (userCredential) => {
                    Swal.fire({
                        title: 'Usuario creado con éxito',
                        text: email,
                        icon: 'success',
                        confirmButtonText: 'Ok',
                    });

                    navigate('/login');
                })
                .catch((error) => {
                    setError(error.message);
                });
        } catch (error) {
            setError(error.message);
        }
    };

    return { handleRegister, error, setError };
};

export default useFirebaseRegister;
