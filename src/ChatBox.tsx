import { useState } from "react";
import { useForm } from "react-hook-form";
import { sendMessageToAI } from "./sendMessage";

type FormValues = {
  message: string;
};

export default function ChatBox() {
  const [messages, setMessages] = useState<{ from: "user" | "ai"; text: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm<FormValues>();
  console.log("message:", messages);

  const onSubmit = async (data: FormValues) => {
    console.log("user text:", data.message.trim());
    const userMessage = data.message.trim();
    if (!userMessage) return;

    // add user message
    setMessages((prev) => [...prev, { from: "user", text: userMessage }]);
    reset();
    setLoading(true);

    try {
      const reply = await sendMessageToAI(userMessage);
      setMessages((prev) => [...prev, { from: "ai", text: reply }]);
    } catch (error) {
      setMessages((prev) => [...prev, { from: "ai", text: "⚠️ Sorry, I couldn’t reach the AI right now." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-md w-80">
      <div className="flex flex-col bg-slate-600">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.from === "user" ? "text-right" : "text-left"}`}>
            <div
              className={`flex w-full h-full rounded ${
                msg.from === "user" ? "flex w-full h-full bg-red-700 text-green-600" : "bg-blue-500 text-orange-500"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && <div className="text-left text-gray-400">AI is typing...</div>}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
        <input className="flex-1 p-1 border" {...register("message")} placeholder="Type a message..." />
        <button className="px-3 text-white bg-blue-500" type="submit" disabled={loading}>
          Send
        </button>
      </form>
    </div>
  );
}
