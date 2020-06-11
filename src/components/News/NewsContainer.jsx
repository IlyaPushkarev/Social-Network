import React from "react";
import News from "./News";
import {connect} from "react-redux";
import {getNewsThunkCreator} from "../../redux/news-reducer";

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