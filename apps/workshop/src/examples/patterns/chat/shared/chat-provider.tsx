/**
 *              © 2025 Visa
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 **/
import { ReactNode, useState } from "react";
import ChatContext from "./chat-context";

type ResponseType = {
  timeStamp: string;
  message: string;
  // Optional code block, if applicable
  // If you want to use code blocks, ensure to handle the code rendering in your chat bubble components.
  // This is just a placeholder for demonstration purposes.
  code?: string;
  role: string;
};

const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [responses, setResponses] = useState<ResponseType[]>([]);

  return (
    <ChatContext.Provider value={{ responses, setResponses }}>{children}</ChatContext.Provider>
  );
};

export default ChatProvider;
