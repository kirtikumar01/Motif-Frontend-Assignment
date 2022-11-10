import React from 'react'
import {getEmail, getEmailList} from '../utils/api';
import EmailItem from './emailItem';
import EmailDetail from './emailDetail';
import styles from './emailList.module.css';
import detailStyles from './emailDetail.module.css';

const EmailList = () => {

    const [activeFilter, setActiveFilter] = React.useState("");

    const [emailList, setEmailList] = React.useState([]);

    const [emailData, setEmailData] = React.useState(null);

    const [pageNum, setPageNum] = React.useState(0);

    const pageSize = 5;

    const filterClick = (s) => {
        setActiveFilter(s);
        setPageNum(0);
    }

    const filterList = (e, i) => {
        if (activeFilter === "read") {
            return e.read || e.reading;
        } else if (activeFilter === "unread") {
            return !(e.read || e.reading);
        } else if (activeFilter === "favorites") {
            return e.favorite;
        }
        return true;
    }

    const pageFilter = (e, i) => {
        if (i < pageSize * pageNum || i >= pageSize * (pageNum + 1)) {
            return false;
        }
        return true;
    }

    React.useEffect(() => {
        getEmailList().then((res) => {
            setEmailList(res.map((e) => ({
                ...e,
                read: false,
                favorite: false,
                reading: false
            })));
        })
    }, [])

    const getEmailData = async (id, item) => {
        let res = await getEmail(id)
        setEmailData({
            ... res,
            ...item
        })
    }

    const addToFav = React.useCallback((id) => {
        setEmailList((prev) => {
            return prev.map((e) => {
                if (e.id === id) {
                    return {
                        ...e,
                        favorite: !e.favorite
                    }
                }
                return e;
            })
        })
        setEmailData((p) => {
            return {
                ...p,
                favorite: !p.favorite
            }
        })
    }, [])

    const markAsRead = React.useCallback((id) => {
        setEmailList((prev) => {
            return prev.map((e) => {
                if (e.id === id) {
                    return {
                        ...e,
                        read: true
                    }
                }
                return e;
            })
        })
        setEmailData((p) => {
            return {
                ...p,
                read: true
            }
        })
    }, [])

    const markAsReading = React.useCallback((id) => {
        setEmailList((prev) => {
            return prev.map((e) => {
                if (e.id === id) {
                    return {
                        ...e,
                        reading: true
                    }
                }
                return e;
            })
        })
        setEmailData((p) => {
            return {
                ...p,
                reading: true
            }
        })
    }, [])

    return (
        <>
            <section className={
                styles.main
            }>
                <div className={
                    styles.mainFilterDiv
                }>
                    <p className={
                        styles.filterText
                    }>Filter By:</p>
                    <div className={
                        styles.filterBtnDiv
                    }>
                        <button className={
                                `${
                                    styles.filterBtn
                                } ${
                                    activeFilter == "unread" ? styles.filterBtnActive : ""
                                }`
                            }
                            onClick={
                                () => {
                                    filterClick("unread")
                                }
                        }>Unread</button>
                        <button className={
                                `${
                                    styles.filterBtn
                                } ${
                                    activeFilter == "read" ? styles.filterBtnActive : ""
                                }`
                            }
                            onClick={
                                () => {
                                    filterClick("read")
                                }
                        }>Read</button>
                        <button className={
                                `${
                                    styles.filterBtn
                                } ${
                                    activeFilter == "favorites" ? styles.filterBtnActive : ""
                                }`
                            }
                            onClick={
                                () => {
                                    filterClick("favorites")
                                }
                        }>Favorites</button>
                        <button className={
                                `${
                                    styles.filterBtn
                                } ${
                                    activeFilter == "" ? styles.filterBtnActive : ""
                                }`
                            }
                            onClick={
                                () => {
                                    filterClick("")
                                }
                        }>All</button>
                    </div>
                </div>
                <div style={
                    {
                        display: "flex",
                        gap: "1rem",
                        marginBottom: "1rem"
                    }
                }>
                    <button className={
                            detailStyles.favBtn
                        }
                        disabled={
                            pageNum <= 0
                        }
                        onClick={
                            () => {
                                setPageNum(p => p - 1)
                            }
                    }>prev</button>
                    <button className={
                            detailStyles.favBtn
                        }
                        disabled={
                            (pageNum + 1) * pageSize >= emailList.filter(filterList).length - 1
                        }
                        onClick={
                            () => {
                                setPageNum(p => p + 1)
                            }
                    }>next</button>
                </div>
                <div className={
                    styles.itemDiv
                }>
                    <div> {
                        emailList.filter(filterList).filter(pageFilter).map((item, i) => {
                            return <EmailItem key={i}
                                {...item}
                                onClick={
                                    (id) => getEmailData(id, item)
                                }/>
                        })
                    } </div>
                    {
                    emailData !== null && <div style={
                        {flex: 1.5}
                    }>
                        <EmailDetail {...emailData}
                            addToFav={addToFav}
                            markAsRead={markAsRead}
                            markAsReading={markAsReading}/>
                    </div>
                } </div>
            </section>
        </>
    )
}

export default EmailList
