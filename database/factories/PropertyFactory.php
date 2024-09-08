<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Property>
 */
class PropertyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
         return [
           // 'user_id' => User::factory(),  // Associate each property with a user
            'property_no' => $this->faker->numberBetween(100,1000),
            'street' => $this->faker->streetName,
            'surbub' => $this->faker->randomElement(['Pangolin', 'Rujeko', 'Mucheke','Vic range','Runyararo','CBZ','Majange','Hillside','Rodenne']),
            'account' => $this->faker->numerify('101-####-####'),
            'status' => 'available',
        ];
    }
}
