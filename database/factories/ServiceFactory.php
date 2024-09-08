<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Property;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Service>
 */
class ServiceFactory extends Factory
{
    // **Declaration of the static property**
    protected static $serviceIndex = 0;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Predefined services in a specific order
        $services = [
            'Rates',
            'Refuse Collection',
            'Sewage Service',
            'Water',
            'Supplimentary',
            //'Sewage Levy',
            'Roads Levy',
           // 'Fire Emergency',
            'Public Light'
        ];

        // Select the service based on the current index
        $service = $services[self::$serviceIndex % count($services)];

        // Increment the index for the next service
        self::$serviceIndex++;

        return [
            "property_id" => function () {
                return Property::inRandomOrder()->first()->id;
            },
            "service" => $service,
            "current_amount" => $this->faker->randomFloat(1, 10, 100),
            "arreas" => $this->faker->randomFloat(1, 10, 50),
            "expire_date" => $this->faker->dateTimeBetween('now', '+1 year')->format('Y-m-d'),
            'status' => $this->faker->randomElement(['pending', 'declined', 'approved']),
        ];

    }
}
