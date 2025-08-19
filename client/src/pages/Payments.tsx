import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Calendar, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type User } from "@shared/schema";

export default function Payments() {
  const { data: user } = useQuery<User>({
    queryKey: ["/api/user"],
  });

  const recentContacts = [
    {
      name: "Thomas Francis",
      initials: "TF",
      amount: "$18",
      date: "15 Aug",
      action: "You sent",
      color: "bg-orange-500"
    },
    {
      name: "Charlie Faulkner", 
      initials: "CF",
      amount: "$300",
      date: "20 Jul",
      action: "You sent",
      color: "bg-purple-500"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white" data-testid="payments-screen">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-4 py-2 text-white text-sm font-medium">
        <span>12:05 🌙</span>
        <div className="flex items-center gap-1">
          <div className="flex gap-1">
            <div className="w-1 h-3 bg-white rounded-full"></div>
            <div className="w-1 h-3 bg-white rounded-full"></div>
            <div className="w-1 h-3 bg-white/50 rounded-full"></div>
            <div className="w-1 h-3 bg-white/30 rounded-full"></div>
          </div>
          <span className="ml-1">📶</span>
          <span>87</span>
        </div>
      </div>

      {/* Header */}
      <div className="px-4 py-4 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">TF</span>
          </div>
          
          <div className="flex-1 mx-4">
            <div className="bg-gray-800 rounded-full px-4 py-2 flex items-center">
              <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="text-gray-400">Search</span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="w-10 h-10 bg-gray-800 rounded-full">
              <Calendar className="w-5 h-5 text-white" />
            </Button>
            <Button variant="ghost" size="icon" className="w-10 h-10 bg-gray-800 rounded-full">
              <Plus className="w-5 h-5 text-white" />
            </Button>
          </div>
        </div>
      </div>

      {/* Add Contacts Banner */}
      <div className="mx-4 mb-6">
        <div className="bg-gray-900 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-white font-medium">Add your contacts</h3>
              <p className="text-gray-400 text-sm">Send money to friends on Revolut, instantly</p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <X className="w-5 h-5 text-gray-400" />
          </Button>
        </div>
        
        <Button className="w-full mt-4 bg-white text-black rounded-full py-3 font-medium">
          Continue
        </Button>
      </div>

      {/* Recent Contacts */}
      <div className="px-4 mb-24">
        <div className="space-y-4">
          {recentContacts.map((contact, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 ${contact.color} rounded-full flex items-center justify-center relative`}>
                  <span className="text-white font-bold">{contact.initials}</span>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gray-600 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
                      <path d="M7 9h6v2H7z"/>
                    </svg>
                  </div>
                </div>
                <div>
                  <div className="text-white font-medium">{contact.name}</div>
                  <div className="text-gray-400 text-sm">{contact.action} {contact.amount}</div>
                </div>
              </div>
              <div className="text-gray-400 text-sm">{contact.date}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Home indicator */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="w-32 h-1 bg-white rounded-full"></div>
      </div>
    </div>
  );
}