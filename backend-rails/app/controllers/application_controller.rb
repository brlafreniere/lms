require "#{Rails.root}/lib/jwt_transcoder"

class ApplicationController < ActionController::API
    before_action :set_current_user

    def authenticate_request
        header = request.headers['Authorization']
        header = header.split(' ').last if header
        begin
            @decoded = JWTTranscoder.decode(header)
            @current_user = User.find(@decoded[:user_id])
            Current.user = @current_user
        rescue ActiveRecord::RecordNotFound => e
            render json: { errors: e.message }, status: :unauthorized
        rescue JWT::DecodeError => e
            render json: { errors: e.message }, status: :unauthorized
        end
    end

    def set_current_user
        header = request.headers['Authorization']
        header = header.split(' ').last if header
        begin
            @decoded = JWTTranscoder.decode(header)
            @current_user = User.find(@decoded[:user_id])
            Current.user = @current_user
        rescue ActiveRecord::RecordNotFound => e
            # render json: { errors: e.message }, status: :unauthorized
        rescue JWT::DecodeError => e
            # render json: { errors: e.message }, status: :unauthorized
        end
    end
end
