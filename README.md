# API Documentation

This document provides an overview of the available endpoints for the API, along with their respective usage. **Note:** Bearer tokens are required for all endpoints in the `/blogs` section.

---

## Blogs API

### 1. Get Blogs

- **Endpoint:** `GET /blogs`
- **URL:** `https://nextjs-15-rest-api.vercel.app/api/blogs?categoryId=<CATEGORY_ID>&userId=<USER_ID>`
- **Description:** Fetch all blogs for a specific category and user.
- **Headers:**
  - `Authorization`: Bearer `<TOKEN>`

### 2. Create Blog

- **Endpoint:** `POST /blogs`
- **URL:** `https://nextjs-15-rest-api.vercel.app/api/blogs?categoryId=<CATEGORY_ID>&userId=<USER_ID>`
- **Description:** Create a new blog.
- **Headers:**
  - `Authorization`: Bearer `<TOKEN>`
- **Request Body:**
  ```json
  {
      "title": "This is a blog title",
      "description": "This is the blog content."
  }
  ```

### 3. Get Single Blog

- **Endpoint:** `GET /blogs/:blogId`
- **URL:** `https://nextjs-15-rest-api.vercel.app/api/blogs/<BLOG_ID>?categoryId=<CATEGORY_ID>&userId=<USER_ID>`
- **Description:** Fetch details of a single blog.
- **Headers:**
  - `Authorization`: Bearer `<TOKEN>`

### 4. Update Blog

- **Endpoint:** `PATCH /blogs/:blogId`
- **URL:** `https://nextjs-15-rest-api.vercel.app/api/blogs/<BLOG_ID>?userId=<USER_ID>`
- **Description:** Update an existing blog.
- **Headers:**
  - `Authorization`: Bearer `<TOKEN>`
- **Request Body:**
  ```json
  {
      "title": "Updated blog title",
      "description": "Updated blog description."
  }
  ```

### 5. Delete Blog

- **Endpoint:** `DELETE /blogs/:blogId`
- **URL:** `https://nextjs-15-rest-api.vercel.app/api/blogs/<BLOG_ID>?userId=<USER_ID>`
- **Description:** Delete a blog.
- **Headers:**
  - `Authorization`: Bearer `<TOKEN>`

---

## Categories API

### 1. Get Categories

- **Endpoint:** `GET /categories`
- **URL:** `https://nextjs-15-rest-api.vercel.app/api/categories?userId=<USER_ID>`
- **Description:** Fetch all categories for a specific user.

### 2. Create Category

- **Endpoint:** `POST /categories`
- **URL:** `https://nextjs-15-rest-api.vercel.app/api/categories?userId=<USER_ID>`
- **Description:** Create a new category.
- **Request Body:**
  ```json
  {
      "title": "New Category Title"
  }
  ```

### 3. Update Category

- **Endpoint:** `PATCH /categories/:categoryId`
- **URL:** `https://nextjs-15-rest-api.vercel.app/api/categories/<CATEGORY_ID>?userId=<USER_ID>`
- **Description:** Update an existing category.
- **Request Body:**
  ```json
  {
      "title": "Updated Category Title"
  }
  ```

### 4. Delete Category

- **Endpoint:** `DELETE /categories/:categoryId`
- **URL:** `https://nextjs-15-rest-api.vercel.app/api/categories/<CATEGORY_ID>?userId=<USER_ID>`
- **Description:** Delete a category.

---

## User API

### 1. Get User

- **Endpoint:** `GET /user`
- **URL:** `https://nextjs-15-rest-api.vercel.app/api/user`
- **Description:** Fetch user details.

### 2. Create User

- **Endpoint:** `POST /user`
- **URL:** `https://nextjs-15-rest-api.vercel.app/api/user`
- **Description:** Create a new user.
- **Request Body:**
  ```json
  {
      "email": "user@example.com",
      "name": "User Name",
      "password": "userpassword"
  }
  ```

### 3. Update User

- **Endpoint:** `PATCH /user`
- **URL:** `https://nextjs-15-rest-api.vercel.app/api/user`
- **Description:** Update user details.
- **Request Body:**
  ```json
  {
      "userId": "<USER_ID>",
      "newUsername": "Updated User Name"
  }
  ```

### 4. Delete User

- **Endpoint:** `DELETE /user`
- **URL:** `https://nextjs-15-rest-api.vercel.app/api/user?userId=<USER_ID>`
- **Description:** Delete a user.

---

## Notes

- **Authentication:** Bearer tokens are mandatory for all `/blogs` endpoints. Example:
  ```
  Authorization: Bearer jsdkeid23ijk23232km432km
  ```
- Replace `<CATEGORY_ID>`, `<USER_ID>`, `<BLOG_ID>`, and `<TOKEN>` with actual values when making API requests.
- Use tools like Postman or cURL to test these endpoints.
