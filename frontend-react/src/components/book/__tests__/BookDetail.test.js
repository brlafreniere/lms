import React from "react";
import Axios from "axios";
import renderer from "react-test-renderer";

import BookDetail from "../BookDetail";
import { MemoryRouter } from "react-router-dom";

test("<BookDetail /> snapshot test", () => {
    const response = {
        data: {
            id: 1,
            title: "Foobar",
            cover_image_file_name: "foo.jpg"
        }
    }

    Axios.get = jest.fn()
    Axios.get.mockResolvedValue(response);

    const component = renderer.create(
        <MemoryRouter>
            <BookDetail />
        </MemoryRouter>
    )

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});