module Api  
  class UsersController < ApplicationController
    before_action :authenticate_api_user!

    def show
      @user = User.find(params[:id])
      render json: @user, include: ['scores']
    end
  end
end
