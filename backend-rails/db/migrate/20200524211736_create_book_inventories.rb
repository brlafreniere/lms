class CreateBookInventories < ActiveRecord::Migration[5.2]
  def change
    create_table :book_inventories do |t|
      t.references :book
      t.references :branch
      t.integer :copies
      t.timestamps
    end
  end
end