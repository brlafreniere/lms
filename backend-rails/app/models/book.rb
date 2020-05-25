class Book < ApplicationRecord
  belongs_to :author
  has_many :book_inventories
  has_many :branches, through: :book_inventories
end
