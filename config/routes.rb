Rails.application.routes.draw do
  constraints format: :json do
    resources :session, only: [:create, :destroy]
    resources :users, only: [:show, :create, :update]
    resources :tasks

    patch '/update_tasks', to: 'tasks#update_tasks'
  end
end
