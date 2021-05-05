class Api::MessagesController < ApplicationController
  before_action :set_message, only: %i[show update destroy]

  # GET /messages
  def index
    @messages = Message.all.eager_load(:user).order(id: :desc)

    render json: @messages.as_json(include: { user: { except: :email }})
  end

  # GET /messages/1
  def show
    render json: @message.as_json(include: { user: { except: :email }})
  end

  # POST /messages
  def create
    @message = Message.new(message_params)

    if @message.save
      render json: @message.as_json(include: { user: { except: :email }}), status: :created
    else
      render json: @message.errors, status: :unprocessable_entity
    end
  end

  private

  def set_message
    @message = Message.find(params[:id]).eager_load(:user)
  end

  def message_params
    params.permit(:body).merge(user_id: @user.id)
  end
end
