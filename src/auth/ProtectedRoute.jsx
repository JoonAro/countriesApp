import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { auth } from "../auth/firebase";

//NB: There is a better way of doing this, rather than having a repeated Route like the above. I want you to discover this and present it and explain it in our next lesson.
//Hint: Instead of using ProtectedRoute to wrap every child component, you can do this process inside the ProtectedRoute directly. Then you should be able to access it from App.jsx like this:
{/* <Route
path="/countries"
element={<ProtectedRoute component={Countries} />}
/> */}

const ProtectedRoute = ({ children }) => {
    const [user, loading, error] = useAuthState(auth);
    // console.log("user", user);
    // console.log("children", children);

    if (loading) {
        return <div>Loading...</div>
    }
    return user ? children : <Navigate to="/login" replace />
};

export default ProtectedRoute