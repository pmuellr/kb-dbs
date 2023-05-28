kb-dbs - kibana diagnostic bundle summarist
================================================================================

`kb-dbs` generates an HTML file which contains a readable summary of a
Kibana [diagnostics bundle][].

[diagnostics bundle]: https://www.elastic.co/blog/why-does-elastic-support-keep-asking-for-diagnostic-files


usage
================================================================================

    kb-dbs [options] [directory [directory [ ... ]]]

`<directory>` is a directory with the expanded diagnostic bundle contents.
Default is the current directory.

The file `kb-diagnostics-summary.html` will be written to the directory
the files were read from, unless the `--stdout` flag is provided.

options:

| option          | description
| --------------- | -------------------------------------
| `-d --debug`    | generate verbose output when running
| `-h --help`     | display help
| `-v --version`  | print version


install
================================================================================

To install as a command on your machine:

    npm install -g pmuellr/kb-dbs

To run without installing

    npx pmuellr/kb-dbs


changelog
================================================================================

version 2023.05.27

- initial version


license
================================================================================

This package is licensed under the MIT license.  See the [LICENSE.md][] file
for more information.


contributing
================================================================================

Awesome!  We're happy that you want to contribute.

Please read the [CONTRIBUTING.md][] file for more information.


[LICENSE.md]: LICENSE.md
[CONTRIBUTING.md]: CONTRIBUTING.md
[CHANGELOG.md]: CHANGELOG.md