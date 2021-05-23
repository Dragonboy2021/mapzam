require 'rails_helper'

RSpec.describe "ユーザー新規登録", type: :system do
  before do
    @user = FactoryBot.build(:user)
    @user2 = FactoryBot.create(:user)
  end

  context 'ユーザー新規登録ができるとき' do
    it '正しい情報を入力すればユーザー新規登録ができてトップページに移動する' do
      visit '/'
      expect(page).to have_content('MAPZAM')
      click_button 'Sign Up'
      expect(current_path).to eq('/signup')
      fill_in 'Name', with: @user.name
      fill_in 'Email', with: @user.email
      fill_in 'Password', with: @user.password
      fill_in 'Confirm Password', with: @user.password
      expect {
        click_button 'Enter'
        sleep(1)
      }.to change { User.count }.by(1)
      sleep(1)
      expect(current_path).to eq('/')
      expect(page).to have_no_content('Log In')
      expect(page).to have_no_content('Sign Up')
      expect(page).to have_content('Log Out')
      expect(page).to have_content('Quiz')
    end
  end
  context 'ユーザー新規登録ができないとき' do
    it '登録済みのユーザー情報ではユーザー新規登録ができず' do
      visit '/'
      click_button 'Sign Up'
      fill_in 'Name', with: @user2.name
      fill_in 'Email', with: @user2.email
      fill_in 'Password', with: @user2.password
      fill_in 'Confirm Password', with: @user2.password
      expect {
        click_button 'Enter'
        sleep(1)
      }.to change { User.count }.by(0)
      expect(current_path).to eq('/signup')
      expect(page).to have_selector '.error-message'
    end
  end
end
RSpec.describe 'ログイン', type: :system do
  before do
    @user = FactoryBot.create(:user)
    @user2 = FactoryBot.build(:user)
  end
  context 'ログインができるとき' do
    it '保存されているユーザーの情報と合致すればログインができる' do
      visit '/'
      click_button 'Log In'
      fill_in 'Email', with: @user.email
      fill_in 'Password', with: @user.password
      click_button 'Enter'
      sleep(1)
      expect(current_path).to eq('/')
      expect(page).to have_no_content('Log In')
      expect(page).to have_no_content('Sign Up')
      expect(page).to have_content('Log Out')
      expect(page).to have_content('Quiz')
    end
  end
  context 'ログインができないとき' do
    it '保存されているユーザーの情報と合致しないとログインができない' do
      visit '/'
      click_button 'Log In'
      fill_in 'Email', with: @user2.email
      fill_in 'Password', with: @user2.password
      click_button 'Enter'
      sleep(1)
      expect(current_path).to eq('/login')
      expect(page).to have_selector '.error-message'
    end
  end
end
# RSpec.describe 'ログアウト', type: :system do
#   before do
#     @user = FactoryBot.create(:user)
#   end
#   it '保存されているユーザーはログアウトできる' do
#     visit '/'
#     click_button 'Log In'
#     fill_in 'Email', with: @user.email
#     fill_in 'Password', with: @user.password
#     click_button 'Enter'
#     sleep(100)
    # sleep(100)
    # click_button('Log Out')
    # expect(current_path).to eq('/')
    # expect(page).to have_no_content('Log Out')
    # expect(page).to have_no_content('Quiz')
    # expect(page).to have_content('Log In')
    # expect(page).to have_content('Sign Up')
#   end
# end