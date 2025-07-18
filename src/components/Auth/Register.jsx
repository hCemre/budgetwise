import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Kayıt başarılı!");
    } catch (err) {
      alert("Hata: " + err.message);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Kayıt Ol</h2>
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
      <button type="submit">Kayıt Ol</button>
    </form>
  );
}
