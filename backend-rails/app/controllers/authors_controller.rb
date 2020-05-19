class AuthorsController < ApplicationController
    def index
        @authors = Author.all
        render json: @authors.to_json
    end

    def create
        @author = Author.new(first_name: params[:first_name], last_name: params[:last_name])
        if @author.save
            render json: @author.to_json
        else
            render status: 422, json: @author.errors.to_json
        end
    end

    def destroy
        @author = Author.find(params[:id])
        if @author.destroy
            render status: :ok
        else
            render status: 422, json: @author.errors.to_json
        end
    end
end
