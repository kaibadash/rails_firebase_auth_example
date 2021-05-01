Rails.application.routes.draw do
  resources :authorizations, only: :create
  resources :messages
  resources :users, except: :destroy
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
