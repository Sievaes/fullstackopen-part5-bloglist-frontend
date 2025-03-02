import { useEffect } from "react";
import styles from "./NotificationField.module.css";

const NotificationField = ({
  notification,
  setNotification,
  isError,
  setIsError,
}) => {
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification("");
        setIsError(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification, setNotification]);

  if (!notification) return null;

  return (
    <div className={isError ? styles.error : styles.info}>{notification}</div>
  );
};

export default NotificationField;
