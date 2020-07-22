import React from "react";
import News from "./News";
import {connect} from "react-redux";
import {getNewsThunkCreator} from "../../redux/news-reducer";
import {rootStateType} from "../../redux/redux-store";
import {articleType} from "../../types/types";

type MapStatePropsType = {
    articles: Array<articleType>
}
type MapDispatchPropsType = {
    getNews: () => void
}
type OwnPropsType = {}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class NewsContainer extends React.Component<PropsType> {
    componentDidMount() {
        this.props.getNews();
    }

    render() {
        return (<News articles={this.props.articles}/>)
    }

}

const mapStateToProps = (state: rootStateType) => {
    return {
        articles: state.newsPage.articles,
    }
}
const mapDispatchToProps = (dispatch: Function) => {
    return {
        getNews: () => {
            dispatch(getNewsThunkCreator());
        },
    }
}
export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, rootStateType>(mapStateToProps, mapDispatchToProps)(NewsContainer);