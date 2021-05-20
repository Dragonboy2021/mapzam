require 'rails_helper'
# include ActionController::RespondWith

RSpec.describe "Users Authentication", type: :request do
  before do
    @user = FactoryBot.create(:user)
  end
  
  
  describe 'GET /api/users/:id' do
    context 'Userデータが取得できるとき' do
    
    
    end
    
    
    # it 'User情報が正しくレスポンスが返ってくる' do
    #   auth = sign_in(@user)
    #   post(api_scores_path, params: { score: 1}, headers: {
    #     uid: auth["uid"],
    #     client: auth["client"],
    #     "access-token": auth["access-token"]
    #   })
    #   get api_auth_validate_token_path, { headers: {
    #     uid: auth["uid"],
    #     client: auth["client"],
    #     "access-token": auth["access-token"]
    #   }}
    #   user_data = JSON.parse response.body
    #   id = user_data['data']['id']
    #   get api_user_path(id), { headers: {
    #     uid: auth["uid"],
    #     client: auth["client"],
    #     "access-token": auth["access-token"]
    #   }}
      
    #   expect(response).to have_http_status(200)
    end
  end
end
