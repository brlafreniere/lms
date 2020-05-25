class Branch < ApplicationRecord
    has_many :book_inventories
    has_many :books, through: :book_inventories
end
