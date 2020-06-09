# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_06_09_055752) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "authors", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "middle_initial"
    t.string "middle_name_full"
  end

  create_table "book_inventories", force: :cascade do |t|
    t.bigint "book_id"
    t.bigint "branch_id"
    t.integer "copies"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["book_id", "branch_id"], name: "index_book_inventories_on_book_id_and_branch_id", unique: true
    t.index ["book_id"], name: "index_book_inventories_on_book_id"
    t.index ["branch_id"], name: "index_book_inventories_on_branch_id"
  end

  create_table "books", force: :cascade do |t|
    t.string "title"
    t.bigint "author_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "cover_image_file_name"
    t.text "synopsis"
    t.text "synopsis_formatted"
    t.index ["author_id"], name: "index_books_on_author_id"
  end

  create_table "branches", force: :cascade do |t|
    t.string "name"
    t.string "street_address"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "city"
    t.string "state"
    t.string "zip"
    t.index ["name"], name: "index_branches_on_name", unique: true
  end

  create_table "checkouts", force: :cascade do |t|
    t.bigint "book_id"
    t.bigint "user_id"
    t.bigint "branch_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "due_at"
    t.index ["book_id"], name: "index_checkouts_on_book_id"
    t.index ["branch_id"], name: "index_checkouts_on_branch_id"
    t.index ["user_id"], name: "index_checkouts_on_user_id"
  end

  create_table "reservations", force: :cascade do |t|
    t.bigint "book_id"
    t.bigint "branch_id"
    t.bigint "user_id"
    t.boolean "ready"
    t.datetime "expires"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["book_id"], name: "index_reservations_on_book_id"
    t.index ["branch_id"], name: "index_reservations_on_branch_id"
    t.index ["user_id", "branch_id", "book_id"], name: "index_reservations_on_user_id_and_branch_id_and_book_id", unique: true
    t.index ["user_id"], name: "index_reservations_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "admin"
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "books", "authors"
  add_foreign_key "checkouts", "books"
  add_foreign_key "checkouts", "branches"
  add_foreign_key "checkouts", "users"
  add_foreign_key "reservations", "books"
  add_foreign_key "reservations", "branches"
  add_foreign_key "reservations", "users"
end
