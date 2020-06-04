class AddIndexToReservation < ActiveRecord::Migration[5.2]
  def change
    add_index :reservations, [:user_id, :branch_id, :book_id], unique: true
  end
end
