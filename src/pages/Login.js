import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Login = () => {
  const [form, setForm] = useState({ mobile: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("businessOwner", JSON.stringify(res.data.owner));
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.title}>Login</h1>

          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="text"
              name="mobile"
              placeholder="Mobile Number"
              onChange={handleChange}
              required
              style={styles.input}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              style={styles.input}
            />

            <button
              type="submit"
              style={styles.button}
              onMouseOver={(e) => {
                e.target.style.background =
                  "linear-gradient(135deg, #fff, #e6e6e6)";
                e.target.style.color = "#083ca0";
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 6px 18px rgba(0,0,0,0.15)";
              }}
              onMouseOut={(e) => {
                e.target.style.background =
                  "linear-gradient(135deg, #083ca0, #001a66)";
                e.target.style.color = "#fff";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
              }}
            >
              Login
            </button>

            <p style={styles.footerText}>
              Don’t have an account?{" "}
              <span onClick={() => navigate("/signup")} style={styles.link}>
                Sign Up
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f8f9ff, #eceef7)", // subtle premium gradient
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start", // push card upward instead of exact center
    padding: "20px",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  card: {
    background: "rgba(255, 255, 255, 0.85)", // glass effect
    backdropFilter: "blur(20px)",
    borderRadius: "20px",
    padding: "40px 30px",
    boxShadow: "0 15px 40px rgba(0, 0, 0, 0.08)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
    transition: "all 0.3s ease",
    marginTop: "80px", // ✅ card sits higher on mobile
  },
  title: {
    fontSize: "30px",
    fontWeight: "700",
    color: "#083ca0",
    marginBottom: "20px",
  },
  subtitle: {
    fontSize: "15px",
    color: "#555",
    marginBottom: "30px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "16px 18px",
    marginBottom: "18px",
    borderRadius: "14px",
    border: "1px solid #ddd",
    outline: "none",
    fontSize: "15px",
    backgroundColor: "#fafafa",
    transition: "all 0.3s ease",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  button: {
    padding: "16px",
    borderRadius: "14px",
    border: "none",
    background: "linear-gradient(135deg, #083ca0, #001a66)",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  footerText: {
    marginTop: "20px",
    fontSize: "14px",
    color: "#444",
  },
  link: {
    color: "#083ca0",
    fontWeight: "600",
    cursor: "pointer",
    marginLeft: "4px",
  },
};


export default Login;
