class User < ApplicationRecord
  validates :username, :email, :password_digest, presence: true
  has_many :tasks
end
