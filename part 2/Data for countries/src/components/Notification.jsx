function Notification({message}) {
    if (!message) {
        return null;
    } else {
        return <p>Too many matches, specify another filter</p>
    }
}

export default Notification;