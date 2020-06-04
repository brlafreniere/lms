class Checkout < ApplicationRecord
    before_save :default_values

    belongs_to :branch
    belongs_to :book
    belongs_to :user

    def default_values
        self.due_at = Time.now + (7 * 3).days
    end
end
