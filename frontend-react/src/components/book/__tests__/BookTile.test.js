import React from "react";
import BookTile from "../BookTile";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";

test("snapshot test", () => {
    let book = {
        id: 2,
        cover_image_file_name: "foo.jpg",
        title: "foo title"
    };
    const component = renderer.create(
        <MemoryRouter>
            <BookTile book={book} />
        </MemoryRouter>
    )
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})