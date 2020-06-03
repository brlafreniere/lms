class BookInventoriesController < ApplicationController
    # params[:id] should be book_id
    def show
        @book = Book.find(params[:id])
        render json: @book.book_inventories.to_json(include: [:branch, :book])
    end

    def create
        @book_inventory = BookInventory.new(branch_id: params[:branch_id], book_id: params[:book_id], copies: params[:copies])
        if @book_inventory.save
            render status: :created
        else
            render status: :unprocessable_entity
        end
    end

    def update
        @book_inventory = BookInventory.where(book_id: params[:book_id], branch_id: params[:branch_id]).first
        @book_inventory.copies = params[:copies]
        if @book_inventory.save
            render status: :ok
        else
            render status: :unprocessable_entity
        end
    end

    def branches_with_no_inventory
        @book = Book.find(params[:book_id])
        @branches = Branch.all.to_a.difference(@book.book_inventories.map{|bi|bi.branch})
        render json: @branches.to_json
    end
end
