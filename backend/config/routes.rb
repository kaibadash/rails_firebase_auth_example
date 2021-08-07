Rails.application.routes.draw do
  namespace :api do
    resources :authorizations, only: %i[create index]
    delete '/authorizations', to: 'authorizations#logout'
    resources :messages, only: %i[create index show]
    resources :users, except: :destroy
  end
end
