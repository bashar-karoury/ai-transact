import styles from "@/app/modal.module.css"; // Importing styles (optional, CSS module)

export default function Modal({ isOpen, onClose, title, message }) {
  if (!isOpen) return null; // Render nothing if the modal is not open

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.message}>{message}</p>
        {title === "Error" ? (
          <button className={styles.closeButton} onClick={onClose}>
            Close
          </button>
        ) : null}
      </div>
    </div>
  );
}
