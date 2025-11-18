import { useState } from "react";

export default function SignUp() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const res = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        // server je vratio grešku
        setMsg(data.msg || "Greška prilikom registracije");
        return;
      }

      // uspešna registracija
      setMsg(data.msg || "Uspešno registrovan korisnik!");
      setForm({ name: "", email: "", password: "" });

      // opcionalno: preusmeri na login
      // window.location.href = "/login";
    } catch (err) {
      console.error("Fetch error:", err);
      setMsg("Greška sa serverom");
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Ime"
          value={form.name}
          onChange={handleChange}
        />
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
        <button type="submit">Registruj se</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}
