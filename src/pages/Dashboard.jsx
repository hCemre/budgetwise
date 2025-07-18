import { signOut } from "firebase/auth";
import { db, auth } from "../services/firebase";
import AddEntry from "../components/Budget/AddEntry";
import EntryList from "../components/Budget/EntryList";

export default function Dashboard({ user }) {
  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div>
      <h2>Hoş geldin, {user.email}</h2>
      <button onClick={handleLogout}>Çıkış Yap</button>
      <hr />
      <AddEntry />
      <EntryList />
    </div>
  );
}
