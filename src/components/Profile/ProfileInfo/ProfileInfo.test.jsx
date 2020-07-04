import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ProfileInfo from "./ProfileInfo";
import classes from "./ProfileInfo.module.css";

configure({ adapter: new Adapter() })

describe("ProfileInfo", () => {
    test("should render component when props.profile exist", () => {
        const props = {
            profile: {
                photos: {
                    large: ""
                }
            }
        }
        const component = shallow(<ProfileInfo {...props}/>);

       expect(component.find(`.${classes.userProfileInfo}`)).toHaveLength(1);
    })

    test("shouldn't render component when props.profile isn't defined", () => {
        const props = {}
        const component = shallow(<ProfileInfo {...props}/>);

       expect(component.find(`.${classes.userProfileInfo}`)).toHaveLength(0);
    })
})