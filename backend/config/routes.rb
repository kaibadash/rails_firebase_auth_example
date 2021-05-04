Rails.application.routes.draw do
  namespace :api do
    resources :authorizations, only: :create
    resources :messages
    resources :users, except: :destroy
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
