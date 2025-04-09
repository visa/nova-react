/**
 *              Copyright (c) 2025 Visa, Inc.
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
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join, parse, resolve } from 'path';
import { parse as babelParse } from '@babel/parser';
import traverseModule from '@babel/traverse';

const traverse = traverseModule.default;

// global store for all the resources with full documentation
// pages within the workshop.
// useful to check if a given item is a top level item or just a helper
const globalTopLevelResourceStore = {};

const objectFromJsonPath = filePath => (existsSync(filePath) ? JSON.parse(readFileSync(filePath, 'utf-8')) : {});

const rootPath = resolve('./');
const pathToDocs = join(rootPath, '/apps/workshop');
const pathToDocsSrc = join(pathToDocs, '/src');
const pathToLib = join(rootPath, '/libs/nova-react');
const pathToLibDist = join(pathToLib, '/dist');
const pathToLibSrc = join(pathToLib, '/src');
const pathToExamples = join(pathToDocsSrc, '/examples');

const apiJsonName = 'api.json';
const metaDataFilename = 'meta.json';
const packageFilename = 'package.json';

const outputPath = join(pathToLibDist, apiJsonName);
const libPackageJson = objectFromJsonPath(join(pathToLibDist, packageFilename));

const getItemCategory = itemName => {
  return itemName.toLowerCase().startsWith('use') ? 'hooks' : 'components';
};

const formatHookSections = metaData => {
  const hookSections = [];

  if (metaData.params && metaData.params.length) {
    hookSections.push({
      name: 'Arguments',
      libraryId: null,
      componentId: null,
      description: '',
    });
  }

  if (metaData.props && metaData.props.length) {
    hookSections.push({
      name: 'Properties',
      libraryId: null,
      componentId: null,
      description: '',
    });
  }

  if (metaData.returnType) {
    hookSections.push({
      name: 'Returns',
      libraryId: null,
      componentId: null,
      description: '',
    });
  }

  if (metaData.clientSideOnly) {
    hookSections.push({
      name: 'Client side only',
      libraryId: null,
      componentId: null,
      description: '',
    });
  }

  // add the order property for all the collected sections
  return hookSections.map((s, i) => ({ ...s, order: i + 1 }));
};

const formatHookSectionValues = metaData => {
  let paramValues = [];
  let propValues = [];
  let returnTypeValues = [];
  let clientSideOnlyValues = [];

  if (metaData.params && metaData.params.length) {
    paramValues = metaData.params.map((p, i) => ({
      section: 'Arguments',
      name: p.name,
      data: {
        order: i + 1,
        name: p.name,
        type: p.type?.replace(/<.*$/, '')?.replace(/\|/gi, ',') || '', // only return a simple string like `ElementType`
        default: p.defaultValue || '',
        required: p.required === true ? 'yes' : '',
        description: p.description,
      },
    }));
  }

  if (metaData.props && metaData.props.length) {
    propValues = metaData.props.map((p, i) => ({
      section: 'Properties',
      name: p.name,
      data: {
        order: i + 1,
        name: p.name,
        type: p.type?.replace(/<.*$/, '')?.replace(/\|/gi, ',') || '', // only return a simple string like `ElementType`
        default: p.defaultValue || '',
        required: p.required === true ? 'yes' : '',
        description: p.description,
      },
    }));
  }

  if (metaData.returnType) {
    if (Array.isArray(metaData.returnType)) {
      returnTypeValues = metaData.returnType.map((p, i) => ({
        section: 'Returns',
        name: p.name,
        data: {
          order: i + 1,
          name: p.name,
          type: p.type?.replace(/<.*$/, '')?.replace(/\|/gi, ',') || '', // only return a simple string like `ElementType`
          description: p.description,
        },
      }));
    } else {
      returnTypeValues = [
        {
          section: 'Returns',
          data: metaData.returnType,
        },
      ];
    }
  }

  if (metaData.clientSideOnly) {
    clientSideOnlyValues = [
      {
        section: 'Client side only',
        data: String(metaData.clientSideOnly),
      },
    ];
  }

  return [...paramValues, ...propValues, ...returnTypeValues, ...clientSideOnlyValues];
};

const formatPanelCase = stringName => {
  if (getItemCategory(stringName) === 'hooks') {
    return stringName;
  }

  // covert it to PanelCase
  return stringName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
};

const formatComponentCase = stringName => {
  if (getItemCategory(stringName) === 'hooks') {
    return stringName;
  }

  if (stringName === 'toggle-button') {
    stringName = 'toggle';
  }

  // covert it to PanelCase
  const panelCase = stringName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');

  // convert to <ComponentCase />
  return `<${panelCase} />`;
};

// propertySections can be type: `components`, `hooks`, or `related`
// 1: `components`: these are react components and will be rendered as headings on the HX.
//     The rest of the data for this component is found in the `properties` array
// 2: `hooks`: these are react hooks, and will be associated with their top level hook data
//     on the HX. These will be rendered AFTER all the `components` on the HX.
//     No additional info is needed in `properties`.
// 3: `related`: These are top level components that can be have their own component pages
//     on the HX. These should be the items with the last "order" numbers in the propertySections array, and will be rendered
//     in a simple list on the HX. No additional info is needed in `properties`
const formatPropertySection = (kebabCaseName, metaData) => {
  const propertyType = getItemCategory(kebabCaseName);
  const propertySectionData = {
    name: formatPanelCase(metaData.displayName),
    selector: propertyType === 'components' ? formatComponentCase(kebabCaseName) : null,
    libraryId: null,
    componentId: null,
    type: propertyType, // `components`, `hooks`, or `related`
    description: metaData.description,
  };
  return propertySectionData;
};

const formatProperties = metaData => {
  if (!metaData.props) {
    metaData.props = [];
  }
  return metaData.props.map(p => ({
    name: p.name,
    section: formatPanelCase(metaData.displayName),
    data: {
      name: p.name,
      type: p.type?.replace(/<.*$/, '')?.replace(/\|/gi, ',') || '', // only return a simple string like `ElementType`
      default: p.defaultValue || '',
      required: p.required === true || p.required === false ? String(p.required) : '',
      description: p.description || '',
    },
  }));
};

const fetchLibMetaForResource = resourceName => {
  // in case there's a difference: translate the workshop name of the resource to the lib name
  let libResourceName;
  switch (resourceName) {
    case 'accessibility':
      libResourceName = 'screen-reader';
      break;
    case 'toggle-button':
      libResourceName = 'toggle';
      break;
    default:
      libResourceName = resourceName;
  }
  return objectFromJsonPath(join(pathToLibSrc, libResourceName, metaDataFilename));
};

const fetchAllDataForResource = (resourceType, resourceName) => {
  const pathToResourceType = join(pathToExamples, resourceType); // components, hooks, utilities
  const pathToResourceDir = join(pathToResourceType, resourceName);
  const pathToResourceIndexFile = join(pathToResourceDir, '/index.tsx');
  const pathToResourceMetaFile = join(pathToResourceDir, metaDataFilename);

  const indexFileContent = readFileSync(pathToResourceIndexFile, 'utf-8');
  const resourceExamplesMetaData = objectFromJsonPath(pathToResourceMetaFile);
  const ast = babelParse(indexFileContent, {
    sourceType: 'module',
    plugins: ['typescript', 'jsx'],
  });

  // convert the Examples object at the bottom of the index.tsx file to a json object
  // this object is the source of truth for the headings as well as the example order
  let docsRows = [];

  // This was a lot of trial and error
  // 1: Walk the AST for the index.tsx file
  // 2: find the exported Examples array
  // 3: convert the data into json so we can isolate section names and examples
  // along with their respective orders
  //
  // We're essentially treating the index.tsx as the source of truth here (it is for things like
  // headings, and the order of the examples), then we're mapping the examples
  // to the meta.json file to help hydrate everything else we need.
  traverse(ast, {
    VariableDeclarator(path) {
      if (path.node.id.name === 'Examples') {
        docsRows = path.node.init.elements.map(element => {
          if (element.type === 'ObjectExpression') {
            const example = {};
            element.properties.forEach(prop => {
              // the index.tsx for panel is an exception.
              // exported references look like this:
              // { ...metaData['expandable-panel'] },
              // so here we find that 'expandable-panel' argument within the AST
              // and map it to the 'id' within the meta.json file.
              if (prop.type === 'SpreadElement' && prop.argument.type === 'MemberExpression') {
                const metaKey = prop.argument.property.value;
                const metaExample = resourceExamplesMetaData[metaKey];
                if (metaExample) {
                  example.id = metaExample.id;
                }
              }

              // for all other index.tsx files, we can expect the format to look like this:
              //  { id: 'disclosure-group-accordion' }
              //  (with potentially a 'type' key for sections and a 'title' key for the section
              //  headings, or a component key for custom
              //  notes)
              if (prop.key) {
                if (['id', 'title', 'type'].includes(prop.key.name)) {
                  example[prop.key.name] = prop.value.value;
                } else if (prop.key.name === 'component') {
                  example.hasComponent = !!prop.value;
                }
              }
            });
            return example;
          } else return null;
        });
      }
    },
  });

  let sectionsAndExamples = [];

  if (resourceType === 'hooks') {
    // for hooks, there should only be one item without a type.
    // it is the behavior and usage example
    sectionsAndExamples = docsRows.filter(r => !r.type);
  } else {
    // filter out examples with a custom component. this should leave just headings and examples.
    sectionsAndExamples = docsRows.filter(r => !r.hasComponent);
  }

  // NOTE: following commented section is NOT NEEDED in this version
  // because hooks we aren't including the extra content within Hooks in the api

  // filter out sections without any corresponding content to show
  //sectionsAndExamples = sectionsAndExamples.filter((r, i) => {
  //  // the its the last item in the sectionsAndExamples array and its a section
  //  if (r.type === 'section' && i === sectionsAndExamples.length - 1) {
  //    return false;
  //  }
  //
  //  // the current section is followed directly by another section
  //  if (r.type === 'section' && sectionsAndExamples[i + 1]?.type === 'section') {
  //    return false;
  //  }
  //  return true;
  //});

  // add a `section` property to each example that matches the parent section
  let sectionName = '';

  // if the first item in the sectionsAndExamples array isn't a section heading, make a default one.
  if (sectionsAndExamples.length && sectionsAndExamples[0].type !== 'section') {
    if (resourceType === 'hooks') {
      sectionsAndExamples.unshift({
        type: 'section',
        title: 'Behavior and usage',
      });
    } else {
      sectionsAndExamples.unshift({
        type: 'section',
        title: 'Examples',
      });
    }
  }
  sectionsAndExamples = sectionsAndExamples.map(r => {
    if (r.type === 'section') {
      // new section found. examples below this are part of this new section
      // until we find another section
      sectionName = r.title;
    }
    return {
      ...r,
      section: sectionName,
    };
  });

  // populate final `exampleSection` data for our return data
  const sections = sectionsAndExamples
    .filter(r => r.type === 'section')
    .map((s, i) => ({ name: s.title, description: '', order: i + 1 }));

  const examples = sectionsAndExamples
    .filter(r => !r.type) // filter out all of the headings that have type of `section`
    .map((exampleReference, i) => {
      const exampleInfo = resourceExamplesMetaData[exampleReference.id]; // fetch the example data from the meta.json file
      if (!exampleInfo) {
        console.warn(`example info not found for ${exampleReference.id}`);
        return exampleReference;
      }

      // fetch tsx for example implementation
      const snippetPath = join(pathToResourceDir, exampleInfo.file);

      const snippetFileType = parse(snippetPath).ext.slice(1); // capture the file extension since this is part of our api
      const codeSnippet = readFileSync(snippetPath, 'utf-8'); // fetch the code implementation for the example
      if (!codeSnippet) {
        console.warn(`${snippetPath} not found!`);
        return exampleReference;
      }

      // our api expects the tags to be an array of strings--
      // convert truthy tag values within `tags` object into an array
      const exampleTags = exampleInfo.tags ? Object.keys(exampleInfo.tags).filter(tag => !!exampleInfo.tags[tag]) : [];

      const finalExampleData = {
        description: exampleInfo.description ? exampleInfo.description : '',
        order: i + 1,
        libraryId: null,
        componentId: null,
        section: exampleReference.section,
        url: `${resourceType}/${resourceName}/${exampleInfo.id}`,
        tags: exampleTags,
        snippets: {
          [snippetFileType]: codeSnippet,
        },
      };

      if (resourceType === 'hooks' && exampleInfo.title === 'Behavior and usage') {
        finalExampleData.name = '';
      } else {
        finalExampleData.name = exampleInfo.title;
      }

      return finalExampleData;
    });

  // fetch data from the lib side for `resourceName`
  const rootItemLibMeta = fetchLibMetaForResource(resourceName);
  if (!rootItemLibMeta) {
    console.warn(`no ${metaDataFilename} for ${resourceName}`);
  }

  let propertySections = [];
  const properties = [];

  // hooks are a special case and they need their data formatted differently.
  // also, it seems no related components section is needed needed.
  if (resourceType === 'hooks') {
    const hookApiSections = formatHookSections(rootItemLibMeta);
    const hookApiSectionValues = formatHookSectionValues(rootItemLibMeta);

    const finalHookData = {
      exampleSections: sections,
      examples,
      apiSections: hookApiSections,
      apiSectionValues: hookApiSectionValues,
    };

    if (rootItemLibMeta.description) {
      finalHookData.description = rootItemLibMeta.description;
    }
    // probably not being used directly by HX
    if (rootItemLibMeta.devNote) {
      finalHookData.devNote = rootItemLibMeta.devNote;
    }
    // probably not being used by HX
    if (rootItemLibMeta.disclaimer) {
      finalHookData.disclaimer = rootItemLibMeta.disclaimer;
    }
    return finalHookData;
  }

  // avoid populating `components` for components that don't have a props array
  // (or hooks that don't have a params array)
  // ex: color selector (native), or vertical-navigation (nav is the real parent component)
  if (!rootItemLibMeta.noComponent) {
    // start populating propertySections and properties for our final api data
    // the first propertySection is a reference is a self reference
    // e.g. <Accordion /> for resourceName === "accordion"
    propertySections.push(formatPropertySection(resourceName, rootItemLibMeta));
    properties.push(...formatProperties(rootItemLibMeta));
  }

  const relatedComponents = { sections: [], properties: [] };

  const relatedHooks = { sections: [], properties: [] };
  const relatedTopLevelItems = { sections: [] }; // no properties needed

  // fetch all the data from the lib side for all `related` resources.
  // ex: AccordionHeading, AccordionContent from Accordion
  // add related items to propertySections and add those item props to properties
  // if the top level item is a hook then we don't need to show the related APIs
  if (resourceType !== 'hooks') {
    rootItemLibMeta.related?.forEach(relatedName => {
      // NOTE: remove this block when the badge-number component is officially removed
      if (relatedName === 'badge-number') {
        return;
      }

      const relatedItemLibMeta = fetchLibMetaForResource(relatedName);
      if (!relatedItemLibMeta) {
        console.warn(`no ${metaDataFilename} found for ${relatedName}`);
        return;
      }
      if (getItemCategory(relatedName) === 'hooks') {
        relatedHooks.sections.push(formatPropertySection(relatedName, relatedItemLibMeta));
        relatedHooks.properties.push(...formatProperties(relatedItemLibMeta));
        return;
      }

      // check the global components store to see if this item
      // has a proper workshop page. if so, the HX will add it to
      // a `related` table. No properties needed.
      // NOTE: Angular creates related table items for ALL related items,
      // linking to the relevant sub-table within the docs. We should think about following suit
      // here after an HX update to generate those links.
      if (globalTopLevelResourceStore[relatedName]) {
        relatedTopLevelItems.sections.push({
          name: relatedName,
          type: 'related',
          selector: formatComponentCase(relatedName),
          description: '',
        });
      }

      // whether it's a top level component or not, add it to the `components` section
      // as long as noComponent isn't true. When noComponent is true we can jut render the
      // items in the related table. Nav is another exception because horizontal-navigation
      // and vertical-navigation both need to document Nav directly.
      if (!rootItemLibMeta.noComponent || relatedName === 'nav') {
        relatedComponents.sections.push(formatPropertySection(relatedName, relatedItemLibMeta));
        relatedComponents.properties.push(...formatProperties(relatedItemLibMeta));
      }
    });

    // build the propertySections in the order we want
    propertySections.push(...relatedComponents.sections, ...relatedHooks.sections, ...relatedTopLevelItems.sections);
    properties.push(...relatedComponents.properties);

    propertySections = propertySections.map((ps, i) => ({
      order: i + 1,
      ...ps,
    }));
  }

  const finalResourceData = {
    exampleSections: sections,
    examples,
    propertySections,
    properties,
  };

  if (rootItemLibMeta.description) {
    finalResourceData.description = rootItemLibMeta.description;
  }

  // these next two are probably not being used...
  // and they're only in certain `hooks` meta.json files
  // they just closely match some of the content
  // for hooks pages that we're hand authoring in v1 of the HX.
  // could be useful down the road.
  if (rootItemLibMeta.devNote) {
    finalResourceData.devNote = rootItemLibMeta.devNote;
  }
  if (rootItemLibMeta.disclaimer) {
    finalResourceData.disclaimer = rootItemLibMeta.disclaimer;
  }
  return finalResourceData;
};

const getWorkshopExamples = () => {
  const examplesMetaData = objectFromJsonPath(join(pathToExamples, metaDataFilename));

  // NOTE: remove badge-number workshop page in the next release.
  // then remove this block
  const badgeNumberIndex = examplesMetaData.components.indexOf('badge-number');
  if (badgeNumberIndex !== -1) {
    // splice out 'badge-number' so it doesn't show up in our json
    examplesMetaData.components.splice(badgeNumberIndex, 1);
  }

  // the wrapper to the final component api object we're assembling
  const resourceApiData = { components: [] };

  // create a global object that contains all the resources with
  // top level workshop example pages.
  // this can be used in `related` component references
  ['components', 'hooks', 'utilities'].forEach(resourceType => {
    examplesMetaData[resourceType].forEach(resourceName => {
      globalTopLevelResourceStore[resourceName] = true;
    });
  });

  ['components', 'hooks', 'utilities'].forEach(resourceType => {
    const resourceData = examplesMetaData[resourceType].map(resourceName => {
      return {
        name: resourceName,
        version: '0.0.1',
        description: '',
        libraryId: null,
        category: resourceType,
        ...fetchAllDataForResource(resourceType, resourceName),
      };
    });
    // all `components`, `hooks` and `utilities` need to be categorized as `components`
    // within the json data. The component.category field defines the resourceType.
    resourceApiData['components'].push(...resourceData);
  });

  // NOTE: nova-angular and nova-styles are still calling "toggle-button" "toggle" and the hx
  // translates the name. so we need to rename "toggle-button" to "toggle" here until for now.
  const toggleButtonComponent = resourceApiData.components.filter(c => c.name === 'toggle-button');
  if (toggleButtonComponent[0]) {
    toggleButtonComponent[0].name = 'toggle';
  }
  return resourceApiData;
};

const main = () => {
  // populate resourceApiData
  const componentApiWrapper = getWorkshopExamples();

  writeFileSync(
    outputPath,
    JSON.stringify(
      {
        library: {
          version: libPackageJson.version,
          name: libPackageJson.name,
        },
        ...componentApiWrapper,
      },
      null,
      2
    )
  );
};

main();
