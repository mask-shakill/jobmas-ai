import { NextRequest, NextResponse } from "next/server"; // NextResponse ইমপোর্ট করুন
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { Types } from "mongoose"; // for ObjectId validation

export async function POST(request: NextRequest) {
  await connectDB();

  const { name, email, phone, address } = await request.json();

  try {
    const newUser = new User({ name, email, phone, address });
    await newUser.save();
    return NextResponse.json({ message: "User Created Successfully!" });
  } catch (error) {
    console.error(error); // Error logging for debugging
    return NextResponse.json(
      { message: "Error creating user" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  await connectDB();

  const { id, name, email, phone, address } = await request.json();

  // Validate the ID
  if (!id || !Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { message: "Invalid or missing ID" },
      { status: 400 }
    );
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, phone, address },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { message: "User with the provided ID does not exist" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "User Updated Successfully!" });
  } catch (error) {
    console.error(error); // Error logging for debugging
    return NextResponse.json(
      { message: "Error updating user" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  await connectDB();

  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  try {
    if (id) {
      if (!Types.ObjectId.isValid(id)) {
        return NextResponse.json(
          { message: "Invalid ID format" },
          { status: 400 }
        );
      }

      const user = await User.findById(id);
      if (!user) {
        return NextResponse.json(
          { message: "User Not Found" },
          { status: 404 }
        );
      }
      return NextResponse.json(user);
    } else {
      const users = await User.find();
      return NextResponse.json(users);
    }
  } catch (error) {
    console.error(error); // Error logging for debugging
    return NextResponse.json(
      { message: "Error fetching user(s)" },
      { status: 500 }
    );
  }
}
