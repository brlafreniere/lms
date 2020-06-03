class AddUniqueIndexToBookInventories < ActiveRecord::Migration[5.2]
  def change
    add_index :book_inventories, [:book_id, :branch_id], unique: true
  end
end
