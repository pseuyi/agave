class SessionController < ApplicationController
  def create

    if !params[:id_token]
      @user = User.find_by_credentials(
        params[:user][:username],
        params[:user][:password]
      )

      if @user
        login_user
      else
        render json: ['Invalid username or password'], status: 401
      end

    else
      payload, header = JWT.decode params[:id_token], nil, false
      @user = User.find_by(email: payload["email"])

      if @user
        login_user
      else
        create_and_login_user(payload)
      end
    end
  end

  def destroy
    logout
    render json: {}
  end

  private

    def login_user
      login @user
      render json: @user
    end

    def create_user_from_google_auth(payload)
      @user = User.new(
        username: payload["name"],
        email: payload["email"],
        password_digest: "12345678"
      )
      @user.save
    end

    def create_and_login_user(payload)
      if create_user_from_google_auth(payload)
        login_user
      else
        render json: @user.errors.full_messages, status: 422
      end
    end
end
