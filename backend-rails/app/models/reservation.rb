class Reservation < ApplicationRecord
    before_save :default_values

    validates :book, uniqueness: {scope: [:branch, :user]}

    belongs_to :book
    belongs_to :branch
    belongs_to :user

    def default_values
        self.ready = false
    end
end
