require 'rails_helper'

RSpec.describe "Users Authentication", type: :request do
  before do
    @user = FactoryBot.create(:user)
  end

  describe 'GET /api/users/:id' do
    context 'Userデータが取得できるとき' do
      it 'Headerを含めば登録済みのユーザーのデータを取得できる' do
        auth = sign_in(@user)
        get api_auth_validate_token_path, { headers: {
          uid: auth["uid"],
          client: auth["client"],
          "access-token": auth["access-token"]
        }}
        user_data = JSON.parse response.body
        id = user_data['data']['id']
        get api_user_path(id), { headers: {
          uid: auth["uid"],
          client: auth["client"],
          "access-token": auth["access-token"]
        }}
        expect(response).to have_http_status(200)
      end
    end
    
    context 'Userデータが取得でないとき' do
      it 'Headerがないと登録済みのユーザーのデータを取得できない' do
        id = 1
        get api_user_path(id)
        expect(response).to have_http_status(401)
      end
    end
  end
end
