Rails.application.routes.draw do
  constraints format: :json do
    resources :users, only: [:show, :create, :update]
    resources :session, only: [:create, :destroy]
  end
end
