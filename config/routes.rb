Rails.application.routes.draw do

  namespace :api do
    mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/auth/registrations'
    }
    resources :scores, only: [:index, :create, :show]
    resources :users, only: [:show]
  end
  get '', to: 'static#index'
  get '*page', to: redirect('/')
  
end
