FactoryBot.define do
  factory :score do
    score  {rand(0..4)}
    association :user
  end
end
