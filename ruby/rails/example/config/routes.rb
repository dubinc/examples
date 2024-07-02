Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  get 'create_link', to: 'links#create_link'
  get 'upsert_link', to: 'links#upsert_link'
  get 'update_link', to: 'links#update_link'
  get 'analytics', to: 'links#analytics'

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
