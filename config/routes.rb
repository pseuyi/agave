Rails.application.routes.draw do
  constraints format: :json do
    resources :session, only: [:create, :destroy]
    resources :users, only: [:show, :create, :update] do
      resources :tasks
    end
  end
end
