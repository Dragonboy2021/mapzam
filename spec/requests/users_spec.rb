require 'rails_helper'
# include ActionController::RespondWith

RSpec.describe "Users Authentication", type: :request do
  before do
    @user = FactoryBot.create(:user)
  end
  
  describe "POST /api/auth" do
    it "Userデータを正しく記入すれば正常にレスポンスが返ってくる" do
      post  api_user_registration_path params: { name: 'test', email: "test@test.com", password: 'test123'}
      expect(response).to have_http_status(200)
    end
  end

  describe "POST /api/sign_in" do
    it '登録済みのUserデータを正しく記入すればログインでき正常にレスポンスが返ってくる' do
      sign_in(@user)
      expect(response).to have_http_status(200)
    end

  end

  describe "DELETE /api/sign_out" do
    it 'ログイン済みのユーザーは正しいHeader情報を記入するばログインができ正常にレスポンスが返ってくる' do
      auth = sign_in(@user)
      delete(destroy_api_user_session_path, { headers: {
        uid: auth["uid"],
        client: auth["client"],
        "access-token": auth["access-token"]
      }})
      expect(response).to have_http_status(200)
    end
  end


end
