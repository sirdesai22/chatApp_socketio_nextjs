"use client";
import { io } from "socket.io-client";
import { useState } from "react";
import ChatPage from "@/components/ChatPage";

export default function Home() {
  const [showChat, setShowChat] = useState(false);
  const [userName, setUserName] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const [roomId, setroomId] = useState("");

  var socket: any;
  socket = io("http://localhost:3001");

  const handleJoin = () => {
    if (userName !== "" && roomId !== "") {
      console.log(userName, "userName", roomId, "roomId");
      socket.emit("join_room", roomId);
      setShowSpinner(true);
// You can remove this setTimeout and add your own logic
      setTimeout(() => {
        setShowChat(true);
        setShowSpinner(false);
      }, 4000);
    } else {
      alert("Please fill in Username and Room Id");
    }
  };

  return (
    <div>
      <div
        className=" bg-sky-300 h-screen w-full flex justify-center items-center flex-col gap-4"
        style={{ display: showChat ? "none" : "" }}
      >
        <input
          className="p-2 rounded-md shadow-md"
          type="text"
          placeholder="Username"
          onChange={(e) => setUserName(e.target.value)}
          disabled={showSpinner}
        />
        <input
          className="p-2 rounded-md shadow-md"
          type="text"
          placeholder="Room id"
          onChange={(e) => setroomId(e.target.value)}
          disabled={showSpinner}
        />
        <button className="bg-emerald-500 text-white text-2xl font-semibold px-9 py-2 rounded-lg" onClick={() => handleJoin()}>
          {!showSpinner ? (
            "Join"
          ) : (
            <div className="loading_spinner"></div>
          )}
        </button>
      </div>
      <div style={{ display: !showChat ? "none" : "" }}>
        <ChatPage socket={socket} roomId={roomId} username={userName} />
      </div>
    </div>
  );
}