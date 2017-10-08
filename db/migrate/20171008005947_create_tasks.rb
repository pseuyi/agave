class CreateTasks < ActiveRecord::Migration[5.1]
  def change
    create_table :tasks do |t|
      t.string :title, null: false
      t.text :description
      t.string :status, default: 'open'
      t.integer :priority, default: 1
      t.integer :user_id, null: false, index: true
      t.timestamps
    end
  end
end
