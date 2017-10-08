class User < ApplicationRecord
  attr_reader :password
  validates :username, :email, :password_digest, presence: true
  has_many :tasks
  after_initialize :ensure_sesion_token

  def self.find_by_credentials(username, password)
    user = User.find_by_username username
    user && user.valid_password?(password) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def valid_password?(password)
    BCrypt::Password.new(self.password_digest).is_password(password)?
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

  private

  def ensure_sesion_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end
end
