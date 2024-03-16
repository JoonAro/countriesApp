import { useEffect, useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from 'react-router-dom';
import { auth, registerWithEmailAndPassword } from "../auth/firebase";
import { Button } from 'react-bootstrap';

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [user, loading, error] = useAuthState(auth);


    const navigate = useNavigate();

    const register = () => {
        if (!name) alert("Please enter your name");
        registerWithEmailAndPassword(name, email, password);
    }

    useEffect(() => {
        if (loading) return;
        if (user) console.log("User info", user);
        if (user) navigate("/countries");
    }, [user, loading]);

    return (
        <div>
            <h1>Register</h1>
            <input
                type="text"
                value={name}
                placeholder='Full Name'
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                value={email}
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                value={password}
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button className="btn btn-success btn-xs" onClick={register}>Register</Button>
        </div>
    )
};

export default Register;