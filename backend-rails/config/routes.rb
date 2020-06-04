Rails.application.routes.draw do
  resources :books
  resources :branches
  resources :authors
  resources :users
  resources :book_inventories
  resources :reservations

  post '/book_inventories/branches_with_no_inventory', to: 'book_inventories#branches_with_no_inventory'
  post '/users/authenticate', to: 'users#authenticate'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get '/books/:id/reservation-status', to: 'books#reservation_status'
end
