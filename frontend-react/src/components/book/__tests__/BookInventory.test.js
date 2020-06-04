import React from "react";
import Axios from "axios";
import renderer from "react-test-renderer";

import BookInventoryForm from "../BookInventory";
import Book from "../../../modules/book";
import { MemoryRouter } from "react-router-dom";

test("<BookDetail /> snapshot test", () => {
    const book_inventories = [
        {
            id: 1,
            title: "Foobar",
            cover_image_file_name: "foo.jpg",
            branch: {
                name: "Willows Peak"
            }
        }
    ]

    Book.fetchInventories = jest.fn()
    Book.fetchInventories.mockResolvedValue(book_inventories);

    const component = renderer.create(
        <MemoryRouter>
            <BookInventoryForm book_id={4} />
        </MemoryRouter>
    )

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});