class AddMiddleNameAndMiddleInitialToAuthor < ActiveRecord::Migration[5.2]
    def change
        add_column :authors, :middle_initial, :string
        add_column :authors, :middle_name_full, :string
    end
end
