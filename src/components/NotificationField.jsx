import { useEffect } from "react"
import PropTypes from "prop-types"
import styles from "./NotificationField.module.css"

const NotificationField = ({
  notification,
  setNotification,
  isError,
  setIsError,
}) => {
  NotificationField.propTypes = {
    notification: PropTypes.string.isRequired,
    setNotification: PropTypes.func.isRequired,
    isError: PropTypes.bool.isRequired,
    setIsError: PropTypes.func.isRequired,
  }

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification("")
        setIsError(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [notification, setNotification, setIsError])

  if (!notification) return null

  return (
    <div className={isError ? styles.error : styles.info}>{notification}</div>
  )
}

export default NotificationField
