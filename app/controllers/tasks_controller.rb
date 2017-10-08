class TasksController < ApplicationController
  def list
    @user = current_user
    @tasks = current_user.tasks
  end

  def show
    @task = Task.find(params[:id])
    render json: @task
  end

  def create
    @user = current_user
    @task = @user.tasks.create(task_params)
    if @task.save
      redirect_to :action => 'list'
    else
      render json: @task.errors.full_messages, status: 422
  end

  def update
    if @task.update(task_params)
      redirect_to :action => 'list'
    else
      render json: @task.errors.full_messages, status: 422
    end
  end

  def destroy
    @user = current_user
    @task = @user.tasks.find(params[:id])
    @task.destroy
    redirect_to :action => 'list'
  end

  private

  def task_params
    params.require(:task).permit(:title, :description, :status, :priority)
  end

end
