import { useState } from "react";
import { db, auth } from "../../services/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function AddEntry() {
  const [type, setType] = useState("income");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description || !amount) return;

    try {
      await addDoc(collection(db, "entries"), {
        uid: auth.currentUser.uid,
        type,
        description,
        amount: parseFloat(amount),
        createdAt: serverTimestamp(),
      });

      setDescription("");
      setAmount("");
    } catch (error) {
      console.error("Kayıt eklenemedi:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="income">Gelir</option>
        <option value="expense">Gider</option>
      </select>
      <input
        type="text"
        placeholder="Açıklama"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Miktar"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button type="submit">Ekle</button>
    
    </form>
  );
}
