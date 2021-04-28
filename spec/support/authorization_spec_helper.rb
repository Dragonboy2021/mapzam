module AuthorizationSpecHelper
  def sign_in(user)
    post new_api_user_session_path,
      params: { email: user.email, password: user.password }
    response.header.slice('client', 'access-token', 'uid')
  end
end