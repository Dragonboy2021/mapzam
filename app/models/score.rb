class Score < ApplicationRecord
  belongs_to :user

  validates :score, numericality: { only_integer: true, less_than_or_equal_to: 4 }

end
