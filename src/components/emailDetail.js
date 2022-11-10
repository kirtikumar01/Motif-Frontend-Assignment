import React from 'react'
import styles from './emailDetail.module.css';

const EmailDetail = ({
    subject,
    body,
    id,
    from_email,
    addToFav,
    favorite,
    markAsRead,
    markAsReading
}) => {

    // console.log(favorite)
    const timeFormat = () => {
        let obj = new Date();
        let date = obj.getDate().toString().padStart(2, "0");
        let month = (obj.getMonth() + 1).toString().padStart(2, "0");
        let year = obj.getFullYear();
        let hour = (obj.getHours() > 12 ? obj.getHours() - 12 : obj.getHours()).toString().padStart(2, "0");
        let minute = (obj.getMinutes()).toString().padStart(2, "0");
        let zone = obj.getHours() >= 12 ? "pm" : "am";

        return `${date}/${month}/${year} ${hour}:${minute} ${zone}`
    }

    React.useEffect(() => {
        markAsReading(id);
        // console.log("useEffect", id)
        return() => {
            markAsRead(id);
            // console.log("inside useeffect", id)
        }
    }, [id])

    return (
        <div className={
            styles.mainDiv
        }>
            <div className={
                styles.headerDiv
            }>
                <div className={
                    styles.userTag
                }>
                    <span>{
                        from_email && from_email[0].toUpperCase()
                    }</span>
                </div>
                <div className={
                    styles.subjectDiv
                }>
                    <h2 style={
                            {marginTop: 0}
                        }
                        className={
                            styles.subject
                    }>
                        {subject}</h2>
                    <p className={
                        styles.date
                    }>
                        {
                        timeFormat()
                    }</p>
                </div>
                <div>
                    <button className={
                            styles.favBtn
                        }
                        onClick={
                            () => {
                                addToFav(id)
                            }
                    }>
                        {
                        favorite ? "Remove from favorite" : "Mark as favorite"
                    }</button>
                </div>
            </div>
            <div className={
                    styles.contentDiv
                }
                dangerouslySetInnerHTML={
                    {__html: body}
            }></div>
        </div>
    )
}

export default EmailDetail
