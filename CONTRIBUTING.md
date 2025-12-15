# Contributing to KaryaSiddhi

Thank you for your interest in contributing to KaryaSiddhi! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Pull Request Process](#pull-request-process)
- [Bug Reports](#bug-reports)
- [Feature Requests](#feature-requests)

## Code of Conduct

This project adheres to the principles of:
- **Respect**: Treat all contributors with respect
- **Collaboration**: Work together towards common goals
- **Transparency**: Communicate openly and honestly
- **Quality**: Maintain high standards in all contributions

## Getting Started

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/karyasiddhi.git
   cd karyasiddhi
   ```

2. **Set up development environment**
   ```bash
   npm run setup
   ```

3. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### Frontend Development

```bash
cd frontend
npm run dev
```

- Use React 18.2+ features
- Follow TypeScript strict mode
- Use Tailwind CSS for styling
- Ensure responsive design
- Test on multiple screen sizes

### Backend Development

```bash
cd backend
npm run start:dev
```

- Follow NestJS best practices
- Use TypeORM for database operations
- Implement proper error handling
- Add Swagger documentation
- Write unit tests

### AI Service Development

```bash
cd ai-service
uvicorn main:app --reload
```

- Use type hints in Python
- Follow PEP 8 style guide
- Document all functions
- Add model validation
- Test predictions thoroughly

## Coding Standards

### TypeScript/JavaScript

- Use TypeScript strict mode
- Follow ESLint configuration
- Use meaningful variable names
- Add JSDoc comments for public APIs
- Keep functions small and focused

```typescript
// Good
interface UserProfile {
  id: string;
  name: string;
  email: string;
}

async function fetchUserProfile(userId: string): Promise<UserProfile> {
  // Implementation
}

// Bad
async function getData(id: any) {
  // Implementation
}
```

### Python

- Follow PEP 8
- Use type hints
- Write docstrings
- Keep functions under 50 lines
- Use meaningful variable names

```python
# Good
def calculate_productivity_score(
    user_id: str,
    period: str = "monthly"
) -> float:
    """
    Calculate productivity score for a user.
    
    Args:
        user_id: Unique identifier for the user
        period: Time period for calculation
        
    Returns:
        Productivity score between 0 and 100
    """
    # Implementation
    return score

# Bad
def calc(u, p):
    # Implementation
    return s
```

### CSS/Tailwind

- Use Tailwind utility classes
- Follow mobile-first approach
- Ensure dark mode compatibility
- Use custom classes sparingly
- Maintain consistent spacing

## Testing Guidelines

### Unit Tests

```typescript
// Frontend
describe('GoalService', () => {
  it('should create a new goal', async () => {
    // Test implementation
  });
});
```

```typescript
// Backend
describe('GoalsController', () => {
  it('should return all goals', async () => {
    // Test implementation
  });
});
```

### Integration Tests

- Test API endpoints
- Verify database operations
- Check authentication flows
- Validate error handling

### E2E Tests

- Test critical user flows
- Verify cross-service communication
- Check offline functionality
- Test PWA features

## Pull Request Process

1. **Update documentation**
   - Update README if needed
   - Add JSDoc/docstrings
   - Update API documentation

2. **Ensure tests pass**
   ```bash
   npm run test
   npm run lint
   ```

3. **Update CHANGELOG**
   - Add entry under "Unreleased"
   - Describe changes clearly
   - Reference issue numbers

4. **Create Pull Request**
   - Use clear title
   - Describe changes in detail
   - Link related issues
   - Add screenshots if UI changes

5. **Code Review**
   - Address reviewer comments
   - Make requested changes
   - Keep discussion professional

### PR Title Format

```
feat: Add AI-powered goal recommendations
fix: Resolve authentication token expiry issue
docs: Update deployment guide
refactor: Improve KPI calculation logic
test: Add unit tests for analytics service
```

## Bug Reports

When reporting bugs, please include:

1. **Description**: Clear description of the issue
2. **Steps to Reproduce**: Detailed steps
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Environment**: 
   - OS and version
   - Browser and version
   - Node.js version
   - Python version
6. **Screenshots**: If applicable
7. **Logs**: Relevant error logs

### Bug Report Template

```markdown
**Description**
A clear description of the bug

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What should happen

**Actual Behavior**
What actually happens

**Environment**
- OS: Windows 11
- Browser: Chrome 120
- Node: 20.10.0

**Screenshots**
[If applicable]

**Additional Context**
Any other relevant information
```

## Feature Requests

When requesting features:

1. **Clear Use Case**: Explain the problem
2. **Proposed Solution**: How it should work
3. **Alternatives**: Other solutions considered
4. **Impact**: Who benefits and how
5. **Priority**: Critical/High/Medium/Low

### Feature Request Template

```markdown
**Problem Statement**
Describe the problem or need

**Proposed Solution**
How the feature should work

**Alternatives Considered**
Other approaches you've thought about

**Benefits**
Who benefits and how

**Additional Context**
Screenshots, mockups, examples
```

## Development Best Practices

### Git Workflow

1. Keep commits atomic and focused
2. Write clear commit messages
3. Rebase before merging
4. Squash related commits
5. Keep history clean

### Code Review Checklist

- [ ] Code follows style guidelines
- [ ] Tests are included and passing
- [ ] Documentation is updated
- [ ] No security vulnerabilities
- [ ] Performance is acceptable
- [ ] Accessibility standards met
- [ ] Mobile responsive
- [ ] Error handling is proper

### Security Considerations

- Never commit secrets or credentials
- Validate all user inputs
- Use parameterized queries
- Implement rate limiting
- Follow OWASP guidelines
- Use secure dependencies

## Questions?

- **Technical Questions**: Open a GitHub Discussion
- **Security Issues**: Email security@karyasiddhi.gov.in
- **General Inquiries**: Email support@karyasiddhi.gov.in

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to KaryaSiddhi! Together, we're building better government services for India. 🇮🇳
