# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

10.times do
  username = Faker::Internet.user_name
  email = Faker::Internet.email
  password = 'carrot'

  user = User.create({
    username: username,
    email: email,
    password: password
  })

  tasks = [{
    title: "#{Faker::Hacker.verb} #{Faker::Hacker.adjective} #{Faker::Hacker.noun}",
    status: 'open',
    priority: 1
  },
  {
    title: "#{Faker::Hacker.verb} #{Faker::Hacker.adjective} #{Faker::Hacker.noun}",
    status: 'open',
    priority: 2
  },
  {
    title: "#{Faker::Hacker.verb} #{Faker::Hacker.adjective} #{Faker::Hacker.noun}",
    status: 'ready',
    priority: 1
  },
  {
    title: "#{Faker::Hacker.verb} #{Faker::Hacker.adjective} #{Faker::Hacker.noun}",
    status: 'ready',
    priority: 2
  },
  {
    title: "#{Faker::Hacker.verb} #{Faker::Hacker.adjective} #{Faker::Hacker.noun}",
    status: 'ready',
    priority: 3
  },
  {
    title: "#{Faker::Hacker.verb} #{Faker::Hacker.adjective} #{Faker::Hacker.noun}",
    status: 'in progress',
    priority: 1
  },
  {
    title: "#{Faker::Hacker.verb} #{Faker::Hacker.adjective} #{Faker::Hacker.noun}",
    status: 'in progress',
    priority: 2
  },
  {
    title: 'moisturize',
    description: 'moisty',
    status: 'done',
    priority: 1
  },
  {
    title: "#{Faker::Hacker.verb} #{Faker::Hacker.adjective} #{Faker::Hacker.noun}",
    description: '1337 h4x0r task',
    status: 'done',
    priority: 2
  }]

  user.tasks.create(tasks)

end
