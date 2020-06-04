class UsersController < ApplicationController
    def authenticate
        user = User.find_by(email: params[:email])
        if user && user.authenticate(params[:password])
            token = JWTTranscoder.encode(user_id: user.id)
            time = Time.now + 24.hours.to_i
            render json: { token: token, expiration: time.strftime("%m-%d-%Y %H:%M"), user: user.as_json(except: :password_digest)}, status: :ok
        else
            render json: { error: 'Unauthorized' }, status: :unauthorized
        end
    end

    def show
        if params[:id].to_i == Current.user.id
            @user = User.find(params[:id])
            render json: @user.to_json(
                :include => {
                    :checkouts => {
                        :include => :book
                    },
                    :reservations => {
                        :include => :book
                    }},
                except: [:password_digest])
        else
            # naughty person trying to do naughty things
            render status: :unauthorized
        end
    end

    def create
        @user = User.new(email: params[:email], password: params[:password], password_confirmation: params[:password_confirmation])
        if @user.save
            render status: :created
        else
            render status: 401
        end
    end
end
