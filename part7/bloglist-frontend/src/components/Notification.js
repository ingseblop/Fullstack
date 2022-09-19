import { Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  if (notification === null) {
    return null
  } else {
    return (
      <div>
        <Alert variant="danger">{notification.message}</Alert>
        <hr size="8px" color="red" />
      </div>
    )
  }
}

export default Notification
