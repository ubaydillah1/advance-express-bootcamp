import db from "../db.js";

// SELECT All Data dengan Filter, Sort, dan Search
export async function getAllData(filterCategoryId, sortField, search) {
  let query = "SELECT * FROM class WHERE 1=1";
  const queryParams = [];

  // Menambahkan filter berdasarkan category_id
  if (filterCategoryId) {
    query += " AND category_id = ?";
    queryParams.push(filterCategoryId);
  }

  // Menambahkan pencarian
  if (search) {
    query += " AND (title LIKE ? OR description LIKE ?)";
    queryParams.push(`%${search}%`, `%${search}%`);
  }

  // Menambahkan pengurutan
  if (sortField) {
    query += ` ORDER BY ${sortField}`;
  }

  const [rows] = await db.query(query, queryParams);
  return rows;
}

// SELECT by ID
export async function getDataById(id) {
  const [rows] = await db.query("SELECT * FROM class WHERE id = ?", [id]);
  return rows[0];
}

// UPDATE Data
export async function updateData(id, data) {
  const { image, title, description, price, tutor_id, category_id } = data;
  await db.query(
    "UPDATE class SET image = ?, title = ?, description = ?, price = ?, tutor_id = ?, category_id = ? WHERE id = ?",
    [image, title, description, price, tutor_id, category_id, id]
  );
}

// DELETE Data
export async function deleteData(id) {
  await db.query("DELETE FROM class WHERE id = ?", [id]);
}

// INSERT Data
export async function insertData(data) {
  const { image, title, description, price, tutor_id, category_id } = data;
  await db.query(
    "INSERT INTO class (image, title, description, price, tutor_id, category_id) VALUES (?, ?, ?, ?, ?, ?)",
    [image, title, description, price, tutor_id, category_id]
  );
}
