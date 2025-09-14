# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Comprehensive documentation including README.md, CONTRIBUTING.md, and LICENSE
- Enhanced request logging with better formatting and error handling
- Improved TypeScript types and inline documentation
- Extended test suite with multiple test cases
- HTTP method logging and enhanced request details
- Response headers including X-Request-Logger identifier

### Changed
- Updated worker response to include proper headers
- Improved error handling and logging
- Enhanced test descriptions and coverage
- Better code organization and documentation

### Fixed
- Fixed test cases to match actual worker functionality
- Improved request body handling and error catching

## [0.0.0] - Initial Release

### Added
- Basic Cloudflare Worker for request logging
- Request header and body logging functionality
- Basic test setup with Vitest
- Wrangler configuration for deployment
- TypeScript support