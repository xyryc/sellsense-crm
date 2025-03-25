import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center mt-72">
        {" "}
        Welcome Everyone in SellSense CRM Project!
      </h1>
      <Button className="ml-[700px] mt-4" variant="destructive">
        Click Me !!!
      </Button>
    </div>
  );
}
