import React from "react";
import Axios from "axios";
import {shallow, mount, render} from "enzyme";

import BookGrid from "../BookGrid";

import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";


test("<BookGrid /> snapshot test", () => {
    const response = {
        data: [
            {
                id: 1,
                title: "foo"
            },
            {
                id: 2,
                title: "bar"
            }
        ]
    }
    Axios.get = jest.fn()
    Axios.get.mockResolvedValue(response);

    const component = renderer.create(
        <MemoryRouter>
            <BookGrid />
        </MemoryRouter>
    )

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})

describe('<BookGrid />', () => {
    it("queries books on mount", () => {
        //const wrapper = shallow(<BookGrid />)
    })
})