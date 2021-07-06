class ApplicationController < ActionController::API
  before_action :signed_in!

  def signed_in!
    unless session[:user_id]
      render json: { message: 'unauthorized' }, status: 401
      return
    end
    @user = User.find_by_id!(session[:user_id])
  end
end
