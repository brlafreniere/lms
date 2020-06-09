class Branch < ApplicationRecord
    # before_destroy :delete_inventory

    has_many :book_inventories, dependent: :destroy
    has_many :reservations, dependent: :destroy
    has_many :checkouts, dependent: :destroy
    has_many :books, through: :book_inventories

    # private
    # def delete_inventory
    #     puts "here"
    #     self.book_inventories.delete_all
    # end
end
