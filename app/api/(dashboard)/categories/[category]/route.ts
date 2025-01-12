import connectDB from "@/lib/db"
import { NextResponse } from "next/server"
import User from "@/lib/modals/users"
import Category from "@/lib/modals/category";
import { Types } from "mongoose";

//category id will come from the url as context.params.category

export const PATCH = async (request : Request, context: {params: any} ) => {
    
    const params = await context.params; // Await the params object
    const categoryId = params.category; // Access category from resolved params
    try{
        const body = await request.json();
        const {title} = body;

        const {searchParams} = new URL(request.url);
        const userId = searchParams.get("userId");

        if(!userId || !Types.ObjectId.isValid(userId)){
            return new NextResponse(JSON.stringify({message: "Invalid userId"}), {status: 400});
        }

        if(!categoryId || !Types.ObjectId.isValid(categoryId)){
            return new NextResponse(JSON.stringify({message: "Invalid categoryId"}), {status: 400});
        }

        await connectDB();

        const user = await User.findById(userId);

        if(!user){
            return new NextResponse(JSON.stringify({message: "User not found"}), {status: 400});
        }
        
        const category = await Category.findOne({_id: categoryId, user: userId});
        if(!category){
            return new NextResponse(JSON.stringify({message: "Category not found or does not belong to the user"}), {status: 400});
        }
        const updatedCategory = await Category.findByIdAndUpdate(
            categoryId,
            {title},
            {new: true},
        );

        return new NextResponse(JSON.stringify({category: updatedCategory}), {status: 200});
        }
    catch(err: any){
        return new NextResponse("Error in updating category: " + err.message, {status: 500});
    }
}

export const DELETE = async (request : Request, context: {params:any}) => {

    const params = await context.params; // Await the params object
    const categoryId = params.category; // Access category from resolved params
    try{
        const {searchParams} = new URL(request.url);
        const userId = searchParams.get("userId");

        if(!userId || !Types.ObjectId.isValid(userId)){
            return new NextResponse(JSON.stringify({message: "Invalid userId"}), {status: 400});
        }

        if(!categoryId || !Types.ObjectId.isValid(categoryId)){
            return new NextResponse(JSON.stringify({message: "Invalid categoryId"}), {status: 400});
        }

        await connectDB();
        const user = await User.findById(userId);
        if(!user){
            return new NextResponse(JSON.stringify({message: "User not found"}), {status: 400});
        }
        
        const category = await Category.findOne({_id: categoryId, user: userId});
        if(!category){
            return new NextResponse(JSON.stringify({message: "Category not found or does not belong to the user"}), {status: 400});
        }

        await Category.findByIdAndDelete(categoryId);

        return new NextResponse(JSON.stringify({message: "Category is deleted"}), {status: 200}
            );
    }
    catch(err: any){
        return new NextResponse("Error in deleting category: " + err.message, {status: 500});
    }
}