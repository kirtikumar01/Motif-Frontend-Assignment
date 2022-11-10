import React from 'react'
import styles from './emailItem.module.css';
// import moment from 'moment'

const EmailItem = ({from_email, id, from_name, short_description, subject, read, favorite, onClick, reading, selectItem}) => {

    // console.log("email item - ",id)

    const timeFormat = () => {
        let obj = new Date();
        let date = obj.getDate().toString().padStart(2,"0");
        let month = (obj.getMonth()+1).toString().padStart(2,"0");
        let year = obj.getFullYear();
        let hour = (obj.getHours()>12?obj.getHours()-12:obj.getHours()).toString().padStart(2,"0");
        let minute = (obj.getMinutes()).toString().padStart(2,"0");
        let zone = obj.getHours()>=12?"pm":"am";

        return `${date}/${month}/${year} ${hour}:${minute} ${zone}`
    }

  return (
    <div className={`${styles.mainItemDiv} ${reading?read?styles.read:styles.reading:""}`} onClick={() => {onClick?.call({},id)}}>
        <div>
            <input type="checkbox" onClick={(e) => {e.stopPropagation()}} onChange={(e)=>{selectItem(id, e.target.checked)}} />
        </div>
        <div className={styles.userTag}>
            <span>{from_email[0].toUpperCase()}</span>
        </div>
        <div className={styles.contentDiv}>
            <p>From :<b>{from_name} {`<${from_email}>`}</b> </p>
            <p>Subject: <b>{subject}</b></p>
            <p>{short_description}</p>
            <p>{timeFormat()} {favorite && <span className={styles.favourite}>Favorite</span>}</p>
        </div>
    </div>
  )
}

export default EmailItem