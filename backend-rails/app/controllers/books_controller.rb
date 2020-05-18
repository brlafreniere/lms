class BooksController < ApplicationController
  # before_action :authenticate_request

  def index
    @books = Book.all
    render json: @books
  end

  def create
    @book = Book.new(title: params[:title])
    if @book.save
      render json: @book.to_json
    else
      puts @book.errors.inspect
      render status: 422, json: @book.errors.to_json
    end
  end
end
