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
import { default as FullPageNavigation } from "./full-page-navigation";
import { default as FullPageChatCard } from "./full-page-chat-card";
import "./full-page-css.scss";
import ChatProvider from "./shared/chat-provider";

const DefaultFullPageChat = () => {
  return (
    <ChatProvider>
      <div id="full-page-chat" className="layout-example app-container">
        <div className="layout-container">
          <FullPageNavigation />
          <main id="full-page-content" className="main-content">
            <FullPageChatCard />
          </main>
        </div>
      </div>
    </ChatProvider>
  );
};

export default DefaultFullPageChat;
