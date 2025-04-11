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
import { ReactNode, createContext, useContext, useEffect, useRef, useState } from 'react';
import { useDocContext } from '../hooks';
import { Paths } from '../routes/paths';

type User = {
  email?: string;
  family_name?: string;
  given_name?: string;
  name?: string;
   
  subname?: string;
  sub?: string;
};

const AuthContext = createContext<{ setUser?: (user: User) => void; user?: User }>({});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { devMode } = useDocContext();
  const [user, setUser] = useState<User | undefined>(undefined);
  const runOnce = useRef(false);

  useEffect(() => {
    if (runOnce.current === false && !devMode) {
      runOnce.current = true;
      (async () => {
        try {
          const result = await fetch(Paths.userApi);
          const user = await result.json();
          setUser(user);
        } catch (error) {
          console.warn('User not found', error);
        }
      })();
    }
  }, []);

  return <AuthContext.Provider value={{ setUser, user }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
