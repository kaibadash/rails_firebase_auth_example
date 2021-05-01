class AuthorizationsController < ApplicationController
  def create
    payload = TokenValidator.new(params[:id_token]).validate!
    payload.deep_symbolize_keys!
    user = User.find_by(uid: payload[:user_id])
    if user.nil?
      return render status: 404
    end
    session[:user_id] = user.id
    render status: 200
  end
end
