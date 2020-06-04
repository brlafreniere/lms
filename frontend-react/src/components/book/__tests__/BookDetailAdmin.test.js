import React from "react";
import renderer from "react-test-renderer";
import BookDetailAdmin from "../BookDetailAdmin";

import {MemoryRouter} from "react-router-dom";
import Book from "../../../modules/book";

test("<BookDetailAdmin /> snapshot test", () => {
    const book = {
        id: 4,
        title: "foo title bar",
        synopsis: "lorem ipsum dolar sit amet"
    }

    Book.fetch = jest.fn()
    Book.fetch.mockResolvedValue(book)

    const component = renderer.create(
        <MemoryRouter>
            <BookDetailAdmin id={4} />
        </MemoryRouter>
    )

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})