import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-[hsl(0,0%,4%)] text-white flex flex-col" data-testid="home-screen">
      <div className="px-4 pt-4">
        <Tabs defaultValue="agents" className="w-full">
          <TabsList className="w-full bg-[hsl(0,0%,10%)] rounded-full h-10 flex justify-between px-2">
            <TabsTrigger value="agents" className="flex-1 rounded-full text-sm font-semibold data-[state=active]:bg-[hsl(0,0%,14%)] data-[state=active]:text-white text-white/70">
              Agents
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="flex-1 rounded-full text-sm font-semibold data-[state=active]:bg-[hsl(0,0%,14%)] data-[state=active]:text-white text-white/70">
              Dashboard
            </TabsTrigger>
          </TabsList>
          <TabsContent value="agents" className="mt-6" />
          <TabsContent value="dashboard" className="mt-6" />
        </Tabs>
      </div>

      <div className="flex-1 flex items-center">
        <div className="w-full px-4">
          <div className="flex flex-col items-center gap-3 text-center">
            <h1 className="text-[18px] font-medium text-[#B0B0B0] tracking-tight">
              Update main screen UI to match design
            </h1>
            <p className="text-[14px] leading-5 text-[#B0B0B0]/80 text-left max-w-[680px] w-full">
              Align the layout, typography, and components precisely with the provided iOS design using a dark theme with subtle contrast, ensuring spacing and visual tone match San Francisco system styling.
            </p>
            <div className="w-full">
              <div className="inline-flex items-center gap-2">
                <Badge className="rounded-full border-white/10 bg-white/5 text-[12px] font-medium text-white/80 px-3 py-1">
                  gpt-5-high
                </Badge>
              </div>
            </div>
          </div>

          <div className="my-4 h-px w-full bg-white/10" />

          <div className="mt-4">
            <div className="inline-block rounded-2xl bg-white/5 border border-white/10 px-3 py-2 text-[14px] text-white/90">
              VM started
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 pb-6">
        <div className="flex gap-3">
          <Button className="flex-1 rounded-xl bg-white/5 hover:bg-white/10 text-white/90 h-11 text-[14px]">Diff</Button>
          <Button className="flex-1 rounded-xl bg-white/5 hover:bg-white/10 text-white/90 h-11 text-[14px]">Chat</Button>
        </div>
      </div>
    </div>
  );
}