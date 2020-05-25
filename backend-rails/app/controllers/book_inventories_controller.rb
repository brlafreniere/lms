class BookInventoriesController < ApplicationController
    # params[:id] should be book_id
    def show
        @book = Book.find(params[:id])
        render json: @book.book_inventories.to_json(include: [:branch, :book])
    end
end
