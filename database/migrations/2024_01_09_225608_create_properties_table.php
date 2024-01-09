<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('properties', function (Blueprint $table) {
            $table->id();
            $table->string('articles');
            $table->text('description');
            $table->unsignedBigInteger('accountable_person');
            $table->foreign('accountable_person')->references('id')->on('users')->onDelete('cascade');
            $table->date('date_of_assumption');
            $table->integer('quantity_per_property');
            $table->integer('quantity_per_physical');
            $table->integer('shortage_overage_quantity');
            $table->decimal('shortage_overage_value', 10, 2);
            $table->string('unit_of_measure');
            $table->decimal('unit_value', 10, 2);
            $table->decimal('physical_value', 10, 2);
            $table->string('property_number');
            $table->text('remarks')->nullable();
            $table->string('status'); // Added a status column as it's mentioned in the error message
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('properties');
    }
};
