# fileUpload

Simple Node.js file upload project that uploads files to Cloudinary and stores metadata in the database.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file with your config (Cloudinary keys, DB URL).

3. Run the app:

```bash
npm start
```

## Notes

- The `files/` folder is ignored by `.gitignore` to avoid committing uploads.
- Update `config/cloudinary.js` and `config/db.js` with your credentials.

## License

Add a license if required.
