import connectDB from "@/lib/db"
import { NextResponse } from "next/server"
import User from "@/lib/modals/users"
import { request } from "http";
import { connect } from "http2";
import { Types } from "mongoose";

const ObjectId = require("mongoose").Types.ObjectId;

export const GET =async () =>{
  try{
    await connectDB();
    const users = await User.find();
    return new NextResponse(JSON.stringify(users), {status: 200})
  }
  catch(err:any){

    console.log(err)
    return new NextResponse("Error in fetching users :" + err.message, {status: 500})
  }
};

export const POST = async(request : Request) => {
  try{
    const body =  await request.json();
    await connectDB();
    const newUser = new User(body);
    await newUser.save();
    return new NextResponse(JSON.stringify({message: "User created successfully", user: newUser}), {status: 201})

  }
  catch(err:any){
    console.log(err)
    return new NextResponse("Error in creating user :" + err.message,
      {status: 500})
  }
}

export const PATCH = async(request : Request) => {

  try{
    const body = await request.json();
    const {userId, newUsername} = body;

    await connectDB();
    //validations
    if(!userId || !newUsername){
      return new NextResponse(JSON.stringify({message:"userId and newUsername are required"}), 
        {status: 400})
    }

    if(!Types.ObjectId.isValid(userId)){
      return new NextResponse(JSON.stringify({message:"Invalid UserId"}), {status: 400})
    }

    const updatedUser = await User.findOneAndUpdate(
      {_id: new ObjectId(userId)},
      {name: newUsername },
      {new:true}  //return updated user
    )
    
    if(!updatedUser){
      return new NextResponse(JSON.stringify({message:"User not found"}), {status: 400})
    }

    return new NextResponse(
      JSON.stringify({message:"User updated successfully", user: updatedUser}),
      {status: 200}
    )
  }
  catch(err:any){
    return new NextResponse("Error in updating user :" + err.message, 
      {status: 500})
  }
}

export const DELETE = async(request : Request) => {
  try{
    const {searchParams} = new URL(request.url);
    const userId = searchParams.get("userId");
    if(!userId){
      return new NextResponse(JSON.stringify({message:"userId is required"}), 
        {status: 400})
    }
    if(!Types.ObjectId.isValid(userId)){
      return new NextResponse(JSON.stringify({message:"Invalid UserId"}),
       {status: 400})
    }

    await connectDB();
    const deletedUser = await User.findByIdAndDelete(
      new Types.ObjectId(userId));
    if(!deletedUser){
      return new NextResponse(JSON.stringify({message:"User not found"}),
       {status: 400})
    }
    return new NextResponse(
      JSON.stringify({message:"User deleted successfully", user: deletedUser}),
      {status: 200}
    )
  }
  catch(err:any){
    return new NextResponse("Error in deleting user :" + err.message,
      {status: 500})  
  }

}