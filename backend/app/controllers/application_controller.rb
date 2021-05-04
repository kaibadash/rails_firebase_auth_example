class ApplicationController < ActionController::API
  before_action :signed_in!

  def signed_in!
    unless session[:user_id]
      render json: { message: "unauthorized" }, status: 401
    end
  end
end
