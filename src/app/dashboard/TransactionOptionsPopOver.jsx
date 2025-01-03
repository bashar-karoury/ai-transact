import styles from "./dashboard.module.css";
import {
  MicrophoneIcon,
  CalendarIcon,
  TagIcon,
  PlusIcon,
  EllipsisVerticalIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function TranasactionOptionsPopOver({
  transactions,
  popoverPosition,
  showPopover,
  setShowPopover,
}) {
  return (
    <>
      {showPopover && (
        <div
          className={styles.popover}
          style={{
            top: popoverPosition.y,
            left: popoverPosition.x,
          }}
        >
          <div className={styles.popoverHeader}>
            <h3>Edit Transaction</h3>
            <button
              className={styles.closeButton}
              onClick={() => {
                // showPopover = false;
                setShowPopover(false);
              }}
            >
              ×
            </button>
          </div>
          <div className={styles.popoverContent}>
            <button
              className={styles.popoverButton}
              onClick={() => {
                // Add edit logic here
                //showPopover = false;
                setShowPopover(false);
              }}
            >
              Edit
            </button>
            <button
              className={styles.popoverButton}
              onClick={() => {
                // Add delete logic here
                showPopover = false;
                setShowPopover(false);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </>
  );
}
