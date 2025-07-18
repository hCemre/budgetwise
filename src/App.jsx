// src/App.jsx
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./services/firebase";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Kullanıcı giriş yaptı mı diye kontrol et
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe(); // componentWillUnmount
  }, []);

  if (loading) return <p>Yükleniyor...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>BudgetWise</h1>
      {user ? (
        <Dashboard user={user} />
      ) : (
        <div style={{ display: "flex", gap: "2rem" }}>
          <Register />
          <Login />
        </div>
      )}
    </div>
  );
}

export default App;
