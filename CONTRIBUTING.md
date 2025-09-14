# Contributing to Request Log

Thank you for your interest in contributing to the Request Log project! This document provides guidelines and information for contributors.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/request-log.git
   cd request-log
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Create a branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### Running the Project Locally

```bash
# Start development server
npm run dev

# Run tests
npm test

# Run tests in watch mode
npm run test -- --watch
```

### Making Changes

1. **Make your changes** in the appropriate files
2. **Add or update tests** as needed
3. **Ensure tests pass**: `npm test`
4. **Test manually** by sending requests to your local development server
5. **Commit your changes** with a descriptive message

### Code Style

This project uses:
- **TypeScript** for type safety
- **Prettier** for code formatting (configured in `.prettierrc`)
- **EditorConfig** for consistent editor settings (`.editorconfig`)

Format your code before committing:
```bash
npx prettier --write .
```

## Types of Contributions

### Bug Reports

When reporting bugs, please include:
- Steps to reproduce the issue
- Expected vs. actual behavior
- Your environment (Node.js version, operating system)
- Any error messages or logs

### Feature Requests

For new features:
- Describe the use case and why it would be valuable
- Consider the scope - keep features focused and minimal
- Provide examples of how it would work

### Code Contributions

We welcome:
- Bug fixes
- Performance improvements
- Documentation updates
- New features (discuss in an issue first)
- Test improvements

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- test/index.spec.ts
```

### Writing Tests

- Place tests in the `test/` directory
- Use descriptive test names
- Test both happy path and error cases
- Include integration tests where appropriate

Example test structure:
```typescript
describe('Feature Name', () => {
  it('should handle normal case', async () => {
    // Test implementation
  });

  it('should handle error case', async () => {
    // Test implementation
  });
});
```

## Documentation

### Updating Documentation

- Update README.md for user-facing changes
- Add inline code documentation for complex functions
- Update examples if APIs change
- Consider adding usage examples

### Documentation Style

- Use clear, concise language
- Include code examples where helpful
- Use proper markdown formatting
- Keep examples up-to-date

## Deployment and Testing

### Testing Before Deployment

1. Run local tests: `npm test`
2. Test locally: `npm run dev`
3. Test against real Cloudflare Workers environment if possible

### Deployment

Deployment is typically handled by maintainers, but you can test deployment:

```bash
# Deploy to your own Cloudflare Workers account
npm run deploy
```

## Code Review Process

1. **Submit a Pull Request** with a clear description
2. **Wait for review** from maintainers
3. **Address feedback** if requested
4. **Tests must pass** before merging
5. **Maintainers will merge** approved PRs

### Pull Request Guidelines

- Use a clear, descriptive title
- Describe what changes you made and why
- Reference any related issues
- Keep changes focused and minimal
- Include tests for new functionality

## Community Guidelines

- Be respectful and constructive
- Help others learn and contribute
- Focus on the code and technical discussions
- Welcome newcomers and different perspectives

## Questions or Help

- **Issues**: Use GitHub issues for bugs and feature requests
- **Discussions**: Use GitHub discussions for questions and general topics
- **Documentation**: Check the README.md first

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT License).

Thank you for contributing! 🎉