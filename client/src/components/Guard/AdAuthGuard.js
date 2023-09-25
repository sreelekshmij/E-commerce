import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";

const AdAuthGuard = ({ allowedRoles, element }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const uid = localStorage.getItem("user");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/v1/users/${uid}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = response.data;

        // Check if data is an object
        if (typeof data === "object" && !Array.isArray(data)) {
          // Set the user state
          setUser(data);
        } else {
          console.error("Invalid response data format:", data);
          // Handle the error or return an appropriate value
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        // Handle the error or return an appropriate value
      }
    };

    fetchUser();
  }, [uid]);
  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  if (!user) {
    // If user data is still loading, you can return a loading indicator or null
    return null;
  }

  console.log("isLoggedIn:", isLoggedIn);
  console.log("user:", user);
  console.log("allowedRoles:", allowedRoles);
  if (allowedRoles) {
    if (user.isAdmin && allowedRoles.includes('admin')) {
      console.log(element, "elr");
      return element;
    } else if (!user.isAdmin && allowedRoles.includes("user")) {
      return element;
    }
  }
  if(user.isAdmin){
  return <Navigate to="/admin" />;
  }
  else{
    return <Navigate to="/unauthorised" />;
  }
};

export default AdAuthGuard;

