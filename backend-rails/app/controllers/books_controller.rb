class BooksController < ApplicationController
    # before_action :authenticate_request

    def index
        @books = Book.all
        render json: @books.to_json(:include => :author)
    end

    def create
        @author = Author.find(params[:author_id])

        @book = Book.new(title: params[:title], author: @author)

        if params[:cover_image]
            new_file_name = random_file_name + File.extname(params[:cover_image].original_filename)
            File.open(Rails.root.join('public', 'uploads', new_file_name), 'wb') do |file|
                file.write(params[:cover_image].read)
                @book.cover_image_file_name = new_file_name
            end
        end

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

    protected

    def random_file_name
        @string ||= "#{SecureRandom.uuid}"
    end
end