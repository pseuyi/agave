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

class TaskSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :status, :priority
end
