import connectDB from "@/lib/db"
import { NextResponse } from "next/server"
import User from "@/lib/modals/users"
import Category from "@/lib/modals/category";
import { Types } from "mongoose";
import Blog from "@/lib/modals/blog";

//this is for blogs route
export const GET = async (request : Request) => {

    try{
        const {searchParams} = new URL(request.url);
        const userId = searchParams.get("userId");
        const categoryId = searchParams.get("categoryId");
        const searchKeywords = searchParams.get("keywords") as string;
        const startDate = searchParams.get("stateDate")
        const endDate = searchParams.get("endDate")
        const page:any = parseInt(searchParams.get("page") || "1");
        const limit: any = parseInt(searchParams.get("limit") || "10")

        if(!userId || !Types.ObjectId.isValid(userId)){
            return new NextResponse(JSON.stringify({message: "Invalid or missing userId"}), {status: 400});
        }
        if(!categoryId || !Types.ObjectId.isValid(categoryId)){
            return new NextResponse(JSON.stringify({message: "Invalid or missing categoryId"}), {status: 400});
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

        const filter : any = {
            category: categoryId,
            user: userId,
        }
        
        if(searchKeywords){
            filter.$or = [
                {
                    title: {$regex: searchKeywords, $options: "i"}
                },
                {
                    descriptoin: {$regex: searchKeywords, $options: "i"}
                },

            ];
        }
        if(startDate && endDate){
            filter.createdAt = {
                $gte: new Date(startDate),
                $lte: new Date(endDate),

            };      
        }
        else if(startDate){
            filter.createdAt = {
                $gte: new Date(startDate),
            };    
        }
        else if(endDate){     
            filter.createdAt = {
                $lte: new Date(endDate),
            };    
        }

        const skip = (page -1)*limit;
        const blogs = await Blog.find(filter).sort({createdAt:"asc"}).skip(skip).limit(limit);
        return new NextResponse(JSON.stringify({blogs}), {status: 200});

    }
    catch(err: any){
        return new NextResponse("Error in getting blogs: " + err.message, {status: 500});
    }

}; 

export const POST = async (request : Request) => {
    try{
            
        const {searchParams} = new URL(request.url);
        const userId = searchParams.get("userId");
        const categoryId = searchParams.get("categoryId");

        const body = await request.json();
        const {title, descriptoin} = body;


        if(!userId || !Types.ObjectId.isValid(userId)){
            return new NextResponse(JSON.stringify({message: "Invalid or missing userId"}), {status: 400});
        }
        if(!categoryId || !Types.ObjectId.isValid(categoryId)){
            return new NextResponse(JSON.stringify({message: "Invalid or missing categoryId"}), {status: 400});
        }

        if(!body){
            return new NextResponse(JSON.stringify({message:"Nothing in blog"}), {status: 400})
        }

        await connectDB();
        9
        const user = await User.findById(userId);
        if(!user){  
            return new NextResponse(JSON.stringify({message: "User not found"}), {status: 400});
        }  
        const category = await Category.findById(categoryId);
        if(!category){
            return new NextResponse(JSON.stringify({message: "category not found"}), {status: 400});
        }  

        const newBlog = new Blog({
            title, 
            descriptoin, 
            user: new Types.ObjectId(userId),
            category : new Types.ObjectId(categoryId)
        })
        
        await newBlog.save();

        return new NextResponse(JSON.stringify({message: "new blog is created !", blog: newBlog}),
            {status: 200})

    }
    catch(err:any){
      return new NextResponse("Error in getting blogs: " + err.message, {status: 500}); 
    }
}

