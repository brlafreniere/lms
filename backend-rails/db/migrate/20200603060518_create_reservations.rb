class CreateReservations < ActiveRecord::Migration[5.2]
  def change
    create_table :reservations do |t|
      t.references :book, foreign_key: true
      t.references :branch, foreign_key: true
      t.references :user, foreign_key: true
      t.boolean :ready
      t.timestamp :expires

      t.timestamps
    end
  end
end
