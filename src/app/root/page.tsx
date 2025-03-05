"use client";

import { useForm } from "react-hook-form";
import Image from "next/image";

const Page = () => {
  const { register, handleSubmit, reset } = useForm<{ question: string }>();

  const onSubmit = (data: { question: string }) => {
    console.log("User Question:", data.question);
    reset(); 
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-4xl mx-auto border h-96 w-lg p-4 flex flex-col">
        {/* Chat Section */}
        <div className="chat chat-end">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <Image
                alt="Tailwind CSS chat bubble component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                width={200}
                height={200}
              />
            </div>
          </div>
          <div className="chat-bubble">
            It was said that you would destroy the Sith, not join them.
          </div>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 flex mt-auto">
          <input
            type="text"
            placeholder="Ask a question..."
            {...register("question", { required: true })}
            className="input input-bordered w-full "
          />
          <button type="submit" className="btn btn-primary ml-2">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Page;
