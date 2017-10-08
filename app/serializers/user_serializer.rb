class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :task_ids
end
