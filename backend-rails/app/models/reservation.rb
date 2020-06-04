class Reservation < ApplicationRecord
  validates :book, uniqueness: {scope: [:branch, :user]}
  belongs_to :book
  belongs_to :branch
  belongs_to :user
end
