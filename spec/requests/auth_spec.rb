require 'rails_helper'

RSpec.describe "Users Authentication", type: :request do

  before do
    @user = FactoryBot.create(:user)
  end

  describe "POST /api/auth" do
    context 'User新規登録ができるとき' do
      it "Userデータを正しく記入すれば正常にレスポンスが返ってくる" do
        post  api_user_registration_path params: { 
          name: 'test', 
          email: "test@test.com", 
          password: 'test123', 
          password_confirmation: 'test123'
        }
        expect(response).to have_http_status(200)
      end
    end
    context 'User新規登録ができないとき' do
      it "Userデータを間違って記入するとエラーレスポンスが返ってくる" do
        user = {
          name: '', 
          email: '', 
          password: '', 
          password_confirmation: ''
        }
        post  api_user_registration_path params: user
        expect(response).to have_http_status(422)
      end
    end
  end
  describe 'POST /api/sign_in' do
    context 'Userログインができるとき' do
      it '登録済みのUserデータを正しく記入すればログインでき正常にレスポンスが返ってくる' do
        sign_in(@user)
        expect(response).to have_http_status(200)
      end
    end
    context 'Userログインができないとき' do
      it '登録済みのUserデータを間違って記入すれとエラーレスポンスが返ってくる' do
        @user.email = ''
        @user.password = ''
        sign_in(@user)
        expect(response).to have_http_status(401)
      end
    end
  end
  describe 'DELETE /api/sign_out' do
    context 'ログアウトできるとき' do
      it 'ログイン済みのユーザーはHeaderがあればログアウトできる' do
        auth = sign_in(@user)
        delete(destroy_api_user_session_path, { headers: {
          uid: auth["uid"],
          client: auth["client"],
          "access-token": auth["access-token"]
        }})
        expect(response).to have_http_status(200)
      end
    end
    context 'ログアウトできないとき' do
      it 'ログイン済みのUserはHeaderがないとログアウトできない' do
        auth = sign_in(@user)
        delete(destroy_api_user_session_path)
        expect(response).to have_http_status(404)
      end
    end
  end
  describe 'POST /api/auth/validate_token' do
    context 'Userデータを取得できるとき' do
      it '正常なHeaderデータでアクセスするとUserデータが返ってくる' do
        auth = sign_in(@user)
        get api_auth_validate_token_path, { headers: {
          uid: auth["uid"],
          client: auth["client"],
          "access-token": auth["access-token"]
        }}
        user = JSON.parse response.body
        expect(response).to have_http_status(200)
      end
    end
    context 'Userデータを取得できないとき' do
      it 'HeaderデータがないとUserデータを取得できない' do
        get api_auth_validate_token_path
        expect(response).to have_http_status(401)
      end
    end
  end
end