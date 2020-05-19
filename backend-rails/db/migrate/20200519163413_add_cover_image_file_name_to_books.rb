class AddCoverImageFileNameToBooks < ActiveRecord::Migration[5.2]
  def change
    add_column :books, :cover_image_file_name, :string
  end
end
