import classes from "./Pagination.module.css"
import Button from "../Button/Button";
import React, {useState} from "react";

let endPage = 1,
    startPage = 1,
    amountPages,
    activePages = [],
    initialTime = true;

function PaginatorCreate(props) {
    let {
        totalCountItems,
        pageSize,
        onChangePage,
        currentPage,
        limitionAmountPages = 20,
    } = props;

    const pages = [];
    const [isCurrentPageChanged, setIsCurrentPageChanged] = useState(true)
    const [paginatorType, setPaginatorType] = useState({type: "right"})

    amountPages = Math.ceil(totalCountItems / pageSize);
    for (let i = 1; i <= amountPages; i++) {
        pages.push(i);
    }

    if (!totalCountItems) return (<></>)

    if (initialTime && isCurrentPageChanged) {
        initialTime = false;

        startPage = endPage;
        endPage += limitionAmountPages;

        activePages = pages.slice(startPage - 1, endPage - 1);
    } else {
        if (!isCurrentPageChanged) {
            if (paginatorType.type === "right") {
                startPage = endPage;
                endPage += limitionAmountPages;
            }
            if (paginatorType.type === "left") {
                startPage -= limitionAmountPages;
                endPage = startPage + limitionAmountPages;
            }

            activePages = pages.slice(startPage - 1, endPage - 1);
        }
    }
    // debugger
    return (
        <div className={classes.pagination}>
            {
                startPage !== 1
                && <Button id="btnLeft" onClick={(e) => {
                    setIsCurrentPageChanged(false)
                    setPaginatorType({type: "left"})
                }
                } text={"<"}> </Button>
            }

            <div className={classes.numeration}>
                {
                    activePages.map(item => {
                        return <span className={currentPage === item ? classes.selectedPage : ""}
                                     onClick={(e) => {
                                         onChangePage(item)
                                         setIsCurrentPageChanged(true)
                                     }}
                                     key={item}>
                                    {item}
                                    </span>
                    })
                }
            </div>

            {
                startPage + limitionAmountPages <= amountPages
                && <Button id="btnRight" onClick={() => {
                    setIsCurrentPageChanged(false)
                    setPaginatorType({type: "right"})
                }
                } text={">"}> </Button>
            }
        </div>
    )
}

export default PaginatorCreate;