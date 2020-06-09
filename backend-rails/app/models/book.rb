class Book < ApplicationRecord
    include ActionView::Helpers::TextHelper

    before_save :generate_formatted_synopsis

    belongs_to :author

    has_many :book_inventories
    has_many :branches, through: :book_inventories
    has_many :reservations
    has_many :checkouts

    def generate_formatted_synopsis
        self.synopsis_formatted = simple_format(self.synopsis)
    end

    def copies_available?
        return self.number_copies_available > 0
    end

    def already_reserved?
        return Reservation.where(user: Current.user, book: self).first
    end

    def already_checked_out?
        return Checkout.where(user: Current.user, book: self).first
    end

    def number_copies_available
        number = (self.total_inventory || 0) - self.total_checked_out - self.total_reserved
        return 0 if number < 0
        return number
    end

    def total_inventory
        self.book_inventories.map{|bi|bi.copies}.reduce(:+) || 0
    end

    def total_reserved
        self.reservations.size
    end

    def total_checked_out
        self.checkouts.size
    end
end
