import { connect } from 'react-redux'

const Notification = (props) => {
  const notification = () => {
    return props.notifications
  }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (notification() === null) {
    return null
  }

  return (
    <div style={style}>
      {notification()}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications.message,
  }
}

const ConnectedNotifications = connect(
  mapStateToProps
)(Notification)

export default ConnectedNotifications