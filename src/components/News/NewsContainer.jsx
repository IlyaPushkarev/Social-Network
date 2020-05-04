import React from "react";
import News from "./News";
import {connect} from "react-redux";
import * as axios from "axios";
import {getNewsThunkCreator, setArticlesAC} from "../../redux/news-reducer";
import {newsAPI} from "../../api/newsAPI";

class NewsContainer extends React.Component {
    componentDidMount() {

        this.props.getNews();
    }

    render() {
        return (
            <News articles={this.props.articles}
            />
        )
    }

}

const mapStateToProps = (state) => {
    return {
        articles: state.newsPage.articles,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getNews: () => {
            dispatch(getNewsThunkCreator());
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewsContainer);