Rails.application.routes.draw do
  namespace :api do
    resources :authorizations, only: [:create, :index]
    delete "/authorizations", to: "authorizations#logout"
    resources :messages, only: [:create, :index, :show]
    resources :users, except: :destroy
  end
end
