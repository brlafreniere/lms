class BooksController < ApplicationController
    # before_action :authenticate_request

    def index
        @books = Book.all
        render json: @books.to_json(:include => :author)
    end

    def create
        @author = Author.find(params[:author_id])
        @book = Book.new(title: params[:title], author: @author)
        if @book.save
            render json: @book.to_json
        else
            render status: 422, json: @book.errors.to_json
        end
    end

    def destroy
        @book = Book.find(params[:id])
        if @book.destroy
            render status: :ok
        else
            render status: 422, json: @book.errors.to_json
        end
    end
end