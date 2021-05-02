class UsersController < ApplicationController
  before_action :set_user, only: %i[show update destroy]

  # GET /users
  def index
    @users = User.all

    render json: @users
  end

  # GET /users/1
  def show
    render json: @user
  end

  # POST /users
  def create
    @user = User.find_by_id_token(user_params[:id_token])
    if @user.present?
      session[:user_id] = @user.id # logged in
      return render json: @user, status: 200, location: @user
    end

    @user = User.register(user_params)
    if @user.present?
      session[:user_id] = @user.id # logged in
      render json: @user, status: :created, location: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_user
    @user = User.find(params[:id])
  end

  # FIXME: Railsがかってに user => の入れ子にしてくるので Unpermitted parameter: :user になる…
  # {"id_token"=>"[FILTERED]", "name"=>"bob", "user"=>{"name"=>"bob"}}
  def user_params
    if params[:id_token].present?
      payload = TokenValidator.new(params[:id_token]).validate!
      params[:uid] = payload[:user_id]
    end
    params.permit(:name, :uid, :id_token)
  end
end
