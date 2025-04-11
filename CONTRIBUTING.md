<!--
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
 -->

# Contribution Guidelines for Nova React

- [Ticketing and Branching](#branching)
- [Workshop documentation](#documenting)
- [Working in Nova React](#working)
- [Committing](#committing)
- [Build Process](#build-process)
- [Closing](#closing)

## <a name="branching"></a>Create a branch or use ticket to branch from

We welcome contributions from the community! Here are the steps to contribute to our library:

### Internal, Visa users

- Find the ticket related to the issue you are wanting to solve or create a [Jira ticket](https://bookmarks.visa.com/vpds-general-create-ticket) and provide the necessary information.
- Create a branch from this ticket using the relevant branch type.
- Be sure to follow the steps and processes laid out in our CONTRIBUTE.md file and reference the [Working in Nova React](#working) section below to get started.
- Once the issue is resolved and tests are added, open a PR to development on Bitbucket.
- Our team will provide feedback and merge it once approved.

### External, public users

- Find the ticket related to the issue you are wanting to solve or create a [GitHub issue](https://github.com/your-repo-url/issues) and provide the necessary information.
- Fork our repository on GitHub.
- Clone your forked repository to your local machine.
- Create a branch from the Github issue you created.
- Be sure to follow the steps and processes laid out in our CONTRIBUTE.md file and reference the [Working in Nova React](#working) section below to get started.
- Once the issue is resolved and tests are added, open a PR to our main branch on GitHub.
- Our team will review your pull request, provide feedback, and merge it once approved.

Thank you for contributing to our project! Your contributions help make our library better for everyone.

## <a name="documenting"></a>Code documentation in Nova workshops

Nova workshops have strict rules for documentation because the documentation found here is also reflected in our Home Experience (HX) site.

- Work with our Content team as much as possible to create and refine documentation around any components, features, examples, and etc.
- Wherever possible, code documentation comments should be sentence case. This means it should include a capital first letter and the correct ending punctuation.
- Component property descriptions should have plural verbs (ie allow**s**, emit**s**, provide**s**)

## <a name="working"></a>Working in Nova React

Changes to Nova React must consider our design, content, and a11y guidelines. All tests should pass and any new features should receive tests as well.

- You can update the documentation within apps > workshop. It is important if you update only the documentation to use `docs` as your commit message type.
- You can update the component library within libs > nova-react > src
- Keep in mind as you are working that this library is for multiple teams and needs to support more than just the use case you have in mind.

### Architecture

For package management we are using `pnpm`. This allows for faster installs and easy workspace management. We have two modules inside the repo. One that holds the library code and one that holds the docs portal. The docs portal simply installs the built version of the library then consumes it for examples and building the layout of the portal.

For the docs portal we are using Vite for bundling our app.

For the library we are using Rollup for building and packaging our library.

### Setup

1. Open a Jira ticket (see above)
2. [Install `pnpm`](https://pnpm.io/installation#using-npm)
3. `pnpm install`
4. `pnpm dev`
5. `pnpm test:coverage` (make sure to have 100% code coverage for contributed code)

Before pushing try building the project: `pnpm prebuild && pnpm build`

### Review Process

1. Code is tested and built on Jenkins
2. Code reviewed by BitBucket admins
3. Design review
4. Accessibility review
5. Content review

## <a name="committing"></a>Committing

This library follows the [Conventional Commit specification](https://conventionalcommits.org/).

- [Commit message format](#format)
- [Type](#type)
- [Scope](#scope)
- [Description](#description)
- [Body](#body)
- [Footer](#footer)
- [Breaking changes](#breaking)
- [Jira ticket number](#jira)
- [Frequent code committers](#frequent)
- [IDE or Code Editor users](#ide)
- [Git CLI users](#cli)

### <a name="format"></a>Commit message format

```bash
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### <a name="type"></a>Type

Use one of the following.
[Read here](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines)
for more semantics and background on each type.

- build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- ci: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
- docs: Documentation only changes
- feat: A new feature
- fix: A bug fix
- perf: A code change that improves performance
- refactor: A code change that neither fixes a bug nor adds a feature
- style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- test: Adding missing tests or correcting existing tests

### <a name="scope"></a>Scope

In relevance to this repo, the scope could be the component
or asset name (eg. `avatar`), or it could be another
relevant item (eg. `readme`, `api`).

```shell script
chore(api): updates signature in dev docs
```

### <a name="description"></a>Description

Prefer to use action verbs and keep the entire line at or
below 72 characters. Some examples below.

```shell script
feat(checkbox): adds simplification to functional logic
```

```shell script
fix(radio): removes the double check issue
```

### <a name="body"></a>Body

One or more free-form paragraphs one blank line after the
description. We recommend using unordered lists for easy
readability.

```shell script
fix(radio): removes the double check issue

- undoes the previous single check solution
- prevents future instances from happening
```

### <a name="footer"></a>Footer

One or more footers can be provided one blank line after the
body. The footer can be indicated by either a `:<space>` or
`<space>#` separator, followed by a string value. Breaking
changes can be communicated here as,
`BREAKING CHANGE: This is important.`. Reviews can be
indicated here as, `Design-reviewed-by: Designer Name`. Jira
tickets on closing commits need to be indicated as,
`#VDS-2095`.

```shell script
fix(radio): removes the double check issue

- undoes the previous single check solution
- prevents future instances from happening

BREAKING CHANGE: This is important.
Authored-by: Thirumalaa Srinivas
Accessibility-reviewed-by: Erik Thomas
#VDS-2095
```

### <a name="breaking"></a>Breaking changes

The best way so far, seems to be with using the phrase in
the footer as shown below.

The
`<type>[optional scope]!: <description>` method seems to
throw errors on `commitlint`. Relevant rule added
`subject-exclamation-mark` do not seeem to make an impact,
yet.

```bash
fix(readme): retries convention details in dev commit docs

BREAKING CHANGE: retries this
#VDS-2095
```

### <a name="jira"></a>Ticket number

It's best to add the ticket (Jira ticket or Github issue) number during the final commit
of the bug fix or feature. The below examples use Jira tickets.

```bash
fix(readme): updates section in dev commit docs

#VDS-2095
```

It shows up as closing the ticket in the change log.

```markdown
# 4.2.0 (2021-08-09)

## Features

- readme: updates section in dev commit docs (78ec2cd),
  closes #VDS-2095
```

### <a name="frequent"></a>For frequent code committers

The below practice ensures a crisp `CHANGELOG.md` for the
developer community to grok.

- Please use `chore` and `refactor` for most of your
  commits.
- If it's a bug fix or feature, save `fix` or `feat` for the
  final or critical commit.
- Use the ticket number in footer `#VDS-2095` for (hopefully
  or approximately) the last commit.

### <a name="ide"></a>For UI users in IDE or Code Editors

This could be one of, but not limited to, SourceTree,
VSCode, WebStorm, SublimeText, Atom, IntelliJ.

```bash
docs(readme): updates documentation

#VDS-100
```

### <a name="cli"></a>For git CLI users

```bash
git commit -m "docs(readme): updates documentation" -m "#VDS-100"
```

## <a name="build-process"></a>Build Process

| Stage            | Steps                     |
| ---------------- | ------------------------- |
| 1                | Install Packages          |
| 2                | Prebuild Lib              |
| 3                | Build Lib                 |
| 4                | Prebuild Docs             |
| 5                | Test, Postbuild           |
| 6                | Build Docs                |
| 7 (Only on main) | Build Docs (Versioned)    |
| 8                | Deploy UI, Deploy Package |

## <a name="closing"></a>Closing

Remember that your commit messages are going to be used in
creating the `CHANGELOG.md` file. So, please use thoughtful
commit messages.

When in doubt, keep PR's small. To give a PR the best chance
of getting accepted, don't bundle more than one feature or
bug fix per pull request. It's always best to create two
smaller PRs than one big one.

When adding new features or modifying existing, please
include tests to confirm the new behavior.
