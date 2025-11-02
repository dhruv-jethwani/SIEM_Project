import React, { useState } from "react";
import { Link } from "react-router-dom";

function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault(); //basically it prevents the page from reloading when a form is submitted as that will lead to loss of data entered
        console.log("Registered with details, ",{email, password});
    };

    return (
        <div className="form-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email: </label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Password: </label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Submit</button>
            </form>
            {/* Link is basically a href */}
            <p>Don't have an account? <Link to="/login">Register here </Link></p> 
        </div>
    );
}

export default RegisterPage;