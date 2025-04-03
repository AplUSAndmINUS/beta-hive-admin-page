# Beta Hive Admin Page

This project is a WordPress admin interface for managing Beta Hive settings and content. It provides a user-friendly way to configure various aspects of the Beta Hive system, including prompts, content warnings, and other settings.

## Project Structure

```
src/
├── assets/
│   └── php_code/          # WordPress PHP API endpoints
├── components/            # Reusable UI components
├── pages/                # Main page components
├── services/
│   ├── apis/             # API service calls
│   └── constants/        # Constant definitions
├── stores/               # Redux store configuration
└── utils/                # Utility functions and hooks
```

## Data Flow

### 1. WordPress Backend (PHP)

- Located in `src/assets/php_code/php_api.php`
- Provides REST API endpoints for:
  - Admin data management
  - Content warnings
  - Prompts
  - Settings
- Uses WordPress options API to store data
- Handles authentication and data validation

### 2. API Services

- Located in `src/services/apis/`
- `admin-apis.ts`: Handles all admin-related API calls
- Uses Axios instance with WordPress nonce for authentication
- Key functions:
  - `getAdminData()`: Fetches all admin settings
  - `updateContentWarnings()`: Updates content warnings
  - `updatePrompts()`: Updates prompts
  - `updateAdminData()`: Updates general settings

### 3. Redux Store

- Located in `src/stores/`
- Uses Redux Toolkit for state management
- Key slices:
  - `admin-submission.ts`: Manages form state and submissions
  - `admin-settings.ts`: Manages admin settings state
- Thunks handle async operations and API calls

### 4. Frontend Components

- Main admin page: `src/pages/admin/admin.tsx`
- Form components: `src/components/form-elements/`
- Uses React Hook Form for form management
- Implements real-time validation and error handling

## Key Features

### Form Management

- Dynamic form generation based on schema
- Real-time validation
- Reset functionality with value preservation
- Error handling and display

### Data Synchronization

- Automatic data fetching on page load
- Real-time updates to WordPress
- State persistence through Redux
- Optimistic updates for better UX

### Security

- WordPress nonce validation
- Role-based access control
- Data sanitization on both frontend and backend

## Development

### Setup

1. Install dependencies:

   ```bash
   yarn install
   ```

2. Configure WordPress:

   - Ensure PHP API endpoints are properly set up
   - Configure WordPress nonce in `src/services/apis/axios-instance.ts`
   - Utilize the php_api.php file within src/assets/php_code to configure the WP backend

3. Start development server:

   ```bash
   yarn start
   ```

4. Build for production:

   ```bash
   yarn build
   ```

5. Run tests:
   ```bash
   yarn test
   ```

### Deployment

1. Build the project:

   ```bash
   yarn build
   ```

2. Deploy to WordPress (ReactPress):

   - Access the target environment via SSH
   - Navigate to `/htdocs/wp-content/reactpress/apps/beta-hive-admin-page`
   - Delete the existing build folder
   - Copy the new build folder to the same location
   - Update the PHP file in the WordPress Snippets plugin to match the new JS and CSS files
   - Verify the ReactPress app is running correctly

3. Post-Deployment Checks:
   - Ensure PHP API endpoints are properly configured in WordPress
   - Verify WordPress nonce configuration in production
   - Test all form functionality
   - Verify data persistence

### Key Files

- `src/pages/admin/admin.tsx`: Main admin interface
- `src/services/constants/admin-constants.tsx`: Form schemas and constants
- `src/assets/php_code/php_api.php`: WordPress API endpoints
- `src/stores/reducers/admin-submission.ts`: Redux state management

## Data Flow Example

1. **Initial Load**:

   ```
   WordPress -> API Call -> Redux Store -> Admin Page
   ```

2. **Form Update**:

   ```
   User Input -> Form State -> API Call -> WordPress -> Redux Store
   ```

3. **Reset Operation**:
   ```
   Reset Button -> Local State -> Preserve Values -> Update Form
   ```

## Notes

- All form data is validated before submission
- Content warnings and prompts are managed separately
- The system preserves user input during resets
- Error handling is implemented at all levels
