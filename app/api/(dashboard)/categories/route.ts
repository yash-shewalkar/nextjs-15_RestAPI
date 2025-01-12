import connectDB from "@/lib/db"
import { NextResponse } from "next/server"
import User from "@/lib/modals/users"
import Category from "@/lib/modals/category";
import { Types } from "mongoose";

export const GET = async (request : Request) => {
    try{
        const {searchParams} = new URL(request.url);
        const userId = searchParams.get("userId");

        if(!userId || !Types.ObjectId.isValid(userId)){
            return new NextResponse(JSON.stringify({message: "Invalid userId"}), {status: 400});
        }

        await connectDB();
        const user = await User.findById(userId);
        if(!user){
            return new NextResponse(JSON.stringify({message: "User not found"}), {status: 400});
        }   

        const categories = await Category.find({
            user: new Types.ObjectId(userId),
        });
        return new NextResponse(JSON.stringify({categories}), {status: 200});
    }
    catch(err: any){
        return new NextResponse("Error in getting user: " + err.message, {status: 500});
    }

}

export const POST = async (request : Request) => {
 try{
        const {searchParams} = new URL(request.url);
        const userId = searchParams.get("userId");

        if(!userId || !Types.ObjectId.isValid(userId)){
            return new NextResponse(JSON.stringify({message: "Invalid userId"}), {status: 400});
        }

        const {title} = await request.json();
        if(!title){
            return new NextResponse(JSON.stringify({message: "Title is required"}), {status: 400});
        }

        await connectDB();
        const user = await User.findById(userId);
        if(!user){
            return new NextResponse(JSON.stringify({message: "User not found"}), {status: 400});
        }   

        const category = new Category({
            user: new Types.ObjectId(userId),
            title,
        });

        await category.save();
        return new NextResponse(JSON.stringify({category}), {status: 200});
 }
    catch(err: any){
        return new NextResponse("Error in creating category: " + err.message, {status: 500});
    }

}