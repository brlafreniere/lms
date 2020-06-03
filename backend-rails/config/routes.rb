Rails.application.routes.draw do
  resources :books
  resources :branches
  resources :authors
  resources :users
  resources :book_inventories
  post '/book_inventories/branches_with_no_inventory', to: 'book_inventories#branches_with_no_inventory'
  post '/users/authenticate', to: 'users#authenticate'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
