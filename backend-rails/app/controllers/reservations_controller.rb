class ReservationsController < ApplicationController
    before_action :authenticate_request

    def create
        @reservation = Reservation.new
        @reservation.user = @current_user
        @reservation.book_id = params[:book_id]
        @reservation.branch_id = params[:branch_id]
        @reservation.ready = false
        if @reservation.save
            render status: :ok
        else
            render status: :unprocessable_entity, json: @reservation.errors.to_json
        end
    end
end