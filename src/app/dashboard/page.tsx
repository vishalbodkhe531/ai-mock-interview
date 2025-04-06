// import React from "react";
// import AddNewInterview from "./_components/AddNewInterview";
// import Image from "next/image";
// import dashImg from "../../../public/dash-img.svg";

// function Dashboard() {
//   return (
//     <>
//       <div className=" mt-4">
//         <div className="flex justify-between items-center">
//           <Image src={dashImg} height={400} alt="logo" width={400} />
//           <AddNewInterview />
//         </div>
//       </div>
//     </>
//   );
// }

// export default Dashboard;

// dashboard/page.tsx or dashboard/index.tsx
import React from "react";
import AddNewInterview from "./_components/AddNewInterview";
import Image from "next/image";
import dashImg from "../../../public/dash-img.svg";

function Dashboard() {
  return (
    <div className="mt-6 px-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Left section - Introduction */}
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            AI-Powered Mock Interviews
          </h1>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Easily generate mock interview questions tailored to your role,
            experience, and skills. Boost your confidence with AI-generated
            questions and answers that feel real.
          </p>
          <div className="mt-6 w-full">
            <AddNewInterview />
          </div>
        </div>

        {/* Right section - Image and Button */}
        <div className="flex flex-col items-center gap-6">
          <Image
            src={dashImg}
            height={400}
            width={400}
            alt="AI Interview"
            className="rounded-xl dark:brightness-90"
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
