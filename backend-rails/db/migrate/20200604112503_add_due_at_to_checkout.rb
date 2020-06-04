class AddDueAtToCheckout < ActiveRecord::Migration[5.2]
  def change
    add_column :checkouts, :due_at, :timestamp
  end
end
