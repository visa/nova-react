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
import { useEffect, useRef, useState } from 'react';
import { PageContent, PageHeader, PageTitle } from '../../components/page';
import Markdown from 'react-markdown';
import { Paths } from '../../routes/paths';
import Styles from './styles.module.scss';
import VSuspense from '../../components/v-suspense';

const ChangeLog = () => {
  const [changeLog, setChangeLog] = useState('');
  const mdRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${Paths.base}/CHANGELOG.md`);
        const changeLogText = await response.text();
        setChangeLog(changeLogText.replace('⚠', '‼️'));
      } catch (error) {
        console.warn(error);
        setChangeLog('## Error Loading Changelog.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    mdRef.current?.querySelectorAll('h2').forEach(element => (element.className = 'v-typography-headline-2'));
    mdRef.current?.querySelectorAll('h3').forEach(element => (element.className = 'v-typography-subtitle-1'));
    mdRef.current?.querySelectorAll('li').forEach(element => (element.className = 'v-typography-body-1'));
    mdRef.current?.querySelectorAll('a').forEach(element => (element.className = `v-link ${Styles.vLinkOverride}`));
  }, [changeLog]);

  return (
    <div>
      <PageHeader>
        <PageTitle>Changelog</PageTitle>
      </PageHeader>
      <PageContent ref={mdRef}>
        {loading && <VSuspense />}
        <Markdown className={Styles.changeLogMarkdown} urlTransform={url => url.replace('amp;', '')}>
          {changeLog}
        </Markdown>
      </PageContent>
    </div>
  );
};

export default ChangeLog;
