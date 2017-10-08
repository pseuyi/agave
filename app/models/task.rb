# == Schema Information
#
# Table name: tasks
#
#  id          :integer          not null, primary key
#  title       :string           not null
#  description :text
#  status      :string           default("open")
#  priority    :integer          default(1)
#  user_id     :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Task < ApplicationRecord
  belongs_to :user
  validates :title, presence: true, length: { in: 2..100 }
  validates :description, presence: true, length: { maximum: 400 }, allow_blank: true
  validates :status, :priority, :user_id, presence: true
end
