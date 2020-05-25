class CreateCheckouts < ActiveRecord::Migration[5.2]
    def change
        create_table :checkouts do |t|
            t.references :book, foreign_key: true
            t.references :user, foreign_key: true
            t.references :branch, foreign_key: true
            t.timestamps
        end
    end
end
