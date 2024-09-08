<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use App\Models\Service;
use App\Models\Property;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
       // Create 1 admin
        User::factory()->admin()->create();

        // Create 1 super admin
        User::factory()->superAdmin()->create();

        // Create 50 regular users
       // User::factory()->count(20)->create();
         Property::factory(500)->create();
         foreach (Property::all() as $property) {
            Service::factory()->count(7)->create(["property_id"=>$property->id]);
         }
    }
}
