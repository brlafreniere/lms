class Checkout < ApplicationRecord
    belongs_to :branch
    belongs_to :book
    belongs_to :user
end
