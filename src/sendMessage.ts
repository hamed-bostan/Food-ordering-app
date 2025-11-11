import axios from "axios";

export async function sendMessageToAI(message: string): Promise<string> {
  try {
    const response = await axios.post(
      "http://localhost:5678/webhook/eb363302-4c4c-48c8-a42f-44c259cb3e3d/chat",
      { chatInput: message },
      { headers: { "Content-Type": "application/json" } }
    );

    const aiResponse = response.data.output;
    console.log("Ai response:", response);

    return aiResponse;
  } catch (error: any) {
    console.error("Error sending message to AI:", error);
    throw new Error("Failed to get response from AI");
  }
}
