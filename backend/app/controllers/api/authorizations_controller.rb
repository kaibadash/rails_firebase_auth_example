class Api::AuthorizationsController < ApplicationController
  skip_before_action :signed_in!, only: %i[create destroy]

  def create
    user = User.find_by_id_token(params[:id_token])
    return render status: 404 if user.nil?

    session[:user_id] = user.id # logged in
    render status: 200
  end

  def index
    render json: User.find_by_id!(session[:user_id])
  end

  # destroyでやりたかったがパラメータなしにできなかったため別定義
  # DELETE /api/authorizations
  def logout
    user = User.find_by_id(session[:user_id])
    return render status: 200 if user.nil?

    session[:user_id] = nil
    render status: 200
  end
end
