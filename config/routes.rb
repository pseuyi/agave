Rails.application.routes.draw do
  constraints format: :json do
    resources :session, only: [:create, :destroy]
    resources :users, only: [:show, :create, :update]
    resources :tasks, only: [:list, :show, :create, :update, :destroy]
  end
end
