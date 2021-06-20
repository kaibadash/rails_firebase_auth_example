class User < ApplicationRecord
  attr_accessor :id_token

  def self.find_by_id_token(id_token)
    payload = TokenValidator.new(id_token).validate!
    User.find_by(uid: payload[:user_id])
  end

  def self.register(params)
    user = User.new(params)
    user.icon_url = 'https://dummyimage.com/100x100/000/0011ff' if user.icon_url.blank?
    user.save!
    user
  end
end
