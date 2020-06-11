import React from "react";
import classes from "./News.module.css";
import MyLink from "../common/Link/Link";


const News = (props)=>{

    function cutString(str){
        let symbols = str.split("");
        let stopCutAtIndex = 0;

        str.match(/ — /)
            ? stopCutAtIndex = symbols.lastIndexOf("—")
            : str.match(/ | /)
            ? stopCutAtIndex = symbols.lastIndexOf("|")
            : stopCutAtIndex = symbols.lastIndexOf("-");

        str = symbols.slice(0,stopCutAtIndex).join("");

        return str;
    }

    function formatData (dataStr) {
        let data = new Date(dataStr);
        let date = `${data.getDate() + 1}` < 10 ?  `0${data.getDate() + 1}` : `${data.getDate() }`;
        let month = `${data.getMonth() + 1}` < 10 ? `0${data.getMonth() + 1}` : `${data.getMonth() + 1}`;
        let year = `${data.getFullYear()}` < 10 ? `0${data.getFullYear() }` : `${data.getFullYear()}`;
        let hour = `${data.getHours()}` < 10 ?  `0${data.getHours()}` : `${data.getHours()}`;
        let minutes = `${data.getMinutes()}` < 10 ? `0${data.getMinutes()}` : `${data.getMinutes()}`;
        let seconds = `${data.getSeconds()}` < 10 ? `0${data.getSeconds()}` : `${data.getSeconds()}`;

        let dataFormated = "";

        if(data){
            dataFormated = `<p className=${classes.dateNews}>
            <span className=${classes.dateNews__date}>${date} /</span>
            <span className=${classes.dateNews__month}>${month} /</span>
            <span className=${classes.dateNews__year}>${year} </span> 
    </p>
    <p className={classes.timeNews}>
        <span className=${classes.timeNews__hours}>${hour} :</span>
        <span className=${classes.timeNews__minutes}>${minutes} :</span>
        <span className=${classes.timeNews__seconds}>${seconds}</span>
    </p>`
        }

        return (dataFormated);
    }

    return (
        <div className={classes.news}>
            <div className={classes.newsWrapper}>
                {
                    props.articles.map((n,i)=>{
                        return (
                            <div className={classes.newItem} key={i}>
                            <div className={classes.newItem__header}>
                                <div className={classes.newItem__title}>
                                    {cutString(n.title)}
                                </div>
                                <div className={classes.newItem__data}
                                     dangerouslySetInnerHTML={{__html: formatData(n.publishedAt)}}>
                                </div>
                            </div>
                            <div className={classes.newItem__body}>
                                <div className={classes.newItem__photo}>
                                    <img src={n.urlToImage} alt={"News"}/>
                                </div>
                                <div className={classes.newItem__content}>
                                    <div className={classes.newItem__text}>
                                        {n.description}
                                    </div>
                                </div>
                                <div className={classes.newItem__origin}>
                                    <MyLink url={n.url} text={"Read more"}/>
                                </div>
                            </div>
                        </div>
                    )})
                }

            </div>
        </div>

    )
}


export default News;