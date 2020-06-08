class AddSynopsisFormattedToBook < ActiveRecord::Migration[5.2]
    def change
        add_column :books, :synopsis_formatted, :text
    end
end
