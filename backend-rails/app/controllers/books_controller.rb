class BooksController < ApplicationController
    def index
        @books = Book.all.sort_by(&:created_at)
        render json: @books.to_json(
            :include => :author,
            :methods => [:total_inventory])
    end

    def show
        @book = Book.find(params[:id])
        render json: @book.to_json(
            :include => [:author, :branches],
            :methods => [:number_copies_available, :already_reserved?, :already_checked_out?, :total_inventory])
    end

    def create
        if params[:author_first_name] && params[:author_last_name]
            @author = Author.new(first_name: params[:author_first_name], last_name: params[:author_last_name], middle_name: params[:author_middle_name])
        else
            @author = Author.find(params[:author_id])
        end

        @book = Book.new(title: params[:title], author: @author, synopsis: params[:synopsis])

        if params[:cover_image]
            @book.cover_image_file_name = process_image_upload
        end

        if @book.save
            render json: @book.to_json
        else
            render status: 422, json: @book.errors.to_json
        end
    end

    def update
        @book = Book.find(params[:id])
        @book.title = params[:title]
        @book.author_id = params[:author_id]
        @book.synopsis = params[:synopsis]
        puts params[:cover_image].inspect
        if params[:cover_image] != nil
            @book.cover_image_file_name = process_image_upload
        end

        if @book.save
            render status: :ok
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

    def process_image_upload
        new_file_name = random_file_name + File.extname(params[:cover_image].original_filename)
        File.open(Rails.root.join('public', 'uploads', new_file_name), 'wb') do |file|
            file.write(params[:cover_image].read)
            new_file_name
        end
    end

    def random_file_name
        @string ||= "#{SecureRandom.uuid}"
    end
end