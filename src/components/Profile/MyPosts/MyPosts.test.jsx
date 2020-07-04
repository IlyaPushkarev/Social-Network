import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16"
import MyPosts from "./MyPosts";
import classes from "./MyPosts.module.css";

configure({adapter: new Adapter()})

describe("MyPosts", () => {
    it("should renders 2 posts", () => {
        const props = {
            profile: {
                photos: {}
            },
            posts: [
                {
                    message: "It's testing message 1",
                    likesCount: 12,
                    dislikeCount: 5,
                    id: 1
                },
                {
                    message: "It's testing message 2",
                    likesCount: 10,
                    dislikeCount: 15,
                    id: 2
                }
            ]
        }

        const MyPostsComponent = shallow(<MyPosts {...props}/>)

        expect(MyPostsComponent.find(`.${classes.posts}`).children()).toHaveLength(2);
    })
})