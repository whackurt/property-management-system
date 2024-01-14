<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Property;
use Illuminate\Http\Request;
use User;

class PropertyController extends Controller
{
   public function getAllProperties()
    {
        try {
            $properties = Property::with('registrarUser:id,name')->get();
            return response()->json(['properties' => $properties], 200);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 500);
        }
    }

    public function getPropertyById($id)
    {
        try {
            $property = Property::find($id);

            if (!$property) {
                return response()->json(['message' => 'Property not found'], 404);
            }

            return response()->json(['property' => $property], 200);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 500);
        }
    }

    public function getPropertyByUserId($id)
    {
        try {
            $userProperties = Property::with('registrarUser:name')
            ->where('registrar_id', $id)
            ->get();

            return response()->json(['properties' => $userProperties], 200);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 500);
        }
    }

    public function createProperty(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'articles' => 'required|string',
                'description' => 'required|string',
                'accountable_person' => 'required|string',
                'date_of_assumption' => 'required|date',
                'quantity_per_property' => 'required|integer',
                'quantity_per_physical' => 'required|integer',
                'shortage_overage_quantity' => 'required|integer',
                'shortage_overage_value' => 'required|numeric',
                'unit_of_measure' => 'required|string',
                'unit_value' => 'required|numeric',
                'physical_value' => 'required|numeric',
                'property_number' => 'required|string',
                'remarks' => 'nullable|string',
                'status' => 'required|string',
                'registrar_id' => 'required|integer',
                'feedback' => 'string',
            ]);

            $property = Property::create($validatedData);            

            return response()->json(['property' => $property, 'message' => 'Property created successfully'], 201);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 500);
        }
    }

    public function updateProperty(Request $request, $id)
    {
        try {
            $property = Property::find($id);

            if (!$property) {
                return response()->json(['message' => 'Property not found'], 404);
            }

            $validatedData = $request->validate([
                'articles' => 'sometimes|string',
                'description' => 'sometimes|string',
                'accountable_person' => 'sometimes|string',
                'date_of_assumption' => 'sometimes|date',
                'quantity_per_property' => 'sometimes|integer',
                'quantity_per_physical' => 'sometimes|integer',
                'shortage_overage_quantity' => 'sometimes|integer',
                'shortage_overage_value' => 'sometimes|numeric',
                'unit_of_measure' => 'sometimes|string',
                'unit_value' => 'sometimes|numeric',
                'physical_value' => 'sometimes|numeric',
                'property_number' => 'sometimes|string',
                'remarks' => 'nullable|string',
                'status' => 'sometimes|string',
                'registrar_id' => 'sometimes|string',
                'feedback' => 'sometimes|string',
            ]);

            $property->fill($validatedData);
            $property->save();

            return response()->json(['property' => $property, 'message' => 'Property updated successfully'], 200);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 500);
        }
    }

    public function updatePropertyStatus(Request $request, $id)
    {
        try {
            $property = Property::find($id);

            if (!$property) {
                return response()->json(['message' => 'Property not found'], 404);
            }

            $validStatuses = ['Accepted', 'Denied'];
            $requestedStatus = $request->input('status');

            // Check if the requested status is valid
            if (!in_array($requestedStatus, $validStatuses)) {
                return response()->json(['message' => 'Invalid status provided'], 400);
            }

            // Update the status if it's different from the current status
            if ($property->status !== $requestedStatus) {
                $property->status = $requestedStatus;
                $property->feedback = $request->input('feedback');
                $property->save();

                return response()->json(['message' => 'Property status updated successfully'], 200);
            }

            return response()->json(['message' => 'Property status is already ' . $requestedStatus], 200);

        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 500);
        }
    }

    public function deleteProperty($id)
    {
        try {
            $property = Property::find($id);

            if (!$property) {
                return response()->json(['message' => 'Property not found'], 404);
            }

            $property->delete();

            return response()->json(['message' => 'Property deleted successfully'], 200);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 500);
        }
    }






}
