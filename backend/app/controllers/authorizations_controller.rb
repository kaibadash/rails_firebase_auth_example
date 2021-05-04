class AuthorizationsController < ApplicationController
  def create
    user = User.find_by_id_token(params[:id_token])
    if user.nil?
      return render status: 404
    end
    session[:user_id] = user.id # logged in
    render status: 200
  end
end
