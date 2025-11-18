import { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json(); // prvo parsiraj u JSON

      if (!res.ok) {
        // server je vratio grešku, prikazi msg
        setMsg(data.msg || "Greška prilikom prijave");
        return;
      }

      // uspešan login
      localStorage.setItem("token", data.token);
      setMsg(data.msg || "Uspešno ste prijavljeni!");
      setForm({ email: "", password: "" });
    } catch (err) {
      console.error("Fetch error:", err);
      setMsg("Greška sa serverom");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Lozinka"
          value={form.password}
          onChange={handleChange}
        />
        <button type="submit">Prijavi se</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}
