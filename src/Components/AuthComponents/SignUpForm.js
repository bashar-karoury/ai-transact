// 'use client'
// import { useState } from 'react';

// export default function SignUpForm({ styles }) {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: ''
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Sign up:', formData);
//   };

//   return (
//     <form onSubmit={handleSubmit} className={styles.authForm}>
//       <h2 className={styles.formTitle}>Sign Up</h2>
//       <div className={styles.formGroup}>
//         <label className={styles.label}>Full Name</label>
//         <input
//           type="text"
//           className={styles.input}
//           placeholder="Enter your full name"
//           value={formData.name}
//           onChange={(e) => setFormData({...formData, name: e.target.value})}
//           required
//         />
//       </div>
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
//           placeholder="Create a password"
//           value={formData.password}
//           onChange={(e) => setFormData({...formData, password: e.target.value})}
//           required
//         />
//       </div>
//       <button type="submit" className={styles.button}>Sign Up</button>
//     </form>
//   );
// } 