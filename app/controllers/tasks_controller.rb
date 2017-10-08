class TasksController < ApplicationController
  def list
    @tasks = current_user.tasks
  end

  def show
    @task = Task.find(params[:id])
    render json: @task
  end

  def create
    @task = current_user.tasks.create(task_params)
    if @task.save
      render :show
    else
      render json: @task.errors.full_messages, status: 422
  end

  def update
    if @task.update(task_params)
      render :show
    else
      render json: @task.errors.full_messages, status: 422
    end
  end

  def destroy
    @task = current_user.tasks.find(params[:id])
    @task.destroy
    redirect_to :action => 'list'
  end

  private

  def task_params
    params.require(:task).permit(:title, :description, :status, :priority)
  end

end
