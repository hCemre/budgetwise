import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Giriş başarılı!");
    } catch (err) {
      alert("Hata: " + err.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Giriş Yap</h2>
      <input
        type="email"
        placeholder="E-posta"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Şifre"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Giriş Yap</button>
    </form>
  );
}
