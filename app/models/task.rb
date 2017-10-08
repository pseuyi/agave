class Task < ApplicationRecord
  validates :title, :status, :user_id, presence: true
  belongs_to :user
end
