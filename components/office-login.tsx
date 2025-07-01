import { useState } from "react";
import { useAuth } from "context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, role: "office" }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("Login successful for user:", username);
        login(data.token); // sets token & redirects
      } else {
        // Check error message from backend for detailed feedback
        if (data.message === "Invalid credentials") {
          console.warn("Wrong password or username for user:", username);
          alert("Login failed: Wrong username or password.");
        } else if (data.message === "User does not exist") {
          console.warn("User does not exist:", username);
          alert("Login failed: User does not exist.");
        } else {
          console.warn("Login failed:", data.message || "Unknown error");
          alert("Login failed: " + (data.message || "Unknown error"));
        }
      }
    } catch (err) {
      console.error("Login request error:", err);
      alert("Login failed: Network or server error");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Usernamesssss"
        style={{ display: "block", width: "100%", marginBottom: 10 }}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        style={{ display: "block", width: "100%", marginBottom: 10 }}
      />
      <button onClick={handleSubmit} style={{ width: "100%" }}>
        Login
      </button>
    </div>
  );
}
