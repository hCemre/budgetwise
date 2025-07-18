import { useEffect, useState } from "react";
import { db, auth } from "../../services/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

export default function EntryList() {
  const [entries, setEntries] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        setEntries([]);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!user) return; // Kullanıcı yoksa sorguyu yapma

    const q = query(
      collection(db, "entries"),
      where("uid", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEntries(data);
    });

    return () => unsubscribe();
  }, [user]);

  const totalIncome = entries
    .filter((e) => e.type === "income")
    .reduce((sum, e) => sum + e.amount, 0);
  const totalExpense = entries
    .filter((e) => e.type === "expense")
    .reduce((sum, e) => sum + e.amount, 0);

  return (
    <div>
      <h3>Kayıtlar</h3>
      <ul>
        {entries.map((e) => (
          <li key={e.id}>
            {e.description} - {e.amount} TL ({e.type === "income" ? "Gelir" : "Gider"})
          </li>
        ))}
      </ul>
      <hr />
      <p>Toplam Gelir: {totalIncome} TL</p>
      <p>Toplam Gider: {totalExpense} TL</p>
      <p><strong>Bakiye: {totalIncome - totalExpense} TL</strong></p>
    </div>
  );
}
