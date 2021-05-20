require 'rails_helper'

RSpec.describe Score, type: :model do

  before do
    @score = FactoryBot.build(:score)
  end

  context 'Scoreが保存できる時' do
    it 'scoreとuserが存在すれば保存できる' do
      expect(@score).to be_valid
    end
  end

  context 'Scoreが保存できない時' do
    it 'Scoreが空では保存できない' do
      @score.score = ''
      @score.valid?
      expect(@score.errors.full_messages).to include("Score is not a number")
    end
    
    it 'Score整数でなければ保存できないこと' do
      @score.score = 1.23
      @score.valid?
      expect(@score.errors.full_messages).to include("Score must be an integer")
    end
    it 'Scoreは４以上だと保存できないこと' do
      @score.score = 5
      @score.valid?
      expect(@score.errors.full_messages).to include("Score must be less than or equal to 4")
    end

    it 'Scoreは0以下だと保存できないこと' do
      @score.score = -1
      @score.valid?
      expect(@score.errors.full_messages).to include("Score must be greater than or equal to 0")
    end

    it 'userが紐付いていないと保存できないこと' do
      @score.user = nil
      @score.valid?
      expect(@score.errors.full_messages).to include("User must exist")
    end
  end
end
