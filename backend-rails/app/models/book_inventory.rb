class BookInventory < ApplicationRecord
    belongs_to :book
    belongs_to :branch
end
