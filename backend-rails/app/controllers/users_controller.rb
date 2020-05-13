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
end
