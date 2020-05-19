class RenameAddressToStreetAddressOnBranches < ActiveRecord::Migration[5.2]
  def change
    rename_column :branches, :address, :street_address
    add_column :branches, :city, :string
    add_column :branches, :state, :string
    add_column :branches, :zip, :string
  end
end
