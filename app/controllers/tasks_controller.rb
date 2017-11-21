class TasksController < ApplicationController
  def index
    @tasks = current_user.tasks
    render json: @tasks
  end

  def show
    @task = Task.find(params[:id])
    render json: @task
  end

  def create
    @task = current_user.tasks.create(task_params)
    if @task.save
      render json: @task
    else
      render json: @task.errors.full_messages, status: 422
    end
  end

  def update
    @task = Task.find(task_params[:id])
    if @task.update(task_params)
      render json: @task
    else
      render json: @task.errors.full_messages, status: 422
    end
  end

  #TODO: handle rollbacks
  def update_tasks
    Task.transaction do
      @tasks = []
      tasks_params.each do |data|
        task = Task.find(data[:id])
        task.update({ status: data[:status], priority: data[:priority].to_i })
        @tasks << task
      end
    end

    render json: @tasks
  end

  def destroy
    @task = current_user.tasks.find(params[:id])
    @task.destroy
    render json: @task
  end

  private

  def task_params
    params.require(:task).permit(:title, :description, :status, :priority, :id)
  end

  def tasks_params
    params.require(:tasks)
  end
end
