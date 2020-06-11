class DeleteMiddleInitialColumnFromAuthors < ActiveRecord::Migration[5.2]
    def change
        remove_column :authors, :middle_initial, :string
        rename_column :authors, :middle_name_full, :middle_name
    end
end
