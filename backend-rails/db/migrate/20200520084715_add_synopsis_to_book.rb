class AddSynopsisToBook < ActiveRecord::Migration[5.2]
  def change
    add_column :books, :synopsis, :text
  end
end
