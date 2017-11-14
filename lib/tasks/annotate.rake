namespace :db do
  def add_annotation_to_models
    system 'bundle exec annotate'
  end

  task :migrate do
    add_annotation_to_models
  end
end
