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
            $table->string('accountable_person');
            $table->text('description');
            $table->unsignedBigInteger('registrar_id'); // Change to unsignedBigInteger
            $table->foreign('registrar_id')->references('id')->on('users'); // Define foreign key constraint
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
            $table->string('status'); 
            $table->text('feedback')->nullable();
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
