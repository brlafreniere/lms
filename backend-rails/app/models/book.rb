class Book < ApplicationRecord
    belongs_to :author
    has_many :book_inventories
    has_many :branches, through: :book_inventories
    has_many :reservations
    has_many :checkouts

    def reservable?
        return self.copies_available > 0
    end

    def already_reserved?
        !!Reservation.where(user: Current.user, book: self).first
    end

    def copies_available
        self.total_inventory - self.total_checked_out - self.total_reserved
    end

    def total_inventory
        self.book_inventories.map{|bi|bi.copies}.reduce(:+)
    end

    def total_reserved
        self.reservations.size
    end

    def total_checked_out
        self.checkouts.size
    end
end
