'use client'

export default function SignOutButton({ styles }) {
  const handleSignOut = () => {
    console.log('Signing out...');
  };

  return (
    <button 
      onClick={handleSignOut} 
      className={styles.signOutButton}
      style={{ background: '#12456e' }}
    >
      Sign Out
    </button>
  );
} 