# == Schema Information
#
# Table name: users
#
#  id                  :integer          not null, primary key
#  username            :string           not null
#  email               :string           not null
#  password_digest     :string           not null
#  session_token       :string
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  avatar_file_name    :string
#  avatar_content_type :string
#  avatar_file_size    :integer
#  avatar_updated_at   :datetime
#  avatar_meta         :text
#

class User < ApplicationRecord
  attr_reader :password
  has_many :tasks, dependent: :destroy
  validates :username, uniqueness: true
  validates :password_digest, presence: true
  validates :email, presence: true, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i, on: :create }, uniqueness: true

  has_attached_file :avatar, styles: { medium: "300x300>", thumb: "100x100>" }, default_url: "https://placeholdit.co//i/100x100?&bg=003fff&fc=ffffff&text=faceblock"
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\z/

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
    BCrypt::Password.new(self.password_digest).is_password?(password)
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
