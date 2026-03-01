import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import useAuthStore from '../store/authStore';

const Login = () => {
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });
  const [error, setError] = useState('');
  
  const { login, signup } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (isLoginTab) {
      // Logic for Login
      const result = await login(formData.email, formData.password);
      if (result.success) {
        navigate('/dashboard'); // Redirect after success
      } else {
        setError(result.message);
      }
    } else {
      // Logic for Signup
      const result = await signup(formData);
      if (result.success) {
        alert("Registration successful! Please log in.");
        setIsLoginTab(true);
      } else {
        setError(result.message);
      }
    }
  };

  return (
    <div className="login-container">
      <h2>CRM Midterm Project</h2>
      <div className="tab-buttons">
        <button onClick={() => setIsLoginTab(true)} className={isLoginTab ? 'active' : ''}>Log In</button>
        <button onClick={() => setIsLoginTab(false)} className={!isLoginTab ? 'active' : ''}>Sign Up</button>
      </div>

      <form onSubmit={handleSubmit}>
        {!isLoginTab && (
          <input 
            type="text" placeholder="Full Name" 
            onChange={(e) => setFormData({...formData, name: e.target.value})} 
            required 
          />
        )}
        <input 
          type="email" placeholder="Email Address" 
          onChange={(e) => setFormData({...formData, email: e.target.value})} 
          required 
        />
        <input 
          type="password" placeholder="Password" 
          onChange={(e) => setFormData({...formData, password: e.target.value})} 
          required 
        />
        
        {!isLoginTab && (
          <select onChange={(e) => setFormData({...formData, role: e.target.value})}>
            <option value="user">User</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
        )}

        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">{isLoginTab ? 'Log In' : 'Sign Up'}</button>
      </form>
    </div>
  );
};

export default Login;