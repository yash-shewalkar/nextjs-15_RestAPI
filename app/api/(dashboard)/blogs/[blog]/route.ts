import connectDB from "@/lib/db"
import { NextResponse } from "next/server"
import User from "@/lib/modals/users"
import Category from "@/lib/modals/category";
import { Types } from "mongoose";
import Blog from "@/lib/modals/blog";

export const GET = async (request : Request , context : {params:any}) =>{

    const params = await context.params;
    const blogId = params.blog;

    try{
        const {searchParams} = new URL(request.url);
        const userId = searchParams.get("userId");
        const categoryId = searchParams.get("categoryId");
        if(!userId || !Types.ObjectId.isValid(userId)){
            return new NextResponse(JSON.stringify({message: "Invalid or missing userId"}), {status: 400});
        }
        if(!categoryId || !Types.ObjectId.isValid(categoryId)){
            return new NextResponse(JSON.stringify({message: "Invalid or missing categoryId"}), {status: 400});
        }
        if(!blogId || !Types.ObjectId.isValid(blogId)){
            return new NextResponse(JSON.stringify({message: "Invalid or missing blogId"}), {status: 400});
        }

        await connectDB();

        const user = await User.findById(userId);
        if(!user){
            return new NextResponse(JSON.stringify({message: "User not found"}), {status: 400});
        }
        const category = await Category.findById(categoryId);
        if(!category){
            return new NextResponse(JSON.stringify({message: "Category not found"}), {status: 400});
        }

        const blog = await Blog.findOne({
            _id:blogId,
            user: userId,
            category: categoryId,

        })
        if(!blog){
            return new NextResponse(JSON.stringify({message: "blog not found"}), {status: 400});
        }
        return new NextResponse(JSON.stringify({blog}), {status: 200});
    }
    catch(err:any){
        return new NextResponse("Error in getting blogs: " + err.message, {status: 500});
    }

}

export const PATCH = async (request : Request , context : {params:any}) =>{
    const params = await context.params;
    const blogId = params.blog;
    try{
        const {searchParams} = new URL(request.url);
        const userId = searchParams.get("userId");

        const body = await request.json();
        const {title, descriptoin} = body;
        if(!userId || !Types.ObjectId.isValid(userId)){
            return new NextResponse(JSON.stringify({message: "Invalid or missing userId"}), {status: 400});
        }
        if(!blogId || !Types.ObjectId.isValid(blogId)){
            return new NextResponse(JSON.stringify({message: "Invalid or missing blogId"}), {status: 400});
        }

        await connectDB();

        const user = await User.findById({_id:userId, user : userId});
        if(!user){
            return new NextResponse(JSON.stringify({message: "User not found"}), {status: 400});
        }
        const blog = await Blog.findById(blogId);
        if(!blog){
            return new NextResponse(JSON.stringify({message: "blog not found"}), {status: 400});
        }

        const updatedBlog = await  Blog.findByIdAndUpdate(blogId,
            {title, descriptoin},
            {
                new : true
            }
        )
        return new NextResponse(JSON.stringify({message: "Blog Updated" , blog: updatedBlog}), {status:200})
    }
    catch(err:any){
        return new NextResponse("Error in getting blogs: " + err.message, {status: 500});
    }
}   

export const DELETE = async (request : Request , context : {params:any}) =>{
    const params = await context.params;
    const blogId = params.blog;
    try{
        const {searchParams} = new URL(request.url);
        const userId = searchParams.get("userId");

        if(!userId || !Types.ObjectId.isValid(userId)){
            return new NextResponse(JSON.stringify({message: "Invalid or missing userId"}), {status: 400});
        }
        if(!blogId || !Types.ObjectId.isValid(blogId)){
            return new NextResponse(JSON.stringify({message: "Invalid or missing blogId"}), {status: 400});
        }

        await connectDB();

        const user = await User.findById({_id:userId, user : userId});
        if(!user){
            return new NextResponse(JSON.stringify({message: "User not found"}), {status: 400});
        }
        const blog = await Blog.findById(blogId);
        if(!blog){
            return new NextResponse(JSON.stringify({message: "blog not found"}), {status: 400});
        }
        await  Blog.findByIdAndDelete(blogId)
        return new NextResponse(JSON.stringify({message: "Blog deleted" }), {status:200})

    }
    catch(err:any){
        return new NextResponse("Error in getting blogs: " + err.message, {status: 500});
    }
}