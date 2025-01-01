// 'use client'
// import { useState } from 'react';
// import { 
//   EnvelopeIcon, 
//   LockClosedIcon,
//   EyeIcon,
//   EyeSlashIcon
// } from '@heroicons/react/24/outline';

// export default function Login() {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle login logic here
//     console.log('Login attempt:', formData);
//   };

//   return (
//     <div className="login-container">
//       <div className="login-card">
//         <div className="login-header">
//           <h1>AI-Transact</h1>
//           <p>Welcome back! Please login to your account.</p>
//         </div>

//         <form onSubmit={handleSubmit} className="login-form">
//           <div className="form-group">
//             <label>Email</label>
//             <div className="input-with-icon">
//               <EnvelopeIcon className="input-icon" />
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 value={formData.email}
//                 onChange={(e) => setFormData({...formData, email: e.target.value})}
//                 required
//               />
//             </div>
//           </div>

//           <div className="form-group">
//             <label>Password</label>
//             <div className="input-with-icon">
//               <LockClosedIcon className="input-icon" />
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Enter your password"
//                 value={formData.password}
//                 onChange={(e) => setFormData({...formData, password: e.target.value})}
//                 required
//               />
//               <button
//                 type="button"
//                 className="password-toggle"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? (
//                   <EyeSlashIcon className="toggle-icon" />
//                 ) : (
//                   <EyeIcon className="toggle-icon" />
//                 )}
//               </button>
//             </div>
//           </div>

//           <div className="form-options">
//             <label className="remember-me">
//               <input
//                 type="checkbox"
//                 checked={rememberMe}
//                 onChange={(e) => setRememberMe(e.target.checked)}
//               />
//               <span>Remember me</span>
//             </label>
//             <a href="#" className="forgot-password">Forgot password?</a>
//           </div>

//           <button type="submit" className="login-button">
//             Login
//           </button>
//         </form>

//         <div className="login-footer">
//           <p>Don't have an account? <a href="/signup">Sign up</a></p>
//         </div>
//       </div>
//     </div>
//   );
// } 