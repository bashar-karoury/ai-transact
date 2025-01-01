// 'use client'
// import { useState } from 'react';

// export default function SignInForm({ styles }) {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Sign in:', formData);
//   };

//   return (
//     <form onSubmit={handleSubmit} className={styles.authForm}>
//       <h2 className={styles.formTitle}>Sign In</h2>
//       <div className={styles.formGroup}>
//         <label className={styles.label}>Email</label>
//         <input
//           type="email"
//           className={styles.input}
//           placeholder="Enter your email"
//           value={formData.email}
//           onChange={(e) => setFormData({...formData, email: e.target.value})}
//           required
//         />
//       </div>
//       <div className={styles.formGroup}>
//         <label className={styles.label}>Password</label>
//         <input
//           type="password"
//           className={styles.input}
//           placeholder="Enter your password"
//           value={formData.password}
//           onChange={(e) => setFormData({...formData, password: e.target.value})}
//           required
//         />
//       </div>
//       <button type="submit" className={styles.button}>Sign In</button>
//     </form>
//   );
// } 