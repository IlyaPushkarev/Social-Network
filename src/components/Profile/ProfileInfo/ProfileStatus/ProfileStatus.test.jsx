import React from "react";
import {create} from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {
    test("status from props should be in the state", () => {
        const component = create(<ProfileStatus status="Template status"/>);
        const instance = component.getInstance();
        expect(instance.state.status).toBe("Template status")
    })

    test("after creation, span should be displayed", () => {
        const component = create(<ProfileStatus status="Template status"/>);
        const root = component.root;
        let span = root.findByType("span")
        expect(span).toBeDefined();
    })
    test("if created span, input shouldn't be displayed", () => {
        const component = create(<ProfileStatus status="Template status"/>);
        const root = component.root;
        expect(() => {
            root.findByType("input")
        }).toThrow();
    })

    test("after creation span should contains correct status", () => {
        const component = create(<ProfileStatus status="Template status"/>)
        const root = component.root;
        let span = root.findByType("span");
        expect(span.children[0]).toBe("Template status")
    })

    test("input should be displayed in editMode instead of span", () => {
        const component = create(<ProfileStatus status="Template status"/>)
        const root = component.root;
        let span = root.findByType("span");
        span.props.onClick()

        let input = root.findByType("input");

        expect(input.props.value).toBe("Template status")
    })

    test("callback should be called", () => {
        const mockCallback = jest.fn();
        const component = create(<ProfileStatus status="Template status" updateUserStatus={mockCallback}/>)
        const instance = component.getInstance();
        instance.deactivateEditMove();
        console.log(instance)
        expect(mockCallback).toHaveBeenCalled()
    })
})