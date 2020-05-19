class BranchesController < ApplicationController
    def index
        @branches = Branch.all
        render json: @branches
    end

    def create
        puts params.inspect
        @branch = Branch.new(branch_params)
        if @branch.save
            render json: @branch.to_json
        else
            render status: 422, json: @branch.errors.to_json
        end
    end

    def destroy
        @branch = Branch.find(params[:id])
        if @branch.destroy
            render status: :ok
        else
            render status: 422, json: @branch.errors.to_json
        end
    end

    private
        def branch_params
            params.require(:branch).permit(:name, :street_address, :city, :state, :zip)
        end
end
