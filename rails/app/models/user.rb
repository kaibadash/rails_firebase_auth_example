class User < ApplicationRecord
  attr_accessor :id_token
  def self.find_by_id_token(idToken)
    payload = TokenValidator.new(idToken).validate!
    payload.deep_symbolize_keys!
    User.find_by(uid: payload[:user_id])
  end
end
