require 'rails_helper'

RSpec.describe "Scores", type: :request do
  before do
    @user = FactoryBot.create(:user)
    @score = FactoryBot.create(:score)
  end

  describe "POST /api/scores" do
    context 'Scoreデータが生成できる' do
      it "Scoreデータを正しく記入すれば正常にレスポンスが返ってくる" do
        auth = sign_in(@user)
        post(api_scores_path, params: { score: 1}, headers: {
          uid: auth["uid"],
          client: auth["client"],
          "access-token": auth["access-token"]
        })
        expect(response).to have_http_status(201)
      end
    end
    context 'Scoreデータが生成できない' do
      it 'Scoreデータを間違って記入するとエラーレスポンスが返ってくる' do
        auth = sign_in(@user)
        post(api_scores_path, params: { score: 100}, headers: {
          uid: auth["uid"],
          client: auth["client"],
          "access-token": auth["access-token"]
        })
        expect(response).to have_http_status(422)
      end
      it 'Headerがないとエラーメッセージが返ってくる' do
        auth = sign_in(@user)
        post(api_scores_path, params: { score: 1} )
        expect(response).to have_http_status(401)
      end
    end
  end  
  describe "GET /api/scores" do
    it 'Scoreデータが返信される' do
      get api_scores_path
      expect(response).to have_http_status(200)
    end
  end
end
