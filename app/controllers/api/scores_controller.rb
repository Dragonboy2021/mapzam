module Api
  class ScoresController < ApplicationController
    before_action :authenticate_api_user!, only: [:create]

    def create
      @score = Score.new(score_params)
      if @score.save
        render json: @score, status: :created
      else
        render json: @score.errors, status: :unprocessable_entity
      end
    end

    def index
      @scores = Score.all
      render json: @scores.to_json(:include => {
        :user => {:only => [:name]}
      })
    end

    private

    def score_params
      params.permit(:score).merge(user_id: current_api_user.id)
    end
  end
end
