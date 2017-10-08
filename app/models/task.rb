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
  validates :title, :status, :user_id, presence: true
  belongs_to :user
end
