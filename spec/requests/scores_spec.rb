require 'rails_helper'

RSpec.describe "Scores", type: :request do
  before do
    @user = FactoryBot.create(:user)
    @score = FactoryBot.create(:score)
  end

  describe "POST /api/score" do
      it "Scoreデータを正しく記入すれば正常にレスポンスが返ってくる" do
        auth = sign_in(@user)
        post(api_scores_path, params: { score: 1}, headers: {
          uid: auth["uid"],
          client: auth["client"],
          "access-token": auth["access-token"]
        })
        expect(response).to have_http_status(201)
      end
    
      it "登録されたユーザーのスコアが返ってくる" do
        auth = sign_in(@user)
        get api_scores_path
        expect(response).to have_http_status(200)
      end  
  end
end
